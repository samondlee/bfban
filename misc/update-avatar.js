// 自动更新avatar 以及 游戏id
const axios = require('axios');
const { ACCESS_TOKEN } = process.env;
let accessToken;

try {
  accessToken = require('../server/config').accessToken;
} catch (e) {
  console.log(`config does not exist`)
}

if (!accessToken)
  accessToken = ACCESS_TOKEN;

// 每次运行需手动修改 game & page & token(cookie里找)
// token
const limit = 2430;
const token = accessToken;
const baseUrlApi = 'https://bf.bamket.com/api';
// const baseUrlApi = 'http://localhost:4000/api';


function sleep(time) {
  return new Promise((resolve, reject)=> {
    setTimeout(resolve, time)
  })
}

function doUpdate({ avatarUrl, originUserId }) {
  return axios.head(avatarUrl)
    .then((data) => {
    })
    .catch((err) => {
      console.log(`data status not 200, Err: ${err}`)

      try {
        const { response: { status } } = err;

        if (status === 403) {
          axios.post(`${baseUrlApi}/cheaters/updateCheaterInfo`, {
            token,
            originUserId,
          })
            .then(({ data }) => {
              console.log(`get the new Avatar successfully, originUserId: ${originUserId}, ${data}`);
            })
            .catch((err) => {
              console.log('post', err);
            });
        }
        console.log(`status is ${status}, it is getting the new Avatar, originUserId: ${originUserId}`);

      } catch (e) {
        // 多次观察发现：会出现这个错误可能是因为本地网络问题，或是 本地ip请求过多而被 server block之类的导致的
        // 很多出现该错误的 avatar url 二次访问会返回200并没有问题

        // 还会出现一类问题：id已经更换了，但他的头像却可以head 200，这个就不好办了
        // 还是说再增加一种手段， 请求 战绩网站api 来多一次判断
        console.log(`
        destructure err response ERROR: ${e}
        the axios head response ERROR: ${err}
        the avatarUrl: ${avatarUrl}
        the originUserId: ${originUserId}
        `)
      }
    });
}



const arr = [];
['bf1', 'bfv'].forEach(element => {
  arr.push(g(element))
});


Promise.all(arr).then(() => {
  console.log('all done...')
})

// promise
async function g(game) {
  let re;
  try {
    re = await axios.get(`${baseUrlApi}/cheaters/?game=${game}&status=100&cd=&ud=&limit=${limit}&sort=updateDatetime&tz=Asia%2FShanghai`)
  } catch(e) {
    console.log(`axios get ${game} list Error: ${e}`);
  }

  try {
    const { data: { data } } = re;

    for (let el of data) {
      const { originUserId, avatarLink } = el;
      console.log(originUserId)

      await doUpdate({
        avatarUrl: avatarLink,
        originUserId,
      });

      await sleep(Math.ceil(Math.random() * 100))
    }
  } catch(err) {
    console.log(err)
  }

    // data.forEach(async (el) => {
    //   const { originUserId, avatarLink } = el;

    //   await doUpdate({
    //     avatarUrl: avatarLink,
    //     originUserId,
    //   });
    // });

}

<template>
  <div class="content">
      <Divider>{{$t("home.bulletin.title")}}</Divider>

      <div class="md" v-html="data"></div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: marked(`
**网站开发**: [mygoare](https://mygoare.com)
**BFBAN APP下载**: [cabbagelol](https://app.bfban.com/public/www/)
**JapaneseContributor**: [RiseJack](https://www.youtube.com/channel/UCptnZeaSNaurVVy9UMWzI6w)  **EnglishContributor**: [___4Tr1](https://live.bilibili.com/591314)  **DomainCost**: [【NFZ】BoomNextDoor](https://space.bilibili.com/131470523)
**战地1私服网页管理工具**: [mygoare](http://ec2-18-163-101-35.ap-east-1.compute.amazonaws.com:4000/#/)
        `, {breaks: true, gfm: true, smartLists: true})
      }
    }
  }
</script>

<style lang="scss">
  .md {
    ul {
      margin-left: 1rem;
    }
    p {
      margin: .4rem 0;
    }
  }
</style>

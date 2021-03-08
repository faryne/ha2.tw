<template>
  <div>
<!--    <h4>{{vtuber.snippet.title}}</h4>-->
<!--    <img :src="vtuber.snippet.thumbnails.medium.url" :alt="vtuber.snippet.title" />-->
<!--    <div>Subscribers: {{vtuber.statistics.subscriberCount | numberFormat}}</div>-->
<!--    <div>Videos: {{vtuber.statistics.videoCount | numberFormat}}</div>-->
<!--    <div>View Counts: {{vtuber.statistics.viewCount | numberFormat}}</div>-->
<!--    <div>Debut Date: {{vtuber.snippet.publishedAt}}</div>-->
    <div id="lives" v-if="lives.length > 0">
      <div class="live" v-for="live in lives" :key="live.video_id">
        <img :src="live.info.snippet.thumbnails.default.url" :alt="live.info.snippet.title" :title="live.info.snippet.title"/>
        <article>{{live.info.snippet.description}}</article>
        <time>{{live.started_at}}</time>
        <time>{{live.published_at}}</time>
      </div>
    </div>
    <div v-else>
      沒有直播資訊
    </div>
  </div>
</template>

<script>
import http from "@/assets/js/http";
import int from "@/filters/integer"
import string from "@/filters/string";
export default {
  name: "vtuber",
  created() {
    this.getVtuber()
  },
  filters: {
    numberFormat: int.format,
    renderHTML: string.renderHTML
  },
  data() {
    return {
      vtuber: {},
      lives: [],
    }
  },
  methods: {
    async getVtuber () {
      let vtuber_id = this.$route.params['id'];
      console.log(vtuber_id);
      let data = await http.get('/api/opendata/vtubers/yt/' + vtuber_id);
      // this.vtuber = data.response.info;
      this.lives = data.response.lives;
      console.log(this.lives);
    }
  }
}
</script>

<style scoped>
.live {
  clear: none;
  float: left;
  width: 100px;
  margin: 10px;
}
</style>
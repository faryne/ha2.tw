<template>
  <div>
    <div v-for="vtuber in vtubers" :key="vtuber.etag">
      <!-- name -->
      <dl class="vtuber-simple">
        <dt class="vtuber-channel-images">
          <img :src="vtuber.snippet.thumbnails.default.url" />
        </dt>
        <dd class="vtuber-channel-name">{{vtuber.snippet.title}}</dd>
        <dd>Subscribers: {{vtuber.statistics.subscriberCount | returnInteger}}</dd>
        <dd>Videos: {{vtuber.statistics.videoCount | returnInteger}}</dd>
        <dd>View Counts: {{vtuber.statistics.viewCount | returnInteger}}</dd>
        <dd>Debut Date: {{vtuber.snippet.publishedAt}}</dd>
      </dl>
    </div>
  </div>
</template>

<script>
import http from "@/assets/js/http";

export default {
  name: "index",
  data(){
    return {
      vtubers: []
    }
  },
  filters: {
    returnInteger(str){
      let intl = new Intl.NumberFormat(navigator.language)
      return isNaN(str) ? 0 : intl.format(parseInt(str, 10));
    },
    getYoutubeChannelId(accounts){
      for (let i in accounts) {
        if (accounts[i].platform == 'youtube') {
          return 'https://www.youtube.com/channel/' + accounts[i].id;
        }
      }
      return '';
    },
  },
  created() {
    this.getVtubers();
  },
  methods: {
    async getVtubers() {
      let data = await http.get('https://faryne.dev/hololive.json');
      data.sort((vtuber1, vtuber2) => {
        return parseInt(vtuber1.statistics.subscriberCount, 10) >= parseInt(vtuber2.statistics.subscriberCount, 10)
      });
      this.vtubers = data;
      console.log(data)
    },
  }
}
</script>

<style scoped>
.vtuber-simple {
  width: 300px;
  float: left;
  clear: none;
}
</style>
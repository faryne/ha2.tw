<template>
  <div>
    <div v-if="lives.length > 0">
      <b-card
          v-for="live in lives" :key="live.video_id"
          style="max-width: 240px; margin: 10px; float: left;"
      >
        <b-link target="_blank" @click.prevent="playVideo(live.video_id)">
          <b-card-img top :src="live.info.snippet.thumbnails.medium.url" :title="live.info.snippet.title" :alt="live.info.snippet.title"></b-card-img>
        </b-link>
        <b-card-text>{{live.info.snippet.description|returnLimitWords(0, 100)}}</b-card-text>
        <template #footer>
          <i class="fa fa-calendar">{{live.started_at|returnLocalDate}}</i><br/>
          <i v-if="days < 0 && typeof live.info.liveStreamingDetails != 'undefined'" class="fa fa-calendar-check-o">{{live.info.liveStreamingDetails.actualStartTime|returnLocalDate}}</i><br/>
          <i v-if="days < 0 && typeof live.info.liveStreamingDetails != 'undefined'" class="fa fa-calendar-times-o">{{live.info.liveStreamingDetails.actualEndTime|returnLocalDate}}</i>
        </template>
      </b-card>
    </div>
    <b-card v-else>
      沒有直播資訊
    </b-card>

    <b-modal id="playVideo" size="lg" centered static>
      <video-embed :src="'https://youtube.com/embed/' + video_id"></video-embed>
    </b-modal>
  </div>
</template>

<script>
import string from "@/filters/string";
import date from "@/filters/date";


export default {
  name: "lives",
  filters: {
    returnLimitWords: string.returnLimitWords,
    returnLocalDate: date.returnLocalDate,
  },
  components: {
  },
  methods: {
    async playVideo($video_id){
      this.video_id = $video_id;
      this.$bvModal.show("playVideo");
    }
  },
  data(){
    return {
      video_id: "",
    }
  },
  async mounted() {
  },
  props: {
    lives: {
      required: true,
    },
    days: {
      required: true,
      type: Number
    }
  }
};
</script>

<style scoped>

</style>
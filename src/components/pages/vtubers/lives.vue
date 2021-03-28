<template>
  <b-overlay :show="videos_show == false">
    <div v-if="lives.length > 0">
      <b-media v-for="live in lives" :key="live.video_id">
        <template #aside>
          <b-link target="_blank" :href="'https://youtu.be/' + live.video_id">
            <b-img rounded  :src="live.info.snippet.thumbnails.default.url" :alt="live.info.snippet.title" :title="live.info.snippet.title"/>
          </b-link>
        </template>
        <h5 class="mt-0">
          <b-link target="_blank" :href="'https://youtu.be/' + live.video_id">
            {{live.info.snippet.title}}
          </b-link>
        </h5>
        <p>
          <i class="fa fa-calendar">{{live.started_at|returnLocalDate}}</i><br/>
          <span v-if="days < 0 && typeof live.info.liveStreamingDetails != 'undefined'">
            <i class="fa fa-calendar-check-o">{{live.info.liveStreamingDetails.actualStartTime|returnLocalDate}}</i><br/>
          </span>
          <span v-if="days < 0 && typeof live.info.liveStreamingDetails != 'undefined'">
            <i class="fa fa-calendar-times-o">{{live.info.liveStreamingDetails.actualEndTime|returnLocalDate}}</i>
          </span>
        </p>
        <p>{{live.info.snippet.description|returnLimitWords(0, 100)}}</p>
      </b-media>
    </div>
    <b-card v-else>
      沒有直播資訊
    </b-card>
  </b-overlay>
</template>

<script>
import http from "@/assets/js/http";
import string from "@/filters/string";
import date from "@/filters/date";

export default {
  name: "lives",
  data() {
    return {
      videos_show: false,
      lives: [],
      channelId: this.channel_id,
    };
  },
  filters: {
    returnLimitWords: string.returnLimitWords,
    returnLocalDate: date.returnLocalDate,
  },
  async mounted() {
    await this.getVideos();
  },
  methods: {
    async getVideos () {
      this.videos_show = false;
      let data = await http.get('/api/opendata/vtubers/yt/' + this.channelId + "/" + this.days);
      this.lives = data.response.lives;
      this.videos_show = true;
    }
  },
  props: {
    channel_id: {
      required: true,
      type: String,
    },
    days: {
      required: true,
      type: Number,
    }
  }
};
</script>

<style scoped>

</style>
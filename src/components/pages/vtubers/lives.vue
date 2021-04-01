<template>
  <div>
    <div v-if="lives.length > 0">
      <b-card-group deck style="margin-top: 20px">
        <b-card
            v-for="live in lives" :key="live.video_id"
        >
          <b-link target="_blank" :href="'https://youtu.be/' + live.video_id">
            <b-card-img top :src="live.info.snippet.thumbnails.medium.url"></b-card-img>
            <b-card-title>{{live.info.snippet.title}}</b-card-title>
          </b-link>
          <b-card-text>{{live.info.snippet.description|returnLimitWords(0, 100)}}</b-card-text>
          <template #footer>
            <i class="fa fa-calendar">{{live.started_at|returnLocalDate}}</i><br/>
            <i v-if="days < 0 && typeof live.info.liveStreamingDetails != 'undefined'" class="fa fa-calendar-check-o">{{live.info.liveStreamingDetails.actualStartTime|returnLocalDate}}</i><br/>
            <i v-if="days < 0 && typeof live.info.liveStreamingDetails != 'undefined'" class="fa fa-calendar-times-o">{{live.info.liveStreamingDetails.actualEndTime|returnLocalDate}}</i>
          </template>
        </b-card>
      </b-card-group>
    </div>
    <b-card v-else>
      沒有直播資訊
    </b-card>
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
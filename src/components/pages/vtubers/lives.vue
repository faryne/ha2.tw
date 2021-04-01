<template>
  <div>
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
    }
  }
};
</script>

<style scoped>

</style>
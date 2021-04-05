<template>
  <div>
    <b-link target="_blank" :href="'https://youtube.com/channel/' + vtuber.id">
      <b-img rounded :src="vtuber.snippet.thumbnails.medium.url"/>
    </b-link>
    <dl>
      <dt>
        <b-link target="_blank" :href="'https://youtube.com/channel/' + vtuber.id">
          {{vtuber.snippet.title}}
        </b-link>
      </dt>
      <dd>Subscriptions: {{vtuber.statistics.subscriberCount|numberFormat}}</dd>
      <dd>Video Counts: {{vtuber.statistics.videoCount|numberFormat}}</dd>
      <dd>View Counts: {{vtuber.statistics.viewCount|numberFormat}}</dd>
      <dd>
        <b-link target="_blank" :href="'https://youtube.com/channel/' + vtuber.id">
          <i class="fa fa-youtube" aria-hidden="true"></i>
        </b-link>
        <b-link target="_blank" :href="
              'https://calendar.google.com/calendar/embed?src=' + encodeURIComponent(calendar_id) +
              '&amp;ctz=' + Intl.DateTimeFormat().resolvedOptions().timeZone">
          <i class="fa fa-calendar" aria-hidden="true"></i>
        </b-link>
      </dd>
    </dl>
  </div>
</template>

<script>
import int from "@/filters/integer"
export default {
  name: "vtuber",
  filters: {
    numberFormat: int.format,
  },
  props: {
    vtuber: {
      required: true,
      type: Object,
    },
    calendar_id: {
      required: true
    }
  }
}
</script>

<style scoped>
.vtuber-simple {
  width: 300px;
  float: left;
  clear: none;
}
.vtuber-avatar {
  margin: 5px;
}
.fa:first-child {
  font-size: 35px;
  margin-left: 0;
}
.fa:last-child {
  font-size: 35px;
  margin-left: 10px;
}
.fa.fa-youtube {
  color: red;
}
.fa.fa-calendar {
  color: #3C72B5;
}
</style>
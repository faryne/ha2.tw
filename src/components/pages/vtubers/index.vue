<template>
  <b-container style="margin-top: 20px">
    <b-row v-if="vtubers.length > 0">
      <b-overlay :show="vtubers_show == false">
        <a href="#" @click.prevent="getVtuber(v.id)" v-for="(v,k) in vtubers" :key="k">
          <b-avatar v-if="v !== null" variant="primary" class="mr-3 vtuber-avatar" :title="v.snippet.title" :src="v.snippet.thumbnails.medium.url"></b-avatar>
        </a>
      </b-overlay>
    </b-row>
    <b-row style="margin-top: 50px" v-if="vtuber.id !== 'undefined'">
      <b-col md="4" lg="3">
        <b-link target="_blank" :href="vtuber.id|getYoutubeLink('channel')">
          <b-img rounded :src="vtuber.snippet.thumbnails.medium.url"/>
        </b-link>
        <dl>
          <dt>
            <b-link target="_blank" :href="vtuber.id|getYoutubeLink('channel')">{{vtuber.snippet.title}}</b-link>
          </dt>
          <dd>Subscriptions: {{vtuber.statistics.subscriberCount|numberFormat}}</dd>
          <dd>Video Counts: {{vtuber.statistics.videoCount|numberFormat}}</dd>
          <dd>View Counts: {{vtuber.statistics.viewCount|numberFormat}}</dd>
          <dd>
            <b-link target="_blank" :href="vtuber.id|getYoutubeLink('channel')">
              <i class="fa fa-youtube" aria-hidden="true"></i>
            </b-link>
            <b-link target="_blank" :href="
              'https://calendar.google.com/calendar/embed?src=' + encodeURIComponent(calendars[vtuber.id]) +
              '&amp;ctz=' + Intl.DateTimeFormat().resolvedOptions().timeZone">
              <i class="fa fa-calendar" aria-hidden="true"></i>
            </b-link>
          </dd>
        </dl>

      </b-col>
      <b-col md="8" lg="9">
        <b-tabs align="center">
          <b-tab active title="即將開始">
            <vtuber-lives :channel_id="vtuber.id" :days="7" ref="upcoming_lives"></vtuber-lives>
          </b-tab>
          <b-tab title="已結束">
            <vtuber-lives :channel_id="vtuber.id" :days="-7" ref="ended_lives"></vtuber-lives>
          </b-tab>
          <b-tab title="直播時刻表">
            <calendar :calendar_id="calendars[vtuber.id]"></calendar>
          </b-tab>
        </b-tabs>
      </b-col>

    </b-row>
  </b-container>
</template>

<script>
import http from "@/assets/js/http";
import int from "@/filters/integer";
import string from "@/filters/string";
import date from "@/filters/date";
import VtuberLives from "@/components/pages/vtubers/lives";
import Calendar from "@/components/elements/Calendar";
import axios from "axios";
export default {
  name: "index",
  data(){
    return {
      vtuber: {},
      vtubers: [],
      lives: [],
      vtubers_show: false,
      videos_show: false,
      calendars: {},
    }
  },
  components: {
    VtuberLives,
    Calendar
  },
  filters: {
    numberFormat: int.format,
    returnLimitWords: string.returnLimitWords,
    returnLocalDate: date.returnLocalDate,
    getYoutubeLink($id, $type){
      switch ($type) {
        case 'video':
          return 'https://www.youtube.com/watch/' + $id;
        case 'channel':
        default:
          return 'https://www.youtube.com/channel/' + $id;
      }
    }
  },
  async created() {
    await this.getVtubers();
    await this.getCalendars();
  },
  methods: {
    async getCalendars(){
      let req = axios.get("/calendars.json");
      let resp = await req.then( obj => {
        return obj;
      });

      // return resp.data;
      this.calendars = resp.data;
    },
    async getVtubers() {
      this.vtubers_show = false;
      let data = await http.get('https://faryne.dev/hololive.json');
      this.vtubers = data;
      this.vtubers_show = true;
      this.vtuber = data[0];
    },
    async getVtuber($ytId){
      for (let i in this.vtubers) {
        if (this.vtubers[i].id == $ytId) {
          this.vtuber = this.vtubers[i];
          break;
        }
      }
      console.log(this.vtuber.id);
      this.$refs.upcoming_lives.channelId = this.vtuber.id;
      this.$refs.upcoming_lives.getVideos();
      this.$refs.ended_lives.channelId = this.vtuber.id;
      this.$refs.ended_lives.getVideos();
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
.vtuber-avatar {
  margin: 5px;
}
.fa {
  font-size: 35px;
}
.fa:first-child {
  margin-left: 0;
}
.fa:last-child {
  margin-left: 10px;
}
.fa.fa-youtube {
  color: red;
}
.fa.fa-calendar {
  color: #3C72B5;
}
</style>
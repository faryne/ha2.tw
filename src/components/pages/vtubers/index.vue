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
        <b-overlay :show="videos_show == false">
          <div v-if="lives.length > 0">
            <b-media v-for="live in lives" :key="live.video_id">
              <template #aside>
                <b-link target="_blank" :href="live.video_id|getYoutubeLink('video')">
                  <b-img rounded  :src="live.info.snippet.thumbnails.default.url" :alt="live.info.snippet.title" :title="live.info.snippet.title"/>
                </b-link>
              </template>
              <h5 class="mt-0">
                <b-link target="_blank" :href="live.video_id|getYoutubeLink('video')">
                  {{live.info.snippet.title}}
                </b-link>
                {{live.started_at|returnLocalDate}}
              </h5>
              <p>{{live.info.snippet.description|returnLimitWords(0, 100)}}</p>
            </b-media>
          </div>
          <b-card v-else>
            沒有直播資訊
          </b-card>
        </b-overlay>
      </b-col>

    </b-row>
  </b-container>
</template>

<script>
import http from "@/assets/js/http";
import int from "@/filters/integer";
import string from "@/filters/string";
import date from "@/filters/date";
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
    await this.getVideos();
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
      await this.getVideos();
    },
    async getVideos () {
      this.videos_show = false;
      let vtuber_id = this.vtuber.id;
      let data = await http.get('/api/opendata/vtubers/yt/' + vtuber_id);
      this.lives = data.response.lives;
      this.videos_show = true;
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
.fa {
  color: red;
  font-size: 35px;
}
.fa:first-child {
  margin-left: 0;
}
.fa:last-child {
  margin-left: 10px;
}
</style>
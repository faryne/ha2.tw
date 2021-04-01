<template>
  <b-container fluid style="margin-top: 20px">
    <b-row v-if="vtubers.length > 0">
      <b-overlay :show="vtubers_show == false">
        <a href="#" @click.prevent="getVtuber(v.id)" v-for="(v,k) in vtubers" :key="k">
          <b-avatar v-if="v !== null" variant="primary" class="mr-3 vtuber-avatar" :title="v.snippet.title" :src="v.snippet.thumbnails.medium.url"></b-avatar>
        </a>
      </b-overlay>
    </b-row>
    <b-row style="margin-top: 50px" v-if="vtuber.id !== 'undefined'">
      <b-col md="3" lg="2">
        <b-overlay :show="videos_show == false">
          <vtuber :calendar_id="calendars[vtuber.id]" :vtuber="vtuber"></vtuber>
        </b-overlay>
      </b-col>

      <b-col md="9" lg="10">
        <b-overlay :show="videos_show == false">
          <b-tabs align="center" style="height: 600px ">
            <b-tab active title="即將開始">
              <vtuber-lives :lives="lives" :days="7" ref="upcoming_lives"></vtuber-lives>
            </b-tab>
            <b-tab title="已結束">
              <vtuber-lives :lives="ended_lives" :days="-7" ref="ended_lives"></vtuber-lives>
            </b-tab>
            <b-tab title="統計">
              <b-table striped hover :items="stats"></b-table>
            </b-tab>
            <b-tab title="直播時刻表">
              <calendar :calendar_id="calendars[vtuber.id]"></calendar>
            </b-tab>
          </b-tabs>
        </b-overlay>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/assets/js/http";
import Vtuber from "@/components/pages/vtubers/vtuber";
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
      ended_lives: [],
      stats: [],
      calendars: {},
      vtubers_show: false,
      videos_show: false,
    }
  },
  components: {
    VtuberLives,
    Calendar,
    Vtuber
  },
  async mounted() {
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
      this.getVtuber(data[0].id);
      this.vtubers_show = true;
    },
    async getVtuber($ytId){
      for (let i in this.vtubers) {
        if (this.vtubers[i].id == $ytId) {
          this.vtuber = this.vtubers[i];
          break;
        }
      }
      this.videos_show = false;
      let data = await http.get('/api/opendata/vtubers/yt/' + this.vtuber.id);
      this.stats = data.response.stats;
      this.lives = data.response.lives;
      this.ended_lives = data.response.ended_lives;
      this.videos_show = true;
    }
  }
}
</script>

<style scoped>

</style>
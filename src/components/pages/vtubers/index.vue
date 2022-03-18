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
          <b-tabs align="center" style="">
            <b-tab active title="即將開始">
              <vtuber-lives :lives="lives" :days="7" ref="upcoming_lives"></vtuber-lives>
            </b-tab>
            <b-tab title="已結束">
              <vtuber-lives :lives="ended_lives" :days="-7" ref="ended_lives"></vtuber-lives>
            </b-tab>
            <b-tab title="統計">
<!--              <b-table striped hover :items="stats"></b-table>-->
              <b-row>
                <b-col md="6">
                  <g-chart type="LineChart" :data="data1" :options="chartOptions1"></g-chart>
                </b-col>
                <b-col md="6">
                  <g-chart type="LineChart" :data="data2" :options="chartOptions2"></g-chart>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                  <g-chart type="LineChart" :data="data3" :options="chartOptions3"></g-chart>
                </b-col>
                <b-col md="6">
                  <g-chart type="ColumnChart" :data="data4" :options="chartOptions4"></g-chart>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab title="直播時刻表">
              <calendar :calendar_id="calendars[vtuber.id].id"></calendar>
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
import { GChart } from 'vue-google-charts';
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
      live_times: [],
      vtubers_show: false,
      videos_show: false,
    }
  },
  computed: {
    data1: function(){
      let data = [
          ["時間", "訂閱數"]
      ];
      for (let i in this.stats) {
        data.push([this.stats[i].record_dt, this.stats[i].subscriberCount])
      }
      return data;
    },
    data2: function(){
      let data = [
        ["時間", "觀看數"]
      ];
      for (let i in this.stats) {
        data.push([this.stats[i].record_dt, this.stats[i].viewCount])
      }
      return data;
    },
    data3: function(){
      let data = [
        ["時間", "影片數"]
      ];
      for (let i in this.stats) {
        data.push([this.stats[i].record_dt, this.stats[i].videoCount])
      }
      return data;
    },
    data4: function(){
      let data = [
        ["日期", "直播時間長度"]
      ];
      for (let i in this.live_times) {
        data.push([this.live_times[i].d, parseInt(this.live_times[i].time, 10)])
      }
      return data;
    },
    chartOptions1: function(){
      return {
        title: "訂閱數成長趨勢",
      }
    },
    chartOptions2: function(){
      return {
        title: "觀看數成長趨勢"
      }
    },
    chartOptions3: function(){
      return {
        title: "影片數成長趨勢"
      }
    },
    chartOptions4: function(){
      return {
        title: "每日直播時間（單位：秒）"
      }
    }
  },
  components: {
    VtuberLives,
    Calendar,
    Vtuber,
    GChart
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
      this.live_times = data.response.time;
      this.videos_show = true;
    }
  }
}
</script>

<style scoped>

</style>
<template>
<div>
  <b-row>
    <b-col sm="3" lg="3" md="3">
      <b-form-input placeholder="輸入關鍵字以過濾要查詢的指標" v-model="myfilter"></b-form-input>
      <b-list-group>
        <b-list-group-item v-for="(v,k) in metrics" :key="k" :class="{HideMetric: !showMetric(v)}">
          <b-link @click.prevent="getData(v)">{{v}}</b-link>
        </b-list-group-item>
      </b-list-group>
    </b-col>
    <b-col sm="9" lg="9" md="9">
      <table class="table" v-if="data != null" style="overflow: scroll">
        <thead>
          <tr>
            <th colspan="25">
              指標名稱：{{metricName}}<br/>
              指標定義：{{metricDefinition}}<br/>
              單位：{{metricUnit}}<br/>
              <b-link :href='baseUrl + "/" + metricName + ".json"'>JSON</b-link>
            </th>
          </tr>
          <tr>
            <th>民國年度</th>
            <th>總計</th>
            <th>臺灣地區</th>
            <th>新北市</th>
            <th>臺北市</th>
            <th>桃園市</th>
            <th>臺中市</th>
            <th>臺南市</th>
            <th>高雄市</th>
            <th>宜蘭縣</th>
            <th>新竹縣</th>
            <th>苗栗縣</th>
            <th>彰化縣</th>
            <th>南投縣</th>
            <th>雲林縣</th>
            <th>嘉義縣</th>
            <th>屏東縣</th>
            <th>臺東縣</th>
            <th>花蓮縣</th>
            <th>澎湖縣</th>
            <th>基隆市</th>
            <th>新竹市</th>
            <th>嘉義市</th>
            <th>金門縣</th>
            <th>連江縣</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(d,k) in data" :key="k">
            <td>{{d.ByYear}}</td>
            <td>{{d.Total}}</td>
            <td>{{d.Taiwan}}</td>
            <td>{{d.NewTaipei}}</td>
            <td>{{d.Taipei}}</td>
            <td>{{d.Taoyuan}}</td>
            <td>{{d.Taichung}}</td>
            <td>{{d.Tainan}}</td>
            <td>{{d.Kaohsiung}}</td>
            <td>{{d.Ilan}}</td>
            <td>{{d.HsinchuCounty}}</td>
            <td>{{d.Miaoli}}</td>
            <td>{{d.Changhwa}}</td>
            <td>{{d.Nantou}}</td>
            <td>{{d.Yunlin}}</td>
            <td>{{d.ChiaYiCounty}}</td>
            <td>{{d.Pingtung}}</td>
            <td>{{d.Taitung}}</td>
            <td>{{d.Hualien}}</td>
            <td>{{d.Penghu}}</td>
            <td>{{d.Keelung}}</td>
            <td>{{d.HsinchuCity}}</td>
            <td>{{d.ChiaYiCity}}</td>
            <td>{{d.Kinmen}}</td>
            <td>{{d.Matsu}}</td>
          </tr>
        </tbody>
      </table>
    </b-col>
  </b-row>
</div>
</template>

<style type="text/css">
.HideMetric {
  display: none;
}
</style>

<script charset="UTF-8">
import axios from "axios";
const BaseUrl = "https://raw.githubusercontent.com/faryne/tw-stats/master/docs";
export default {
  name: "index",
  data() {
    return {
      metrics: [],
      data: null,
      metricName: null,
      metricUnit: null,
      metricDefinition: null,
      myfilter: "",
      baseUrl: BaseUrl
    };
  },
  async mounted() {
    let req = axios.get(BaseUrl + "/index.json");
    let resp = await req.then( obj => {
      return obj;
    });
    this.metrics = resp.data;
  },
  methods: {
    showMetric(target) {
      if (this.myfilter == "") {
        return true;
      }
      let r = new RegExp(this.myfilter);
      if (target.search(r) >= 0) {
        return true;
      }
      return false;
    },
    // 取得該指標下的所有年份資料
    async getData(target){
      let req = axios.get(BaseUrl + "/" + target + "/index.json");
      let resp = await req.then( obj => {
        return obj;
      });
      this.data = resp.data;
      for (let v in this.data) {
        this.metricDefinition = this.data[v].Explain;
        this.metricName = this.data[v].Name;
        this.metricUnit = this.data[v].Unit
        break;
      }
    }
  }
}
</script>

<style scoped>

</style>
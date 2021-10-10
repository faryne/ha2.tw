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
            <th v-for="city in cities" :key="city">{{city}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(d,k) in data" :key="k">
            <td>{{d.ByYear}}</td>
            <td>{{d.Total}}</td>
            <td>{{d.Taiwan}}</td>
            <td v-for="(city,k) in cities" :key="city">{{d[k]}}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="data != null">
        <g-chart style="height:200px" type="LineChart" :data="tableData" :options="tableOption"></g-chart>
      </div>
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
import { GChart } from 'vue-google-charts';
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
      baseUrl: BaseUrl,
      cities: {
        "NewTaipei": "新北市",
        "Taipei": "臺北市",
        "Taoyuan": "桃園市",
        "Taichung": "臺中市",
        "Tainan": "臺南市",
        "Kaohsiung": "高雄市",
        "Ilan": "宜蘭縣",
        "HsinchuCounty": "新竹縣",
        "Miaoli": "苗栗縣",
        "Changhwa": "彰化縣",
        "Nantou": "南投縣",
        "Yunlin": "雲林縣",
        "ChiaYiCounty": "嘉義縣",
        "Pingtung": "屏東縣",
        "Taitung": "臺東縣",
        "Hualien": "花蓮縣",
        "Penghu": "澎湖縣",
        "Keelung": "基隆市",
        "HsinchuCity": "新竹市",
        "ChiaYiCity": "嘉義市",
        "Kinmen": "金門縣",
        "Matsu": "連江縣"
      },
    };
  },
  computed: {
    tableOption: function() {
      return {
        title: this.metricName,
      }
    },
    tableData: function(){
      let obj = [];
      if (this.data != null) {
        let header = ["年度"];
        for (let i in this.cities) {
          header.push(this.cities[i]);
        }
        obj.push(header);
        for (let i in this.data) {
          let tmp = [i];
          for (let k in this.cities) {
            let v = 0;
            if (parseFloat(this.data[i][k], 10) != isNaN) {
              v = parseFloat(this.data[i][k], 10);
            }
            tmp.push(v);
          }
          obj.push(tmp);
        }
        console.log(obj);
      }

      console.log(obj);
      return obj;
    }
  },
  async mounted() {
    let req = axios.get(BaseUrl + "/index.json");
    let resp = await req.then( obj => {
      return obj;
    });
    this.metrics = resp.data;
  },
  components:{
    GChart
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
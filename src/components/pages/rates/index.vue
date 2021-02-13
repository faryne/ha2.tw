<template>
  <div>
    <div class="col-md-3">
      <form class="form">
        <div class="form-group">
          <label>匯率日期</label>
          <div class="input-group">
            <input type="date" class="form-control" v-model="begin_date">
            <span class="input-group-addon">～</span>
            <input type="date" class="form-control" v-model="end_date">
          </div>
        </div>
<!--        <div class="form-group">-->
<!--          <label>貨幣</label>-->
<!--          <select class="form-control">-->
<!--            <option value="">全部</option>-->
<!--            <option v-for="(v, k) in currencies" :value="k" :key="v">{{v}} - {{k}}</option>-->
<!--          </select>-->
<!--        </div>-->
<!--        <div class="form-group">-->
<!--          <label>銀行</label>-->
<!--          <select class="form-control">-->
<!--            <option value="">全部</option>-->
<!--            <option v-for="(v,k) in banks" :value="k" :key="k">{{v}}</option>-->
<!--          </select>-->
<!--        </div>-->

<!--        <div class="radio">-->
<!--          <label><input type="radio" class="" />資料表</label>-->
<!--          <label><input type="radio" class="" />走勢圖</label>-->
<!--        </div>-->

        <button type="button" class="btn btn-primary" @click="getByDateRange">搜尋</button>
      </form>
    </div>
    <div class="col-md-9">
      <div v-for="(service, d) in rates" :key="d">
        <h4>{{d}}</h4>
        <div v-for="(raw, to) in service" :key="d + ':' +raw +':' + to" class="bank">
          <h5>{{banks[to]}}</h5>
          <div style="display: table">
            <sub-currency v-for="base in raw.TWD" :key="d + ':' +raw +':' + to + ':' + base.base" :currency="base"></sub-currency>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/assets/js/http";
// import MainCurrency from "@/components/pages/rates/MainCurrency";
import SubCurrency from "@/components/pages/rates/SubCurrency";

let dateFormat = require("dateformat")
const d1 = dateFormat(new Date(), "yyyy-mm-dd")

export default {
  name: "index",
  mounted() {
    this.getLatest();
  },
  components: { SubCurrency },
  data(){
    return {
      rates: {},
      banks: {
        "Mega": "兆豐銀行",
        "BOT": "台灣銀行",
        "esun": "玉山銀行"
      },
      currencies: {
        "AUD": "澳元",
        "CAD": "加元",
        "CHF": "瑞士法郎",
        "CNY": "人民幣",
        "EUR": "歐元",
        "GBP": "英鎊",
        "HKD": "港元",
        "IDR": "印尼盧布",
        "JPY": "日圓",
        "KRW": "韓元",
        "MOP": "澳門元",
        "MXN": "墨西哥披索",
        "MYR": "馬來西亞令吉",
        "NZD": "紐元",
        "PHP": "菲律賓披索",
        "SEK": "瑞典克朗",
        "SGD": "新加坡元",
        "THB": "泰銖",
        "USD": "美元",
        "VND": "越南盾",
        "ZAR": "南非幣",
      },
      begin_date: d1.toString(),
      end_date: d1.toString()
    };
  },
  methods: {
    async getLatest(){
      let req = await http.get("/api/opendata/rates?begin_date=" + d1);
      this.rates = req.response.rates;
    },
    async getByDateRange() {
      let params = [];
      if (this.begin_date != null) {
        params.push('begin_date=' + this.begin_date)
      }
      if (this.end_date != null) {
        params.push('end_date=' + this.end_date)
      }
      let url = "/api/opendata/rates";
      if (params.length > 0) {
        url += "?" + params.join("&");
      }

      let req = await http.get(url)
      this.rates = req.response.rates;
    }
  }

}
</script>

<style scoped>
/*.bank {*/
/*  width: 200px;*/
/*  float:left;*/
/*}*/
</style>
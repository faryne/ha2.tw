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
        <div class="form-group">
          <label>貨幣</label>
          <select class="form-control" v-model="cur" multiple>
            <option selected v-for="(v, k) in currencies" :value="k" :key="v">{{v}} - {{k}}</option>
          </select>
        </div>

<!--        <div class="radio">-->
<!--          <label><input type="radio" class="" />資料表</label>-->
<!--          <label><input type="radio" class="" />走勢圖</label>-->
<!--        </div>-->

        <button type="button" class="btn btn-primary" @click="getByDateRange">搜尋</button>
      </form>
    </div>
    <div class="col-md-9">
      <div v-for="(c1, k1) in rates" :key="k1">
        <sub-currency :currency="k1" :rawdata="c1"></sub-currency>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/assets/js/http";
// import MainCurrency from "@/components/pages/rates/MainCurrency";
import SubCurrency from "@/components/pages/rates/SubCurrency";
import currency from "@/assets/js/currency";

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
      begin_date: d1.toString(),
      end_date: d1.toString(),
      cur: [],
      banks: currency.banks,
      currencies: currency.currencies
    };
  },
  methods: {
    async getLatest(){
      let req = await http.get("/api/opendata/rates/v2?begin_date=" + d1);
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
      if (this.cur.length > 0) {
        for (let i in this.cur) {
          params.push('currencies[]=' + this.cur[i]);
        }
      }
      let url = "/api/opendata/rates/v2";
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
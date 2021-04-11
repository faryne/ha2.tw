<template>
  <b-row>
    <b-col md="3">
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
        <button type="button" class="btn btn-primary" @click="getByDateRange">
          <i class="fa fa-search-dollar">搜尋</i>
        </button>
      </form>
    </b-col>
    <b-col md="9">
      <b-overlay :show="show">
        <b-tabs>
          <b-tab v-for="(c1, k1) in rates" :key="k1" :title="k1|getCurrencyName">
            <sub-currency :currency="k1" :rawdata="c1" :show_type="show_type"></sub-currency>
          </b-tab>
        </b-tabs>
      </b-overlay>
    </b-col>
  </b-row>
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
      currencies: currency.currencies,
      show: true,
      show_type: 'table'
    };
  },
  filters: {
    getCurrencyName: function($obj){
      return currency.currencies[$obj];
    }
  },
  methods: {
    async getLatest(){
      this.show = true;
      let req = await http.get("/api/opendata/rates/v2?begin_date=" + d1);
      this.rates = req.response.rates;
      this.show = false;
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

      this.show = true;
      let req = await http.get(url)
      this.rates = req.response.rates;
      this.show = false;
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
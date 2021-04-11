<template>
  <div class="currrency-item"  style="margin-top:10px">
    <b-tabs vertical pills>
      <b-tab v-for="(data,key) in rawdata" :key="'a' + key" :title="key|getBankName">
        <b-row>
          <b-col md="6">
            <b-table
                striped hover :items="data"
                :fields="[
                  {
                    key: 'record_date',
                    label: '日期'
                  },
                  {
                    key: 'buy_rate',
                    label: '買入價',
                    sortable: true
                  },
                  {
                    key: 'sell_rate',
                    label: '賣出價',
                    sortable: true
                  }
              ]"
            >
            </b-table>
          </b-col>
          <b-col md="6">
            <g-chart style="width:100%" type="LineChart" :data="data|singleBankRate" :options="{title: '曲線圖'}"></g-chart>
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import currency from "@/assets/js/currency";
import { GChart } from 'vue-google-charts';

export default {
  name: "SubCurrency",
  filters: {
    getBankName: function($obj){
      return currency.banks[$obj];
    },
    singleBankRate(input){
      let data = [
          ["日期", "買入價", "賣出價"]
      ];

      for (let i in input) {
        data.push([
            input[i].record_date,
            input[i].buy_rate,
            input[i].sell_rate
        ])
      }

      return data;
    },
  },
  components: {
    GChart
  },
  computed: {
  },
  props: {
    currency: {
      type: String,
      required: true
    },
    rawdata: {
      type: Object,
      required: true
    },
    show_type: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div class="currrency-item">
    <b-card-group deck v-if="show_type=='table'">
      <b-card v-for="(data,key) in rawdata" :key="key">
        <b-card-title align="center">{{key|getBankName}}</b-card-title>
        <b-card-body>
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
        </b-card-body>
      </b-card>
    </b-card-group>
    <g-chart v-else type="LineChart" :data="rawdata" :options="{title: ''}"></g-chart>
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
    }
  },
  components: {
    GChart
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
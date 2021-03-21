<template>
  <div class="currrency-item">
    <b-card>
      <b-card-header>{{currency}}</b-card-header>
      <b-card-body>
        <div v-for="(data,key) in rawdata" :key="key">
          <h5>{{key}}</h5>
          <b-table striped hover :items="data"></b-table>
        </div>
      </b-card-body>
    </b-card>
<!--    <h4>{{currency}}</h4>-->
<!--    <div class="data-items" v-for="(d1, k1) in rawdata" :key="k1">-->
<!--      {{k1}}-->
<!--      <b-tabs>-->
<!--        <b-tab v-for="(d2, k2) in d1" :title="k2" :key="k1 + '&#45;&#45;' + k2">-->
<!--          <b-table striped hover :items="d2"></b-table>-->
<!--        </b-tab>-->
<!--      </b-tabs>-->
<!--    </div>-->

<!--    <div class="date-items">-->
<!--      <h5>{{k1}}</h5>-->
<!--      <dl>-->
<!--        <dt>{{currency}}</dt>-->
<!--        <dd v-for="(d2, k2) in d1" :key="k2">-->
<!--          {{k2}} - {{d2.buy_rate}} - {{d2.sell_rate}}-->
<!--        </dd>-->
<!--      </dl>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "SubCurrency",
  props: {
    currency: {
      type: String,
      required: true
    },
    rawdata: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
dl {
  display: table-cell;
  float: left;
  clear: none;
  padding: 3px;
  margin: 5px;
  border: 1px solid #ccc;
  width: 270px;
}
dt {
  display: table-caption;
  text-align: center;
}
dd {
  display: table;
}
</style>
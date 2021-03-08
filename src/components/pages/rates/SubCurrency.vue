<template>
  <div class="currrency-item">
    <div class="date-items" v-for="(d1, k1) in rawdata" :key="k1">
      <h5>{{k1}}</h5>
      <dl>
        <dt>{{currency}}</dt>
        <dd v-for="(d2, k2) in d1" :key="k2">
          {{k2}} - {{d2.buy_rate}} - {{d2.sell_rate}}
        </dd>
      </dl>
    </div>
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
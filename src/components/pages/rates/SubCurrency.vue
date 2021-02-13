<template>
  <dl :class="currency.base">
    <dt>{{currency.base}}</dt>
    <dd>
      <div style="display: table">
        <div style="display: table-cell; width: 120px">現金買入</div>
        <div style="display: table-cell">{{currency.buy_rate}}</div>
      </div>
    </dd>
    <dd>
      <div style="display: table">
        <div style="display: table-cell; width: 120px">現金賣出</div>
        <div style="display: table-cell">{{currency.sell_rate}}</div>
      </div>
    </dd>
  </dl>
</template>

<script>
export default {
  name: "SubCurrency",
  props: {
    currency: {
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
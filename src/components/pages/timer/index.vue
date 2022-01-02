<template>
<div>
  <b-row>
    <b-col class="timer">
      <h3>{{y1}}</h3>
      {{s.toUTCString()}}
    </b-col>
    <b-col class="timer">
      {{c.toUTCString()}}
    </b-col>
    <b-col class="timer">
      <h3>{{y2}}</h3>
      {{e.toUTCString()}}
    </b-col>
  </b-row>
  <div style="height:100px"></div>
  <b-progress max="100" animated height="50">
    <b-progress-bar :value="p" :variant="stat" show-progress>{{p}}%</b-progress-bar>
  </b-progress>
</div>
</template>

<script>
const y1 = (new Date()).getFullYear()
const y2 = y1 + 1;
export default {
  name: "index",
  data() {
    return {
      y1: y1,
      y2: y2,
      s: (new Date(y1+"-01-01")),
      e: (new Date(y2+"-01-01")),
      c: (new Date()),
    }
  },
  computed: {
    p() {
      return ((this.c.getTime() - this.s.getTime()) / (this.e.getTime() - this.s.getTime())).toFixed(8) * 100;
    },
    stat() {
      if (this.p > 0 && this.p < 33) {
        return "success";
      } else if (this.p >= 33 && this.p < 67) {
        return "warning";
      } else if (this.p >= 67 && this.p < 90) {
        return "danger";
      }
      return "dark";
    }
  },
}
</script>

<style scoped>
.timer {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}
</style>
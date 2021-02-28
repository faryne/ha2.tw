<template>
  <div>
    <h4>{{vtuber.info.Info.Items[0].snippet.title}}</h4>
  </div>
</template>

<script>
import http from "@/assets/js/http";
export default {
  name: "vtuber",
  created() {
    this.getVtuber()
  },
  data() {
    return {
      vtuber: {},
    }
  },
  methods: {
    async getVtuber () {
      let vtuber_id = this.$route.params['id'];
      console.log(vtuber_id);

      // 取得資料
      let vtuber = await http.get("/api/opendata/vtubers/v/3062d111-e8cb-578f-95b2-8564eae91503")
      console.log(vtuber.response);
      this.vtuber = vtuber.response
    }
  }
}
</script>

<style scoped>

</style>
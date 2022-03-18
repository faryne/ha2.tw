<template>
<b-container>
  <!-- 文章列表 -->
  <b-row>
    <b-list-group>
      <b-list-group-item v-for="p in pages" :key="p.title">
        <h4><a :href="p.url" target="_blank">{{p.title}}</a></h4>
        <p>{{p.description}}</p>
      </b-list-group-item>
    </b-list-group>
  </b-row>
  <b-row>
  </b-row>
</b-container>
</template>

<script>
import http from "@/assets/js/http";
export default {
  name: "index",
  data(){
    return {
      "total": 0,
      "pageUrl": "",
      "pages": [],
      "page": 1,
      "limit": 100,
    }
  },
  async mounted(){
    let result = await http.customGet("https://api.faryne.dev/telegraph/news", {page: this.page, limit: 100});
    this.pages = result.data.pages;
  }
}
</script>

<style scoped>

</style>
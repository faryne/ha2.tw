<template>
  <footer>
    <p>
      <a :href="AUTHOR_URL">{{AUTHOR_SITE}}</a> /
      <a href="http://www.faryne.tw/" target="_blank">Faryne</a>
    </p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data(){
    return {
      AUTHOR_URL: "//ha2.tw",
      AUTHOR_SITE: "ha2.tw",
    };
  }
}
</script>

<style scoped>
footer {
  margin-top:20px;
  font-size:12px;
  border-top:1px solid #ccc;
  padding:5px;
  clear: both;
}
</style>
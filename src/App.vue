<template>
  <div class="container-fluid" id="wrapper">
    <Header></Header>
    <main class="container-fluid">
      <router-view></router-view>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Vue from "vue";
import Header from "@/components/elements/Header";
import Footer from "@/components/elements/Footer";
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(VueLoading);

export default {
  name: 'App',
  components: {
    Header, Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

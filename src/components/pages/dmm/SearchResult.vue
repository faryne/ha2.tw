<template>
  <div class="row" id="dmm-video-seach">
    <div id="search-result" class="col-sm-9">
      <!--<ul id="actresses" v-if="rows.length > 0">
        <span v-if="PageType == 'video'" >
          <video-unit v-for="data in rows" :video="data" :key="data.vid"></video-unit>
        </span>
        <span v-if="PageType == 'actress'">
          <actress-unit v-for="data in rows" :actress="data" :key="data.aid"></actress-unit>
        </span>
      </ul>-->
    </div>
    <div id="search-conditions" class="col-sm-3">
      <side-bar :PageType="PageType"></side-bar>
    </div>
  </div>
</template>

<script>
// import ActressUnit from "@/components/pages/dmm/ActressUnit";
// import VideoUnit from "@/components/pages/dmm/VideoUnit";
import SideBar from "@/components/pages/dmm/SideBar";
export default {
  name: "SearchResult",
  data() {
    return {
      PageType: this.$route.name == 'dmm.videos' ? 'video' : 'actress'
    }
  },
  components: {
    // ActressUnit,
    // VideoUnit,
    SideBar
  }
}
</script>

<style scoped>

</style>
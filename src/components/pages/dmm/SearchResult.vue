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
      <div class="tab">
        <a :class="{ tablinks: true, active: PageType == 'video' }" href="/#/dmm/videos">影片搜尋</a>
        <a :class="{ tablinks: true, active: PageType == 'actress' }" href="/#/dmm/actresses">女優搜尋</a>
      </div> 
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
/* Style the tab */
.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}

/* Style the buttons that are used to open the tab content */
.tab a {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
}

/* Change background color of buttons on hover */
.tab a:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
.tab a.active {
  background-color: #ccc;
}
.display-block {
  display: block;
}
</style>
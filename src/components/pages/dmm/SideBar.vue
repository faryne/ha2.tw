<template>
  <div>
    <div class="tab">
      <router-link :class="{ tablinks: true, active: PageType == 'video' }" :to="{name: 'dmm.videos'}">影片搜尋</router-link>
      <router-link :class="{ tablinks: true, active: PageType == 'actress' }" :to="{name: 'dmm.actresses'}">女優搜尋</router-link>
    </div>
    <form class="form">
      <div class="form-group" v-if="PageType == 'video'">
        <label>發行起訖日</label>
        <div class="input-group">
          <input type="date" class="form-control">
          <span class="input-group-addon">～</span>
          <input type="date" class="form-control">
        </div>
      </div>
      <div class="form-group" v-if="PageType == 'video'">
        <label>標題</label>
        <input type="text" class="form-control">
      </div>
      <div class="form-group" v-if="PageType == 'video'">
        <label>標籤</label>
        <input type="text" class="form-control">
      </div>
      <div class="form-group" v-if="PageType == 'video'">
        <label>品牌</label>
        <input type="text" class="form-control">
      </div>
      <div class="form-group" v-if="PageType == 'video'">
        <label>出演女優</label>
        <input type="text" class="form-control">
      </div>
      <div class="form-group" v-if="PageType == 'video'">
        <label>系列</label>
        <input type="text" class="form-control">
      </div>
      <div class-="form-group" v-if="PageType == 'video'">
        <label>監督</label>
        <input type="text" class="form-control">
      </div>
      <div class="form-group" v-if="PageType == 'video'">
        <label>片長</label>
        <div class="input-group">
          <input type="number" class="form-control" min="0">
          <span class="input-group-addon">～</span>
          <input type="number" class="form-control" min="0">
        </div>
      </div>
      <div class="form-group" v-if="PageType == 'actress'">
        <label>罩杯</label>
        <input type="text" class="form-control">
      </div>
      <div class="form-group" v-if="PageType == 'actress'">
        <label>胸圍</label>
        <div class="input-group">
          <input type="number" min="0" class="form-control">
          <span class="input-group-addon">～</span>
          <input type="number" min="0" class="form-control">
        </div>
      </div>
      <div class="form-group" v-if="PageType == 'actress'">
        <label>腰圍</label>
        <div class="input-group">
          <input type="number" min="0" class="form-control">
          <span class="input-group-addon">～</span>
          <input type="number" min="0" class="form-control">
        </div>
      </div>
      <div class="form-group" v-if="PageType == 'actress'">
        <label>臀圍</label>
        <div class="input-group">
          <input type="number" min="0" class="form-control">
          <span class="input-group-addon">～</span>
          <input type="number" min="0" class="form-control">
        </div>
      </div>
      <div class="form-group" v-if="PageType == 'actress'">
        <label>身高</label>
        <div class="input-group">
          <input type="number" min="0" class="form-control">
          <span class="input-group-addon">～</span>
          <input type="number" min="0" class="form-control">
        </div>
      </div>
      <div class="form-group" v-if="PageType == 'actress'">
        <label>血型</label>
        <input type="text" class="form-control">
      </div>
      <div class="form-group" v-if="PageType == 'actress'">
        <label>出生年</label>
        <input type="number" min="0" class="form-control">
      </div>
      <div class="form-group" v-if="PageType == 'actress'">
        <label>出生月</label>
        <input type="number" min="1" max="12" class="form-control">
      </div>
      <div class="form-group" v-if="PageType == 'actress'">
        <label>出生日</label>
        <input type="number" min="1" max="31" class="form-control">
      </div>
      <div class="form-group">
        <button class="btn btn-primary" @click.stop.prevent="doSearch(false)">搜尋</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
    };
  },
  methods: {
    'getParams': function(){
      var queryString = [];
      document.querySelectorAll('.form-control').forEach(function(obj){
        var name = obj.getAttribute('name'),
            v = obj.value;
        if (v != "" && v != '----') {
          queryString.push(name + "=" + encodeURIComponent(v));
        }
        // history.pushState({}, "", location.pathname + (queryString.length > 0 ? ("#" + queryString.join("&")) : ''))
      });
      if (this.scroll_id != "") {
        queryString.push("next_token=" + encodeURIComponent(this.scroll_id));
      }
      return queryString.join("&");
    },
    'doSearch': async function(need_token){
      if (typeof need_token == "undefined" || need_token === false) {
        this.scroll_id = "";
        this.rows = new Array();
      }
      var params = this.getParams();
      var requestUrl = "";
      if (this.PageType == 'video') {
        requestUrl = this.baseUrl + "/video?" + params
      } else if (this.PageType == 'actress') {
        requestUrl = this.baseUrl + "/actress?" + params
      }


      const reqData = async () => {
        const response = await fetch(requestUrl);
        const obj = await response.json();

        return await obj;
      }

      let req = await reqData()


      this.total = req.total;
      if (req.rows.length > 0) {
        for (var i in req.rows) {
          this.rows.push(req.rows[i])
        }
      }
      this.scroll_id = req.next_token
    }
  },
  created() {
    // console.log(this.PageType)
  },
  props: {
    PageType: {
      required: true,
      default: "video"
    }
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
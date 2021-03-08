<template>
  <div>
    <form class="form">
      <div class="form-group" v-if="PageType == 'video'">
        <label>發行起訖日</label>
        <div class="input-group">
          <input type="date" class="form-control search-option" id="a">
          <span class="input-group-addon">～</span>
          <input type="date" class="form-control search-option" id="b">
        </div>
      </div>
      <div class="form-group" v-if="PageType == 'video'">
        <label>標題</label>
        <input type="text" class="form-control search-option" id="c">
      </div>
      <div class="form-group" v-if="PageType == 'video'">
        <label>標籤</label>
        <input type="text" class="form-control search-option" id="d">
      </div>
      <div class="form-group" v-if="PageType == 'video'">
        <label>品牌</label>
        <input type="text" class="form-control search-option" id="e">
      </div>
      <div class="form-group" v-if="PageType == 'video'">
        <label>出演女優</label>
        <input type="text" class="form-control search-option" id="f">
      </div>
      <div class="form-group" v-if="PageType == 'video'">
        <label>系列</label>
        <input type="text" class="form-control search-option" id="g">
      </div>
      <div class-="form-group" v-if="PageType == 'video'">
        <label>監督</label>
        <input type="text" class="form-control search-option" id="h">
      </div>
      <div class="form-group" v-if="PageType == 'video'">
        <label>片長</label>
        <div class="input-group">
          <input type="number" class="form-control search-option" min="0" id="i">
          <span class="input-group-addon">～</span>
          <input type="number" class="form-control search-option" min="0" id="j">
        </div>
      </div>
      <div class="form-group" v-if="PageType == 'actress'">
        <label>罩杯</label>
        <input type="text" class="form-control search-option" id="k">
      </div>
      <div class="form-group" v-if="PageType == 'actress'">
        <label>胸圍</label>
        <div class="input-group">
          <input type="number" min="0" class="form-control search-option" id="l">
          <span class="input-group-addon">～</span>
          <input type="number" min="0" class="form-control search-option" id="m">
        </div>
      </div>
      <div class="form-group" v-if="PageType == 'actress'">
        <label>腰圍</label>
        <div class="input-group">
          <input type="number" min="0" class="form-control search-option" id="n">
          <span class="input-group-addon">～</span>
          <input type="number" min="0" class="form-control search-option" id="o">
        </div>
      </div>
      <div class="form-group" v-if="PageType == 'actress'">
        <label>臀圍</label>
        <div class="input-group">
          <input type="number" min="0" class="form-control search-option" id="p">
          <span class="input-group-addon">～</span>
          <input type="number" min="0" class="form-control search-option" id="q">
        </div>
      </div>
      <div class="form-group" v-if="PageType == 'actress'">
        <label>身高</label>
        <div class="input-group">
          <input type="number" min="0" class="form-control search-option" id="r">
          <span class="input-group-addon">～</span>
          <input type="number" min="0" class="form-control search-option" id="s">
        </div>
      </div>
      <div class="form-group" v-if="PageType == 'actress'">
        <label>血型</label>
        <input type="text" class="form-control search-option" id="t">
      </div>
      <div class="form-group" v-if="PageType == 'actress'">
        <label>出生年</label>
        <input type="number" min="0" class="form-control search-option" id="u">
      </div>
      <div class="form-group" v-if="PageType == 'actress'">
        <label>出生月</label>
        <input type="number" min="1" max="12" class="form-control search-option" id="v">
      </div>
      <div class="form-group" v-if="PageType == 'actress'">
        <label>出生日</label>
        <input type="number" min="1" max="31" class="form-control search-option" id="w" >
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

</style>
<template>
  <div>
    <form method="get" action="" style="text-align:center;">
      <div class="input-append">
        <input placeholder="輸入tag" type="text" size="70" name="tag" id="tag" class="form-control" :model="tag" />
        <button class="btn btn-primary">搜尋</button>
      </div>
    </form>
    <dl class="tag_desc">
      <dt>Title</dt>
      <dd><a href="<?php echo site_url('/moe_imouto'.(!empty($_GET) ? ('?'.http_build_query(array_merge($_GET, array(
    'order'=>(isset($_GET['order']) && in_array(strtolower($_GET['order']), array('asc', 'desc')) ? (strtolower($_GET['order']) == 'asc' ? 'desc' : 'asc') : 'asc')
  )))) : '?order=asc'));?>">數量<i class="<?php echo (isset($_GET['order']) && strtolower($_GET['order']) == 'asc') ? 'icon-arrow-down' : 'icon-arrow-up';?>"></i></a></dd>
      <dd>屬性類型</dd>
    </dl>
    <dl class="tag_desc" v-for="tag in tags" :key="tag.id">
      <dt>{{tag.name}}</dt>
      <dd>{{tag.counts}}</dd>
      <dd>
        <span v-if="tag.type_id == 0">屬性主題</span>
        <span v-else-if="tag.type_id == 1">畫師主題</span>
        <span v-else-if="tag.type_id == 3">作品主題</span>
        <span v-else-if="tag.type_id == 4">角色主題</span>
        <span v-else-if="tag.type_id == 5">品牌主題</span>
        <span v-else-if="tag.type_id == 6">系統分類</span>
        <span v-else>--</span>
      </dd>
    </dl>
    <PageBar :current-page="3" :total-rows="Total" :per-page="PerPage" :divider="'...'" :delta="4" :link="{name: 'yandere.tags', query: {}}"></PageBar>
  </div>
</template>

<script>
import Http from "../../../assets/js/http";
import PageBar from "@/components/elements/PageBar";
const Types = {

}
export default {
  name: "TagsList",
  components: { PageBar },
  data(){
    return {
      tag: "",
      tags: [],
      types: Types,
      //
      CurrentPage: 2210,
      FirstPageUrl: "",
      NextPageUrl: "",
      LastPageUrl: "",
      PerPage: 0,
      Total: 0
    }
  },
  mounted() {
    this.GetTags("/api/yandere/tags")
  },
  methods: {
    async GetTags(url) {
      let resp = await Http.get(url);

      this.tags = resp.data;
      this.CurrentPage = resp.current_page;
      this.FirstPageUrl = resp.first_page_url;
      this.NextPageUrl = resp.next_page_url;
      this.LastPageUrl = resp.last_page_url;
      this.PerPage = resp.per_page;
      this.Total = resp.total;
    }
  }
}
</script>

<style scoped>
/*dl {*/
/*  width: 100px;*/
/*  float: left;*/
/*  overflow-wrap: break-word;*/
/*  border: 1px solid #cccccc;*/
/*  margin-right: 5px;*/
/*  padding: 8px;*/
/*}*/

.tag_desc{clear:both;width:100%;border-bottom:1px solid #ccc;padding:5px 0;height:30px;margin-top:-20px;}
.tag_desc dt, .tag_desc dd{float:left;width:30%;}
</style>
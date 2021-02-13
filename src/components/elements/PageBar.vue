<template>
<nav>
  <div style="text-align:center;clear:both" v-if="parseInt(PerPage, 10) > 0 && parseInt(TotalRows, 10) > 0">
    <ul class="pagination pagination-centered">
      <li :class="{active: CurrentPage == 1}">
        <router-link :to="{name: 'yandere.tags', query: {page: 2}}">第一頁</router-link>
      </li>
      <li v-for="p in RenderPageElements(TotalRows, PerPage, CurrentPage, 4)" :key="p.page" :class="{active: CurrentPage == p.page}">
        <span v-if="p.type == 'divider'">{{divider}}</span>
        <router-link v-else :to="{name: 'yandere.tags', query: {page: 3}}">3</router-link>
      </li>
      <li :class="{active: CurrentPage == LastPage}">
        <router-link :to="{name: 'yandere.tags', query: {page: 1}}">最末頁</router-link>
      </li>
    </ul>
    <p>每頁顯示 {{PerPage}} 筆，共 {{TotalRows}} 筆</p>
  </div>
</nav>
</template>

<script>
export default {
  name: "PageBar",
  methods: {
    RenderPageElement(p) {
      // let ele = this.link;

      // if (typeof ele.query == "undefined") {
      //   return ele;
      // }
      // if (typeof ele.query["page"] !== "undefined") {
      //   return ele;
      // }
      // ele.query['page'] = p;

      let output = {
        name: "yandere.tags",
        query: {page: p}
      };
      console.log(output);
      return output;
    },
    RenderPageElements(total, perpage, currentpage, delta) {
      let c = parseInt(currentpage, 10);
      let pages = Math.ceil(parseInt(total, 10)/parseInt(perpage, 10), 10);
      let page_elements = [];

      let start_pointer = c - delta >= 0 ? c - delta : c;
      let end_pointer = c + delta <= pages ? (c + delta) : pages;

      for (let i = 1; i <= pages; i++) {
        if (i == 1 || i == pages || (i >= start_pointer && i <= end_pointer)) {
          if (i == start_pointer && i > 1) {
            page_elements.push({
              type: "divider"
            })
          }
          page_elements.push({
            page: i,
            url: "xxxx"
          });
          if (i == end_pointer && i != pages) {
            page_elements.push({
              type: "divider"
            })
          }
        }
      }

      return page_elements;
    }
  },
  data(){
    return {
      Event: function(){

      },
      LastPage: Math.ceil(this.TotalRows / this.PerPage),
    }
  },
  props: {
    CurrentPage: {
      required: true
    },
    TotalRows: {
      required: true
    },
    PerPage: {
      required: true
    },
    divider: {
      default: "..."
    },
    delta: {
      default: 4
    },
    link: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
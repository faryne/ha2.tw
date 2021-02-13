<template>
  <li>
    <div>
      <div class="video-header" @mouseover='avgleSearch(video.title, video.no)'>
        <a :href="video.url" :title="video.title">
          <img :src="video.thumb" :alt="video.title">
        </a>
      </div>
      <div class="video-result" :id='"video-result-" + video.no'>
        <ul>
          <li><a :href="video.url">{{video.title}}</a>（{{video.no}}）</li>
          <li>發售日：{{video.vod_date}}（VOD） / {{video.publish_date}}（實體）</li>
          <li v-if="video.labels.length > 0">品牌：
            <a class="label label-primary" @click="searchByCondition(this, 'label')" v-for="label in video.labels" :key="label">{{label}}</a>
          </li>
          <li v-if="video.series.length > 0">系列：
            <a class="label label-primary" @click="searchByCondition(this, 'series')" v-for="series in video.series" :key="series">{{series}}</a>
          </li>
          <li v-if="video.makers.length > 0">發售：
            <a class="label label-primary" @click="searchByCondition(this, 'marker')" v-for="maker in video.makers" :key="maker">{{maker}}</a>
          </li>
          <li>時間長度：{{video.duration}} 分</li>
          <li v-if="video.actresses.length > 0">女優：
            <a class="label label-primary" @click="searchByCondition(this, 'actress')" v-for="actress in video.actresses" :key="actress">{{actress}}</a>
          </li>
          <li v-if="video.directors.length > 0">監督：
            <a class="label label-primary" @click="searchByCondition(this, 'director')" v-for="director in video.directors" :key="director">{{director}}</a>
          </li>
          <li v-if="video.tags.length > 0">標籤：
            <a class="label label-primary" @click="searchByCondition(this, 'tag')" v-for="tag in video.tags" :key="tag">{{tag}}</a>
          </li>
        </ul>
        <div>
          <div class="xyz" :dd='avgle[video.no]' :ee="video.no">
            <a v-for='a in avgle[video.no]' :href="a.video_url" :key="a.video_url">{{a.title}}</a>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "VideoUnit",
  props: {
    video: {
      required: true,
      type: Object,
    }
  }
}
</script>

<style scoped>

</style>
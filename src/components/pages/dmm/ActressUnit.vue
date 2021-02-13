<template>
  <li>
    <div>
      <div class="actress-header">
        <a href="#" :title="actress.name">
          <img :src="actress.photo" :alt="actress.name">
        </a>
      </div>
      <div class="actress-result">
        <ul>
          <li>姓名：
            <a :href='"http://actress.dmm.co.jp/-/detail/=/actress_id="+actress.aid+"/"' target="_blank">{{actress.name}}</a>（{{actress.kana}}）
          </li>
          <li v-if="actress.birth_year > 0 || actress.birth_month > 0 || actress.birth_day">生日：
            <span class="label label-primary" v-if="actress.birth_year > 0">{{actress.birth_year}}</span>
            <span class="label label-primary" v-if="actress.birth_month > 0">{{actress.birth_month}}</span>
            <span class="label label-primary" v-if="actress.birth_day > 0">{{actress.birth_day}}</span>
          </li>
          <li v-if="actress.blood.length > 0">血型：
            <span class="label label-primary">{{actress.blood}}</span>
          </li>
          <li v-if="actress.bust > 0 || actress.waist > 0 || actress.hips > 0 || actress.cup.length > 0">三圍：
            <span class="label label-primary" v-if="actress.bust > 0">{{actress.bust}}</span>
            <span class="label label-primary" v-if="actress.waist > 0">{{actress.waist}}</span>
            <span class="label label-primary" v-if="actress.hips > 0">{{actress.hips}}</span>
            <a class="label label-primary" @click="searchByCondition(this, 'cup')" v-if="actress.cup.length > 0">{{actress.cup}}</a>
          </li>
          <li v-if="actress.born_city.length > 0">出身地：{{actress.born_city}}</li>
          <li v-if="actress.interests.length > 0">興趣：
            <span class="label label-primary" v-for="interest in actress.interests" :key="interest">{{interest}}</span>
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "ActressUnit",
  props: {
    actress: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
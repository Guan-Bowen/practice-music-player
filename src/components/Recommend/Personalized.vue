<template>
<div class="personalized">
  <div class="personalized-title">
    <h3>{{ title }}</h3>
  </div>
  <div class="personalized-container">
    <div v-for="p in personalized" :key="p.id" class="personalized-item" @click="itemInfo(p.id)">
      <img v-lazy="p.picUrl" alt="">
      <p>{{p.name}}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'RecommendPersonalized',
  methods: {
    itemInfo (id) {
      this.$emit('select', id, this.type)
    }
  },
  props: {
    personalized: {
      type: Array,
      default: () => [],
      required: true
    },
    title: {
      type: String,
      default: () => '推荐歌单'
    },
    type: {
      type: String,
      default: '',
      require: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
  .personalized{
    @include bg_sub_color();
    .personalized-title{
      width: 100%;
      height: 84px;
      line-height: 84px;
      @include bg_sub_color();
      @include border_color();
      border-bottom: 2px solid #ccc;
      h3{
        @include font_size($font_medium_s);
        @include font_color();
        @include border_color();
        font-weight: bold;
        padding-left: 25px;
        border-left: 5px solid;
        display: inline-block;
        height: 50px;
        line-height: 50px;
      }
    }
    .personalized-container{
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      padding-top: 20px;
      .personalized-item{
        width: 200px;
        img{
          width: 200px;
          height: 200px;
          border-radius: 20px;
        }
        p{
          line-height: 1.5;
          margin-top: 10px;
          margin-bottom: 20px;
          @include font_size($font_small_s);
          @include clamp(2);
          @include font_color();
        }
      }
    }
  }
</style>

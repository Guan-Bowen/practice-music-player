<template>
  <div class="tab-bar">
    <router-link to="/recommend" tag="div" class="tab-item"><span>推荐</span></router-link>
    <router-link to="/singer" tag="div" class="tab-item"><span>歌手</span></router-link>
    <router-link to="/rank" tag="div" class="tab-item"><span>排行</span></router-link>
    <router-link to="/search" tag="div" class="tab-item"><span>搜索</span></router-link>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
.tab-bar{
  width: 100%;
  height: 80px;
  line-height: 80px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  @include bg_sub_color();
  //position: relative;
  //z-index: 100;
  .tab-item{
    height: 80px;
    width: 10%;
    box-sizing: border-box;
    span{
      @include font_size($font_medium_s );
      @include font_color();
      font-weight: bold;
    }
    &.router-link-active{
      border-bottom: 5px solid;
      @include border_color();
      span{
        @include font_active_color();
      }
    }
  }
}
</style>

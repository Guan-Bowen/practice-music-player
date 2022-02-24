<template>
  <div class="header" @click="changeTheme">
    <div class="header-back" @click.stop="goBack"></div>
    <div class="header-title">{{ detailTitle }}</div>
    <div class="header-more"></div>
  </div>
</template>

<script>
export default {
  name: 'DetailHeader',
  data: function () {
    return {
      theme_id: 0,
      themes_available: ['theme1', 'theme2', 'theme3']
    }
  },
  methods: {
    changeTheme () {
      this.theme_id = (this.theme_id + 1) % this.themes_available.length
      // console.log(this.theme_id)
      document.documentElement.setAttribute('color-theme', this.themes_available[this.theme_id])
    },
    goBack () {
      window.history.go(-1)
    }
  },
  props: {
    detailTitle: {
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
.header{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  @include bg_color();
  //position: relative;
  //z-index: 1000;
  .header-back, .header-more {
    width: 60px;
    height: 60px;
    margin-top: 20px;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .header-back{
    @include bg_img('../../assets/images/back_icon');
    margin-left: 20px;
  }
  .header-more{
    @include bg_img('../../assets/images/more_icon');
    margin-right: 20px;
  }
  .header-title {
    line-height: 100px;
    text-align: center;
    font-weight: bold;
    color: #fff;
    @include font_size($font_small);
  }
}
</style>

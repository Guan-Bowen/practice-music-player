<template>
  <div class="header" @click="changeTheme">
    <div class="header-back" @click.stop="goBack"></div>
    <ul class="header-tab">
      <li :class="{'tab-active' : tabSwitch }" @click.stop="switchTab(true)">我的收藏</li>
      <li :class="{'tab-active' : !tabSwitch }" @click.stop="switchTab(false)">我的历史</li>
    </ul>
    <div class="header-more"></div>
  </div>
</template>

<script>
export default {
  name: 'UserHeader',
  data: function () {
    return {
      theme_id: 0,
      themes_available: ['theme1', 'theme2', 'theme3'],
      tabSwitch: true // true：左侧 | false：右侧
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
    },
    switchTab (flag) {
      this.tabSwitch = flag
      this.$emit('switchTab', flag)
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
  .header-tab {
    height: 60px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    border: 3px solid #fff;
    font-weight: bold;
    color: #fff;
    @include font_size($font_small);
    @include no_wrap();
    li{
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      &:nth-of-type(1){
        border-right: 2px solid #fff;
      }
      &.tab-active{
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>

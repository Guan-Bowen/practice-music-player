<!-- Header 分为三个部分：Logo & 标题 & 个人信息图标 -->
<template>
<div class="header" @click.c="changeTheme">
  <div class="header-logo"></div>
  <p class="header-title">Music Player</p>
  <div class="header-user" @click.stop="goToUser"></div>
</div>
</template>

<script>
export default {
  name: 'IndexHeader',
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
    goToUser () {
      this.$router.push('./user')
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
.header{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  @include bg_color();
  //position: relative;
  //z-index: 100;
  .header-logo, .header-user {
    width: 60px;
    height: 60px;
    margin-top: 20px;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .header-logo{
    @include bg_img('../assets/images/logo_icon');
    margin-left: 20px;
  }
  .header-user{
    @include bg_img('../assets/images/user_icon');
    margin-right: 20px;
  }
  .header-title {
    line-height: 100px;
    text-align: center;
    font-weight: bold;
    color: #fff;
    @include font_size($font_medium_s);
  }
}
</style>

<template>
  <div class="header">
    <div class="header-minimum" @click="hidePlayer"></div>
    <div class="header-title">
      <h3>{{currentSong.name}}</h3>
      <p>{{currentSong.singers}}</p>
    </div>
    <div class="header-more"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PlayerHeader',
  methods: {
    ...mapActions([
      'setPlayerState',
      'setMiniPlayerState'
    ]),
    hidePlayer () {
      this.setPlayerState(false)
      this.setMiniPlayerState(true)
    }
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.header{
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: space-between;
  // @include bg_color();
  // position: relative;
  // z-index: 1000;
  .header-minimum, .header-more {
    width: 60px;
    height: 60px;
    margin-top: 20px;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .header-minimum{
    @include bg_img('../../assets/images/down_icon');
    margin-left: 20px;
  }
  .header-more{
    // @include bg_img('../../assets/images/more_icon');
    margin-right: 20px;
  }
  .header-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-align: center;
    p{
      @include font_size($font_small);
    }
    h3{
      font-weight: bold;
      @include font_size($font_medium_s);
      margin-bottom: 15px;
      margin-top: 10px;
    }
  }
}
</style>

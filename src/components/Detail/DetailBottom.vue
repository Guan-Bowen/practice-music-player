<template>
<ul class="detail-bottom" ref="bottom">
  <li class="bottom-header" @click="selectMusicAll">
    <div class="bottom-header-icon"></div>
    <div class="bottom-header-title">播放全部</div>
  </li>
  <li v-for="item in playList" :key="item.id" class="bottom-item" @click="selectMusic(item.id)">
    <h3>{{item.name}}</h3>
    <p>{{item.al.name}} - {{item.ar[0].name}}</p>
  </li>
</ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'DetailBottom',
  props: {
    playList: {
      type: Array,
      default: () => [],
      require: true
    }
  },
  methods: {
    selectMusic (ids) {
      if (this.isPlaying) {
        this.setPlayingState(false)
      }
      this.setPlayerState(true)
      this.setMiniPlayerState(false)
      this.setSongs([ids])
    },
    selectMusicAll () {
      if (this.isPlaying) {
        this.setPlayingState(false)
      }
      this.setPlayerState(true)
      this.setMiniPlayerState(false)
      const ids = this.playList.map(function (item) {
        return item.id
      })
      // console.log(ids)
      this.setSongs(ids)
      if (this.isPlaying) {
        this.setPlayingState(false)
        this.setPlayingState(true)
      }
    },
    ...mapActions([
      'setPlayerState',
      'setMiniPlayerState',
      'setSongs',
      'setPlayingState'
    ])
  },
  computed: {
    ...mapGetters([
      'isPlaying'
    ])
  },
  beforeUpdate () {
    const newHeight = (this.$props.playList.length + 1) * 120 - 2
    this.$refs.bottom.style.height = newHeight + 'px'
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import '../../assets/css/mixin';
.detail-bottom{
  width: 100%;
  overflow: scroll;
  // height: 1300px;
  li{
    width: 100%;
    height: 120px;
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    @include bg_sub_color();
  }
  .bottom-header{
    display: flex;
    align-items: center;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    .bottom-header-icon{
      width: 60px;
      height: 60px;
      @include bg_img('../../assets/images/play_icon');
    }
    .bottom-header-title{
      padding-left: 15px;
      font-weight: bold;
      @include font_color();
      @include font_size($font_medium_s);
    }
  }
  .bottom-item{
    padding-left: 35px;
    h3{
      @include font_size($font_small);
      @include no-wrap();
      @include font_color();
      font-weight: bold;
      padding-bottom: 5px;
    }
    p{
      @include font_size($font_small_s);
      @include font_color();
      @include no-wrap();
      opacity: 0.8;
    }
  }
}
</style>

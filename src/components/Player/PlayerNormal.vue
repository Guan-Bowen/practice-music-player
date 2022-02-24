<template>
<transition
  :css="false"
  @enter="enter"
  @leave="leave"
>
  <div class="player-normal" v-show="this.isShowingPlayerNormal">
    <div class="player-wrapper">
      <PlayerHeader></PlayerHeader>
      <PlayerContent :songCurrentTime="songCurrentTime"></PlayerContent>
      <PlayerBottom :songTime="songTime" :songCurrentTime="songCurrentTime"></PlayerBottom>
    </div>
    <div class="player-bgi">
      <img :src="currentSong.picUrl" alt="">
    </div>
  </div>
</transition>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerContent from './PlayerContent'
import PlayerBottom from './PlayerBottom'
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'PlayerNormal',
  components: {
    PlayerHeader,
    PlayerContent,
    PlayerBottom
  },
  computed: {
    ...mapGetters([
      'isShowingPlayerNormal',
      'currentSong'
    ])
  },
  props: {
    songTime: {
      type: Number,
      default: 0
    },
    songCurrentTime: {
      type: Number,
      default: 0
    }
  },
  methods: {
    ...mapActions([
      'setSongLyric',
      'setPlayingState'
    ]),
    enter (el, done) {
      Velocity(el, 'transition.swoopIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.swoopOut', { duration: 500 }, function () {
        done()
      })
    }
  },
  watch: {
    currentSong (newValue, oldValue) {
      // console.log(newValue)
      this.setSongLyric(newValue.id)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.player-normal{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color();
  .player-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 100;
  }
  .player-bgi{
    width: 100%;
    height: 100%;
    img{
      height: 100%;
      position: absolute;
      display: inline-block;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      filter: blur(5px);
    }
  }
}
</style>

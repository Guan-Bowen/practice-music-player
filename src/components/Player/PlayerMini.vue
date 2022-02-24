<template>
<transition
  :css="false"
  @enter="enter"
  @leave="leave"
>
  <div class="player-mini" v-show="this.isShowingPlayerMini">
    <div class="player-wrapper">
      <div class="player-left">
        <img ref="imgCd" :src="currentSong.picUrl" alt="" @click="showPlayerNormal">
        <div class="player-info">
          <div class="h3-wrapper"><h3>{{currentSong.name}}</h3></div>
          <p>{{currentSong.singers}}</p>
        </div>
      </div>
      <div class="player-right">
        <div class="play-button" @click="play" ref="playButton"></div>
        <div class="list-button" @click.stop="showPlayerList"></div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'PlayerMini',
  methods: {
    ...mapActions([
      'setPlayerState',
      'setMiniPlayerState',
      'setPlayingState',
      'setListPlayerState'
    ]),
    showPlayerList () {
      this.setListPlayerState(true)
    },
    showPlayerNormal () {
      this.setPlayerState(true)
      this.setMiniPlayerState(false)
    },
    enter (el, done) {
      Velocity(el, 'transition.fadeIn', { duration: 700 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.fadeOut', { duration: 700 }, function () {
        done()
      })
    },
    play () {
      this.setPlayingState(!this.isPlaying)
    }
  },
  computed: {
    ...mapGetters([
      'isShowingPlayerMini',
      'isPlaying',
      'currentSong'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.playButton.classList.add('active')
        this.$refs.imgCd.classList.add('cd-active')
      } else {
        this.$refs.playButton.classList.remove('active')
        this.$refs.imgCd.classList.remove('cd-active')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.player-mini{
  width: 100%;
  height: 140px;
  position: fixed;
  bottom: 0;
  left: 0;
  .player-wrapper{
    width: 100%;
    height: 100%;
    @include bg_color();
    display: flex;
    justify-content: space-between;
    align-items: center;
    .player-left{
      display: flex;
      overflow: hidden; // 避免子元素文本溢出
      img{
        border-radius: 50%;
        width: 100px;
        height: 100px;
        margin-left: 30px;
        margin-right: 20px;
        animation: revolve 5s linear infinite;
        animation-play-state: paused;
        &.cd-active{
          animation-play-state: running;
        }
      }
      .player-info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        h3{
          @include font_size($font_medium_s);
          font-weight: bold;
          margin-bottom: 5px;
          @include no_wrap();
          text-overflow: ellipsis;
        }
        p{
          @include font_size($font_small);
        }
      }
    }
    .player-right{
      display: flex;
      flex-direction: row;
      margin-right: 25px;
      .play-button{
        width: 60px;
        height: 60px;
        @include bg_img('../../assets/images/play_music_icon');
        &.active{
          @include bg_img('../../assets/images/pause_music_icon');
        }
      }
      .list-button{
        width: 60px;
        height: 60px;
        @include bg_img('../../assets/images/hamburger_menu_icon');
        margin-left: 25px;
      }
    }
  }
}

@keyframes revolve {
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}
</style>

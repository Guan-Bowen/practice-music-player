<template>
<div class="player-bottom">
  <div class="player-bottom-progress">
    <span>{{currentTimeString}}</span>
    <div class="progress-bar" @click="setProgressBar" ref="progressBar">
      <div class="progress-line" ref="progressLine">
        <div class="progress-dot" ref="progressDot"></div>
      </div>
    </div>
    <span>{{timeString}}</span>
  </div>
  <div class="player-bottom-controller">
    <div class="mode" @click="changeMode" ref="mode"></div>
    <div class="previous" @click="goPrevious"></div>
    <div class="play" @click="play" ref="playButton"></div>
    <div class="next" @click="goNext"></div>
    <div class="like" @click="likeClick" :class="{'liked' : hasLiked(this.currentSong) }"></div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import playModeDict from '../../store/mode'
export default {
  name: 'PlayerBottom',
  methods: {
    ...mapActions([
      'setPlayingState',
      'setPlayMode',
      'setCurrentIndex',
      'setCurrentRate',
      'addNewLike',
      'removePreviousLike'
    ]),
    play () {
      this.setPlayingState(!this.isPlaying)
    },
    changeMode () {
      if (this.playMode === playModeDict.listLoop) {
        this.setPlayMode(playModeDict.singleLoop)
      } else if (this.playMode === playModeDict.singleLoop) {
        this.setPlayMode(playModeDict.random)
      } else if (this.playMode === playModeDict.random) {
        this.setPlayMode(playModeDict.listLoop)
      }
    },
    goPrevious () {
      if (this.currentIndex === 0) {
        this.setCurrentIndex(this.songs.length - 1)
      } else {
        this.setCurrentIndex(this.currentIndex - 1)
      }
    },
    goNext () {
      if (this.currentIndex === this.songs.length - 1) {
        this.setCurrentIndex(0)
      } else {
        this.setCurrentIndex(this.currentIndex + 1)
      }
    },
    computeTime (secondValue) {
      const days = Math.floor(secondValue / 60 / 60 / 24)
      const hours = Math.floor(secondValue / 60 / 60 - days * 24)
      const minutes = Math.floor(secondValue / 60 - hours * 60 - days * 24 * 60)
      const seconds = Math.floor(secondValue % 60)
      const timeObj = {
        days: days === 0 ? '' : days + '',
        hours: days === 0 ? (hours === 0 ? '' : hours + '') : (hours === 0 ? '0' : hours + ''),
        minutes: minutes >= 10 ? minutes + '' : (minutes === 0 ? '00' : '0' + minutes),
        seconds: seconds >= 10 ? seconds + '' : (seconds === 0 ? '00' : '0' + seconds)
      }
      let timeStr = ''
      if (timeObj.days) {
        timeStr += timeObj.days + ':'
      }
      if (timeObj.hours) {
        timeStr += timeObj.hours + ':'
      }
      timeStr += timeObj.minutes + ':'
      timeStr += timeObj.seconds
      return { timeStr, timeObj }
    },
    setProgressBar (e) {
      // console.log('in setting')
      // console.log(e.clientX)
      // console.log(e.pageX)
      // console.log(e.target.offsetLeft)
      // const posX = e.pageX - e.target.offsetLeft
      const posX = e.offsetX
      const lengthX = this.$refs.progressBar.offsetWidth
      // console.log(posX)
      // console.log(lengthX)
      const rate = posX / lengthX
      // console.log(posX)
      // console.log(lengthX)
      // console.log(rate)
      this.$refs.progressLine.style.width = rate * 100 + '%'
      this.$refs.progressDot.style.left = rate * 100 - 1 + '%'
      // console.log('posX: ', posX)
      // console.log('lengthX: ', lengthX)
      // console.log('Rate in PlayerBottom: ', rate)
      this.setCurrentRate(rate)
    },
    likeClick (e) {
      if (e.target.classList.contains('liked')) {
        // console.log('remove')
        this.removePreviousLike(this.currentSong)
        e.target.classList.remove('liked')
      } else {
        // console.log('add')
        this.addNewLike(this.currentSong)
        e.target.classList.add('liked')
      }
    },
    hasLiked (song) {
      return this.likeList.find(function (listItem) {
        return listItem.id === song.id
      })
    }
  },
  data: function () {
    return {
      timeString: '00:00',
      currentTimeString: '00:00'
    }
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
  computed: {
    ...mapGetters([
      'isPlaying',
      'playMode',
      'currentIndex',
      'songs',
      'currentSong',
      'likeList'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.playButton.classList.add('active')
      } else {
        this.$refs.playButton.classList.remove('active')
      }
    },
    playMode (newValue, oldValue) {
      if (newValue === playModeDict.listLoop) {
        this.$refs.mode.classList.add('list-loop')
        this.$refs.mode.classList.remove('random')
      } else if (newValue === playModeDict.singleLoop) {
        this.$refs.mode.classList.add('single-loop')
        this.$refs.mode.classList.remove('list-loop')
      } else if (newValue === playModeDict.random) {
        this.$refs.mode.classList.add('random')
        this.$refs.mode.classList.remove('single-loop')
      }
    },
    songTime (newValue, oldValue) {
      const timeFormat = this.computeTime(newValue)
      // console.log(timeObj)
      this.timeString = timeFormat.timeStr
    },
    songCurrentTime (newValue, oldValue) {
      const timeFormat = this.computeTime(newValue)
      this.currentTimeString = timeFormat.timeStr
      const rate = this.songCurrentTime / this.songTime
      this.$refs.progressLine.style.width = rate * 100 + '%'
      this.$refs.progressDot.style.left = rate * 100 - 1 + '%'
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
.player-bottom{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .player-bottom-progress{
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .progress-bar{
      width: 100%;
      margin: 0 10px;
      height: 10px;
      background-color: black;
      position: relative;
      .progress-line{
        width: 0;
        height: 100%;
        background-color: white;
        // position: relative;
        .progress-dot{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #ccc;
          position: absolute;
          left: -1%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    span{
      @include font_color();
      @include font_size($font_small_s)
    }
  }
  .player-bottom-controller{
    width: 70%;
    margin: 0 auto;
    padding-top: 50px;
    padding-bottom: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div{
      width: 60px;
      height: 60px;
    }
    .mode{
      @include bg_img('../../assets/images/list_loop_icon');
      &.single-loop{
        @include bg_img('../../assets/images/single_loop_icon');
      }
      &.random{
        @include bg_img('../../assets/images/shuffle_icon');
      }
      &.list-loop{
        @include bg_img('../../assets/images/list_loop_icon');
      }
    }
    .previous{
      @include bg_img('../../assets/images/previous_icon');
    }
    .play{
      @include bg_img('../../assets/images/play_music_icon');
      &.active{
        @include bg_img('../../assets/images/pause_music_icon');
      }
    }
    .next{
      @include bg_img('../../assets/images/next_icon');
    }
    .like{
      @include bg_img('../../assets/images/like_icon');
      &.liked{
        @include bg_img('../../assets/images/list_like_icon');
      }
    }
  }
}
</style>

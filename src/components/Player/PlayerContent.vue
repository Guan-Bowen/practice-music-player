<template>
  <swiper :options="swiperOption" class="player-container">
    <swiper-slide class="player-cd">
      <div class="player-cd-wrapper" ref="playerCdWrapper">
        <img :src="currentSong.picUrl" alt="">
      </div>
      <p>{{getCurrentLyric()}}</p>
    </swiper-slide>
    <swiper-slide class="player-lyric">
      <ScrollView ref="scrollViewLyrics">
        <ul>
          <li v-for="(value, idx) in currentSongLyric"
              :key="idx"
              :class="{'active-lyric' : currentLyricIndex === idx}">{{value}}</li>
        </ul>
      </ScrollView>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import ScrollView from '../ScrollView'
import { mapGetters } from 'vuex'
export default {
  name: 'PlayerContent',
  components: {
    Swiper,
    SwiperSlide,
    ScrollView
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'player-bullet',
          bulletActiveClass: 'player-bullet-active'
        },
        // 异步加载，数据改变后刷新
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      currentLyricIndex: ''
    }
  },
  methods: {
    getCurrentLyric () {
      return this.currentSongLyric[Object.keys(this.currentSongLyric)[0]]
    },
    findNearestLyricLine (lineIdx) {
      if (lineIdx < 0) { return }
      const index = Math.floor(lineIdx) + ''
      if (!(index in this.currentSongLyric && this.currentSongLyric[index].trim())) {
        return this.findNearestLyricLine(--lineIdx)
      } else {
        return index
      }
    }
  },
  props: {
    songCurrentTime: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'currentSong',
      'currentSongLyric'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.playerCdWrapper.classList.add('active')
      } else {
        this.$refs.playerCdWrapper.classList.remove('active')
      }
    },
    songCurrentTime (newValue, oldValue) {
      // console.log(newValue)
      // console.log(this.currentSongLyric)
      // const index = Math.floor(newValue) + ''
      // if (index in this.currentSongLyric && this.currentSongLyric[index].trim()) {
      //   this.currentLyricIndex = index
      //   const activeLyricLi = document.querySelector('.active-lyric')
      //   const lyricContent = document.querySelector('.player-lyric')
      //   if (activeLyricLi && activeLyricLi.offsetTop > lyricContent.offsetHeight / 2.5) {
      //     // console.log(activeLyricLi.offsetTop)
      //     this.$refs.scrollViewLyrics.scrollTo(0, lyricContent.offsetHeight / 2.5 - activeLyricLi.offsetTop, 100)
      //   }
      // }
      // console.log(lyricContent.offsetHeight)
      this.currentLyricIndex = this.findNearestLyricLine(newValue) || this.currentLyricIndex
      const activeLyricLi = document.querySelector('.active-lyric')
      const lyricContent = document.querySelector('.player-lyric')
      if (activeLyricLi && activeLyricLi.offsetTop > lyricContent.offsetHeight / 2.5) {
        // console.log(activeLyricLi.offsetTop)
        this.$refs.scrollViewLyrics.scrollTo(0, lyricContent.offsetHeight / 2.5 - activeLyricLi.offsetTop, 100)
        // console.log('scrolled')
      }
    },
    currentSongLyric (newValue, oldValue) {
      this.currentLyricIndex = Object.keys(newValue)[0]
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin';
.player-container{
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;
  .player-cd{
    .player-cd-wrapper{
      display: block;
      margin: 50px auto 50px;
      overflow: hidden;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      border: 25px solid #000;
      animation: revolve 5s linear infinite;
      animation-play-state: paused;
      &.active{
        animation-play-state: running;
      }
      img{
        width: 100%;
        height: 100%;
      }

    }
    p{
      text-align: center;
      @include font_size($font_small);
      @include font_color();
      margin-top: 50px;
    }
  }
  .player-lyric{
    @include font_size($font_medium_s);
    @include font_color();
    text-align: center;
    li{
      margin: 20px 0;
      &:last-of-type{
        padding-bottom: 65%;
      }
      &.active-lyric{
        color: #fff;
        font-weight: bold;
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
<style lang="scss">
@import '../../assets/css/mixin';
.player-bullet{
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: #ddd;
  margin: 0 20px;
}
.player-bullet-active{
  width: 40px;
  @include bg_color()
}
</style>

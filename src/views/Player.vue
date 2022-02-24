<template>
<div class="player">
  <PlayerNormal :songTime="songTime" :songCurrentTime="songCurrentTime"></PlayerNormal>
  <PlayerMini></PlayerMini>
  <PlayerList></PlayerList>
  <audio :src="currentSong.url" ref="audio" @timeupdate="setPlayingStatus" @ended="songSwitch"></audio>
</div>
</template>

<script>
import PlayerNormal from '../components/Player/PlayerNormal'
import PlayerMini from '../components/Player/PlayerMini'
import PlayerList from '../components/Player/PlayerList'
import { mapGetters, mapActions } from 'vuex'
import modeDict from '../store/mode'
export default {
  name: 'MusicPlayer',
  components: {
    PlayerNormal,
    PlayerMini,
    PlayerList
  },
  data: function () {
    return {
      songTime: 0,
      songCurrentTime: 0
    }
  },
  methods: {
    ...mapActions([
      'setCurrentIndex',
      'setLikeListFromLocalStorage',
      'addNewHistory',
      'setHistoryListFromLocalStorage'
    ]),
    setPlayingStatus (e) {
      // console.log(e.target.currentTime)
      this.songCurrentTime = e.target.currentTime
    },
    songSwitch () {
      const length = this.songs.length
      if (this.playMode === modeDict.listLoop) {
        if (length === 1) {
          this.songCurrentTime = 0
          this.$refs.audio.play()
        } else {
          this.setCurrentIndex((this.currentIndex + 1) % length)
        }
      } else if (this.playMode === modeDict.singleLoop) {
        this.songCurrentTime = 0
        this.$refs.audio.play()
      } else {
        let newIndex = this.currentIndex
        while (newIndex === this.currentIndex) {
          newIndex = Math.floor(Math.random() * length)
        }
        this.setCurrentIndex(newIndex)
      }
    }
  },
  mounted () {
    this.$refs.audio.ondurationchange = () => {
      this.songTime = this.$refs.audio.duration
    }
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'currentIndex',
      'isPlaying',
      'customizedCurrentRate',
      'playMode',
      'songs',
      'likeList',
      'historyList'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.audio.play()
        // console.log('Before Add History')
        this.addNewHistory(this.currentSong)
        // console.log('After Add History')
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex (newValue, oldValue) {
      this.$refs.audio.ondurationchange = () => {
        this.songTime = this.$refs.audio.duration
        if (this.isPlaying) {
          this.addNewHistory(this.currentSong)
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    customizedCurrentRate (newValue, oldValue) {
      // console.log('Rate in Player: ', newValue)
      this.songCurrentTime = this.songTime * newValue
      this.$refs.audio.currentTime = this.songCurrentTime
    },
    likeList (newValue, oldValue) {
      window.localStorage.setItem('musicLikeList', JSON.stringify(newValue))
      // console.log('update like list')
    },
    historyList (newValue, oldValue) {
      window.localStorage.setItem('musicHistoryList', JSON.stringify(newValue))
      // console.log('update history list')
    }
  },
  created () {
    const likeList = JSON.parse(window.localStorage.getItem('musicLikeList'))
    const historyList = JSON.parse(window.localStorage.getItem('musicHistoryList'))
    if (likeList) {
      // console.log('like list available')
      this.setLikeListFromLocalStorage(likeList)
    }
    if (historyList) {
      // console.log('history list available')
      this.setHistoryListFromLocalStorage(historyList)
    }
  }
}
</script>

<style scoped lang="scss">
</style>

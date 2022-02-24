<template>
<div class="user-bottom">
  <div class="user-bottom-play" @click="selectMusicAll">
    <span></span>
    <span>播放全部</span>
  </div>
  <div class="user-bottom-wrapper" :class="{ 'player-mini-available' : isShowingPlayerMini }">
    <ScrollView>
      <UserLike :songs="tabSwitch ? likeList : historyList "></UserLike>
    </ScrollView>
  </div>
</div>
</template>

<script>
import ScrollView from '../ScrollView'
import UserLike from './UserLike'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'UserBottom',
  components: {
    ScrollView,
    UserLike
  },
  props: {
    tabSwitch: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters([
      'likeList',
      'historyList',
      'isPlaying',
      'isShowingPlayerMini'
    ])
  },
  methods: {
    ...mapActions([
      'setPlayingState',
      'setPlayerState',
      'setMiniPlayerState',
      'setSongs',
      'setSongsByList',
      'setCurrentIndex'
    ]),
    selectMusicAll () {
      if (this.isPlaying) {
        this.setPlayingState(false)
      }
      const songList = this.tabSwitch ? this.likeList : this.historyList
      const ids = songList.map(function (item) {
        return item.id
      })
      // this.setSongs(ids)
      // console.log(ids)
      this.setSongsByList({ ids, songList })
      this.setCurrentIndex(0)
      this.setPlayerState(true)
      this.setMiniPlayerState(false)
      if (this.isPlaying) {
        this.setPlayingState(false)
        this.setPlayingState(true)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin';
@import '../../assets/css/variable';
.user-bottom{
  position: fixed;
  top: 100px;
  bottom: 0;
  left: 0;
  right: 0;
  //background-color: skyblue;
  .user-bottom-play{
    width: 220px;
    height: 70px;
    margin: 30px 0 30px 50px;
    @include border_color();
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid #000;
    @include border_color();
    border-radius: 30px;
    span{
      display: inline-block;
      @include font_size($font_small);
      @include font_color();
      font-weight: bold;
      &:nth-of-type(1){
        width: 45px;
        height: 45px;
        @include bg_img('../../assets/images/play_icon');
        margin-right: 20px;
      }
    }
  }
  .user-bottom-wrapper{
    position: fixed;
    top: 240px;
    bottom: 0;
    right: 0;
    left: 0;
    border-top: 1px solid #ccc;
    overflow: hidden;
    // background-color: red;
    &.player-mini-available{
      padding-bottom: 150px;
    }
  }
}
</style>

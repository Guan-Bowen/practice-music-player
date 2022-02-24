<template>
<transition
  :css="false"
  @enter="enter"
  @leave="leave"
>
  <div class="player-list" v-show="isShowingPlayerList">
    <div class="player-wrapper">
      <div class="player-list-top">
        <div class="player-list-top-left">
          <div class="mode" @click="changeMode" ref="mode"></div>
          <p v-show="this.playMode === 0">列表循环</p>
          <p v-show="this.playMode === 1">单曲循环</p>
          <p v-show="this.playMode === 2">随机播放</p>
        </div>
        <div class="player-list-top-right">
          <div class="delete-button" @click="deleteItemAll"></div>
        </div>
      </div>
      <div class="player-list-middle">
        <ScrollView ref="scrollView">
          <ul ref="playButton">
            <li class="item" v-for="(song, idx) in songs" :key="song.id" @click="selectMusic(idx)">
              <div class="item-left">
                <div class="item-play" @click.stop="play" v-show="currentIndex === idx"></div>
                <p>{{song.name}}</p>
              </div>
              <div class="item-right">
<!--                <div class="item-like" :class="{'liked' : this.likeList.includes(song)}" @click.stop="likeClick(song, $event)"></div>-->
                <div class="item-like" :class="{'liked' : hasLiked(song) }" @click.stop="likeClick(song, $event)"></div>
                <div class="item-delete" @click.stop="deleteItem(idx)"></div>
              </div>
            </li>
          </ul>
        </ScrollView>
      </div>
      <div class="player-list-bottom" @click="hide">
        <p>关 闭</p>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import ScrollView from '../ScrollView'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapGetters, mapActions } from 'vuex'
import playModeDict from '../../store/mode'
export default {
  name: 'PlayerList',
  components: {
    ScrollView
  },
  methods: {
    ...mapActions([
      'setPlayingState',
      'setPlayMode',
      'setListPlayerState',
      'setListPlayerState',
      'setCurrentIndex',
      'deleteSongByIndex',
      'addNewLike',
      'removePreviousLike'
    ]),
    hide () {
      this.setListPlayerState(false)
    },
    enter (el, done) {
      Velocity(el, 'transition.bounceUpIn', { duration: 800 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.bounceDownOut', { duration: 800 }, function () {
        done()
      })
    },
    play () {
      // console.log('in play func')
      // console.log(this.isPlaying)
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
    deleteItem (idx) {
      this.deleteSongByIndex(idx)
    },
    deleteItemAll () {
      this.deleteSongByIndex()
    },
    selectMusic (idx) {
      this.setCurrentIndex(idx)
    },
    likeClick (song, e) {
      // console.log(e)
      // console.log(song)
      // console.log(this.likeList)
      if (e.target.classList.contains('liked')) {
        // console.log('remove')
        this.removePreviousLike(song)
        e.target.classList.remove('liked')
      } else {
        // console.log('add')
        this.addNewLike(song)
        e.target.classList.add('liked')
      }
    },
    hasLiked (song) {
      return this.likeList.find(function (listItem) {
        return listItem.id === song.id
      })
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'playMode',
      'isShowingPlayerList',
      'songs',
      'currentIndex',
      'likeList'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      // console.log(newValue)
      if (newValue) {
        // console.log(this.$refs.playButton)
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
    isShowingPlayerList (newValue, oldValue) {
      if (newValue) {
        this.$refs.scrollView.refresh()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.player-list{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  @include bg_sub_color();
  .player-wrapper{
    .player-list-top{
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .player-list-top-left{
        display: flex;
        align-items: center;
        padding-left: 20px;
        .mode{
          width: 50px;
          height: 50px;
          margin-right: 15px;
          @include bg_img('../../assets/images/player_loop_icon');
          &.single-loop{
            @include bg_img('../../assets/images/player_single_loop_icon');
          }
          &.random{
            @include bg_img('../../assets/images/player_shuffle_icon');
          }
          &.list-loop{
            @include bg_img('../../assets/images/player_loop_icon');
          }
        }
        p{
          @include font_color();
          @include font_size($font_medium_s)
        }
      }
      .player-list-top-right{
        margin-right: 20px;
        .delete-button{
          width: 50px;
          height: 50px;
          @include bg_img('../../assets/images/delete_icon');
        }
      }
    }
    .player-list-middle{
      width: 100%;
      height: 700px;
      overflow: hidden;
      ul{
        &.active{
          .item{
            .item-play{
              @include bg_img('../../assets/images/list_pause_icon');
            }
          }
        }
      }
      .item{
        height: 100px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        .item-left{
          display: flex;
          align-items: center;
          .item-play{
            width: 50px;
            height: 50px;
            margin-right: 15px;
            @include bg_img('../../assets/images/list_play_icon');
          }
          p{
            @include font_size($font_medium_s);
            @include font_color();
          }
        }
        .item-right{
          display: flex;
          align-items: center;
          .item-like{
            width: 55px;
            height: 55px;
            @include bg_img('../../assets/images/list_no_like_icon');
            &.liked{
              @include bg_img('../../assets/images/list_like_icon');
            }
          }
          .item-delete{
            width: 42px;
            height: 42px;
            @include bg_img('../../assets/images/list_remove_icon');
            margin-left: 15px;
            padding-right: 5px;
            position: relative;
            bottom: 4px;
          }
        }
      }
    }
    .player-list-bottom{
      width: 100%;
      height: 100px;
      @include bg_color();
      p{
        text-align: center;
        line-height: 100px;
        @include font_size($font_small);
        color: #fff;
      }
    }
  }
}
</style>

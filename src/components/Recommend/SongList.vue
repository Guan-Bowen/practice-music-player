<template>
<div class="song">
  <div class="song-title"><h3>{{ title }}</h3></div>
  <div class="song-list">
    <ul>
      <li v-for="s in songs" :key="s.id" class="song-item" @click="selectMusic(s.id)">
        <img v-lazy="s.song.album.picUrl" alt="">
        <div>
          <h3>{{s.name}}</h3>
          <p>{{s.song.artists[0].name}}</p>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'RecommendSongList',
  computed: {
    ...mapGetters([
      'isPlaying'
    ])
  },
  props: {
    title: {
      type: String,
      default: '最新歌曲'
    },
    songs: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setPlayerState',
      'setMiniPlayerState',
      'setSongs',
      'setPlayingState'
      // 'setCurrentIndex'
    ]),
    selectMusic (id) {
      this.setPlayerState(true)
      this.setMiniPlayerState(false)
      this.setSongs([id])
      if (this.isPlaying) {
        this.setPlayingState(false)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/variable';
@import '../../assets/css/mixin';
.song{
  width: 100%;
  .song-title{
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    @include border_color();
    border-bottom: 2px solid #ccc;
    h3{
      @include font_size($font_medium_s);
      @include font_color();
      @include border_color();
      font-weight: bold;
      padding-left: 25px;
      border-left: 5px solid;
      display: inline-block;
      height: 50px;
      line-height: 50px;
    }
  }
  .song-list{
    width: 100%;
    overflow: hidden;
    @include bg_sub_color();
    .song-item{
      display: flex;
      height: 180px;
      width: 100%;
      align-items: center;
      padding: 0 20px;
      margin: 10px 0;
      border-bottom: 0.5px solid #ccc;
      img{
        width: 150px;
        height: 150px;
        border-radius: 20px;
        margin: 0 30px 0 10px;
      }
      div{
        @include font_color();
        h3{
          @include font_size($font_medium_s);
          padding-bottom: 15px;
        }
        p{
          @include font_size($font_small_s);
          opacity: 0.5;
        }
      }
    }
  }
}
</style>

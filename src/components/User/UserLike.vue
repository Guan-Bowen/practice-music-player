<template>
  <div class="song-list">
    <ul>
      <li v-for="s in songs" :key="s.id" class="song-item" @click="selectMusic(s.id)">
        <img :src="s.picUrl" alt="">
        <div>
          <h3>{{s.name}}</h3>
          <p>{{s.singers}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'UserLike',
  computed: {
    ...mapGetters([
      'isPlaying'
    ])
  },
  props: {
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
  // mounted () {
  //   console.log(this.songs)
  // }
}
</script>
<style scoped lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable";
.song-list{
  width: 100%;
  overflow: hidden;
  @include bg_sub_color();
  .song-item{
    display: flex;
    height: 150px;
    width: 100%;
    align-items: center;
    padding: 0 20px;
    margin: 10px 0;
    border-bottom: 0.5px solid #ccc;
    img{
      width: 120px;
      height: 120px;
      border-radius: 20px;
      margin: 0 35px 0 20px;
    }
    div{
      width: 70%;
      @include font_color();
      h3{
        @include font_size($font_medium_s);
        padding-bottom: 15px;
        @include no_wrap();
      }
      p{
        @include font_size($font_small_s);
        opacity: 0.5;
        @include no_wrap();
      }
    }
  }
}
</style>

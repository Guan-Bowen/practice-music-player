<template>
<div class="detail">
  <DetailHeader :detailTitle="playList.name"></DetailHeader>
  <DetailTop :imgPath="playList.coverImgUrl" ref="top"></DetailTop>
  <div class="detail-bottom">
    <ScrollView ref="scroll-view">
      <DetailBottom :playList="playList.tracks"></DetailBottom>
    </ScrollView>
  </div>
</div>
</template>

<script>
import DetailHeader from '../components/Detail/DetailHeader'
import DetailTop from '../components/Detail/DetailTop'
import DetailBottom from '../components/Detail/DetailBottom'
import ScrollView from '../components/ScrollView'
import { getSongInfo, getAlbumInfo, getSingerInfo, getRankInfo } from '../api/index'
export default {
  name: 'recommendSingDetail',
  data: function () {
    return {
      playList: {}
    }
  },
  components: {
    DetailHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  created () {
    this.$route.params.type === 'personalized' && getSongInfo(this.$route.params.id).then((data) => {
      this.playList = data.playlist
      // console.log(this.playList.tracks.length)
    }).catch((err) => console.log(err))
    this.$route.params.type === 'album' && getAlbumInfo(this.$route.params.id).then((data) => {
      // this.playList = data.playlist
      // console.log(this.playList.tracks.length)
      // console.log(data.album.name)
      // console.log(data.album.picUrl)
      // console.log(data.songs)
      this.playList = {
        name: data.album.name,
        coverImgUrl: data.album.picUrl,
        tracks: data.songs
      }
    }).catch((err) => console.log(err))
    this.$route.params.type === 'singer' && getSingerInfo(this.$route.params.id).then((data) => {
      // console.log(data)
      this.playList = {
        name: data.artist.name,
        coverImgUrl: data.artist.img1v1Url,
        tracks: data.hotSongs
      }
    }).catch((err) => console.log(err))
    this.$route.params.type === 'rank' && getRankInfo(this.$route.params.id).then((data) => {
      // console.log(data)
      this.playList = {
        name: data.playlist.name,
        coverImgUrl: data.playlist.creator.backgroundUrl,
        tracks: data.playlist.tracks
      }
    })
  },
  mounted () {
    const imgOriginHeight = this.$refs.top.$el.offsetHeight
    this.$refs['scroll-view'].scrolling((scrollY) => {
      // console.log(scrollY)
      if (scrollY < 0) {
        // console.log('ul go down')
        const blurRate = -scrollY / imgOriginHeight / 3
        // console.log(blurRate)
        // this.$refs.top.$el.style.filter = `blur(${blurRate}px)`
        this.$refs.top.maskBlur(blurRate)
      } else {
        // console.log('ul go up')
        const scaleRate = scrollY / imgOriginHeight
        // console.log(scaleRate)
        this.$refs.top.$el.style.transform = `scale(${scaleRate + 1})`
      }
    })
  }
}
</script>

<style scoped lang="scss">
@import '../assets/css/mixin';
.detail{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color();
  .detail-bottom{
    position: fixed;
    top: 500px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>

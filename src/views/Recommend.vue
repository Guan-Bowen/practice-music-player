<template>
<div class="recommend">
  <div class="recommend-wrapper">
    <ScrollView>
      <div>
        <Banner :banners="banners"></Banner>
        <Personalized :personalized="personalized" @select="selectItem" :type="'personalized'"></Personalized>
        <Personalized :personalized="album" :title="'最新专辑'" @select="selectItem" :type="'album'"></Personalized>
        <SongList :songs="newSong"></SongList>
      </div>
    </ScrollView>
  </div>
  <transition>
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
import { getBanner, getPersonalized, getNewestAlbum, getNewSong } from '../api/index'
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
import SongList from '../components/Recommend/SongList'
import ScrollView from '../components/ScrollView'

export default {
  name: 'subRecommend',
  data () {
    return {
      banners: [],
      personalized: [],
      album: [],
      newSong: []
    }
  },
  methods: {
    selectItem (id, type) {
      this.$router.push({
        path: ('/recommend/detail/' + id + '/' + type)
      })
      // console.log(this.$route.params)
    }
  },
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView
  },
  created () {
    getBanner().then((data) => { this.banners = data.banners }).catch((err) => { console.log(err) })
    getPersonalized().then((data) => { this.personalized = data.result }).catch((err) => { console.log(err) })
    getNewestAlbum().then((data) => { this.album = data.albums.splice(0, 6) })
    getNewSong().then((data) => { this.newSong = data.result })
  }
}
</script>

<style scoped lang="scss">
// 为了使得 iscroll 生效，需要使得内容高度超过 iscroll 容器的高度（借助固定定位实现）
.recommend{
  position: fixed;
  top: 180px;
  bottom: 0;
  left: 0;
  right: 0;
  // overflow: hidden; // 避免溢出部分盖住 header
  .recommend-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
.v-enter{
  opacity: 0;
}
.v-enter-to{
  opacity: 1;
}
.v-enter-active{
  transition: all 1s;
}
.v-leave{
  opacity: 1;
}
.v-leave-to{
  opacity: 0;
}
.v-leave-active{
  transition: all 1s;
}
</style>

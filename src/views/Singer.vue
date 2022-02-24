<template>
<div class="singer">
  <h3 class="current-header" :class="{'hide-header' : topFlag}">{{currentHeader}}</h3>
  <ScrollView ref="singerScroll">
    <ul class="list-wrapper">
      <li class="list-group" v-for="(list, idx) in singersList" :key="idx" ref="listGroup">
        <h3 class="list-group-header">{{keys[idx]}}</h3>
        <ul>
          <li class="list-group-item" v-for="singer in singersList[idx]" :key="singer.id" @click.stop="selectItem(singer.id)">
            <img v-lazy="singer.img1v1Url" alt="">
            <p>{{singer.name}}</p>
          </li>
        </ul>
      </li>
    </ul>
  </ScrollView>
  <ul class="singer-anchors">
    <li
      v-for="(key, idx) in keys"
      :key="key"
      :class="{'active-anchor' : idx === currentIndex}"
      @touchstart.stop.prevent="touchStart(idx, $event)"
      @touchmove.stop.prevent="touchMove(idx, $event)"
    >
      {{key === '热门歌手' ? '热' : key}}
    </li>
  </ul>
  <transition>
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
// import { getPopularSingers } from '../api/index'
import { getSingersTotal } from '../api/index'
import ScrollView from '../components/ScrollView'
export default {
  name: 'subSinger',
  data: function () {
    return {
      keys: [],
      singersList: [],
      offsetTopOfHeaders: [],
      currentIndex: 0,
      offsetOfTouchStart: 0,
      offsetAfterTouch: 0,
      topFlag: true,
      currentHeader: ''
    }
  },
  methods: {
    _goToHeaderOfKey (idx) {
      const scrollY = -this.offsetTopOfHeaders[idx]
      this.$refs.singerScroll.scrollTo(0, scrollY, 400)
      this.currentIndex = idx
    },
    touchStart (idx, e) {
      // console.log(idx)
      this._goToHeaderOfKey(idx)
      this.offsetOfTouchStart = e.touches[0].pageY
    },
    touchMove (idx, e) {
      this.offsetAfterTouch = e.touches[0].pageY
      const offset = (this.offsetAfterTouch - this.offsetOfTouchStart) / e.target.offsetHeight
      // console.log(offset)
      // const index = parseInt(e.target.dataset.idx) + Math.floor(offset)
      // console.log(index)
      // console.log(idx)
      // console.log(Math.floor(offset))
      let nextIndex = idx + Math.floor(offset)
      if (nextIndex < 0) {
        nextIndex = 0
      } else if (nextIndex > this.singersList.length - 1) {
        nextIndex = this.singersList.length - 1
      }
      this._goToHeaderOfKey(nextIndex)
    },
    selectItem (id, type) {
      this.topFlag = true
      this.$router.push({
        path: ('/singer/detail/' + id + '/singer')
      })
    }
  },
  components: {
    ScrollView
  },
  created () {
    const { keys, singersList } = getSingersTotal()
    this.keys = keys
    this.singersList = singersList
    // getSingersTotal()
    // console.log(keys)
    // console.log(singersList)
  },
  mounted () {
    this.$refs.singerScroll.scrolling((y) => {
      if (y >= 0) {
        this.currentIndex = 0
        this.topFlag = true
        this.currentHeader = this.keys[0]
        return
      }
      this.topFlag = false
      for (let i = 0; i < this.offsetTopOfHeaders.length - 1; ++i) {
        const previousTop = this.offsetTopOfHeaders[i]
        const nextTop = this.offsetTopOfHeaders[i + 1]
        if (-y >= previousTop && -y <= nextTop) {
          this.currentIndex = i
          this.currentHeader = this.keys[i]
          return
        }
      }
      this.currentIndex = this.offsetTopOfHeaders.length - 1
      this.currentHeader = this.keys[this.keys.length - 1]
    })
  },
  watch: {
    singersList () {
      this.$nextTick(() => {
        if (!this.$refs.listGroup) {
          return
        }
        this.offsetTopOfHeaders = []
        // console.log(this.$refs.listGroup)
        this.$refs.listGroup.forEach((elem) => {
          this.offsetTopOfHeaders.push(elem.offsetTop)
        })
        // console.log(this.offsetTopOfHeaders)
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
.singer{
  overflow: hidden;
  position: fixed;
  top: 180px;
  bottom: 0;
  right: 0;
  left: 0;
  @include bg_sub_color();
  .current-header{
    color:#fff;
    padding: 15px 30px;
    box-sizing: border-box;
    @include bg_color();
    @include font_size($font_medium_s);
    position: fixed;
    z-index: 100;
    top: 180px;
    left: 0;
    right: 0;
    &.hide-header{
      display: none;
    }
  }
  .list-wrapper{
    .list-group{
      .list-group-header{
        color:#fff;
        padding: 15px 30px;
        box-sizing: border-box;
        @include bg_color();
        @include font_size($font_medium_s);
      }
      ul{
        .list-group-item{
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 10px 20px;
          border-bottom: 1px solid #999;
          img{
            width: 90px;
            height: 90px;
            border-radius: 50%;
            overflow: hidden;
            margin: 15px 40px 15px 0;
          }
          p{
            @include font_size($font_medium_s);
            @include font_color();
            display: flex;
            justify-content: center;
          }
        }
      }
    }
  }
  .singer-anchors{
    position: fixed;
    top: 58%;
    right: 0;
    transform: translateY(-50%);
    @include font_size($font_small);
    @include font_color();
    text-align: center;
    li{
      padding: 2px 10px 2px 0;
      &.active-anchor{
        // text-shadow: 0 0 10px #000;
        font-weight: 1000;
        // color: #e5e5e5;
        @include font_active_color()
      }
    }
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

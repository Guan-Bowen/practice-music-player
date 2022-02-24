<template>
<div class="rank">
  <ScrollView>
    <ul>
      <li v-for="(title, key) in rankList.titles" :key="key">
        <h3 class="rank-title">{{title}}</h3>
        <ul v-if="title === '官方榜'" class="official">
          <li v-for="obj in rankList[key]" :key="obj.rank.id" @click.stop="selectRank(obj.id)">
            <div class="rank-left-img">
              <img v-lazy="obj.rank.coverImgUrl" alt="">
              <p>{{obj.rank.updateFrequency}}</p>
            </div>
            <div class="rank-right-msg">
              <p v-for="(song, idx) in obj.rank.tracks" :key="song.first">
                {{idx + 1}}. {{song.first}} - {{song.second}}
              </p>
            </div>
          </li>
        </ul>
        <ul v-else class="except-official">
          <li v-for="obj in rankList[key]" :key="obj.rank.id" @click.stop="selectRank(obj.id)">
            <div class="rank-top-img">
              <img v-lazy="obj.rank.coverImgUrl" alt="">
              <p>{{obj.rank.updateFrequency}}</p>
            </div>
            <div class="rank-bottom-name">
              <p>{{obj.rank.name}}</p>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </ScrollView>
  <transition>
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
import { getRankLists } from '../api/index'
import ScrollView from '../components/ScrollView'
export default {
  name: 'subRank',
  data: function () {
    return {
      rankList: {}
    }
  },
  created () {
    getRankLists().then((rankList) => {
      // console.log(rankList)
      this.rankList = rankList
    })
  },
  methods: {
    selectRank (id) {
      this.$router.push('rank/detail/' + id + '/rank')
    }
  },
  components: {
    ScrollView
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
@import "../assets/css/variable";
.rank{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 180px;
  overflow: hidden;
  //background-color: pink;
  @include bg_sub_color();
  .rank-title{
    padding: 10px 30px;
    @include font_color();
    @include font_size($font_medium_s);
    font-weight: bold;
  }
  .official{
    li{
      display: flex;
      padding: 10px 25px;
      box-sizing: border-box;
      .rank-left-img{
        position: relative;
        img{
          width: 200px;
          height: 200px;
          border-radius: 20px;
        }
        p{
          position: absolute;
          left: 10px;
          bottom: 10px;
          color: #fff;
          @include font_size($font_small_s)
        }
      }
      .rank-right-msg{
        display: flex;
        flex-direction: column;
        justify-content: center;
        p{
          margin: 8px 15px;
          @include font_color();
          @include font_size($font_small);
        }
      }
    }
  }
  .except-official{
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    li{
      padding: 10px 25px;
      box-sizing: border-box;
      .rank-top-img{
        position: relative;
        img{
          width: 200px;
          height: 200px;
          border-radius: 20px;
        }
        p{
          position: absolute;
          left: 10px;
          bottom: 10px;
          color: #fff;
          @include font_size($font_small_s)
        }
      }
      .rank-bottom-name{
        width: 200px;
        @include no_wrap();
        p{
          padding: 10px 0;
          @include font_color();
          @include font_size($font_small);
        }
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

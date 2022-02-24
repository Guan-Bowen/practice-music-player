<template>
<div class="search">
  <div class="search-box">
    <img src="../assets/images/search-icon.png" alt="" class="search-icon">
    <input type="text" placeholder="搜索专辑、歌曲、歌手..." v-model="keywords" v-throttle="search" autofocus>
    <img src="../assets/images/list_remove_icon@3x.png" alt="" class="blank-icon" @click.stop="setBlank">
  </div>
  <div class="search-list" v-show="keywords !== ''">
    <ScrollView>
      <ul>
        <li v-for="song in searchResults" :key="song.id" @click="selectItem(song.id)">
          <img src="../assets/images/search-icon.png" alt="">
          <p>{{song.name}} - {{song.artists[0].name}}</p>
        </li>
      </ul>
    </ScrollView>
  </div>
  <div class="search-hot">
    <h3>热门搜索</h3>
    <ul>
      <li v-for="hot in searchHot" :key="hot.first" @click="setItemToInput(hot.first)">{{hot.first}}</li>
    </ul>
  </div>
  <ul class="search-history">
    <h3>搜索历史</h3>
    <li v-for="history in historySearch" :key="history" @click="setItemToInput(history)">
      <div class="search-history-text">
        <img src="../assets/images/history_icon.png" alt="">
        <p>{{history}}</p>
      </div>
      <div class="search-history-delete" @click.stop="deleteHistoryItem(history)">
        <img src="../assets/images/delete_icon@3x.png" alt="">
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import ScrollView from '../components/ScrollView'
import { getSearchResults, getSearchHot } from '../api/index'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'subSearch',
  components: {
    ScrollView
  },
  data: function () {
    return {
      keywords: '',
      searchResults: [],
      searchHot: []
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'historySearch'
    ])
  },
  created () {
    getSearchHot().then((data) => {
      // console.log(data)
      this.searchHot = data.result.hots
    }).catch((err) => console.log(err))
    const searchHistoryList = JSON.parse(window.localStorage.getItem('searchHistoryList'))
    if (searchHistoryList) {
      this.setHistorySearchFromLocalStorage(searchHistoryList)
    }
  },
  methods: {
    ...mapActions([
      'setPlayerState',
      'setSongs',
      'setPlayingState',
      'addNewSearch',
      'setHistorySearchFromLocalStorage'
    ]),
    setBlank () {
      this.keywords = ''
    },
    deleteHistoryItem (item) {
      const index = this.historySearch.indexOf(item)
      this.historySearch.splice(index, 1)
    },
    setItemToInput (msg) {
      this.keywords = msg
      this.search()
    },
    selectItem (id) {
      const index = this.historySearch.indexOf(this.keywords)
      if (index >= 0) {
        this.historySearch.splice(index, 1)
      }
      this.historySearch.unshift(this.keywords)
      if (this.historySearch.length > 5) {
        this.historySearch.splice(this.historySearch.length - 1)
      }
      this.setPlayerState(true)
      this.setSongs([id])
      if (this.isPlaying) {
        this.setPlayingState(false)
      }
    },
    search () {
      getSearchResults({ keywords: this.keywords })
        .then((data) => {
          // console.log(data)
          this.searchResults = data.result.songs
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  directives: {
    throttle: {
      inserted: function (el, obj) {
        let timer = null
        let flag = true
        el.addEventListener('input', function () {
          if (!flag) {
            return
          }
          flag = false
          timer && clearTimeout(timer)
          timer = setTimeout(function () {
            flag = true
            obj.value()
          }, 500)
        })
      }
    }
  },
  watch: {
    historySearch (newValue, oldValue) {
      window.localStorage.setItem('searchHistoryList', JSON.stringify(newValue))
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/css/mixin';
@import '../assets/css/variable';
.search{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 180px;
  //background-color: pink;
  @include bg_sub_color();
  .search-box{
    display: flex;
    align-items: center;
    margin: 40px 30px;
    background-color: #dedede;
    border-radius: 40px;
    height: 80px;
    border-bottom: 1px solid #bfbfbf;
    position: relative;
    z-index: 1000;
    .search-icon{
      width: 45px;
      height: 45px;
      margin: 0 20px;
    }
    input{
      border: none;
      outline: none;
      background: transparent;
      @include font_size($font_medium_s);
    }
    .blank-icon{
      width: 40px;
      height: 40px;
      position: absolute;
      right: 0;
      padding-right: 25px;
    }
  }
  .search-list{
    position: fixed;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: 0;
    top: 320px;
    overflow: hidden;
    @include bg_sub_color();
    li{
      display: flex;
      align-items: center;
      padding: 18px 30px;
      box-sizing: border-box;
      border-bottom: 1px solid #bfbfbf;
      &:first-of-type{
        border-top: 1px solid #bfbfbf;
      }
      img{
        height: 45px;
        width: 45px;
      }
      p{
        margin-left: 20px;
        @include font_color();
        @include font_size($font_medium_s);
      }

    }

  }
  .search-hot{
    h3{
      @include font_color();
      @include font_size($font_medium);
      padding: 10px 30px;
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      padding-left: 10px;
      li{
        border-radius: 22px;
        height: 44px;
        line-height: 44px;
        border: 3px solid #bfbfbf;
        padding: 0 20px;
        @include font_size($font_small);
        @include font_color();
        margin: 10px 20px;
      }
    }
  }
  .search-history{
    overflow: hidden;
    position: relative;
    margin-left: 30px;
    margin-top: 30px;
    @include font_size($font_medium);
    @include font_color();
    li{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 40px 0 0;
      .search-history-text{
        display: flex;
        align-items: center;
        @include font_size($font_medium_s);
        img{
          width: 45px;
          height: 45px;
        }
        p{
          padding-left: 20px;
        }
      }
      .search-history-delete{
        img{
          width: 50px;
          height: 50px;
        }
      }
    }

  }
}
</style>

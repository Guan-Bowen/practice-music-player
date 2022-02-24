import Vue from 'vue'
import Vuex from 'vuex'
import mode from './mode'
import { getSongDetail, getSongLyric, getSongUrl } from '../api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showPlayerNormal: false,
    showPlayerMini: false,
    showPlayerList: false,
    isPlaying: false,
    playMode: mode.listLoop,
    songs: [],
    currentIndex: 0,
    currentSong: {},
    currentSongLyric: {},
    customizedCurrentRate: 0,
    likeList: [],
    historyList: [],
    historySearch: []
  },
  mutations: {
    changePlayerState (state, flag) {
      state.showPlayerNormal = flag
    },
    changeMiniPlayerState (state, flag) {
      state.showPlayerMini = flag
    },
    changeListPlayerState (state, flag) {
      state.showPlayerList = flag
    },
    changePlayingState (state, flag) {
      state.isPlaying = flag
    },
    changePlayMode (state, flag) {
      state.playMode = flag
    },
    changeSongs (state, songList) {
      state.songs = songList
    },
    changeSongLyric (state, lyric) {
      state.currentSongLyric = lyric
    },
    removeSong (state, idx) {
      if (idx) {
        state.songs.splice(idx, 1)
      } else {
        state.songs.splice(0, state.songs.length)
      }
      if (idx < state.currentIndex) {
        state.currentIndex--
      }
      if (state.songs.length === 0) {
        state.showPlayerNormal = false
        state.showPlayerMini = false
        state.showPlayerList = false
      }
    },
    changeCurrentIndex (state, idx) {
      state.currentIndex = idx
    },
    customizeCurrentRate (state, rate) {
      state.customizedCurrentRate = rate
    },
    appendSongToLike (state, song) {
      const result = state.likeList.find(function (s) {
        return s.id === song.id
      })
      if (!result) {
        state.likeList.push(song)
      }
    },
    removeSongFromLike (state, song) {
      // const result = state.likeList.find(function (s) {
      //   return s === song
      // })
      // if (result) {
      //   console.log('Failed to remove')
      //   return false
      // } else {
      // console.log('Succeeded to find')
      // const index = state.likeList.indexOf(song)
      // console.log('index: ', index)
      // state.likeList.splice(index, 1)
      // }
      state.likeList.forEach(function (s, idx) {
        if (s.id === song.id) {
          state.likeList.splice(idx, 1)
        }
      })
    },
    loadLikeListFromLocalStorage (state, list) {
      state.likeList = list
    },
    loadHistoryListFromLocalStorage (state, list) {
      state.historyList = list
    },
    appendSongToHistory (state, song) {
      const result = state.historyList.find(function (s) {
        return s.id === song.id
      })
      if (!result) {
        if (state.historyList.length >= 30) {
          state.historyList.splice(0, 1)
        }
        state.historyList.push(song)
      }
    },
    loadHistorySearchFromLocalStorage (state, list) {
      state.historySearch = list
    },
    appendSearchToHistory (state, search) {
      const idx = state.historySearch.indexOf(search)
      if (idx >= 0) {
        state.historySearch.splice(idx, 1)
      }
      state.historySearch.push(search)
    }
  },
  actions: {
    setPlayerState ({ commit }, flag) {
      commit('changePlayerState', flag)
    },
    setMiniPlayerState ({ commit }, flag) {
      commit('changeMiniPlayerState', flag)
    },
    setListPlayerState ({ commit }, flag) {
      commit('changeListPlayerState', flag)
    },
    setPlayingState ({ commit }, flag) {
      commit('changePlayingState', flag)
    },
    setPlayMode ({ commit }, flag) {
      commit('changePlayMode', flag)
    },
    async setSongs ({ commit }, ids) {
      // console.log(ids)
      const list = []
      const urls = await getSongUrl(ids.join(','))
      const result = await getSongDetail(ids.join(','))
      // console.log(urls)
      // console.log(result)
      result.songs.forEach(function (elem) {
        const obj = {}
        obj.name = elem.name
        // 由于是异步请求，多个歌曲同时请求返回顺序可能不一致，如下的直接赋值可能导致对应关系混乱
        // obj.url = urls.data[idx].url
        for (let i = 0; i < urls.data.length; ++i) {
          if (elem.id === urls.data[i].id) {
            obj.url = urls.data[i].url
            break
          }
        }
        // console.log(obj.url)
        let singers = ''
        elem.ar.forEach(function (item, idx) {
          if (idx === 0) {
            singers += item.name
          } else {
            singers += (' | ' + item.name)
          }
        })
        obj.singers = singers
        obj.picUrl = elem.al.picUrl
        obj.id = elem.id
        list.push(obj)
        // console.log(obj)
      })
      // console.log(list)
      commit('changeSongs', list)
    },
    async setSongsByList ({ commit }, obj) {
      const { songList, ids } = obj
      // console.log(songList)
      const urls = await getSongUrl(ids.join(','))
      // console.log(urls)
      for (let j = 0; j < songList.length; ++j) {
        for (let i = 0; i < urls.data.length; ++i) { // 更新过期的 url
          if (songList[j].id === urls.data[i].id) {
            songList[j].url = urls.data[i].url
            break
          }
        }
      }
      // console.log(songList)
      commit('changeSongs', songList)
    },
    async setSongLyric ({ commit }, id) {
      if (!id) { return }
      const result = await getSongLyric(id)
      // console.log(typeof result.lrc.lyric)
      const obj = parseLyric(result.lrc.lyric)
      // console.log(obj)
      commit('changeSongLyric', obj)
    },
    deleteSongByIndex ({ commit }, idx) {
      if (idx) {
        commit('removeSong', idx)
      } else {
        commit('removeSong')
      }
    },
    setCurrentIndex ({ commit }, idx) {
      commit('changeCurrentIndex', idx)
    },
    setCurrentRate ({ commit }, rate) {
      commit('customizeCurrentRate', rate)
    },
    addNewLike ({ commit }, song) {
      commit('appendSongToLike', song)
    },
    removePreviousLike ({ commit }, song) {
      commit('removeSongFromLike', song)
    },
    setLikeListFromLocalStorage ({ commit }, list) {
      commit('loadLikeListFromLocalStorage', list)
    },
    setHistoryListFromLocalStorage ({ commit }, list) {
      commit('loadHistoryListFromLocalStorage', list)
    },
    addNewHistory ({ commit }, song) {
      commit('appendSongToHistory', song)
    },
    addNewSearch ({ commit }, search) {
      commit('appendSearchToHistory', search)
    },
    setHistorySearchFromLocalStorage ({ commit }, list) {
      commit('loadHistorySearchFromLocalStorage', list)
    }
  },
  modules: {},
  getters: {
    isShowingPlayerNormal (state) {
      return state.showPlayerNormal
    },
    isShowingPlayerMini (state) {
      return state.showPlayerMini
    },
    isShowingPlayerList (state) {
      return state.showPlayerList
    },
    isPlaying (state) {
      return state.isPlaying
    },
    playMode (state) {
      return state.playMode
    },
    songs (state) {
      return state.songs
    },
    currentSong (state) {
      if (state.songs.length === 0) {
        return {
          name: '',
          singers: '',
          picUrl: '',
          id: ''
        }
      }
      return state.songs[state.currentIndex]
    },
    currentSongLyric (state) {
      return state.currentSongLyric
    },
    currentIndex (state) {
      return state.currentIndex
    },
    customizedCurrentRate (state) {
      return state.customizedCurrentRate
    },
    likeList (state) {
      return state.likeList
    },
    historyList (state) {
      return state.historyList
    },
    historySearch (state) {
      return state.historySearch
    }
  }
})

function parseLyric (lyricString) { // 歌词字符串转换为歌词对象
  // console.log(typeof lyricString)
  const lyrics = lyricString.split('\n') // 按照换行符切分为每一句
  const regTime = /\[\d*:\d*\.\d*\]/g // 提取 [xx:xx:xxx] 前方时间字符串的正则规则
  const regTimeSub1 = /\[\d*/i // 提取时间第一部分
  const regTimeSub2 = /\:\d*/i // 提取时间第二部分
  const lyricObj = {}
  lyrics.forEach(function (lyric) {
    let time = lyric.match(regTime)
    if (!time) { return }
    // console.log(time)
    time = time[0]
    const minute = time.match(regTimeSub1)[0].substr(1) // 分钟部分
    const second = time.match(regTimeSub2)[0].substr(1) // 秒钟部分
    const computedSecond = parseInt(minute) * 60 + parseInt(second) // 转化成秒
    const lyricText = lyric.replace(regTime, '').trim() // 去掉时间前缀部分，以及首位空格
    lyricObj[computedSecond] = lyricText
  })
  return lyricObj
}

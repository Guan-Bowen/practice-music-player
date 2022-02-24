// 处理请求接口地址
import Network from './network'

// 请求网易云音乐的 Banner，接口 banner
export const getBanner = () => Network.get('banner?type=2')
// 推荐歌单：接口 personalized，可以接 query limit=xxx，默认 30 个
export const getPersonalized = () => Network.get('personalized?limit=6')
// 最新专辑：接口 album/newest
export const getNewestAlbum = () => Network.get('album/newest')
// 最新音乐：接口 personalized/newsong
export const getNewSong = () => Network.get('personalized/newsong')
// 根据音乐 id 获取其详细信息
export const getSongInfo = (id) => Network.get('playlist/detail?id=' + id)
// 根据专辑 id 获取其详细信息
export const getAlbumInfo = (id) => Network.get('album?id=' + id)
// 根绝歌曲 id 获取其详细信息
export const getSongDetail = (id) => Network.get('song/detail?ids=' + id)
// 根据歌曲 id 获取其歌词信息
export const getSongLyric = (id) => Network.get('lyric?id=' + id)
// 根据歌曲 id 获取其歌曲播放地址
export const getSongUrl = (id) => Network.get('song/url?id=' + id)
// 获取热门歌手列表
const getPopularSingers = () => {
  return new Promise((resolve, reject) => {
    Network.get('top/artists?offset=0&limit=10')
      .then((data) => { resolve(data.artists) })
      .catch((err) => { reject(err) })
  })
}
// 按照索引顺序获取歌手列表
const getSingersByIndex = (idx) => {
  return new Promise((resolve, reject) => {
    Network.get('artist/list?limit=10&type=-1&area=-1&initial=' + idx).then((data) => {
      // console.log(data[0].artists)
      resolve(data.artists)
    }).catch((err) => {
      reject(err)
    })
  })
}
// 整合返回热门 & 索引排序的所有歌手的列表
export const getSingersTotal = () => {
  const keys = ['热门歌手']
  const singersList = []
  getPopularSingers().then((data) => {
    singersList.push(data)
  }).catch((err) => console.log(err))
  for (let i = 65; i < 91; ++i) {
    const key = String.fromCharCode(i)
    keys.push(key)
    getSingersByIndex(key).then((data) => {
      singersList.push(data)
    }).catch((err) => console.log(err))
  }
  return { keys, singersList }
}
// 根据歌手 id 获取歌手详情
export const getSingerInfo = (id) => Network.get('artists?id=' + id)
// 获取榜单摘要
export const getRankLists = () => {
  const RankListSort = {
    officialList: [
      { name: '热歌榜', id: 3778678 },
      { name: '新歌榜', id: 3779629 },
      { name: '飙升榜', id: 19723756 },
      { name: '原创榜', id: 22884035 }
    ],
    recList: [
      { name: '云音乐说唱榜', id: 991319590 },
      { name: '云音乐电音榜', id: 1978921795 },
      { name: '云音乐日语榜', id: 5059644681 },
      { name: '云音乐韩语榜', id: 745956260 },
      { name: '云音乐ACG榜', id: 71385702 },
      { name: '云音乐古典榜', id: 71384707 }
    ],
    globalList: [
      { name: '美国Billboard榜', id: 60198 },
      { name: 'UK排行榜周榜', id: 180106 },
      { name: 'Beatport全球电子舞曲榜', id: 3812895 },
      { name: '日本Oricon榜', id: 60131 },
      { name: '法国 NRJ Vos Hits 周榜', id: 27135204 }
    ],
    otherList: [
      { name: 'KTV唛榜', id: 21845217 },
      { name: '云音乐摇滚榜', id: 5059633707 },
      { name: '云音乐古风榜', id: 5059642708 },
      { name: '潜力爆款榜', id: 5338990334 },
      { name: '云音乐欧美新歌榜', id: 2809577409 },
      { name: '云音乐欧美热歌榜', id: 2809513713 }
    ],
    titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
  }
  return new Promise((resolve, reject) => {
    Network.get('toplist/detail').then((data) => {
      // console.log(data)
      data.list.forEach(function (item) {
        for (const key in RankListSort) {
          for (let i = 0; i < RankListSort[key].length; ++i) {
            if (RankListSort[key][i].name === item.name) {
              RankListSort[key][i].rank = item
              break
            }
          }
          if (RankListSort[key].rank) {
            break
          }
        }
      })
      resolve(RankListSort)
    }).catch((err) => {
      reject(err)
    })
  })
}
// 根据榜单 id 获取特定榜单信息
export const getRankInfo = (id) => Network.get('playlist/detail?id=' + id)
// 根据关键词搜索
export const getSearchResults = (keywords) => Network.get('search?keywords=' + keywords.keywords)
// 获取热门搜索信息
export const getSearchHot = () => Network.get('search/hot')

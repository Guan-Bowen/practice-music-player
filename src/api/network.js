import axios from 'axios'

// Global setting: Base URL & Timeout
axios.defaults.baseURL = 'http://59.110.229.119:3003'
axios.defaults.timeout = 3000

// Get & Post methods
// get & post 方法传参：前者需要将 data 作为 params 传递，后者直接给出一个对象
export default {
  get: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.get(path, {
        params: data
        // withCredentials: true
      }).then((resp) => resolve(resp.data))
        .catch((err) => reject(err))
    })
  },
  getAll: function (params) {
    return new Promise(function (resolve, reject) {
      axios.all(params)
        .then(axios.spread(function (...datas) { resolve(datas) }))
        .catch((err) => reject(err))
    })
  },
  post: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.post(path, data).then((resp) => resolve(resp.data))
        .catch((err) => reject(err))
    })
  }
}

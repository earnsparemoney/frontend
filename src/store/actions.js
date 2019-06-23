import axios from 'axios'
export default {
  login ({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      axios.get(
        '/api/user/login',
        {
          params: {
            'account': username,
            'password': password
          }
        }
      ).then(res => {
        commit('setUsername', res.data.data[0].account)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

import axios from 'axios'
export default {
  login ({ commit }, { account, password }) {
    return new Promise((resolve, reject) => {
      console.log(account)
      axios.get(
        '/api/user/login',
        {
          params: {
            account,
            password
          }
        }
      ).then(res => {
        commit('setUserInfo', res.data.data[0])
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  register ({ dispatch, commit }, { account, password, phone, email }) {
    return new Promise((resolve, reject) => {
      axios.post(
        '/api/user',
        {
          account,
          password,
          phone,
          email
        }
      ).then(() => {
        dispatch('login', { account, password })
          .then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
    })
  }
}

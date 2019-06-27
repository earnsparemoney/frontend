import authService from '@/services/authService'

export default {
  login ({ commit }, { account, password }) {
    return new Promise((resolve, reject) => {
      authService.login({
        account,
        password
      }).then(res => {
        commit('setUserInfo', res.data.user)
        commit('setToken', res.data.token)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  register ({ dispatch, commit }, { username, password, phone, email }) {
    return new Promise((resolve, reject) => {
      authService.register({
        username,
        password,
        phone,
        email
      }).then(res => {
        console.log(res.data)
        console.log(commit)
        commit('setUserInfo', res.data.user)
        commit('setToken', res.data.token)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  logout ({ commit }) {
    commit('logout')
  },
  updateState ({ commit }, { userInfo, token }) {
    commit('setUserInfo', userInfo)
    commit('setToken', token)
  }
}

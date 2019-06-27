export default {
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },
  setToken (state, token) {
    state.token = token
  },
  logout (state) {
    state.userInfo = null
    state.token = null
  },
  getMoney (state, value) {
    state.userInfo.balance += parseInt(value)
  }
}

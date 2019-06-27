export default {
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
    sessionStorage.userInfo = JSON.stringify(userInfo)
  },
  setToken (state, token) {
    state.token = token
    sessionStorage.token = token
  },
  logout (state) {
    state.userInfo = null
    state.token = null
    sessionStorage.token = null
    sessionStorage.userInfo = null
  },
  getMoney (state, value) {
    state.userInfo.balance += parseInt(value)
  }
}

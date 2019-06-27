export default {
  userInfo: (sessionStorage.getItem('userInfo') !== 'null') ? JSON.parse(sessionStorage.getItem('userInfo')) : null,
  token: (sessionStorage.getItem('token') !== 'null') ? sessionStorage.getItem('token') : null
}

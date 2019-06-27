export default {
  userInfo: typeof sessionStorage !== 'undefined' && (sessionStorage.getItem('userInfo') !== 'null') ? JSON.parse(sessionStorage.getItem('userInfo')) : null,
  token: typeof sessionStorage !== 'undefined' && (sessionStorage.getItem('token') !== 'null') ? sessionStorage.getItem('token') : null
}

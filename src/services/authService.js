import api from '@/services/api'

export default {
  /**
   * authService.register({
   *   email: 'example@qq.com',
   *   password: 'example'
   * })
   * @param {*} credentials
   */
  register (credentials) {
    return api().post('user', credentials)
  },
  login (credentials) {
    return api().post('user/login', credentials)
  },
  getUserInfo (id) {
    return api().get('user/' + id)
  },
  updateUser (data, token) {
    var config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
      }
    }
    return api().put('user', data, config)
  },
  updateImage (imgname, data, token) {
    var config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
      }
    }
    return api().put('user/icon/' + imgname, data, config)
  }
}

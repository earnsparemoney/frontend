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
  updateImage (imgname, data, token) {
    var config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
      }
    }
    return api().put('user/icon/' + imgname, data, config)
  }
}

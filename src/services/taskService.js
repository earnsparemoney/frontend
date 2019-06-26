import api from '@/services/api'

export default {
  /**
   * authService.register({
   *   email: 'example@qq.com',
   *   password: 'example'
   * })
   * @param {*} credentials
   */
  getTasks () {
    return api().get('tasks')
  },
  getParticipatePosts (id) {
    return api().get('articles/user/' + id)
  },
  getTask (id) {
    return api().get('tasks/' + id)
  },
  addTask (data, token) {
    return api().post('tasks', data, {
      headers: {
        'Authorization': token
      }
    })
  },
  deleteTask (id, token) {
    return api().post('tasks/' + id, {
      headers: {
        'Authorization': token
      }
    })
  },
  completeTask (id, token) {
    return api().post('tasks/' + id, {
      headers: {
        'Authorization': token
      }
    })
  },
  participateTask (id, token) {
    return api().post('tasks/' + id + '/participant/', {
      headers: {
        'Authorization': token
      }
    })
  },
  deleteParticipant (id, token) {
    return api().post('tasks/' + id + '/participant/', {
      headers: {
        'Authorization': token
      }
    })
  },
  finishTask (id, token) {
    return api().post('tasks/' + id + '/participant/', {
      headers: {
        'Authorization': token
      }
    })
  }
}

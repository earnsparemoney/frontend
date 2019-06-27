import api from '@/services/api'

export default {
  getTasks (page, pageSize) {
    return api().get('tasks', {
      params: {
        page,
        pageSize
      }
    })
  },
  getParticipateDoneTasks (id, page, pageSize) {
    return api().get('tasks/user/' + id + '/finish', {
      params: {
        page,
        pageSize
      }
    })
  },
  getParticipateRunningTasks (id, page, pageSize) {
    return api().get('tasks/user/' + id + '/running', {
      params: {
        page,
        pageSize
      }
    })
  },
  getPublishedTask (token, page, pageSize) {
    return api().get('tasks/user', {
      headers: {
        'Authorization': token
      },
      params: {
        page,
        pageSize
      }
    })
  },
  addTask (data, token) {
    return api().post('tasks', data, {
      headers: {
        'Authorization': token
      }
    })
  },
  deleteTask (id, token) {
    return api().delete('tasks/' + id, {
      headers: {
        'Authorization': token
      }
    })
  },
  completeTask (id, token) {
    return api().post('task/' + id + '/finish', null, {
      headers: {
        'Authorization': token
      }
    })
  },
  participateTask (id, token) {
    return api().post('task/' + id + '/participate', null, {
      headers: {
        'Authorization': token
      }
    })
  },
  deleteParticipant (id, token) {
    return api().delete('tasks/' + id + '/participate', {
      headers: {
        'Authorization': token
      }
    })
  }
}

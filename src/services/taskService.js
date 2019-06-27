import api from '@/services/api'

export default {
  getTasks () {
    return api().get('tasks')
  },
  getParticipateDoneTasks (id) {
    return api().get('tasks/user/' + id + '/finish')
  },
  getParticipateRunningTasks (id) {
    return api().get('tasks/user/' + id + '/running')
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

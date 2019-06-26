import api from '@/services/api'

export default {
  getQuestionnaires () {
    return api().get('questionnaires')
  },
  commitAnswer (id, token) {
    return api().post('questionnaires/' + id + '/participant', {
      headers: {
        'Authorization': token
      }
    })
  },
  getQuestionnaire (id) {
    return api().get('questionnaires/' + id)
  },
  addQuestionnaire (data, token) {
    return api().post('questionnaires', data, {
      headers: {
        'Authorization': token
      }
    })
  }
}

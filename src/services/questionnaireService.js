import api from '@/services/api'

export default {
  getQuestionnaires () {
    return api().get('questionnaires')
  },
  commitAnswer (id, token, answer) {
    return api().post('questionnaires/' + id, answer, {
      headers: {
        'Authorization': token
      }
    })
  },
  getQuestionnaire (id) {
    return api().get('questionnaire/' + id)
  },
  addQuestionnaire (data, token) {
    return api().post('questionnaires', data, {
      headers: {
        'Authorization': token
      }
    })
  },
  getPublishedQuestionnaires (token) {
    return api().get('questionnaires/user', {
      headers: {
        'Authorization': token
      }
    })
  },
  deleteQuestionnaire (id, token) {
    return api().delete('questionnaires/' + id, {
      headers: {
        'Authorization': token
      }
    })
  }
}

import api from '@/services/api'

export default {
  getQuestionnaires (page, pageSize) {
    return api().get('questionnaires', {
      params: {
        page,
        pageSize
      }
    })
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
  getPublishedQuestionnaires (token, page, pageSize) {
    return api().get('questionnaires/user', {
      headers: {
        'Authorization': token
      },
      params: {
        page,
        pageSize
      }
    })
  },
  deleteQuestionnaire (id, token) {
    return api().delete('questionnaires/' + id, {
      headers: {
        'Authorization': token
      }
    })
  },
  getQuestionnaireResult (id, token) {
    return api().get('results/' + id, {
      headers: {
        'Authorization': token
      }
    })
  }
}

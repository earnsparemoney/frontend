<template>
  <div class="questionnaire">
    <div class="content">
      <p v-if="questionnaires.length == 0">暂时没有发布的问卷哦</p>
      <questionnaire-card
        class="card"
        v-for="(item, index) of questionnaires"
        :key="index"
        :item="item"
        @delete="deleteQuestionnaire(item.id)"/>
      <div class="card"/>
      <div class="card"/>
      <div class="card"/>
      <div class="card"/>
    </div>
  </div>
</template>

<script>
import QuestionnaireCard from '@/components/QuestionnaireCard.vue'
import questionnaireService from '../../services/questionnaireService'
export default {
  name: 'PublishedQuestionnaire',
  components: {
    QuestionnaireCard
  },
  data () {
    return {
      questionnaires: []
    }
  },
  methods: {
    fetchData () {
      questionnaireService.getPublishedQuestionnaires(this.$store.state.token)
        .then((res) => {
          this.questionnaires = res.data.questionnaires
        }).catch((err) => {
          console.log(err.response)
        })
    },
    deleteQuestionnaire (id) {
      questionnaireService.deleteQuestionnaire(id, this.$store.state.token)
        .then((res) => {
          this.message.info('删除成功')
          this.fetchData()
        }).catch((err) => {
          console.log(err)
          this.message.error('删除失败')
        })
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="stylus" scoped>
@media (min-width 1200px)
  .questionnaire
    padding 15px 15px
    .content
      display flex
      justify-content space-between
      flex-direction row
      flex-wrap wrap
      .card
        width 24%
        margin-top 10px
@media (min-width 576px) and (max-width 1200px)
  .questionnaire
    padding 15px 15px
    .content
      display flex
      justify-content space-between
      flex-direction row
      flex-wrap wrap
      .card
        width 32%
        margin-top 10px
@media (max-width 576px)
  .questionnaire
    padding 15px 15px
    .card
      margin-top 20px
</style>

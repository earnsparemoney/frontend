<template>
  <div class="allquestionnaires">
    <option-bar
      :routeName="'questionnaires'"
      :type="'问卷'"/>
    <loading :loading="loading"></loading>
    <div class="content">
      <questionnaire-card
        class="card"
        v-for="(item, index) of filteredList"
        :key="index"
        :item="item"
        @click.native="handleCardClick(item.id)"
        @delete="deleteQuestionnaire(item.id)"/>
      <div class="card"/>
      <div class="card"/>
      <div class="card"/>
      <div class="card"/>
    </div>
  </div>
</template>

<script>
import QuestionnaireCard from '@/components/QuestionnaireCard'
import OptionBar from '@/components/OptionBar'
import questionnaireService from '@/services/questionnaireService'

export default {
  name: 'Questionnaires',
  components: {
    QuestionnaireCard,
    OptionBar
  },
  watch: {
    '$route.query.sortBy': 'updateQuery',
    '$route.query.keyword': 'updateQuery'
  },
  data () {
    return {
      questionnaires: [],
      sortBy: '创建时间',
      keyword: '',
      loading: true
    }
  },
  computed: {
    filteredList () {
      return this.questionnaires
        .filter(item =>
          ((item.title.toLowerCase().indexOf(this.keyword) !== -1) ||
            (item.description.toLowerCase().indexOf(this.keyword)) !== -1))
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      questionnaireService.getQuestionnaires()
        .then((res) => {
          this.questionnaires = res.data.questionnaires
          for (let i = 0; i < this.questionnaires.length; i++) {
            this.questionnaires[i].questions = JSON.parse(this.questionnaires[i].questions)
          }
          this.loading = false
        }).catch((err) => {
          console.log(err)
          this.message.error('获取失败请检查网络')
          this.loading = false
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
    },
    handleCardClick (index) {
      this.$router.push('/questionnaire/' + index)
    },
    updateQuery () {
      this.sortBy = this.$route.query.sortBy || 'startTime'
      this.keyword = (this.$route.query.keyword || '').toLowerCase()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .option-label
    margin 0 10px 0 15px
  .create-btn
    float right
  .content
    overflow scroll
  @media (min-width 1200px)
    .allquestionnaires
      height 100%
      background-color #ecf1f1
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
    .allquestionnaires
      height 100%
      padding 15px 15px
      background-color #ecf1f1
      .content
        display flex
        justify-content space-between
        flex-direction row
        flex-wrap wrap
        .card
          width 32%
          margin-top 10px
  @media (max-width 576px)
    .allquestionnaires
      height 100%
      background-color #ecf1f1
      padding 15px 15px
      .card
        margin-top 20px
</style>

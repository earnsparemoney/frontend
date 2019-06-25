<template>
  <div class="allquestionnaires">
    <option-bar
      :routeName="'questionnaires'"
      :type="'问卷'"/>
    <div class="content">
      <questionnaire-card
        class="card"
        v-for="(item, index) of filteredList"
        :key="index"
        :title="item.title"
        :description="item.description"/>
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
      keyword: ''
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
  created () {
    this.questionnaires = this.fetchData()
  },
  methods: {
    updateQuery () {
      this.sortBy = this.$route.query.sortBy || 'startTime'
      this.keyword = (this.$route.query.keyword || '').toLowerCase()
    },
    fetchData () {
      return [{
        title: 'abdsad',
        description: 'fdasfs'
      }, {
        title: 'awerwer',
        description: 'twery'
      }, {
        title: 'kuk,uk',
        description: 'tretre'
      }, {
        title: 'gdfg',
        description: 'rwerq'
      }, {
        title: 'oil.',
        description: 'ret'
      }, {
        title: '675',
        description: 'rteu'
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .option-label
    margin 0 10px 0 15px
  .create-btn
    float right
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

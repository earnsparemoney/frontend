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
        @goques="handleCardClick(item.id)"
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
import { isPC, debounce } from '@/utils/utils'

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
      loading: true,
      id: 1,
      flag: false,
      pageSize: isPC() ? 8 : 3
    }
  },
  mounted () {
    this.fetchData()
    window.addEventListener('scroll', this.touchBottom)
  },
  beforeDestroy () {
    console.log('before destroy')
    window.removeEventListener('scroll', this.touchBottom)
  },
  computed: {
    filteredList () {
      let list = this.questionnaires
        .filter(item =>
          ((item.title.toLowerCase().indexOf(this.keyword) !== -1) ||
            (item.description.toLowerCase().indexOf(this.keyword)) !== -1))
      return list.sort((obj1, obj2) => {
        let sortBy = this.$route.query.sortBy || 'startDate'
        if (sortBy === 'startDate') {
          let objDate1 = Date.parse(obj1.startDate)
          let objDate2 = Date.parse(obj2.startDate)
          if (objDate1 > objDate2) return -1
          else if (objDate1 < objDate2) return 1
          else if (objDate1 === objDate2) return 0
        } else if (sortBy === 'endDate') {
          let objDate1 = Date.parse(obj1.endDate)
          let objDate2 = Date.parse(obj2.endDate)
          if (objDate1 < objDate2) return -1
          else if (objDate1 > objDate2) return 1
          else if (objDate1 === objDate2) return 0
        } else {
          if (obj1.adward > obj2.adward) return -1
          else if (obj1.adward < obj2.adward) return 1
          else if (obj1.adward === obj2.adward) return 0
        }
      })
    }
  },
  methods: {
    fetchData () {
      this.loading = true
      questionnaireService.getQuestionnaires(this.id, this.pageSize).then((res) => {
        if (res.data.questionnaires.length === 0) {
          this.flag = true
          this.message.info('已经到底啦!!')
        }
        this.questionnaires = (this.questionnaires.length !== 0) ? this.questionnaires.concat(res.data.questionnaires) : res.data.questionnaires
        this.loading = false
        this.id += 1
      }).catch((err) => {
        console.log(err)
        this.message.error('获取数据失败，请检查网络')
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
      this.sortBy = this.$route.query.sortBy || 'startDate'
      this.keyword = (this.$route.query.keyword || '').toLowerCase()
    },
    touchBottom () {
      let scrollHeight = document.body.scrollHeight
      let scrollTop = document.documentElement.scrollTop
      let clientHeight = document.documentElement.clientHeight
      debounce(() => {
        if (!this.flag && scrollTop + clientHeight >= scrollHeight - 100) {
          this.fetchData()
        }
      }, 100)
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

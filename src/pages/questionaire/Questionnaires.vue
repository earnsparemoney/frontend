<template>
  <div class="allquestionnaires">
    <div class="content">
      <questionnaire-card
        class="card"
        v-for="(item, index) of questionnaires"
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
export default {
  name: 'Questionnaires',
  components: {
    QuestionnaireCard
  },
  data () {
    return {
      questionnaires: []
    }
  },
  created () {
    this.questionnaires = this.fetchData()
  },
  methods: {
    fetchData () {
      return [{
        title: '我去',
        description: '他去'
      }, {
        title: '我去',
        description: '他去'
      }, {
        title: '我去',
        description: '他去'
      }, {
        title: '我去',
        description: '他去'
      }, {
        title: '我去',
        description: '他去'
      }, {
        title: '我去',
        description: '他去'
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
  @media (min-width 1200px)
    .allquestionnaires
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
    .allquestionnaires
      padding 15px 15px
      .card
        margin-top 20px
</style>

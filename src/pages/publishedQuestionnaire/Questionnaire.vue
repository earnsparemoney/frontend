<template>
  <div class="questionnaire">
    <div class="content">
      <p v-if="questionnaires.length == 0">暂时没有发布的问卷哦</p>
      <questionnaire-card
        class="card"
        v-for="(item, index) of questionnaires"
        :key="index"
        :title="item.title"
        :description="item.description"
        :publisher="item.publisher"/>
      <div class="card"/>
      <div class="card"/>
      <div class="card"/>
      <div class="card"/>
    </div>
  </div>
</template>

<script>
import QuestionnaireCard from '@/components/QuestionnaireCard.vue'
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
      this.questionnaires = [
        {
          title: '1',
          descrition: '2',
          publisher: '3'
        },
        {
          title: '1',
          descrition: '2',
          publisher: '3'
        },
        {
          title: '1',
          descrition: '2',
          publisher: '3'
        }
      ]
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

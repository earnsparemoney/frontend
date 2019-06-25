<template>
  <div class="allquestionnaires">
    <div class="options">
      <span class="sort-option">排序方式: </span>
      <a-dropdown>
        <a-menu slot="overlay" @click="handleSortClick">
          <a-menu-item key="创建时间"><a-icon type="calendar" />创建时间</a-menu-item>
          <a-menu-item key="结束时间"><a-icon type="calendar" />结束时间</a-menu-item>
          <a-menu-item key="报酬"><a-icon type="money-collect" />报酬</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          {{sortby}} <a-icon type="down" />
        </a-button>
      </a-dropdown>
      <span class="option-label">搜索: </span>
      <a-input-search
        placeholder="搜索你想填写的问卷"
        style="width: 200px"
        @search="onSearch"
      />
      <a-button class="create-btn" type="primary" icon="plus" @click="createNewQuestionnaire">创建新问卷</a-button>
    </div>
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
      questionnaires: [],
      sortby: '创建时间'
    }
  },
  created () {
    this.questionnaires = this.fetchData()
  },
  methods: {
    handleSortClick (e) {
      this.sortby = e.key
      console.log(e.key)
    },
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
    },
    createNewQuestionnaire () {
      this.$router.push('questionnaire')
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

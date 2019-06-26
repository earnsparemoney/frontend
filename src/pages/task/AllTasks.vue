<template>
  <div class="alltasks">
    <option-bar
      :routeName="'AllTasks'"
      :type="'任务'"/>
    <div class="content">
      <task-card
        class="card"
        v-for="(item, index) of tasks"
        :key="index"
        :title="item.title"
        :description="item.description"
        :pay="item.pay"
        :address="item.address"
        :startDate="item.startDate"
        :endDate="item.endDate"
        :type="item.type" />
      <div class="card"/>
      <div class="card"/>
      <div class="card"/>
      <div class="card"/>
    </div>
  </div>
</template>

<script>
import TaskCard from '@/components/TaskCard'
import OptionBar from '@/components/OptionBar'

export default {
  name: 'AllTask',
  components: {
    TaskCard,
    OptionBar
  },
  watch: {
    '$route.query.sortBy': 'updateQuery',
    '$route.query.keyword': 'updateQuery'
  },
  data () {
    return {
      tasks: [],
      sortBy: '创建时间',
      keyword: ''
    }
  },
  computed: {
    filteredList () {
      return this.tasks
        .filter(item =>
          ((item.from.toLowerCase().indexOf(this.keyword) !== -1) ||
            (item.to.toLowerCase().indexOf(this.keyword)) !== -1))
    }
  },
  methods: {
    fetchData () {
      this.tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
    },
    updateQuery () {
      this.sortBy = this.$route.query.sortBy || 'startTime'
      this.keyword = (this.$route.query.keyword || '').toLowerCase()
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="stylus" scoped>
@media (min-width 1200px)
  .alltasks
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
  .alltasks
    height 100%
    background-color #ecf1f1
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
  .alltasks
    height 100%
    background-color #ecf1f1
    padding 15px 15px
    .card
      margin-top 20px
</style>

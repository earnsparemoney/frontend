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
        :name="item.name"
        :description="item.description"
        :adward="item.adward"
        :content="item.content"
        :deadline="item.deadline"
        :publisher="item.publisher"
        @delete="deleteTask(item.id, index)"/>
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
import taskService from '@/services/taskService'

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
      taskService.getTasks().then((res) => {
        this.tasks = res.data.tasks
      }).catch((err) => {
        console.log(err)
        this.message.error('获取数据失败，请检查网络')
      })
    },
    deleteTask (id, index) {
      taskService.deleteTask(id).then((res) => {
        console.log(res)
        this.tasks.splice(index, 1)
        this.message.info('删除成功')
      }).catch((err) => {
        console.log(err)
        this.message.error('删除失败')
      })
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

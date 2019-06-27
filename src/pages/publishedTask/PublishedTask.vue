<template>
  <div class="task">
    <div class="content">
      <p v-if="tasks.length == 0">暂时没有已发布的任务哦，快去发布把</p>
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
import TaskCard from '@/components/TaskCard.vue'
import taskService from '@/services/taskService'

export default {
  name: 'PublishedTask',
  components: {
    TaskCard
  },
  data () {
    return {
      tasks: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      taskService.getPublishedTask(this.$store.state.token)
        .then((res) => {
          this.tasks = res.data.tasks
        }).catch((err) => {
          console.log(err.response)
        })
    },
    deleteTask (id, index) {
      taskService.deleteTask(id, this.$store.state.token).then((res) => {
        this.tasks.splice(index, 1)
        this.message.info('删除成功')
        this.fetchData()
      }).catch((err) => {
        console.log(err)
        this.message.error('删除失败')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@media (min-width 1200px)
  .task
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
  .task
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
  .task
    padding 15px 15px
    .card
      margin-top 20px
</style>

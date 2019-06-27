<template>
  <div class="task">
    <div class="content">
      <p v-if="tasks.length == 0">暂时没有已完成任务哦，快去完成把</p>
      <task-card
        class="card"
        v-for="(item, index) of tasks"
        :key="index"
        :name="item.name"
        :description="item.description"
        :adward="item.adward"
        :content="item.content"
        :deadline="item.deadline"
        :publisher="item.publisher" />
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
  name: 'Finish',
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
      taskService.getParticipateDoneTasks(this.$store.state.userInfo.id)
        .then((res) => {
          this.tasks = res.data.tasks
        }).catch((err) => {
          console.log(err)
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

<template>
  <div class="task">
    <div class="content">
      <p v-if="tasks.length == 0">暂时没有已完成任务哦，快去领取任务把</p>
      <task-card
        class="card"
        v-for="(item, index) of tasks"
        :key="index"
        :pay="item.pay"
        :from="item.from"
        :to="item.to"/>
      <div class="card"/>
      <div class="card"/>
      <div class="card"/>
      <div class="card"/>
    </div>
  </div>
</template>

<script>
import TaskCard from '@/components/TaskCard.vue'
export default {
  name: 'Task',
  components: {
    TaskCard
  },
  data () {
    return {
      tasks: []
    }
  },
  created () {
    this.tasks = this.fetchData()
  },
  methods: {
    fetchData () {
      return [{
        pay: 3,
        from: 'from',
        to: 'to'
      }, {
        pay: 4,
        from: 'from',
        to: 'to'
      }, {
        pay: 4,
        from: 'from',
        to: 'to'
      }, {
        pay: 4,
        from: 'from',
        to: 'to'
      }, {
        pay: 4,
        from: 'from',
        to: 'to'
      }, {
        pay: 4,
        from: 'from',
        to: 'to'
      }, {
        pay: 4,
        from: 'from',
        to: 'to'
      }]
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

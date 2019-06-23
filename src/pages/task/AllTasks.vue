<template>
<div class="alltasks">
  <h2 class="alltasks-header">All Task</h2>
  <div class="task__wrapper">
    <task-card
    pay="2"
    from="快递柜2号"
    to="SYSU"
  ></task-card>
  <task-card
    class="task-card"
    v-for="(item, index) of tasks"
    :key="index"
    :pay="item.pay"
    :from="item.from"
    :to="item.to"/>
  </div>
</div>
</template>

<script>
import TaskCard from '@/components/TaskCard'
export default {
  name: 'AllTask',
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
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
.alltasks
  padding 15px 15px
  .task-card
    margin-top 20px
</style>

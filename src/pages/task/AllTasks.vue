<template>
<div class="alltasks">
  <h2 class="alltasks-header">All Task</h2>
  <div class="content">
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
  .alltasks
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
    padding 15px 15px
    .card
      margin-top 20px
</style>

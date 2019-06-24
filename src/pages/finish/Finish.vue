<template>
  <div class="task">
    <div class="content">
      <p v-if="tasks.length == 0">暂时没有已完成任务哦，快去完成把</p>
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
import TaskCard from '@/components/TaskCard.vue'
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
    this.tasks = this.fetchData()
  },
  methods: {
    fetchData () {
      return [
        {
          title: '取快递',
          description: '谁能帮我取快递',
          address: '丰巢快递柜',
          startDate: '2019-06-24',
          endDate: '2019-06-25',
          pay: 3,
          type: '快递'
        },
        {
          title: '取快递',
          description: '谁能帮我取快递',
          address: '丰巢快递柜',
          startDate: '2019-06-24',
          endDate: '2019-06-25',
          pay: 3,
          type: '快递'
        },
        {
          title: '取快递',
          description: '谁能帮我取快递',
          address: '丰巢快递柜',
          startDate: '2019-06-24',
          endDate: '2019-06-25',
          pay: 3,
          type: '快递'
        },
        {
          title: '取快递',
          description: '谁能帮我取快递',
          address: '丰巢快递柜',
          startDate: '2019-06-24',
          endDate: '2019-06-25',
          pay: 3,
          type: '快递'
        },
        {
          title: '取快递',
          description: '谁能帮我取快递',
          address: '丰巢快递柜',
          startDate: '2019-06-24',
          endDate: '2019-06-25',
          pay: 3,
          type: '快递'
        },
        {
          title: '取快递',
          description: '谁能帮我取快递',
          address: '丰巢快递柜',
          startDate: '2019-06-24',
          endDate: '2019-06-25',
          pay: 3,
          type: '快递'
        },
        {
          title: '取快递',
          description: '谁能帮我取快递',
          address: '丰巢快递柜',
          startDate: '2019-06-24',
          endDate: '2019-06-25',
          pay: 3,
          type: '快递'
        }
      ]
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

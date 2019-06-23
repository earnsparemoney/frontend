<template>
  <div class="task">
    <task-card
      class="task__item"
      pay="1"
      from="快递柜1号"
      to="SYSU"
    ></task-card>
    <task-card
      class="task__item"
      pay="2"
      from="快递柜2号"
      to="SYSU"
    ></task-card>
  </div>
</template>

<script>
import TaskCard from '@/components/TaskCard.vue'
export default {
  name: 'Task',
  components: {
    TaskCard
  }
}
</script>

<style lang="stylus" scoped>
  .task__item
    margin 15px
</style>

<template>
<div class="alltasks">
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
      placeholder="搜索你想参加的任务"
      style="width: 200px"
      @search="onSearch"
    />
    <a-button class="create-btn" type="primary" icon="plus" @click="createNewTask">创建新任务</a-button>
  </div>
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
      tasks: [],
      sortby: '创建时间'
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
    },
    handleSortClick (e) {
      this.sortby = e.key
      console.log(e.key)
    },
    createNewTask () {
      this.$router.push('CreateTask')
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

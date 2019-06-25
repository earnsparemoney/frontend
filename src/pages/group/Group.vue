<template>
<div class="group">
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
      placeholder="搜索你想参加的兴趣组"
      style="width: 200px"
      @search="onSearch"
    />
    <a-button class="create-btn" type="primary" icon="plus" @click="createNewTask">创建新任务</a-button>
  </div>
  <div class="content">
    <group-card
      class="card"
      v-for="(item, index) of groups"
      :key="index"
      :name="item.name"
      :number="item.number"
      :image="item.image"/>
    <div class="card"/>
    <div class="card"/>
    <div class="card"/>
    <div class="card"/>
  </div>
</div>
</template>

<script>
import GroupCard from '@/components/GroupCard'
export default {
  name: 'Group',
  data () {
    return {
      groups: []
    }
  },
  components: {
    GroupCard
  },
  created () {
    this.groups = this.fetchdata()
  },
  methods: {
    fetchdata () {
      return [{
        name: 'Group1',
        image: 'https://easyhpc.org/static/upload/course/cover_61.png?q=1526299797',
        number: 12
      }, {
        name: 'Group1',
        image: 'https://easyhpc.org/static/upload/course/cover_45.png?q=1526299797',
        number: 132
      }, {
        name: 'Group1',
        image: 'https://easyhpc.org/static/upload/course/cover_37.png?q=1526299797',
        number: 1221
      }, {
        name: 'Group1',
        image: 'https://easyhpc.org/static/upload/course/cover_62.png?q=1526299797',
        number: 1312
      }, {
        name: 'Group1',
        image: 'https://easyhpc.org/static/upload/course/cover_67.png?q=1535941879',
        number: 12212
      }, {
        name: 'Group1',
        image: 'https://easyhpc.org/static/upload/course/cover_75.png?q=1550997031',
        number: 1332
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
@media (min-width 1200px)
  .group
    padding 15px 15px
    background-color #ecf1f1
    .content
      display flex
      justify-content space-between
      flex-direction row
      flex-wrap wrap
      .card
        width 24%
        margin-top 10px
@media (min-width 576px) and (max-width 1200px)
  .group
    padding 15px 15px
    background-color #ecf1f1
    .content
      display flex
      justify-content space-between
      flex-direction row
      flex-wrap wrap
      .card
        width 32%
        margin-top 10px
@media (max-width 576px)
  .group
    background-color #ecf1f1
    padding 15px 15px
    .card
      margin-top 20px
</style>

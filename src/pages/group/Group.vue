<template>
<div class="group">
  <h2 class="group-header">Group</h2>
  <task-card
    class="group-card"
    v-for="(item, index) of groups"
    :key="index"
    :name="item.name"
    :number="item.number"
    :image="item.image"/>
</div>
</template>

<script>
import TaskCard from '@/components/GroupCard'
export default {
  name: 'Group',
  data () {
    return {
      groups: []
    }
  },
  components: {
    TaskCard
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
.group
  padding 15px 15px
  .group-card
    margin-top 20px
</style>

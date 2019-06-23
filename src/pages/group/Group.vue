<template>
<div class="group">
  <h2 class="group-header">Group</h2>
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
    padding 15px 15px
    .card
      margin-top 20px
</style>

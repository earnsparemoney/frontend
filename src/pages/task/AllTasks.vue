<template>
  <div class="alltasks">
    <option-bar
      :routeName="'AllTasks'"
      :type="'任务'"/>

    <recycle-scroller
      class="content"
      :items="tasks"
      :item-size="32"
      key-field="id"
      v-slot="{ item }"
      v-infinite-scroll="handleInfiniteOnLoad"
      :infinite-scroll-distance="10"
    >
      <task-card
        class="card"
        :key="index"
        :name="item.name"
        :description="item.description"
        :adward="item.adward"
        :content="item.content"
        :deadline="item.deadline"
        :publisher="item.publisher"
        @delete="deleteTask(item.id, index)"/>
      <div class="card"/>
      <div class="card"/>
      <div class="card"/>
      <div class="card"/>
    </recycle-scroller>
  </div>
</template>

<script>
import TaskCard from '@/components/TaskCard'
import OptionBar from '@/components/OptionBar'
import taskService from '@/services/taskService'
import infiniteScroll from 'vue-infinite-scroll'

export default {
  name: 'AllTask',
  directives: { infiniteScroll },
  components: {
    TaskCard,
    OptionBar
  },
  watch: {
    '$route.query.sortBy': 'updateQuery',
    '$route.query.keyword': 'updateQuery'
  },
  data () {
    return {
      tasks: [],
      sortBy: '创建时间',
      keyword: '',
      loading: false,
      id: 1
    }
  },
  computed: {
    filteredList () {
      return this.tasks
        .filter(item =>
          ((item.from.toLowerCase().indexOf(this.keyword) !== -1) ||
            (item.to.toLowerCase().indexOf(this.keyword)) !== -1))
    }
  },
  methods: {
    fetchData (arg) {
      this.loading = true
      // taskService.getTasks().then((res) => {
      //   this.tasks = arg ? this.tasks.concat(res.data.tasks) : res.data.tasks
      //   this.loading = false
      // }).catch((err) => {
      //   console.log(err)
      //   this.message.error('获取数据失败，请检查网络')
      //   this.loading = false
      // })
      const data = [
        {
          UserId: null,
          adward: 2,
          content: '2',
          createdAt: '2019-06-26T16:31:33.000Z',
          deadline: '2019-06-27T00:00:00.000Z',
          description: '2',
          id: this.id,
          name: '2',
          publisher: {
            email: '798607646@qq.com',
            id: 2,
            img: 'public/images/userImage/default.jpg',
            phone: '15625583871',
            username: 'limsanity666'
          },
          publisherId: 2,
          status: 0,
          updatedAt: '2019-06-26T16:31:02.000Z'
        },
        {
          UserId: null,
          adward: 2,
          content: '2',
          createdAt: '2019-06-26T16:31:33.000Z',
          deadline: '2019-06-27T00:00:00.000Z',
          description: '2',
          id: this.id + 1,
          name: '2',
          publisher: {
            email: '798607646@qq.com',
            id: 2,
            img: 'public/images/userImage/default.jpg',
            phone: '15625583871',
            username: 'limsanity666'
          },
          publisherId: 2,
          status: 0,
          updatedAt: '2019-06-26T16:31:02.000Z'
        },
        {
          UserId: null,
          adward: 2,
          content: '2',
          createdAt: '2019-06-26T16:31:33.000Z',
          deadline: '2019-06-27T00:00:00.000Z',
          description: '2',
          id: this.id + 2,
          name: '2',
          publisher: {
            email: '798607646@qq.com',
            id: 2,
            img: 'public/images/userImage/default.jpg',
            phone: '15625583871',
            username: 'limsanity666'
          },
          publisherId: 2,
          status: 0,
          updatedAt: '2019-06-26T16:31:02.000Z'
        }
      ]
      this.id += 3
      this.tasks = arg ? this.tasks.concat(data) : data
      this.loading = false
      console.log(1)
    },
    deleteTask (id, index) {
      taskService.deleteTask(id).then((res) => {
        console.log(res)
        this.tasks.splice(index, 1)
        this.message.info('删除成功')
      }).catch((err) => {
        console.log(err)
        this.message.error('删除失败')
      })
    },
    updateQuery () {
      this.sortBy = this.$route.query.sortBy || 'startTime'
      this.keyword = (this.$route.query.keyword || '').toLowerCase()
    },
    handleInfiniteOnLoad  () {
      if (!this.loading) {
        this.fetchData(1)
      }
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="stylus" scoped>
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
    .content
      height 100%
    .card
      margin-top 20px
</style>

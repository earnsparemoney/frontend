<template>
  <div class="alltasks">
    <option-bar
      :routeName="'AllTasks'"
      :type="'任务'"/>

    <!-- <recycle-scroller
      class="content"
      :items="tasks"
      :item-size="32"
      key-field="id"
      v-slot="{ item }"
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
        @delete="deleteTask(item.id, index)"
        @click.native="clickTask(item)"/>
      <div class="card"/>
      <div class="card"/>
      <div class="card"/>
      <div class="card"/>
    </recycle-scroller> -->

    <div class="content">
      <task-card
        class="card"
        v-for="(item, index) of filteredList"
        :key="index"
        :name="item.name"
        :description="item.description"
        :adward="item.adward"
        :content="item.content"
        :deadline="item.deadline"
        :publisher="item.publisher"
        @delete="deleteTask(item.id, index)"
        @click.native="clickTask(item)"/>
      <div class="card"/>
      <div class="card"/>
      <div class="card"/>
      <div class="card"/>
    </div>

    <a-spin
      class="loading-spin"
      v-show="loading"
      size="large"
      tip="Loading..." />

    <a-modal
      class="modal"
      v-model="visible"
      :title="selectedItem ? selectedItem.name : ''"
      onOk="handleOk"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          参加任务
        </a-button>
      </template>
      <strong>委托人: {{selectedItem ? selectedItem.publisher.username : '' }}</strong>
      <strong>电话: {{selectedItem ? selectedItem.publisher.phone : '' }}</strong>
      <a-divider/>
      <p>简介: {{selectedItem ? selectedItem.description : ''}}</p>
      <p>报酬: {{selectedItem ? selectedItem.adward : ''}}$</p>
      <p>内容: {{selectedItem ? selectedItem.content: ''}}</p>
      <p>结束时间: {{ selectedItem ? formatedTime : '' }}</p>
    </a-modal>
  </div>
</template>

<script>
import TaskCard from '@/components/TaskCard'
import OptionBar from '@/components/OptionBar'
import taskService from '@/services/taskService'
import { isPC, formatTime, debounce } from '@/utils/utils'

export default {
  name: 'AllTask',
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
      loading: false,
      selectedItem: null,
      visible: false,
      tasks: [],
      sortBy: '创建时间',
      keyword: '',
      id: 1,
      flag: false,
      pageSize: isPC() ? 8 : 3
    }
  },
  computed: {
    formatedTime () {
      return formatTime(this.selectedItem.deadline, 'yyyy-MM-dd')
    },
    filteredList () {
      let list = this.tasks
        .filter(item =>
          ((item.name.toLowerCase().indexOf(this.keyword) !== -1) ||
            ((item.description.toLowerCase().indexOf(this.keyword)) !== -1) ||
            (item.content.toLowerCase().indexOf(this.keyword)) !== -1))
      return list.sort((obj1, obj2) => {
        let sortBy = this.$route.query.sortBy || 'createdAt'
        if (sortBy === 'createdAt') {
          let objDate1 = Date.parse(obj1.createdAt)
          let objDate2 = Date.parse(obj2.createdAt)
          if (objDate1 > objDate2) return -1
          else if (objDate1 < objDate2) return 1
          else if (objDate1 === objDate2) return 0
        } else if (sortBy === 'endDate') {
          let objDate1 = Date.parse(obj1.deadline)
          let objDate2 = Date.parse(obj2.deadline)
          if (objDate1 < objDate2) return -1
          else if (objDate1 > objDate2) return 1
          else if (objDate1 === objDate2) return 0
        } else {
          if (obj1.adward > obj2.adward) return -1
          else if (obj1.adward < obj2.adward) return 1
          else if (obj1.adward === obj2.adward) return 0
        }
      })
    }
  },
  methods: {
    fetchData () {
      this.loading = true
      taskService.getTasks(this.id, this.pageSize).then((res) => {
        if (res.data.tasks.length === 0) {
          this.flag = true
          this.message.info('已经到底啦!!')
        }
        this.tasks = (this.tasks.length !== 0) ? this.tasks.concat(res.data.tasks) : res.data.tasks
        this.loading = false
        this.id += 1
      }).catch((err) => {
        console.log(err)
        this.message.error('获取数据失败，请检查网络')
        this.loading = false
      })
    },
    clickTask (item) {
      this.selectedItem = item
      this.visible = true
    },
    deleteTask (id, index) {
      taskService.deleteTask(id, this.$store.state.token).then((res) => {
        this.tasks.splice(index, 1)
        this.message.info('删除成功')
        this.fetchData()
      }).catch((err) => {
        console.log(err)
        this.message.error('删除失败')
      })
    },
    updateQuery () {
      this.sortBy = this.$route.query.sortBy || 'createdAt'
      this.keyword = (this.$route.query.keyword || '').toLowerCase()
    },
    handleInfiniteOnLoad  () {
      if (!this.loading) {
        this.fetchData(1)
      }
    },
    handleOk (e) {
      this.loading = true
      taskService.participateTask(this.selectedItem.id, this.$store.state.token)
        .then((res) => {
          this.visible = false
          this.loading = false
          this.message.info('成功参加')
          this.fetchData()
        }).catch((err) => {
          this.message.error(err.response.data.error)
          this.loading = false
        })
    },
    handleCancel (e) {
      this.selectedItem = null
      this.visible = false
    },
    touchBottom () {
      let scrollHeight = document.body.scrollHeight
      let scrollTop = document.documentElement.scrollTop
      let clientHeight = document.documentElement.clientHeight
      debounce(() => {
        if (!this.flag && scrollTop + clientHeight >= scrollHeight - 100) {
          this.fetchData()
        }
      }, 100)
    }
  },
  mounted () {
    this.fetchData()
    window.addEventListener('scroll', this.touchBottom)
  },
  beforeDestroy () {
    console.log('before destroy')
    window.removeEventListener('scroll', this.touchBottom)
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
@media (min-width 1200px)
  .alltasks
    height 100%
    background-color #ecf1f1
    padding 15px 15px
    .loading-spin
      position relative
      left 50%
      transform translateX(-50%)
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
    .loading-spin
      position relative
      left 50%
      transform translateX(-50%)
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
    overflow hidden
    .content
      height 100%
    .card
      margin-top 20px
    .loading-spin
      position relative
      left 50%
      transform translateX(-50%)
</style>

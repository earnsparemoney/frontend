<template>
  <div class="alltasks">
    <option-bar
      :routeName="'AllTasksPC'"
      :type="'任务'"/>
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
        @participate="clickTask(item)"/>
      <div class="card"/>
      <div class="card"/>
      <div class="card"/>
      <div class="card"/>
    </div>
    <a-modal
      v-model="visible"
      :title="selectedItem ? selectedItem.name : ''"
      onOk="handleOk"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          参加任务
        </a-button>
      </template>
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
import { formatTime } from '@/utils/utils'
export default {
  name: 'AllTaskPC',
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
      keyword: ''
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
    clickTask (item) {
      this.selectedItem = item
      this.visible = true
    },
    fetchData () {
      taskService.getTasks().then((res) => {
        this.tasks = res.data.tasks
        console.log(res)
      }).catch(() => {
        this.message.error('获取数据失败，请检查网络')
      })
    },
    deleteTask (id, index) {
      taskService.deleteTask(id, this.$store.state.token).then((res) => {
        this.tasks.splice(index, 1)
        this.message.info('删除成功')
      }).catch(() => {
        this.message.error('删除失败')
      })
    },
    updateQuery () {
      this.sortBy = this.$route.query.sortBy || 'createdAt'
      this.keyword = (this.$route.query.keyword || '').toLowerCase()
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
      this.visible = false
      this.selectedItem = null
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
    .card
      margin-top 20px
</style>

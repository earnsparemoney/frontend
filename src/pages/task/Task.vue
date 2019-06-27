<template>
  <div class="task">
    <div class="content">
      <p v-if="tasks.length == 0">暂时没有进行中的任务哦，快去领取任务把</p>
      <task-card
        class="card"
        v-for="(item, index) of tasks"
        :key="index"
        :name="item.name"
        :description="item.description"
        :adward="item.adward"
        :content="item.content"
        :deadline="item.deadline"
        :publisher="item.publisher"
        @click.native="clickTask(index)"/>
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
        <a-button key="back" @click="handleCancel">返回</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          确认完成
        </a-button>
      </template>
      <strong>委托人: {{selectedItem ? selectedItem.publisher.username : '' }}</strong>
      <strong>电话: {{selectedItem ? selectedItem.publisher.phone : '' }}</strong>
      <a-divider/>
      <p>简介: {{selectedItem ? selectedItem.description : ''}}</p>
      <p>报酬: {{selectedItem ? selectedItem.adward : ''}}$</p>
      <p>内容: {{selectedItem ? selectedItem.content: ''}}</p>
      <p>结束时间: {{ selectedItem ? formatedTime : '' }}</p>
      <strong>任务已完成?</strong>
    </a-modal>
  </div>
</template>

<script>
import TaskCard from '@/components/TaskCard.vue'
import taskService from '../../services/taskService'
export default {
  name: 'Task',
  components: {
    TaskCard
  },
  data () {
    return {
      selectedItem: null,
      visible: false,
      loading: false,
      tasks: []
    }
  },
  methods: {
    clickTask (index) {
      this.selectedItem = this.tasks[index]
      this.visible = true
    },
    fetchData () {
      this.tasks = taskService.getParticipateRunningTasks(this.$store.state.userInfo.id)
        .then((res) => {
          this.tasks = res.data.tasks
        }).catch((err) => {
          console.log(err)
        })
    },
    handleOk (e) {
      this.loading = true
      taskService.completeTask(this.selectedItem.id, this.$store.state.token)
        .then((res) => {
          this.fetchData()
          this.visible = false
          this.loading = false
          this.info.error('完成任务成功')
          this.getMoney({ value: this.selectedItem.adward })
        }).catch((err) => {
          this.message.error('完成任务失败，请检查网络')
        })
    },
    handleCancel (e) {
      this.selectedItem = null
      this.visible = false
    }
  },
  mounted () {
    this.fetchData()
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

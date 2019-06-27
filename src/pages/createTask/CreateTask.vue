<template>
  <div class="create-task">
    <h1 class="create-task--title">任务发布</h1>

    <span>任务名称</span>
    <a-input
      v-model="task.name"
      class="input--style"
      placeholder="任务名称"></a-input>

    <span>任务内容描述</span>
    <a-textarea
      v-model="task.description"
      class="input--style textarea--style"
      placeholder="任务内容描述"></a-textarea>

    <span>地点</span>
    <a-input
      v-model="task.content"
      class="input--style"
      placeholder="地点">
      <a-icon slot="prefix" type="environment" />
    </a-input>

    <span>日期</span>
    <div class="date__wrapper">
      <a-date-picker
        placeholder="结束日期"
        @change="setEndDate">
      </a-date-picker>
    </div>

    <span>报酬</span>
    <a-input
      v-model="task.adward"
      class="input--style"
      placeholder="报酬">
      <a-icon slot="prefix" type="money-collect" />
    </a-input>

    <span>任务类型:</span>
    <a-select
      class="task-type"
      defaultValue="快递"
      @change="setTaskType">
      <a-select-option value="快递">快递</a-select-option>
      <a-select-option value="外卖">外卖</a-select-option>
    </a-select>

    <div class="bottom-bar">
      <div class="cancel bottom-bar__item" @click="handleCancelClick">
        <a-icon type="close"></a-icon>
        取消
      </div>
      <a-divider class="divider" type="vertical"></a-divider>
      <div class="save bottom-bar__item" @click="handleSaveClick">
        <a-icon type="check"></a-icon>
        发布
      </div>
    </div>
  </div>
</template>

<script>
import taskService from '@/services/taskService'
export default {
  name: 'CreateTask',
  data () {
    return {
      task: {
        type: '快递',
        name: '',
        description: '',
        content: '',
        deadline: null,
        adward: null,
        usernum: 1
      }
    }
  },
  methods: {
    handleCancelClick () {
      this.$router.push('/')
    },
    handleSaveClick () {
      if (!this.isValid()) {
        this.message.error('输入不能为空')
      } else {
        taskService.addTask({
          name: this.task.name,
          description: this.task.description,
          content: this.task.content,
          deadline: this.task.deadline,
          adward: this.task.adward,
          usernum: this.task.usernum
        }, this.$store.state.token).then((res) => {
          console.log(res)
          this.$router.push('/tasks')
        }).catch((err) => {
          console.log(err)
          this.message.error('提交错误')
        })
      }
    },
    isValid () {
      for (let key in this.task) {
        if (!this.task[key]) {
          return false
        }
      }
      return true
    },
    setEndDate (date, dateString) {
      this.task.deadline = dateString
    },
    setTaskType (type) {
      console.log(type)
      this.task.type = type
    }
  }
}
</script>

<style lang="stylus" scoped>
  .create-task
    padding 20px
    padding-bottom 60px
    background-color #ecf1f1
    overflow hidden

    .create-task--title
      text-align center

    .input--style
      height 50px
      margin-top 10px
      margin-bottom 20px

    .textarea--style
      height 70px

    .date__wrapper
      display flex
      margin-top 10px
      margin-bottom 20px
      .date--start
        margin-right 10px

    .task-type
      margin-top 10px

    .bottom-bar
      position fixed
      bottom 0
      left 0
      right 0
      display flex
      justify-content center
      height 50px
      font-size 14px
      background-color #fff

      .bottom-bar__item
        flex 1
        display flex
        flex-direction column
        justify-content center
        align-items center
        z-index 1

      .divider
        height 100%

      .save
        color #1890ff

      .cancel
        color #afabab
</style>

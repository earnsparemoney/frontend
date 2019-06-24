<template>
  <div class="create-task">
    <h1 class="create-task--title">任务发布</h1>

    <span>任务名称</span>
    <a-input
      class="input--style"
      placeholder="任务名称"></a-input>

    <span>任务内容描述</span>
    <a-textarea
      row="4"
      class="input--style"
      placeholder="任务内容描述"></a-textarea>

    <span>地点</span>
    <a-input
      class="input--style"
      placeholder="地点">
      <a-icon slot="prefix" type="environment" />
    </a-input>

    <span>日期</span>
    <div class="date__wrapper">
      <a-date-picker
        class="date--start"
        placeholder="开始日期">
      </a-date-picker>
      <a-date-picker
        placeholder="结束日期">
      </a-date-picker>
    </div>

    <span>报酬</span>
    <a-input
      class="input--style"
      placeholder="报酬">
      <a-icon slot="prefix" type="money-collect" />
    </a-input>

    <span>任务类型:</span>
    <a-select
      class="task-type"
      defaultValue="express">
      <a-select-option value="express">快递</a-select-option>
      <a-select-option value="food">外卖</a-select-option>
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
export default {
  name: 'CreateTask',
  methods: {
    handleCancelClick () {
      this.$router.push('/')
    },
    handleSaveClick () {

    }
  }
}
</script>

<style lang="stylus" scoped>
  .create-task
    padding 20px
    padding-bottom 60px

    .create-task--title
      text-align center

    .input--style
      height 50px
      margin-bottom 20px

    .date__wrapper
      display flex
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

      .divider
        height 100%

      .save
        color #1890ff

      .cancel
        color #afabab
</style>

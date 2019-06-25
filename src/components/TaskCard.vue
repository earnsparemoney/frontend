<template>
  <div class="task-card__wrapper">
    <a-card
      class="task-card"
      hoverable
    >
      <template class="ant-card-actions" slot="actions">
        <a-icon type="check" />
        <a href="tel:15625583871"><a-icon type="phone" /></a>
        <a-icon type="mail" />
      </template>
      <a-card-meta
        :title="title"
        :description="description">
        <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </a-card-meta>
      <a-divider />
      <p>报酬: {{ pay }}$</p>
      <p>地址: {{ address }}</p>
      <p>时间: {{ startDate }} ~ {{ endDate }}</p>
      <p>类型: {{ type }}</p>
    </a-card>
    <a-icon
      class="icon--delete"
      type="delete"
      @click="showModal" />
    <a-modal
      class="modal"
      :style="modalStyle"
      :title="title"
      :visible="visible"
      @ok="handleOk"
      okText="删除"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      cancelText="取消"
      :closable="false"
    >
      <p>{{ModalText}}</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'TaskCard',
  props: {
    title: String,
    description: String,
    pay: String,
    address: String,
    startDate: String,
    endDate: String,
    type: String
  },
  data () {
    return {
      ModalText: '你要删除该任务吗',
      visible: false,
      modalStyle: {
        top: '30%'
      }
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk () {
      this.$emit('delete')
      this.visible = false
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.task-card__wrapper
  position relative
  .icon--delete
    position absolute
    top 20px
    right 20px
    color #ff4d4f
    font-size 20px
  .task-card
    box-shadow 0px 4px 5px 2px rgba(216, 211, 211, .5)
    border-radius 8px
    >>> .ant-card-actions
      border-radius 0px 0px 8px 8px
</style>

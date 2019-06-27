<template>
  <div class="task-card__wrapper">
    <a-card
      class="task-card"
      hoverable
    >
      <template class="ant-card-actions" slot="actions">
        <a :href="`tel:${publisher.phone}`"><a-icon type="phone" /></a>
        <a :href="`sms:${publisher.phone}`"><a-icon type="message" /></a>
        <a :href="`mailto:${publisher.email}`"><a-icon type="mail" /></a>
      </template>
      <div class="content" @click="handleParticipate">
        <a-card-meta
          :title="name"
          :description="description">
          <a-avatar slot="avatar" :src="`/api/${publisher.img}`" />
        </a-card-meta>
        <a-divider />
        <p>报酬: {{ adward }}$</p>
        <p>内容: {{ content }}</p>
        <p>结束时间: {{ formatedTime }}</p>
      </div>
    </a-card>
    <a-icon
      v-if="this.$store.state.userInfo && this.$store.state.userInfo.id === publisher.id"
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
import { formatTime } from '@/utils/utils'
export default {
  name: 'TaskCard',
  props: {
    name: String,
    description: String,
    adward: Number,
    content: String,
    deadline: String,
    publisher: Object
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
  computed: {
    formatedTime () {
      return formatTime(this.deadline, 'yyyy-MM-dd')
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
    handleParticipate (e) {
      this.$emit('participate')
      this.visible = false
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.task-card__wrapper
  position relative
  .icon--delete
    position absolute
    top 20px
    right 20px
    color #ff4d4f
    font-size 20px
    z-index 999
  .task-card
    boxShadow()
</style>

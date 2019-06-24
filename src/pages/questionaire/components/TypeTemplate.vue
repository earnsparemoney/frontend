<template>
  <div class="type-template">
    <slot :question="question" class="question"></slot>
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
import { EventBus } from '@/utils/eventBus'
export default {
  name: 'TypeTemplate',
  props: {
    question: Object,
    type: String
  },
  methods: {
    handleCancelClick () {
      EventBus.$emit('cancel', this.type)
    },
    handleSaveClick () {
      if (this.isValid()) {
        EventBus.$emit('add', {
          type: this.type,
          question: this.question
        })
      }
    },
    isValid () {
      for (let key in this.question) {
        let val = this.question[key]
        if (!val) {
          this.message.error('不能为空')
          return false
        } else if (Object.prototype.toString.call(val).includes('Array')) {
          for (let item of val) {
            if (!item) {
              this.message.error('不能为空')
              return false
            }
          }
        }
      }
      return true
    }
  }
}
</script>

<style lang="stylus" scoped>
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

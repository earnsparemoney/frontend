<template>
  <div class="type">
    <div class="type__item--wrapper" @click="handleTypeItemClick">
      <div class="type__item" data-type="Choose">
        <a-icon class="type__item__icon" type="plus-circle" />
        选择题
      </div>
      <div class="type__item" data-type="Fill">
        <a-icon class="type__item__icon" type="edit" />
        填空题
      </div>
      <div class="type__item" data-type="Judge">
        <a-icon class="type__item__icon" type="check" />
        判断题
      </div>
      <div class="type__item" data-type="Rate">
        <a-icon class="type__item__icon" type="star" />
        打分题
      </div>
      <div class="type__item--empty">
      </div>
      <div class="type__item--empty">
      </div>
    </div>
    <div class="cancel" @click="handleCancelClick">取消</div>
  </div>
</template>

<script>
import HandleCancelClick from '@/mixins/handleCancelClick'
export default {
  name: 'Type',
  mixins: [HandleCancelClick],
  methods: {
    handleTypeItemClick (e) {
      this.$emit('add', e.target.dataset.type)
    }
  }
}
</script>

<style lang="stylus" scoped>
    .type__item--wrapper
      display flex
      flex-wrap wrap
      justify-content space-around

      .type__item
        display flex
        flex-direction column
        justify-content center
        align-items center
        width 100px
        height 100px
        margin-top 15px
        background-color #fff

        .type__item__icon
          margin-bottom 10px
          font-size 26px

      .type__item--empty
        width 100px

    .cancel
      position fixed
      bottom 0
      left 0
      right 0
      display flex
      justify-content center
      height 70px
      padding-top 15px
      font-size 20px
      color #afabab
      background-color #fff
</style>

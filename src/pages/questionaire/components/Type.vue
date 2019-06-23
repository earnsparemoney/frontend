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
    <div class="cancel bottom-bar__item" @click="handleCancelClick">
      <a-icon type="close"></a-icon>
      取消
    </div>
  </div>
</template>

<script>
export default {
  name: 'Type',
  methods: {
    handleTypeItemClick (e) {
      this.$emit('add', e.target.dataset.type)
    },
    handleCancelClick () {
      this.$emit('cancel', this.$options.name)
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
        position relative
        width 100px
        height 100px
        margin-top 15px
        background-color #fff

        &::after
          content ''
          position absolute
          left 0
          right 0
          top 0
          bottom 0
          display block

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
      flex-direction column
      align-items center
      justify-content center
      height 50px
      font-size 14px
      color #afabab
      background-color #fff
</style>

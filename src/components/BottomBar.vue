<template>
  <div class="bottom-bar">
    <div class="cancel bottom-bar__item" @click="handleCancelClick">取消</div>
    <a-divider class="divider" type="vertical"></a-divider>
    <div class="save bottom-bar__item" @click="handleSaveClick">保存</div>
  </div>
</template>

<script>
export default {
  name: 'BottomBar',
  methods: {
    handleCancelClick () {
      this.$emit('cancel')
    },
    handleSaveClick () {
      this.$emit('add')
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
    height 70px
    font-size 20px
    background-color #fff

    .bottom-bar__item
      flex 1
      display flex
      justify-content center
      align-items center

    .divider
      height 100%

    .save
      color #1890ff

    .cancel
      color #afabab
</style>

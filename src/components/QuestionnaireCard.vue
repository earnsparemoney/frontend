<template>
  <a-card
  >
    <a-card-meta
      :title="title"
      :description="description">
      <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    </a-card-meta>
    <div class="icon__wrapper">
      <div class="icon__item">
        <a-icon type="money-collect"></a-icon>
        <span>123</span>
      </div>
      <a-divider type="vertical"></a-divider>
      <div class="icon__item">
        <a-icon type="user"></a-icon>
        <span>123</span>
      </div>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'QuestionnaireCard',
  props: {
    title: String,
    description: {
      type: String,
      default: '1234'
    }
  }
}
</script>

<style lang="stylus" scoped>
>>> .ant-card-body
  padding-bottom 10px
  .icon__wrapper
    margin-left 3px
    .icon__item
      display inline-block
      margin-top 15px
</style>

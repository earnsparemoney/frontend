<template>
  <a-card
    hoverable
  >
    <template class="ant-card-actions" slot="actions">
      <a-icon type="check" />
      <a-icon type="phone" />
      <a-icon type="mail" />
    </template>
    <a-card-meta
      :title="title"
      :description="description">
      <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    </a-card-meta>
    <a-divider />
    <p>问卷详情: {{ description }}$</p>
  </a-card>
</template>

<script>
export default {
  name: 'QuestionnaireCard',
  props: {
    title: String,
    description: String
  }
}
</script>

<style lang="stylus" scoped>

</style>

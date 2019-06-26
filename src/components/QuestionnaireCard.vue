<template>
  <a-card
    hoverable
  >
    <a-card-meta
      :title="title"
      :description="description">
      <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    </a-card-meta>
    <a-divider />
    <p>问卷详情: {{ description }}</p>
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

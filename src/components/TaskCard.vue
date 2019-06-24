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
    <p>报酬: {{ pay }}$</p>
    <p>地址: {{ address }}</p>
    <p>时间: {{ startDate }} ~ {{ endDate }}</p>
    <p>类型: {{ type }}</p>
  </a-card>
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
  }
}
</script>

<style lang="stylus" scoped>

</style>

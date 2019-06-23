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
      title="Task"
      description="Could you help me?">
      <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    </a-card-meta>
    <a-divider />
    <p>报酬: {{ pay }}$</p>
    <p>快递地址: {{ from }}</p>
    <p>收货地址: {{ to }}</p>
  </a-card>
</template>

<script>
export default {
  name: 'TaskCard',
  props: {
    pay: String,
    from: String,
    to: String
  }
}
</script>

<style lang="stylus" scoped>

</style>

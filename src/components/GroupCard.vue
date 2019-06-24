<template>
  <a-card
    hoverable
  >
    <img
      alt="example"
      :src="image"
      slot="cover"
    />
    <template class="ant-card-actions" slot="actions">
      <a-icon type="plus" />
      <a-icon type="info" />
    </template>
    <a-card-meta
      :title="name"
      :description="`当前人数: ${number}`">
      </a-card-meta>
  </a-card>
</template>

<script>
export default {
  name: 'GroupCard',
  props: {
    name: String,
    number: Number,
    image: String
  }
}
</script>

<style scoped>

</style>

<template>
  <a-spin
    class="loading-spin"
    v-show="loading"
    size="large"
    tip="Loading..." />
</template>

<script>
export default {
  name: 'Loading',
  props: {
    loading: Boolean
  }
}
</script>

<style lang="stylus" scoped>
.loading-spin
  position fixed
  top 50%
  left 50%
  transform translate(-50%, -50%)
</style>

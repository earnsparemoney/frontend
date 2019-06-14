<template>
  <div>
    Home
    <a-button
      @click="goToRegister">
      注册</a-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    goToRegister () {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>

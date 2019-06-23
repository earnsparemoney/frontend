<template>
  <div>
    Home
    <a-button
      @click="goToRegister">
      注册</a-button>

    <a-button
      @click="goToUser">
      用户</a-button>

    <a-button
      @click="goToQuestionaire">
      问卷</a-button>

    <a-button
      @click="goToGroup">
      兴趣组</a-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    goToRegister () {
      this.$router.push('/register')
    },
    goToUser () {
      this.$router.push('/user')
    },
    goToQuestionaire () {
      this.$router.push('/questionaire')
    },
    goToGroup () {
      this.$router.push('/group')
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>

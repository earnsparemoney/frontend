<template>
  <div>
    Home
    <a-button
      @click="goToRegister">
      注册</a-button>

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
    goToQuestionaire () {
      this.$router.push('/questionaire')
    },
    goToGroup () {
      this.$router.push('/group')
    },
    goToTasks () {
      this.$router.push('/alltasks')
    },
    goToTask () {
      this.$router.push('/task')
    },
    goToPC () {
      this.$router.push('/questionairepc')
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>

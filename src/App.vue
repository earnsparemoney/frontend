<template>
  <div id="app">
    <nav-bar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style lang="stylus">
  main
    height 100%
    padding 64px 0 0 0
    background-color #ecf1f1

  #app
    height 100%

  .ant-modal
    .ant-btn-primary
      background-color #ff4d4f
      border #ff4d4f
</style>

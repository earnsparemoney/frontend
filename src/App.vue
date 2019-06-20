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

  #app
    height 100%
</style>

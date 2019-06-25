<template>
  <div class="home">
    <keep-alive>
      <div class="nav-view">
        <a-menu
          mode="horizontal"
          defaultSelectedKeys='questionnaires'
          @click="handleMenuClick"
        >
          <a-menu-item key="questionnaires">
            <a-icon type="file-text" />问卷中心
          </a-menu-item>
          <a-menu-item key="tasks">
            <a-icon type="ordered-list" />任务中心
          </a-menu-item>
          <a-menu-item key="hot">
            <a-icon type="rise" />热门
          </a-menu-item>
          <a-menu-item key="group">
            <a-icon type="team" />兴趣组
          </a-menu-item>
        </a-menu>
      </div>
    </keep-alive>
    <router-view></router-view>
    <!--Home
    <a-button
      @click="goToRegister">
      注册</a-button>

    <a-button
      @click="goToQuestionaire">
      问卷</a-button>

    <a-button
      @click="goToGroup">
      兴趣组</a-button>

    <a-button
      @click="goToTasks">
      任务清单</a-button>

    <a-button
      @click="goToTask">
      任务</a-button>

    <a-button
      @click="goToPC">
      pc问卷</a-button>-->

  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  methods: {
    handleMenuClick (e) {
      this.$router.push(`${e.key}`)
    },
    goToRegister () {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav-view
  0 2px 8px #f0f1f2
</style>

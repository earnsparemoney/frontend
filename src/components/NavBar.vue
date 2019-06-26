<template>
  <header id='header'>
    <a-row>
      <a-col class='header-left' :xxl='4' :xl='5' :lg='5' :md='8' :sm='8' :xs='21'>
        <router-link to='/' id='logo'>
          <img alt='logo' height='40' src='@/assets/logo.png' />
          <img alt='logo' height='30' src='@/assets/fontlogo.png' />
        </router-link>
      </a-col>
      <a-col :xxl='18' :xl='17' :lg='17' :md='14' :sm='13' :xs='0'>
        <a-menu mode='horizontal' class='menu-site' id='nav'>
<!--          <a-menu-item key='1'>
            首页
          </a-menu-item>-->
        </a-menu>
      </a-col>
      <a-col :xxl='2' :xl='2' :lg='2' :md='2' :sm='3' :xs='3'>
        <a-dropdown :trigger="['click']">
          <div class="user-menu" to="#">
            <img class="user-icon" alt='user-icon' height='50' src='@/assets/test.png' />
            <!--<span class="dropdown-caret"></span>-->
          </div>
          <a-menu slot="overlay" @click="handleMenuItemClick">
            <a-menu-item key="/user">
              个人中心
            </a-menu-item>
            <a-menu-item key="/">
              修改信息
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3">Logout</a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-col>
    </a-row>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    handleMenuItemClick ({ key }) {
      if (!(location.href.includes('/user') && key.includes('/user'))) {
        this.$router.push(key)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#header
  position fixed
  z-index 1000
  width 100%
  transition 0.2s ease-in-out
  text-decoration none
  background-color white
  border-bottom 1px solid #e9e9e9

#logo
  padding 0 20px
  line-height 64px

#nav
  border 0
  float right
  font-size 14px
  font-family Avenir, @font-family
  font-variant tabular-nums

  &.ant-menu-horizontal
    border-bottom none

    & > .ant-menu-item
      height 64px
      line-height 60px
      min-width 72px
      border-top 2px solid transparent

      &:hover
        border-top 2px solid #1890ff
        border-bottom 2px solid transparent

    & > .ant-menu-item-selected
      border-top: 2px solid #1890ff
      border-bottom: 2px solid transparent
      a
        color: #1890ff

  & > .ant-menu-item
    text-align: center;

.user-menu
  height 64px
  cursor pointer
  float right
  padding 15px 15px

.user-icon
  line-height 64px
  height 40px
  align-items center

.dropdown-caret
  border-bottom 0 solid transparent
  border-left 4px solid transparent
  border-right 4px solid transparent
  border-top-style solid
  border-top-width 4px
  content ""
  display inline-block
  height 0
  vertical-align middle
  width: 0
</style>

<template>
  <div class="user">
    <div class="info">
      <div class="info__img--wrapper">
        <img :src="`/api/${this.$store.state.userInfo.img}`" class="info__img">
      </div>
      <div class="info__detail--wrapper">
        <span class="info__name">
          {{ userInfo ? userInfo.username : 'limsanity' }}
        </span>
        <span class="info__phone">
          <a-icon type="phone" />
          {{ userInfo ? userInfo.phone : '15625583871' }}
          <a-icon
            :data-clipboard-text="userInfo.phone"
            class="copy"
            type="copy" />
        </span>
        <span
          class="info__social">
          <a-icon type="mail" />
          {{ userInfo ? userInfo.email : '15625583871@qq.com' }}
          <a-icon
            :data-clipboard-text="userInfo.email"
            class="copy"
            type="copy" />
        </span>
        <span
          class="info__social">
          <a-icon type="money-collect" />
          {{ userInfo ? userInfo.balance : '0' }}
        </span>
      </div>
    </div>

    <a-menu
      ref="menu"
      class="menu"
      mode="horizontal"
      defaultSelectedKeys='task'
      @click="handleMenuClick"
    >
      <a-menu-item class="menu__item" key="task">进行中的任务</a-menu-item>
      <a-menu-item class="menu__item" key="finish">已完成的任务</a-menu-item>
      <a-menu-item class="menu__item" key="publichedtask">已发布的任务</a-menu-item>
      <a-menu-item class="menu__item" key="questionnaire">已发布的问卷</a-menu-item>
    </a-menu>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      phone: '15625583871',
      email: '798607646@qq.com',
      balance: '0',
      doingTasks: [],
      finishTasks: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    handleMenuClick (e) {
      this.$router.push(`${e.key}`)
    }
  },
  mounted () {
    /* eslint-disable no-new */
    const clipboard = new this.Clipboard('.copy')
    clipboard.on('success', () => {
      this.message.success('复制成功')
    })
  }
}
</script>

<style lang="stylus" scoped>
@media (min-width 1200px)
  .user
    background-color #ecf1f1
  .info
    display flex
    height 120px
    margin 10px
    .info__img--wrapper
      width 120px
      height 120px
      margin 0 30px
      padding 5px
    .info__img
      width 100%
      height 100%
    .info__detail--wrapper
      display flex
      flex-direction column

      .info__name
        margin-bottom 10px
        font-size 25px

      .info__phone
        margin-bottom 5px
        font-size 16px

      .info__social
        font-size 16px
  .menu
    background-color #ecf1f1

@media (min-width 576px) and (max-width 1200px)
  .user
    background-color #ecf1f1
  .info
    display flex
    align-items center
    height 226px

    .info__img--wrapper
      width 120px
      height 120px
      margin 0 40px

    .info__img
      width 100%
      height 100%

    .info__detail--wrapper
      display flex
      flex-direction column

      .info__name
        margin-bottom 10px
        font-size 25px

      .info__phone
        margin-bottom 5px
        font-size 16px

      .info__social
        font-size 16px
  .menu
    background-color #ecf1f1

@media (max-width 576px)
  .user
    background-color #ecf1f1
  .info
    display flex
    align-items center
    box-sizing border-box
    padding 20px

    .info__img--wrapper
      width 120px
      height 120px

      .info__img
        width 100%
        height 100%

    .info__detail--wrapper
      display flex
      flex-direction column
      justify-content center
      align-items center
      margin auto

      .info__name
        margin-bottom 20px
        font-size 25px

      .info__phone
        margin-bottom 10px
        font-size 14px

      .info__social
        font-size 14px

  .menu
    display flex
    background-color #ecf1f1

    .menu__item
      flex 1
      text-align center
</style>

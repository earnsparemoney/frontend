<template>
  <div class="user">
    <div class="info">
      <div class="info__img--wrapper">
        <img src="@/assets/test.png" class="info__img">
      </div>
      <div class="info__detail--wrapper">
        <span class="info__name">
          {{ username || 'limsanity' }}
        </span>
        <span class="info__phone">
          <a-icon type="phone" />
          {{ phone }}
          <a-icon
            :data-clipboard-text="phone"
            class="copy"
            type="copy" />
        </span>
        <span
          class="info__social">
          <a-icon type="qq" />
          {{ qq }}
          <a-icon
            :data-clipboard-text="qq"
            class="copy"
            type="copy" />
        </span>
      </div>
    </div>

    <a-menu
      class="menu"
      mode="horizontal"
      defaultSelectedKeys='task'
      @click="handleMenuClick"
    >
      <a-menu-item class="menu__item" key="task">进行中的任务</a-menu-item>
      <a-menu-item class="menu__item" key="finish">已完成的任务</a-menu-item>
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
      qq: '798607646'
    }
  },
  computed: {
    ...mapState(['username'])
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
@media (min-width 576px) and (max-width 1200px)
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

@media (max-width 576px)
  .info
    display flex
    flex-direction column
    justify-content center
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

      .info__name
        margin-top 20px
        margin-bottom 20px
        font-size 25px

      .info__phone
        margin-bottom 10px
        font-size 14px

      .info__social
        font-size 14px

  .menu
    display flex

    .menu__item
      flex 1
      text-align center
</style>

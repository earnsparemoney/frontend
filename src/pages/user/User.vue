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

    <div class="menu">
      <span
        :class="['menu__item', item.selected ? 'menu__item--selected' : '']"
        v-for="(item, index) of menuItems"
        :key="item.itemName"
        @click="handleMenuItemClick(index)"
      >
        {{ item.itemName }}
      </span>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import authService from '@/services/authService'
export default {
  name: 'User',
  data () {
    return {
      userInfo: {
        phone: '',
        email: '',
        username: '',
        balance: 0
      },
      menuItems: [
        {
          itemName: '进行中的任务',
          selected: true,
          itemView: 'task'
        },
        {
          itemName: '已完成的任务',
          selected: false,
          itemView: 'finish'
        },
        {
          itemName: '已发布的任务',
          selected: false,
          itemView: 'publichedtask'
        },
        {
          itemName: '已发布的问卷',
          selected: false,
          itemView: 'questionnaire'
        }
      ]
    }
  },
  methods: {
    handleMenuClick (e) {
      this.$router.push(`${e.key}`)
    },
    fetchData () {
      authService.getUserInfo(this.$store.state.userInfo.id)
        .then((res) => {
          this.userInfo = res.data.user
        })
    },
    handleMenuItemClick (index) {
      const path = this.menuItems[index].itemView
      this.$router.push(path)
      this.setMenuSelected(path)
    },
    setMenuSelected (path) {
      this.menuItems.forEach(item => {
        item.selected = item.itemView === path
      })
    }
  },
  created () {
    this.fetchData()
  },
  mounted () {
    /* eslint-disable no-new */
    const clipboard = new this.Clipboard('.copy')
    clipboard.on('success', () => {
      this.message.success('复制成功')
    })
    const currentPath = this.$route.path.substr(6)
    this.setMenuSelected(currentPath)
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
    overflow hidden
    overflow-x scroll
    white-space nowrap
    background-color #fff
    z-index 999

    .menu__item
      display inline-block
      height 48px
      line-height 48px
      padding 0 18px
      background-color #fff
      cursor pointer

    .menu__item--selected
      color #1890ff
      border-bottom 2px solid #1890ff

</style>

<template>
  <div class="home">
    <div class="nav-view">
      <div class="menu">
        <span
          :class="['menu__item', item.selected ? 'menu__item--selected' : '']"
          v-for="(item, index) of menuItems"
          :key="item.itemName"
          @click="handleMenuItemClick(index)"
        >
          <a-icon :type="item.iconType"></a-icon>
          {{ item.itemName }}
        </span>
      </div>
    </div>
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      menuItems: [
        {
          iconType: 'file-text',
          itemName: '问卷中心',
          selected: true,
          itemView: 'questionnaires'
        },
        {
          iconType: 'ordered-list',
          itemName: '任务中心',
          selected: false,
          itemView: 'tasks'
        },
        {
          iconType: 'rise',
          itemName: '热门',
          selected: false,
          itemView: 'hot'
        },
        {
          iconType: 'team',
          itemName: '兴趣组',
          selected: false,
          itemView: 'group'
        }
      ]
    }
  },
  methods: {
    handleMenuItemClick (index) {
      const path = this.menuItems[index].itemView
      this.$router.push(path)
      this.setMenuSelected(path)
    },
    goToRegister () {
      this.$router.push('/register')
    },
    setMenuSelected (path) {
      this.menuItems.forEach(item => {
        item.selected = item.itemView === path
      })
    }
  },
  mounted () {
    const currentPath = this.$route.path.substr(1)
    this.setMenuSelected(currentPath)
  }
}
</script>

<style lang="stylus" scoped>
.home
  background-color #ecf1f1

  .menu
    white-space nowrap
    background-color #fff

    .menu__item
      display inline-block
      height 48px
      line-height 48px
      padding 0 18px
      background-color #fff

    .menu__item--selected
      color #1890ff
      border-bottom 2px solid #1890ff

  .nav-view
    0 2px 8px #f0f1f2
    overflow hidden
    overflow-x scroll

</style>

<template>
  <a-card class="question-card" hoverable>
    <a-dropdown class="ant-dropdown-link">
      <a>
        <a-icon type="setting" theme="filled" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item class="ant-menu-item" @click="handleMoveUpClick(index)">
          <a>
            <a-icon type="arrow-up"></a-icon>
            上移
          </a>
        </a-menu-item>
        <a-menu-divider></a-menu-divider>
        <a-menu-item class="ant-menu-item" @click="handleMoveDownClick(index)">
          <a>
            <a-icon type="arrow-down"></a-icon>
            下移
          </a>
        </a-menu-item>
        <a-menu-divider></a-menu-divider>
        <a-menu-item class="ant-menu-item" @click="handleDeleteClick(index)">
          <a>
            <a-icon type="delete"></a-icon>
            删除
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-card-meta
      :title="title"
      :description="description">
      <a-avatar slot="avatar" :src="`api/${publisher.img}`" />
    </a-card-meta>
    <div class="icon__wrapper">
      <div class="icon__item">
        <a-icon type="money-collect"></a-icon>
        <span>{{ award }}</span>
      </div>
      <a-divider type="vertical"></a-divider>
      <div class="icon__item">
        <a-icon type="user"></a-icon>
        <span>{{ numOfFilled }}</span>
      </div>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'QuestionnaireCard',
  props: {
    title: String,
    description: {
      type: String,
      default: '1234'
    },
    publisher: Object,
    numOfFilled: {
      type: Number,
      default: 3
    },
    award: {
      type: Number,
      default: 2
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.question-card
  boxShadow()
  position relative
  .ant-dropdown-link
    settingPos()

>>> .ant-card-body
  padding-bottom 10px
  .icon__wrapper
    margin-left 3px
    .icon__item
      display inline-block
      margin-top 15px
</style>

<template>
  <a-card class="question-card" hoverable>
    <a-dropdown
      class="ant-dropdown-link"
      v-if="this.$store.state.userInfo && this.$store.state.userInfo.id === item.publisher.id">
      <a>
        <a-icon type="setting" theme="filled" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item class="ant-menu-item" @click="handleDownloadClick">
          <a>
            <a-icon type="download"></a-icon>
            下载问卷统计结果
          </a>
        </a-menu-item>
        <a-menu-divider></a-menu-divider>
        <a-menu-item class="ant-menu-item" @click="handleDeleteClick">
          <a>
            <a-icon type="delete"></a-icon>
            删除
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-card-meta
      :title="item.title"
      :description="item.description">
      <a-avatar slot="avatar" :src="`/api/${item.publisher.img}`" />
    </a-card-meta>
    <div class="icon__wrapper">
      <div class="icon__item">
        <a-icon type="money-collect"></a-icon>
        <span>{{ item.adward }}</span>
      </div>
      <a-divider type="vertical"></a-divider>
      <div class="icon__item">
        <a-icon type="user"></a-icon>
        <span>{{ item.numOfFilled }} / {{ item.usernum }}</span>
      </div>
    </div>
    <a-modal
      class="modal"
      :style="modalStyle"
      :title="title"
      :visible="visible"
      @ok="handleOk"
      okText="删除"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      cancelText="取消"
      :closable="false"
    >
      <p>{{ModalText}}</p>
    </a-modal>
  </a-card>
</template>

<script>
export default {
  name: 'QuestionnaireCard',
  props: {
    item: Object
  },
  data () {
    return {
      ModalText: '你要删除该问卷吗',
      visible: false,
      modalStyle: {
        top: '30%'
      },
      confirmLoading: false
    }
  },
  methods: {
    handleDownloadClick () {

    },
    handleDeleteClick () {
      this.visible = true
    },
    handleOk () {
      this.$emit('delete')
      this.visible = false
    },
    handleCancel () {
      this.visible = false
      this.confirmLoading = false
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

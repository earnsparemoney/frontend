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
import questionnaireService from '@/services/questionnaireService'
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
      console.log(JSON.parse(this.item.questions))
      let headerLabel = JSON.parse(this.item.questions).map(item => {
        return item.title
      })
      console.log(headerLabel)
      questionnaireService.getQuestionnaireResult(this.item.id, this.$store.state.token)
        .then((res) => {
          console.log(res)
          let csvContent = 'data:text/csv;charset=utf-8,\ufeff'
          csvContent += headerLabel + '\n'
          csvContent += res.data.result
          csvContent += '\n'
          const link = document.createElement('a')
          link.setAttribute('href', encodeURI(csvContent))
          link.setAttribute('download', this.item.title + '_result.csv')
          link.click()
        }).catch((err) => {
          console.log(err.response)
          this.message.error('获取失败!')
        })
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

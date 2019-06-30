<template>
  <div
    class="settings">
    <a-form
      class="form"
      :form="form"
    >
      <a-form-item>
        <h1 class="form__h1--title">更新账号信息</h1>
      </a-form-item>

      <img class="logo" @click="showUploader" :src="userImg"/>
      <form ref="uploadForm" v-show="false">
        <input
          type="file"
          ref="imageUploader"
          name="image"
          accept=".jpg, .jpeg, .png, .gif, .bmp"
          @change="updateImage"/>
      </form>

      <a-form-item
        label="用户名"
        has-feedback>
        <a-input
          v-model="username"
          type="text"
          placeholder="6-16位英文和数字组合的用户名"
          v-decorator="[
            'username',
            {rules: [{ pattern: /^[a-zA-Z0-9]{6,16}$/, message: '用户名格式错误' }]}
          ]">
          <a-icon
            slot="prefix"
            type="user"
            :style="iconStyle"
          />
        </a-input>
      </a-form-item>

      <a-form-item
        label="邮箱"
        has-feedback>
        <a-input
          type="text"
          placeholder="请输入你的邮箱"
          v-model="email"
          v-decorator="[
            'email',
            {rules: [{ pattern: /^[\w\.-]+@[\w\-]+\.\w{2,3}$/, message: '邮箱格式不正确' }]}
          ]">
          <a-icon
            slot="prefix"
            type="mail"
            :style="iconStyle"
          />
        </a-input>
      </a-form-item>

      <a-form-item
        label="手机号码"
        has-feedback>
        <a-input
          type="text"
          placeholder="请输入你的手机号码"
          v-model="phone"
          v-decorator="[
            'phone',
            {rules: [{ pattern: /^[0-9]{11}$/, message: '手机号码格式不正确' }]}
          ]">
          <a-icon
            slot="prefix"
            type="phone"
            :style="iconStyle"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          class="form__button--register"
          type="primary"
          :loading="loading"
          @click="handleSubmit">更新信息</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import authService from '@/services/authService'
export default {
  name: 'Settings',
  data () {
    return {
      userImg: '',
      username: '',
      email: '',
      phone: '',
      iconStyle: {
        color: 'rgba(0,0,0,.25)'
      },
      loading: false
    }
  },
  created () {
    this.userImg = '/api/' + this.$store.state.userInfo.img
    this.username = this.$store.state.userInfo.username
    this.email = this.$store.state.userInfo.email
    this.phone = this.$store.state.userInfo.phone
  },
  methods: {
    ...mapActions(['updateState']),
    handleSubmit () {
      let data
      data = new FormData()
      data.append('username', this.username)
      data.append('email', this.email)
      data.append('phone', this.phone)
      if (this.$refs.imageUploader.files[0]) {
        data.append('image', this.$refs.imageUploader.files[0])
      }
      authService.updateUser(data, this.$store.state.token)
        .then((res) => {
          this.message.info('更新成功')
          this.updateState({
            userInfo: res.data.user,
            token: res.data.token
          })
          this.$router.push('/')
        }).catch((err) => {
          console.log(err.response)
          this.message.error('更新失败')
        })
    },
    isValidate () {
      let validate = true
      this.form.validateFields((err, values) => {
        validate = err ? false : validate
      })
      return validate
    },
    goToLogin () {
      this.$router.push('/login')
    },
    showUploader () {
      this.$refs.imageUploader.click()
    },
    updateImage () {
      this.userImg = window.webkitURL.createObjectURL(this.$refs.imageUploader.files[0])
    }
  }
}
</script>

<style lang="stylus" scoped>
  .logo
    position relative
    left 50%
    width 178px
    height 178px
    transform translateX(-50%)
  fontStyle()
    font-size 14px
    font-weight 400

  formStyle(_width, _bgColor)
  width _width
  background-color _bgColor
  padding 80px 20px 0px 20px
  border-radius 6px
  .form__h1--title
    text-align center
  .form__button--register
    width 100%
    height 45px

  >>> label
    fontStyle()
    color #81838C

  >>> .ant-input
    fontStyle()
    height 43px

  .settings
    display flex
    flex-direction column
    justify-content center
    align-items  center
    padding 30px 0
    background-color #ecf1f1

    .register__button--login
      position absolute
      top 74px
      right 10px

    @media (min-width 1200px)
      .form
        width 50%
        formStyle(30%, #fff)

    @media (min-width 768px) and (max-width 1200px)
      .form
        formStyle(55%, #fff)

    @media (max-width 576px)
      .form
        formStyle(90%, #ecf1f1)
</style>

<template>
  <div
    class="register"
    :style="registerStyle">
    <a-button class="register__button--login" @click="goToRegister">注册</a-button>
    <a-form
      class="form"
      :form="form"
      layout="vertical">
      <a-form-item>
        <h1 class="form__h1--title">欢迎回来!</h1>
      </a-form-item>

      <a-form-item
        label="用户名"
        :validate-status="username.status">
        <a-input
          type="text"
          placeholder="请输入用户名"
          v-model="username.value">
          <a-icon
            slot="prefix"
            type="user"
            :style="iconStyle"
          />
        </a-input>
      </a-form-item>

      <a-form-item
        label="密码"
        :validate-status="password.status">
        <a-input
          type="password"
          placeholder="请输入密码"
          v-model="password.value">
          <a-icon
            slot="prefix"
            type="lock"
            :style="iconStyle"
          />
        </a-input>
      </a-form-item>

      <a-form-item>
        <span class="form__span--forget">忘记密码</span>
      </a-form-item>

      <a-form-item>
        <a-button
          class="form__button--login"
          type="primary"
          :loading="loading"
          @click="handleLogin">
          登陆</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      form: this.$form.createForm(this),
      loading: false,
      username: {
        value: '',
        status: ''
      },
      password: {
        value: '',
        status: ''
      },
      registerStyle: {
        height: document.documentElement.clientHeight - 64 + 'px'
      },
      iconStyle: {
        color: 'rgba(0,0,0,.25)'
      }
    }
  },
  methods: {
    goToRegister () {
      this.$router.push('/register')
    },
    handleLogin () {
      if (this.isValidate()) {
        this.loading = true
      }
    },
    isValidate () {
      const username = this.username
      const password = this.password
      this.username.status = username.value ? 'success' : 'error'
      this.password.status = password.value ? 'success' : 'error'
      return this.username.status === 'success' && this.password.status === 'success'
    }
  }
}
</script>

<style lang="stylus" scoped>
  fontStyle()
    font-size 14px
    font-weight 400

  formStyle(_width, _bgColor)
    width _width
    background-color _bgColor
    padding 24px 20px 0px 20px
    border-radius 6px
    .form__h1--title
        text-align center
    .form__span--forget
      color #0B99B2
      cursor pointer
    .form__button--login
      width 100%

  >>> label
    fontStyle()
    color #81838C

  >>> .ant-input
      height 43px
      fontStyle()

  .register
    display flex
    flex-direction column
    justify-content center
    align-items  center
    background-color #ecf1f1

    .register__button--login
      position absolute
      top 74px
      right 10px

    @media (min-width 1200px)
      .form
        formStyle(30%, #fff)

    @media (min-width 768px) and (max-width 1200px)
      .form
        formStyle(55%, #fff)

    @media (max-width 576px)
      .form
        formStyle(90%, #ecf1f1)
</style>

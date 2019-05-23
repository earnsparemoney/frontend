<template>
  <div
    class="register"
    :style="registerStyle">
    <a-button class="register__button--login" @click="goToLogin">登录</a-button>
    <a-form
      class="form"
      :form="form"
      layout="vertical">
      <a-form-item>
        <h1 class="form__h1--title">创建一个账户</h1>
      </a-form-item>

      <a-form-item
        label="用户名"
        has-feedback>
        <a-input
          type="text"
          placeholder="6-16位英文和数字组合的用户名"
          v-decorator="[
            'username',
            {rules: [{ required: true, pattern: /^[a-zA-Z0-9]{6,16}$/, message: '用户名格式错误' }]}
          ]">
          <a-icon
            slot="prefix"
            type="user"
            :style="iconStyle"
          />
        </a-input>
      </a-form-item>

      <a-form-item
        label="密码"
        has-feedback>
        <a-input
          type="password"
          placeholder="8-16位英文和数字组合的密码"
          v-decorator="[
            'passowrd',
            {rules: [{ required: true, pattern: /^[a-zA-Z0-9]{8,16}$/, message: '密码格式错误' }]}
          ]">
          <a-icon
            slot="prefix"
            type="lock"
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
          v-decorator="[
            'email',
            {rules: [{ required: true, pattern: /^[\w\.-]+@[\w\-]+\.\w{2,3}$/, message: '邮箱格式不正确' }]}
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
          v-decorator="[
            'phone',
            {rules: [{ required: true, pattern: /^[0-9]{11}$/, message: '手机号码格式不正确' }]}
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
          @click="handleSubmit">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      registerStyle: {
        height: ''
      },
      form: this.$form.createForm(this),
      iconStyle: {
        color: 'rgba(0,0,0,.25)'
      },
      loading: false
    }
  },
  methods: {
    handleSubmit () {
      this.isValidate() ? this.loading = true : console.log('error')
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
    }
  },
  mounted () {
    this.registerStyle.height = document.documentElement.clientHeight - 64 + 'px'
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
    .form__button--register
      width 100%

  >>> label
    fontStyle()
    color #81838C

  >>> .ant-input
    fontStyle()
    height 43px

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

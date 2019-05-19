<template>
  <div
    class="register"
    :style="registerStyle">
    <a-button class="button-login" @click="goToRegister">注册</a-button>
    <a-form
      class="form"
      :form="form"
      layout="vertical">
      <a-form-item
        label="用户名"
        has-feedback>
        <a-input
          type="text"
          placeholder="请输入用户名">
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
          placeholder="请输入密码">
          <a-icon
            slot="prefix"
            type="lock"
            :style="iconStyle"
          />
        </a-input>
      </a-form-item>

      <a-form-item>
        <span class="form-forget">忘记密码</span>
      </a-form-item>

      <a-form-item>
        <a-button
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
      registerStyle: {
        height: document.documentElement.clientHeight - 64 + 'px'
      },
      form: this.$form.createForm(this),
      iconStyle: {
        color: 'rgba(0,0,0,.25)'
      },
      loading: false
    }
  },
  methods: {
    goToRegister () {
      this.$router.push('/register')
    },
    handleLogin () {
      this.loading = true
    }
  }
}
</script>

<style lang="stylus" scoped>
  fontStyle()
    font-size 14px
    font-weight 400

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
    background-color #f3f3f3

    .button-login
      position absolute
      top 74px
      right 10px

    .form
      background-color #fff
      border-radius 6px

      .form-forget
        color #0B99B2
        cursor pointer

    @media (min-width 1200px)
      .form
        width 30%
        padding 24px 20px 0px 20px

    @media (min-width 768px) and (max-width 1200px)
      .form
        width 55%
        padding 24px 20px 0px 20px

    @media (max-width 576px)
      .form
        width 90%
        padding 24px 20px 0px 20px
</style>

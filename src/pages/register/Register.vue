<template>
  <a-row
    class="register"
    :style="registerStyle"
    type="flex"
    justify="center"
    align="middle">
    <a-col
      :xs="{ span: 16 }"
      :md="{ span: 12 }"
      :xl="{ span: 6 }">
      <a-form :form="form" layout="vertical">
        <a-form-item
          label="Username"
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
          label="Password"
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
          label="Email"
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
          label="Phone"
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
            type="primary"
            :loading="loading"
            @click="handleSubmit">注册</a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
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
    handleSubmit () {
      this.isValidate() ? this.loading = true : console.log('error')
    },
    isValidate () {
      let validate = true
      this.form.validateFields((err, values) => {
        validate = err ? false : validate
      })
      return validate
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
    background-color #f3f3f3
</style>

<template>
  <a-row
    class="register"
    :style="registerStyle"
    type="flex"
    justify="center"
    align="middle">
    <a-col
      :xs="{ span:16 }"
      :sm="{ span: 6 }">
      <a-form :form="form" layout="vertical">
        <a-form-item
          label="Username"
          has-feedback>
          <a-input
            type="text"
            placeholder="Plase input your username"
            v-decorator="[
              'username',
              {rules: [{ required: true, pattern: /^\w{6}$/, message: 'error' }]}
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
            placeholder="Plase input your passowrd"
            v-decorator="[
              'passowrd',
              {rules: [{ required: true, pattern: /^\w{6}$/, message: 'error' }]}
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
            placeholder="Plase input your email"
            v-decorator="[
              'email',
              {rules: [{ required: true, pattern: /^\w{6}$/, message: 'error' }]}
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
            placeholder="Plase input your email"
            v-decorator="[
              'phone',
              {rules: [{ required: true, pattern: /^\w{6}$/, message: 'error' }]}
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
        height: document.documentElement.clientHeight + 'px'
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
      this.$refs.register.style = 'height: ' + document.documentElement.clientHeight + 'px'
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

  .register
    background-color #f3f3f3

    >>> .ant-input
      height 43px
      fontStyle()
</style>

export default {
  methods: {
    handleCancelClick () {
      this.$emit('cancel', this.$options.name)
    }
  }
}

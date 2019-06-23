export default {
  methods: {
    handleCancelClick () {
      this.$emit('cancel', this.$options.name)
    },
    handleSaveClick () {
      this.$emit('add', {
        type: this.$options.name,
        question: this.question
      })
    }
  }
}

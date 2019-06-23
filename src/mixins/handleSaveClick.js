export default {
  methods: {
    handleSaveClick () {
      this.$emit('add', {
        type: this.$options.name,
        question: this.question
      })
    }
  }
}

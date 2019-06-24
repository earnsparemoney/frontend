<template>
  <div class="fill">
   <type-template
    :question="question"
    type="Fill">
      <div>
        <a-input
          class="title"
          v-model="question.title"
          placeholder="点击编辑题目名称"></a-input>

        <a-textarea class="input" disabled="true"></a-textarea>
      </div>
   </type-template>
  </div>
</template>

<script>
import TypeTemplate from './TypeTemplate'
export default {
  name: 'Fill',
  components: {
    TypeTemplate
  },
  data () {
    return {
      question: {
        title: ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .fill
    padding 20px

    .title
      height 50px
      font-size 20px

    .input
      margin-top 20px
      height 80px
</style>

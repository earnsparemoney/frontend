<template>
  <div class="judge">
    <type-template
      :question="question"
      type="Judge">
      <div>
        <a-input
          class="title"
          placeholder="点击编辑题目"
          v-model="question.title"></a-input>
      </div>
      <a-radio-group class="answer" name="answer">
        <a-radio :value=true>是</a-radio>
        <a-radio :value=false>否</a-radio>
      </a-radio-group>
    </type-template>
  </div>
</template>

<script>
import TypeTemplate from './TypeTemplate'
export default {
  name: 'Judge',
  components: {
    TypeTemplate
  },
  data () {
    return {
      question: {
        title: ''
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
  .judge
    padding 20px
    .answer
      margin-top 20px
</style>

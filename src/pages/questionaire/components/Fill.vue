<template>
  <div>
   <type-template
    :question="question"
    type="Fill">
      <div>
        <a-input placeholder="点击编辑题目名称"></a-input>
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
      question: {}
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>

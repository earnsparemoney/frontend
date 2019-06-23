<template>
  <div>
   <type-template
    @add="handleSaveClick"
    @cancel="handleCancelClick">
      <div>
        <a-input placeholder="点击编辑题目名称"></a-input>
      </div>
   </type-template>
  </div>
</template>

<script>
import TypeTemplate from './TypeTemplate'
import handleCancelClick from '@/mixins/handleCancelClick'
import handleSaveClick from '@/mixins/handleSaveClick'
export default {
  name: 'Fill',
  mixins: [
    handleCancelClick,
    handleSaveClick
  ],
  components: {
    TypeTemplate
  }
}
</script>

<style lang="stylus" scoped>

</style>

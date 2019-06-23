<template>
  <div>
   <a-input placeholder="点击编辑题目名称"></a-input>
   <bottom-bar
      @add="handleSaveClick"
      @cancel="handleCancelClick"></bottom-bar>
  </div>
</template>

<script>
import handleCancelClick from '@/mixins/handleCancelClick.js'
import handleSaveClick from '@/mixins/handleSaveClick.js'
import BottomBar from '@/components/BottomBar'
export default {
  name: 'Fill',
  mixins: [ handleCancelClick, handleSaveClick ],
  components: {
    BottomBar
  }
}
</script>

<style lang="stylus" scoped>

</style>

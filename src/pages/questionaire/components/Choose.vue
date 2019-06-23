<template>
  <div class="choose">
    <type-template
      :question="question"
      type="Choose">
      <div>
        <a-input
          class="title"
          placeholder="点击编辑题目"
          v-model="question.title"></a-input>

        <a-input
          class="options__item"
          v-for="(item, index) of question.options"
          :key="index"
          v-model="question.options[index]"
          placeholder="点击编辑选项"
        >
          <a-icon slot="suffix" type="minus-circle" @click="removeOption(index)"></a-icon>
        </a-input>

        <div class="add-option" @click="addOption">
          <a-icon type="plus-circle"></a-icon>
          添加选项
        </div>

        <a-radio-group v-model="question.chooseType">
          <a-radio class="choose-type__item" :value="1">单选题</a-radio>
          <a-radio class="choose-type__item" :value="2">多选题</a-radio>
        </a-radio-group>
      </div>
    </type-template>
  </div>
</template>

<script>
import TypeTemplate from './TypeTemplate'
export default {
  name: 'Choose',
  components: {
    TypeTemplate
  },
  data () {
    return {
      question: {
        title: '',
        options: [
          ''
        ],
        chooseType: 1
      }
    }
  },
  methods: {
    addOption () {
      this.question.options.push('')
    },
    removeOption (index) {
      this.question.options.splice(index, 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .choose
    padding 20px

    .title
      height 50px
      font-size 20px

    .options__item
      height 40px
      margin-top 10px

    .add-option
      margin-top 15px

    .choose-type__item
      display block
      margin-top 15px
</style>

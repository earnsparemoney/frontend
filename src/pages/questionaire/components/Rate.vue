<template>
  <div class="choose">
    <type-template
      :question="question"
      type="Rate">
      <a-input
        class="rating-item"
        placeholder="点击编辑题目名称"
        v-model="question.title"></a-input>
      <a-rate
        class="rating-item"
        :count="question.max"
        :defaultValue="1"
        allowHalf />
      <div class="rating-item">
        <span>评分最大范围(1-10):  </span>
        <a-select defaultValue="5" style="width: 120px" @change="changeRating">
          <a-select-option value=1>1</a-select-option>
          <a-select-option value=2>2</a-select-option>
          <a-select-option value=3>3</a-select-option>
          <a-select-option value=4>4</a-select-option>
          <a-select-option value=5>5</a-select-option>
          <a-select-option value=6>6</a-select-option>
          <a-select-option value=7>7</a-select-option>
          <a-select-option value=8>8</a-select-option>
          <a-select-option value=9>9</a-select-option>
          <a-select-option value=10>10</a-select-option>
        </a-select>
      </div>
    </type-template>
  </div>
</template>

<script>
import TypeTemplate from './TypeTemplate'
export default {
  name: 'Rate',
  components: {
    TypeTemplate
  },
  data () {
    return {
      question: {
        title: '',
        max: 5
      }
    }
  },
  methods: {
    changeRating (value) {
      this.question.max = value
    }
  }
}
</script>

<style lang="stylus" scoped>
  .choose
    padding 20px

    .rating-item
      margin-top 20px
</style>

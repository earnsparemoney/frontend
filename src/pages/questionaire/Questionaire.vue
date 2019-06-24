<template>
  <div class="questionaire">
    <a-button
      class="add"
      type="primary"
      shape="circle"
      icon="plus"
      size="large"
      @click="toggleShow('Type')"/>

    <div
      class="questions__wrapper"
      v-for="(item, index) of questions"
      :key="index">
      <div>{{ item.question.title }}</div>

      <a-radio-group
        v-if="item.type === 'Choose'"
        disabled="true">
        <a-radio
          class="radio__item"
          v-for="(radioItem, radioIndex) of item.question.options"
          :key="radioIndex"
          :value="index">
          {{ radioItem }}
        </a-radio>
      </a-radio-group>

      <a-input
        class="input"
        v-if="item.type === 'Fill'"
        disabled="true"></a-input>

      <a-rate
        v-if="item.type === 'Rate'"
        class="rating-item"
        :count="item.question.max"
        :defaultValue="0"
        disabled="true"
        allowHalf />

      <a-radio-group
        class="judge_radio"
        v-if="item.type === 'Judge'"
        disabled="true">
        <a-radio class="choose-type__item" :value="1">单选题</a-radio>
        <a-radio class="choose-type__item" :value="2">多选题</a-radio>
      </a-radio-group>
    </div>

    <type
      class="questionaire_comp"
      v-show="showType"
      @cancel="toggleShow"
      @add="addQuestion"></type>

    <choose
      class="questionaire_comp"
      v-if="showChoose"
    ></choose>

    <fill
      class="questionaire_comp"
      v-if="showFill"></fill>

    <rate
      class="questionaire_comp"
      v-if="showRate"></rate>

    <judge
      class="questionaire_comp"
      v-if="showJudge"></judge>
  </div>
</template>

<script>
import { EventBus } from '@/utils/eventBus'
import Type from './components/Type'
import Choose from './components/Choose'
import Fill from './components/Fill'
import Rate from './components/Rate'
import Judge from './components/Judge'
export default {
  name: 'Questionaire',
  components: {
    Rate,
    Type,
    Choose,
    Fill,
    Judge
  },
  data () {
    return {
      showType: false,
      showChoose: false,
      showFill: false,
      showRate: false,
      showJudge: false,
      questions: []
    }
  },
  methods: {
    toggleShow (type) {
      this[`show${type}`] = !this[`show${type}`]
    },
    addQuestion (type) {
      this.toggleShow('Type')
      this.toggleShow(type)
    },
    addCallback (question) {
      this.toggleShow(question.type)
      this.questions.push(question)
    }
  },
  mounted () {
    EventBus.$on('cancel', this.toggleShow)
    EventBus.$on('add', this.addCallback)
  }
}
</script>

<style lang="stylus" scoped>
@media (max-width 576px)
  .add
    position fixed
    bottom 60px
    right 30px
    width 50px
    height 50px

  .questions__wrapper
    margin 10px
    margin-bottom 20px
    padding 20px
    border-radius 5px
    box-shadow 0px 4px 5px 2px rgba(216, 211, 211, .5)
    .radio__item
      display block
      margin-top 10px
    .input
      margin-top 20px
      height 60px

  .questionaire_comp
    position fixed
    top 64px
    bottom 0
    left 0
    right 0
    background-color #f5f2f2
  .judge_radio
    margin-top 5px
</style>

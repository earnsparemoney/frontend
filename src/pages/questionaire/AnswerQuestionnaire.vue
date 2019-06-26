<template>
<div class="answer-questionnaire">
  <nav class="navigator">
    <a-icon type="home" @click="backToTop"/>
    <span class="breadcrumb-separator">/</span>
    {{question.title}}
  </nav>
  <div class="content">
    <div class="answer-title one-line-ellipsis">{{question.title}}</div>
    <div class="answer-welcome">{{question.description}}</div>
    <div class="answer-cut-line"></div>
    <div
      class="question-content"
      v-for="(item, index) of question.questions"
      :key="index">
      <div class="question-title">Q{{index+1}}: {{item.title}}</div>
      <div class="question-option" v-if="item.type === 'Choose'">
        <a-radio-group v-if="item.chooseType==1" v-model="answers[index]">
          <a-radio class="choose-option" v-for="(option, index) of item.options" :key="index" :value="String.fromCharCode(65+index)">
            {{option}}
          </a-radio>
        </a-radio-group>
        <a-checkbox-group v-if="item.chooseType==2" v-model="answers[index]">
          <a-row v-for="(option, index) of item.options" :key="index">
            <a-col class="choose-option"><a-checkbox :value="String.fromCharCode(65+index)">{{option}}</a-checkbox></a-col>
          </a-row>
        </a-checkbox-group>
      </div>

      <div class="question-option" v-else-if="item.type === 'Fill'">
        <a-textarea class="answer-textarea" v-model="answers[index]" placeholder="填写你的回答" :rows="4"/>
      </div>

      <div class="question-option" v-else-if="item.type === 'Rate'">
        <a-rate
          class="rating-item"
          :count="item.max"
          :defaultValue=1
          allowHalf
          v-model="answers[index]"/>
      </div>
      <div class="question-option" v-if="item.type === 'Judge'">
        <a-radio-group class="answer" name="answer" v-model="answers[index]">
          <a-radio :value=true>是</a-radio>
          <a-radio :value=false>否</a-radio>
        </a-radio-group>
      </div>
    </div>
    <div>
      <a-button class="btn" type="primary" @click="submitResult">提交结果</a-button>
      <a-button class="btn" type="danger" @click="backToTop">取消填写</a-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'AnswerQuestionnaire',
  data () {
    return {
      question: {
        title: '问卷大标题',
        description: '问卷描述问卷描述问卷描述问卷描述问卷描述问卷描述问卷描述问卷描述',
        questions: [{
          title: 'reaggar',
          type: 'Choose',
          options: [
            '1234234',
            '3425435',
            '42354353',
            '321432424'
          ],
          chooseType: 1
        }, {
          title: 'reaggar',
          type: 'Choose',
          options: [
            '1234234',
            '3425435',
            '42354353',
            '321432424'
          ],
          chooseType: 2
        }, {
          title: '给出这次活动的评分',
          max: 5,
          type: 'Rate'
        }, {
          title: '你是否享受这周的活动?',
          type: 'Judge'
        }, {
          title: '填写你的建议',
          type: 'Fill'
        }]
      },
      answers: []
    }
  },
  methods: {
    backToTop () {
      this.$router.go(-1)
    },
    submitResult () {
      const reducer = (accumulator, currentValue) => accumulator + ',"' + currentValue.toString() + '"'
      console.log(this.answers.reduce(reducer, '').substr(1))
    }
  }
}
</script>

<style lang="stylus" scoped>
.answer-questionnaire
  background-color #ecf1f1
  padding 15px 0 0 0
  .navigator
    margin-bottom 15px
    cursor pointer
    .breadcrumb-separator
      margin 0 8px
      color rgba(0, 0, 0, 0.45)
  .content
    .one-line-ellipsis
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      display block
    .answer-title
      font-size 20px
      color #484848
      text-align center
      margin-bottom 30px
    .answer-welcome
      color #707070
    .answer-cut-line
      border 0.5px solid #EAEAEA
      margin 30px 0px 24px
    .question-content
      margin-bottom 18px
      color #AAAAAA
      .question-title
        font-size 16px
        color #484848
        margin-bottom 15px
      .question-option
        display inline-block
        width 100%
        margin-bottom 12px
        .answer-textarea
          width 100%
      .choose-option
        display block
        height 30px
        lineHeight 30px
  .btn
    margin-right 10px
@media (min-width: 1200px)
  .navigator
    width 80%
    margin auto
  .content
    width 80%
    height 100%
    padding 30px
    background white
    box-shadow 0 1px 5px 0 rgba(0, 0, 0, 0.05)
    border-radius 2px
    margin auto
@media (max-width: 1200px)
  .navigator
    width 100%
    margin-left 5px
  .content
    width 100%
    padding 30px
    background white
    height 100%
</style>

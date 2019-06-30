<template>
  <div class="questionaire">
    <a-button
      class="add"
      type="primary"
      shape="circle"
      icon="plus"
      size="large"
      @click="toggleShow('Type')"/>
    <a-button
      class="submit"
      type="dashed"
      shape="circle"
      icon="check"
      size="large"
      @click="handleSubmitClick"/>
    <div class="questionnaire-base-info">
      <div class="header">
        <strong>问卷标题</strong>
        <a-input
          class="meta-data-input"
          v-model="questionnaire.title"
          placeholder="问卷标题"></a-input>
      </div>
      <div class="description">
        <strong>问卷描述</strong>
        <a-textarea
          class="meta-data-input"
          v-model="questionnaire.description"
          placeholder="问卷描述"></a-textarea>
      </div>
    </div>
    <div class="questionnaire-meta">
      <div class="meta-data date__wrapper">
        <span>日期</span>
        <div>
          <a-date-picker
            placeholder="结束日期"
            :disabledDate="disabledDate"
            @change="setEndDate">
          </a-date-picker>
        </div>
      </div>
      <div class="meta-data">
        <span>最多人数</span>
        <a-input
          class="meta-data-input"
          placeholder="最多人数"
          v-model="questionnaire.usernum"></a-input>
      </div>
      <div class="meta-data">
        <span>赏金</span>
        <a-input
          class="meta-data-input"
          v-model="questionnaire.adward"
          placeholder="赏金"></a-input>
      </div>
    </div>

    <transition-group name="flip-list" tag="div">
      <div
        class="questions__wrapper"
        v-for="(item, index) of questionnaire.questions"
        :key="item">

        <a-dropdown>
          <a class="ant-dropdown-link">
            <a-icon type="setting" theme="filled" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item class="ant-menu-item" @click="handleMoveUpClick(index)">
              <a>
                <a-icon type="up"></a-icon>
                上移
              </a>
            </a-menu-item>
            <a-menu-divider></a-menu-divider>
            <a-menu-item class="ant-menu-item" @click="handleMoveDownClick(index)">
              <a>
                <a-icon type="down"></a-icon>
                下移
              </a>
            </a-menu-item>
            <a-menu-divider></a-menu-divider>
            <a-menu-item class="ant-menu-item" @click="handleMoveUpClick(index)">
              <a>
                <a-icon type="edit"></a-icon>
                编辑
              </a>
            </a-menu-item>
            <a-menu-divider></a-menu-divider>
            <a-menu-item class="ant-menu-item" @click="handleDeleteClick(index)">
              <a>
                <a-icon type="delete"></a-icon>
                删除
              </a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>

        <div class="question--title">{{ item.question.title }}</div>

        <a-radio-group
          v-if="item.type === 'Choose' && item.question.chooseType === 1"
          disabled="true">
          <a-radio
            class="radio__item"
            v-for="(radioItem, radioIndex) of item.question.options"
            :key="radioIndex"
            :value="radioIndex">
            {{ radioItem }}
          </a-radio>
        </a-radio-group>

        <a-checkbox-group
          class="checkbox__wrapper"
          v-if="item.type === 'Choose' && item.question.chooseType === 2"
          :options="item.question.options"
          disabled="true">
        </a-checkbox-group>

        <a-textarea
          class="input"
          v-if="item.type === 'Fill'"
          disabled="true"></a-textarea>

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
    </transition-group>

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
import moment from 'moment'
import { EventBus } from '@/utils/eventBus'
import Type from './components/Type'
import Choose from './components/Choose'
import Fill from './components/Fill'
import Rate from './components/Rate'
import Judge from './components/Judge'
import questionnaireService from '@/services/questionnaireService'
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
      questionnaire: {
        title: '',
        description: '',
        questions: [],
        enddate: null,
        adward: 0,
        usernum: 0
      }
    }
  },
  methods: {
    handleSubmitClick () {
      if (!this.isValid()) {
        this.message.error('输入不能为空')
      } else {
        questionnaireService.addQuestionnaire({
          title: this.questionnaire.title,
          description: this.questionnaire.description,
          questions: JSON.stringify(this.questionnaire.questions),
          endDate: this.questionnaire.enddate,
          adward: this.questionnaire.adward,
          usernum: this.questionnaire.usernum
        }, this.$store.state.token).then((res) => {
          this.$router.push('/')
        }).catch((err) => {
          this.message.error(err.response.data.error)
        })
      }
    },
    toggleShow (type) {
      this[`show${type}`] = !this[`show${type}`]
    },
    addQuestion (type) {
      this.toggleShow('Type')
      this.toggleShow(type)
    },
    addCallback (question) {
      this.toggleShow(question.type)
      this.questionnaire.questions.push(question)
    },
    handleMoveUpClick (index) {
      if (index !== 0) {
        const temp = this.questionnaire.questions[index]
        this.questionnaire.questions.splice(index, 1)
        this.questionnaire.questions.splice(index - 1, 0, temp)
      }
    },
    handleMoveDownClick (index) {
      if (index !== this.questionnaire.questions.length - 1) {
        const temp = this.questionnaire.questions[index]
        this.questionnaire.questions.splice(index, 1)
        this.questionnaire.questions.splice(index + 1, 0, temp)
      }
    },
    handleDeleteClick (index) {
      if (this.questionnaire.questions.length !== 0) {
        this.questionnaire.questions.splice(index, 1)
      }
    },
    setEndDate (date, dateString) {
      this.questionnaire.enddate = dateString
    },
    isValid () {
      for (let key in this.questionnaire) {
        let val = this.questionnaire[key]
        if (!val) {
          if (val === 0) {
            return true
          }
          return false
        } else if (Object.prototype.toString.call(val).includes('Array')) {
          for (let item of val) {
            if (!item) {
              return false
            }
          }
        }
      }
      return true
    },
    disabledDate (current) {
      return current < moment().startOf('day')
    }
  },
  mounted () {
    EventBus.$on('cancel', this.toggleShow)
    EventBus.$on('add', this.addCallback)
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
  @media (max-width 576px)
    .questionnaire-base-info
      padding 20px 20px 0 20px
      .header
        margin-bottom 10px
    .questionnaire-meta
      padding 20px
      display flex
      justify-content space-around
      .meta-data
        flex 1
        margin-right 10px
      .date__wrapper
        flex 1.5
    .flip-list-move
      transition: transform 1s
    .questionaire
      background-color #ecf1f1
      overflow hidden
      .add
        position fixed
        bottom 60px
        right 30px
        width 50px
        height 50px
        z-index 1
      .submit
        position fixed
        bottom 120px
        right 30px
        width 50px
        height 50px
        border none
        z-index 1
        color white
        background-color lightseagreen
      .questions__wrapper
        position relative
        margin 10px
        margin-bottom 20px
        padding 20px
        border-radius 5px
        box-shadow 0px 4px 5px 2px rgba(216, 211, 211, .5)
        background-color #fff
        .ant-dropdown-link
          settingPos()
          .ant-menu-item
            padding 0 20px
        .question--title
          font-size 18px
        .radio__item
          display block
          margin-top 10px
        .input
          margin-top 20px
          height 80px
        .checkbox__wrapper
          >>> .ant-checkbox-group-item
            display block
            margin 10px 0
      .questionaire_comp
        position fixed
        top 64px
        bottom 0
        left 0
        right 0
        background-color #f5f2f2
        z-index 1
      .judge_radio
        margin-top 5px
</style>

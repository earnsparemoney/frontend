<template>
  <div class="questionaire">
    <div class="left">
      <h3 class="options">题目类型</h3>
      <div class="type__item--wrapper" @click="handleTypeItemClick">
        <div class="type__item" data-type="Choose">
          <a-icon class="type__item__icon" type="plus-circle" />
          选择题
        </div>
        <div class="type__item" data-type="Fill">
          <a-icon class="type__item__icon" type="edit" />
          填空题
        </div>
        <div class="type__item" data-type="Judge">
          <a-icon class="type__item__icon" type="check" />
          判断题
        </div>
        <div class="type__item" data-type="Rate">
          <a-icon class="type__item__icon" type="star" />
          打分题
        </div>
        <a-button class="btn" type="primary" @click="handleSubmitClick">提交问卷</a-button>
        <a-button class="btn" type="danger" @click="cancelClick">取消</a-button>
      </div>
    </div>
    <div class="content">
      <div class="questionnaire-meta">
        <div class="meta-data">
          <span>日期</span>
          <div class="date__wrapper">
            <a-date-picker
              class="date--start"
              placeholder="开始日期"
              @change="setStartDate">
            </a-date-picker>
            <a-date-picker
              placeholder="结束日期"
              @change="setEndDate">
            </a-date-picker>
          </div>
        </div>
        <div class="meta-data">
          <span>最多人数</span>
          <div>
            <a-input
              class="meta-data-input"
              placeholder="最多人数"
              v-model="questionnaire.usernum">
            </a-input>
          </div>
        </div>
        <div class="meta-data">
          <span>赏金</span>
          <div>
            <a-input
              class="meta-data-input"
              v-model="questionnaire.adward"
              placeholder="赏金">
            </a-input>
          </div>
        </div>
      </div>
      <div class="questions__wrapper questionaire-header">
        <a-input
          class="title"
          size="large"
          placeholder="点击编辑问卷标题"
          v-model="questionnaire.title"></a-input>
        <a-divider />
        <a-textarea v-model="questionnaire.description" placeholder="点击编辑问卷说明" :rows="4"/>
      </div>

      <transition-group name="flip-list" tag="div">
        <div
          class="questions__wrapper"
          v-for="(item, index) of questionnaire.questions"
          :key="item"
          @mouseover="enterItem(index)">

          <a-dropdown>
            <a class="ant-dropdown-link">
              <a-icon type="ellipsis" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item class="ant-menu-item" @click="handleMoveUpClick(index)">
                <a>
                  <a-icon type="arrow-up"></a-icon>
                  上移
                </a>
              </a-menu-item>
              <a-menu-divider></a-menu-divider>
              <a-menu-item class="ant-menu-item" @click="handleMoveDownClick(index)">
                <a>
                  <a-icon type="arrow-down"></a-icon>
                  下移
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

          <a-input
            class="title"
            placeholder="点击编辑题目"
            v-model="item.title"></a-input>

          <a-divider />
          <div v-if="item.type === 'Choose'">
            <div class="choose">
              <a-input
                class="options__item"
                v-for="(option, index) of item.options"
                :key="index"
                v-model="item.options[index]"
                placeholder="点击编辑选项"
              >
                <a-icon slot="suffix" type="minus-circle" @click="removeOption(index)"></a-icon>
              </a-input>

              <div class="add-option" @click="addOption">
                <a-icon type="plus-circle"></a-icon>
                添加选项
              </div>

              <a-radio-group class="choose-type" v-model="item.chooseType">
                <a-radio class="choose-type__item" :value="1">单选题</a-radio>
                <a-radio class="choose-type__item" :value="2">多选题</a-radio>
              </a-radio-group>
            </div>
          </div>

          <div v-else-if="item.type === 'Fill'">
            <a-textarea placeholder="填写你的回答" disabled="true" :rows="4"/>
          </div>

          <div v-else-if="item.type === 'Rate'">
            <a-rate
              class="rating-item"
              :count="item.max"
              :defaultValue=1
              disabled="true"
              allowHalf />
            <div class="rating-item">
              <span>评分最大范围(1-10):  </span>
              <a-select defaultValue=5 style="width: 120px" @change="changeRating">
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
          </div>
          <div v-if="item.type === 'Judge'">
            <a-radio-group class="answer" name="answer" disabled="true">
              <a-radio :value=true>是</a-radio>
              <a-radio :value=false>否</a-radio>
            </a-radio-group>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import questionnaireService from '@/services/questionnaireService'
export default {
  name: 'QuestionairePC',
  data () {
    return {
      clicked: -1,
      questionnaire: {
        title: '',
        description: '',
        questions: [],
        startdate: null,
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
          startDate: this.questionnaire.startdate,
          endDate: this.questionnaire.enddate,
          adward: this.questionnaire.adward,
          usernum: this.questionnaire.usernum
        }, this.$store.state.token).then((res) => {
          console.log(res)
          this.$router.push('/')
        }).catch((err) => {
          console.log(err)
          this.message.error('提交失败')
        })
      }
      console.log(this.questionnaire)
    },
    isValid () {
      for (let key in this.questionnaire) {
        let val = this.questionnaire[key]
        if (!val) {
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
    enterItem (index) {
      console.log(index)
      this.clicked = index
    },
    changeRating (value) {
      this.questionnaire.questions[this.clicked].max = parseInt(value)
    },
    removeOption (index) {
      this.questionnaire.questions[this.clicked].options.splice(index, 1)
    },
    addOption (index) {
      this.questionnaire.questions[this.clicked].options.push('')
    },
    cancelClick () {
      this.$router.go(-1)
    },
    handleTypeItemClick (e) {
      let type = e.target.dataset.type
      let item = null
      switch (type) {
        case 'Choose':
          item = {
            title: '',
            type: type,
            options: [],
            chooseType: 1
          }
          break
        case 'Fill':
          item = {
            title: '',
            type: 'Fill'
          }
          break
        case 'Rate':
          item = {
            title: '',
            max: 5,
            type: 'Rate'
          }
          break
        case 'Judge':
          item = {
            title: '',
            type: 'Judge'
          }
          break
        default:
          return
      }
      this.questionnaire.questions.push(item)
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
    setStartDate (date, dateString) {
      this.questionnaire.startdate = dateString
    },
    setEndDate (date, dateString) {
      this.questionnaire.enddate = dateString
    }
  }
}
</script>

<style lang="stylus" scoped>
.flip-list-move
  transition: transform 1s

.questionaire
  display flex
  height 100%
  .left
    width 160px
    padding 20px
    border-right 1px solid #aab4b5
    .btn
      margin-top 15px
    .type__item--wrapper
      display flex
      flex-wrap wrap
      flex-direction column
      justify-content space-around
      .type__item
        display flex
        flex-direction column
        justify-content center
        align-items center
        position relative
        width 100px
        height 100px
        margin-top 15px
        background-color #fff

        &::after
          content ''
          position absolute
          left 0
          right 0
          top 0
          bottom 0
          display block

        .type__item__icon
          margin-bottom 10px
          font-size 26px

      .type__item--empty
        width 100px
  .content
    width 100%
    padding 20px 30px
    overflow scroll
    .questionnaire-meta
      display flex
      margin 10px
      margin-bottom 15px
      .meta-data
        margin-right 20px
        .meta-data-input
          width 100px
    .questions__wrapper
      position relative
      background white
      margin 10px
      margin-bottom 20px
      padding 20px
      border-radius 5px
      box-shadow 0px 4px 5px 2px rgba(216, 211, 211, .5)
      .title
        margin-top 20px
      .ant-dropdown-link
        position absolute
        top -2px
        right 20px
        font-size 30px
      .radio__item
        display block
        margin-top 10px
      .input
        margin-top 20px
        height 60px
      .choose-type
        margin-top 10px
      .options__item
        margin-bottom 10px
</style>

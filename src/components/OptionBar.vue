<template>
<div class="optionBar">
  <a-input
    class="keyword-input"
    :placeholder="`搜索你想做的${type}`"
    v-model="keyword"
    ref="keywordInput">
    <a-icon slot="prefix" type="search" />
    <a-icon v-if="keyword" slot="suffix" type="close-circle" @click="emitEmpty" />
  </a-input>
  <div class="sort__wrapper">
    <span class="sort-option">排序: </span>
    <a-select defaultValue="startTime" style="width: 120px" @change="handleSortClick">
      <a-select-option value="startTime">创建时间</a-select-option>
      <a-select-option value="endTime">结束时间</a-select-option>
      <a-select-option value="money">报酬</a-select-option>
    </a-select>
  </div>
  <a-button :shape="isPC ? '' : 'circle'" class="create-btn" type="primary" icon="plus" @click="handleClick">{{ isPC ? `创建新${type}` : '' }}</a-button>
</div>
</template>

<script>
import { isPC, debounce } from '@/utils/utils'
export default {
  name: 'OptionBar',
  props: {
    routeName: String,
    type: String
  },
  data () {
    return {
      sortBy: 'startTime',
      keyword: null,
      isPC: false
    }
  },
  watch: {
    'keyword': 'onSearch'
  },
  methods: {
    handleClick () {
      if (this.type === '任务') {
        this.$router.push('CreateTask')
      } else if (this.type === '问卷') {
        this.$router.push('questionnaire')
      }
    },
    handleSortClick (value) {
      this.sortBy = value
    },
    onSearch (value) {
      debounce(() => {
        console.log(value)
        this.$router.replace({ name: this.routeName, query: { keyword: value, sortBy: this.sortBy } })
      }, 300)
    },
    emitEmpty () {
      this.$refs.keywordInput.focus()
      this.keyword = ''
    }
  },
  created () {
    this.isPC = isPC()
  }
}
</script>

<style lang="stylus" scoped>
@media (min-width 576px)
  .optionBar
    display flex
    width 100%
    .create-btn
      margin-left 20px
    .keyword-input
      width 180px
      margin-right 20px

@media (max-width 576px)
  .create-btn
    position fixed
    bottom 60px
    right 30px
    width 50px
    height 50px
    z-index 1
  .keyword-input
    // width 90%
    height 40px
    font-size 20px
    >>> .ant-input
      padding-left 35px

  .sort__wrapper
    margin-top 15px
    text-align right

</style>

<template lang="html">
  <div id="review" class="review">
    <headerX></headerX>
    <nav-bar :active="5"></nav-bar>
    <!-- 查询条件 -->
    <section class="search-container">
      <form class="pure-form pure-form-aligned">
        <fieldset>
          <div class="pure-g">
            <div class="pure-control-group pure-u-1 pure-u-md-1-2 pure-u-lg-2-5">
              <label for="">会员查询</label>
              <input type="text" v-model="searchObj.custname" placeholder="会员卡号、手机号">
            </div>
            <div class="pure-control-group pure-u-1 pure-u-md-1-2 pure-u-lg-3-5">
              <label for="">点评状态</label>
              <select v-model="searchObj.status">
                <option v-for="s in statusList" :value="s.id">{{ s.label }}</option>
              </select>
            </div>
            <div class="pure-control-group pure-u-1 pure-u-lg-4-5">
              <label for="">点评时间</label>
              <input type="date" v-model="searchObj.startDate">
              <span class="dash">-</span>
              <input type="date" v-model="searchObj.endDate">
            </div>
            <div class="pure-control-group pure-u-1 pure-u-lg-1-5">
              <button type="button" @click="search"
              class="btn btn-warning btn-large btn-search">查询</button>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
    <section class="table-container">
      <dot-heading heading="点评信息" module="review">
        <div class="switch">
          <input type="radio" id="today" class="switch-input" name="" value="review" v-model="picked">
          <label for="today" class="switch-label switch-label-off">点评信息</label>
          <input type="radio" id="history" class="switch-input" name="" value="praise" v-model="picked">
          <label for="history" class="switch-label switch-label-on">点赞列表</label>
          <span class="switch-selection"></span>
        </div>
      </dot-heading>
      <div class="review-item-container">
        <review-item v-for="r in list" :review="r"></review-item>
      </div>
    </section>
  </div>
</template>

<script>
import HeaderX from '../component/header.vue'
import NavBar from '../component/nav-bar.vue'
import DotHeading from '../component/dot-heading.vue'
import reviewMixin from './mixin/review.js'
import ReviewItem from '../component/review-item.vue'

export default {
  name: 'review',
  components: {
    HeaderX,
    NavBar,
    DotHeading,
    ReviewItem
  },
  mixins: [reviewMixin],
  data () {
    return {
      picked: 'review',
      pageIndex: 1,
      pageSize: 10,
      list: [],
      statusList: this.getReviewStatusList(),
      searchObj: {
        status: null
      },
      noMore: false
    }
  },
  mounted () {
    this.searchObj.status = this.statusList[1].id // 待审核
    this.queryList()
  },
  methods: {
    queryList () {
      this.queryReviewList(this.searchObj, this.pageIndex, this.pageSize).then(res => {
        this.list = this.list.concat(res.list)
        this.noMore = res.noMoreData
      })
    },
    search () {
      this.list = []
      this.noMore = false
      this.pageIndex = 1
      this.queryList()
    }
  },
  watch: {
    picked: function (val) {
      if (val === 'review') {
        return 0
      } else if (val === 'praise') {
        this.$router.push('/business/praise')
      }
      return 0
    }
  }
}
</script>

<style lang="scss">
.review-item-container {
  margin-top: .3rem;
}
</style>

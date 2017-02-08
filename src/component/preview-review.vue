<template lang="html">
  <div class="preview-dashboard" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <li class="preview-dashboard__item" v-for="r in list">
      <img :src="r.photo | loadImg('small')" :alt="r.cust_name" class="preview-dashboard__item-img avatar--sm avatar--round">
      <div class="preview-dashboard__item-info preview-info">
        <p class="preview-info__title">
          <span>{{r.cust_name}}</span>
          <span>{{r.created_time | formatDate}}</span>
        </p>
        <p class="preview-info__body">{{r.content}}</p>
      </div>
    </li>
    <h4 v-show="noMore" class="no-data">没有更多数据了</h4>
  </div>
</template>

<script>
import reviewMixin from '../pages/mixin/review.js'
export default {
  name: 'preview-review',
  mixins: [reviewMixin],
  data () {
    return {
      pageIndex: 1,
      pageSize: 5,
      list: [],
      busy: false,
      searchObj: {
        status: 0 // 待审核
      },
      noMore: false
    }
  },
  methods: {
    loadMore () {
      if (this.noMore) return
      this.busy = true
      this.queryReviewList(this.searchObj, this.pageIndex, this.pageSize).then(res => {
        this.list = this.list.concat(res.list)
        this.noMore = res.noMoreData
        this.pageIndex = this.pageIndex + 1
        this.busy = false
      })
    }
  }
}
</script>

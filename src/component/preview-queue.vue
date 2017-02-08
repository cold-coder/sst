<template lang="html">
  <div class="preview-dashboard" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <li class="preview-dashboard__item" v-for="r in list" @click="goDetail">
      <img :src="r.cust_photo | loadImg('small')" :alt="r.cust_name" class="preview-dashboard__item-img avatar--sm avatar--round">
      <div class="preview-dashboard__item-info preview-info">
        <p class="preview-info__title">
          <span>{{r.cust_name}}</span>
          <span>{{r.created_time | formatDate}}</span>
        </p>
        <p class="preview-info__body">{{r.queue_detail.queue_name}}, 待入座</p>
      </div>
    </li>
    <h4 v-show="noMore" class="no-data">没有更多数据了</h4>
  </div>
</template>

<script>
import queueMixin from '../pages/mixin/queue.js'
export default {
  name: 'preview-queue',
  mixins: [queueMixin],
  data () {
    return {
      pageIndex: 1,
      pageSize: 5,
      list: [],
      busy: false,
      searchObj: {
        status: 1 // 待入座
      },
      noMore: false
    }
  },
  methods: {
    loadMore () {
      if (this.noMore) return
      this.busy = true
      this.queryQueueList(this.searchObj, this.pageIndex, this.pageSize).then(res => {
        this.list = this.list.concat(res.list)
        this.noMore = res.noMoreData
        this.pageIndex = this.pageIndex + 1
        this.busy = false
      })
    },
    goDetail () {
      this.$router.push('/business/queue')
    }
  }
}
</script>

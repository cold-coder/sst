<template lang="html">
  <div class="preview-dashboard" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <li class="preview-dashboard__item" v-for="r in list" @click="goDetail(r)">
      <img :src="r.customer | loadImg('small')" :alt="r.cust_name" class="preview-dashboard__item-img avatar--sm avatar--round">
      <div class="preview-dashboard__item-info preview-info">
        <p class="preview-info__title">
          <span>{{r.name}}</span>
          <span>{{r.time | formatDate}}</span>
        </p>
        <p class="preview-info__body">报名了 {{r.campaign_name}} 活动，请尽快审核</p>
      </div>
    </li>
    <h4 v-show="noMore" class="no-data">没有更多数据了</h4>
  </div>
</template>

<script>
import campaignMixin from '../pages/mixin/campaign.js'
export default {
  name: 'preview-signup',
  mixins: [campaignMixin],
  data () {
    return {
      pageIndex: 1,
      pageSize: 5,
      list: [],
      busy: false,
      noMore: false
    }
  },
  methods: {
    loadMore () {
      if (this.noMore) return
      this.busy = true
      this.queryShopSignupMembers(this.pageIndex, this.pageSize).then(res => {
        this.list = this.list.concat(res.list)
        this.noMore = res.noMoreData
        this.pageIndex = this.pageIndex + 1
        this.busy = false
      })
    },
    goDetail (campaign) {
      this.$router.push('/business/campaign-detail/' + campaign.campaign_id)
    }
  }
}
</script>

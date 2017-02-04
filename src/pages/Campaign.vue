<template lang="html">
  <div id="campaign" class="campaign">
    <headerX></headerX>
    <nav-bar :active="0"></nav-bar>
    <section class="search-container">
      <form class="pure-form pure-form-aligned">
        <fieldset>
          <div class="pure-g">
            <div class="pure-control-group pure-u-1 pure-u-lg-2-5">
              <label for="">活动名称</label>
              <input type="text" v-model="searchObj.activityName" placeholder="活动名称">
            </div>
            <div class="pure-control-group pure-u-1 pure-u-lg-3-5">
              <label for="">活动时间</label>
              <input type="date" v-model="searchObj.startDate">
              <span class="dash">-</span>
              <input type="date" v-model="searchObj.endDate">
            </div>
            <div class="pure-u-1">
              <button type="button" class="btn btn-warning btn-large btn-search" @click="search">查询</button>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
    <section class="table-container">
      <dot-heading heading="全部活动" module="campaign">
        <button class="btn btn-manual">手动签到</button>
      </dot-heading>
      <div v-show="list.length > 0">
        <table class="pure-table pure-table-bordered">
          <thead>
            <tr>
              <th v-for="head in tableHeader">{{ head }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(campaign, index) in list">
              <td>{{ (pageIndex - 1) * pageSize + 1 + index }}</td>
              <td>{{campaign.name}}</td>
              <td>{{campaign.campaign_scope | campaignTypeFilter}}</td>
              <td>{{campaign.period}}</td>
              <td>
                  <!-- 状态 -->
                  <span class="activity-status-open" v-show="campaign.statusStr=='进行中'">{{ campaign.statusStr }}</span>
                  <span class="activity-status-closed" v-show="campaign.statusStr=='已结束'">{{ campaign.statusStr }}</span>
                  <span class="activity-status-open" v-show="campaign.statusStr=='未开始'">{{ campaign.statusStr }}</span>
              </td>
              <td><a class="sm-business-activity-link" @click="goDetail(activity)">详情</a>
              </td>
            </tr>
          </tbody>
        </table>
        <paginate :current-page="pageIndex" :total-page="totalPage" @paginate="pageChange"></paginate>
      </div>
      <h4 v-show="list<=0" class="no-data">没有更多数据了</h4>
    </section>
  </div>
</template>

<script>
import HeaderX from '../component/header.vue'
import NavBar from '../component/nav-bar.vue'
import DotHeading from '../component/dot-heading.vue'
import Paginate from '../component/paginate.vue'
import campaignMixin from './mixin/campaign.js'

export default {
  name: 'campaign',
  components: {
    HeaderX,
    NavBar,
    DotHeading,
    Paginate
  },
  mixins: [campaignMixin],
  data () {
    return {
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      list: [],
      tableHeader: this.getTableHead(),
      searchObj: {

      }
    }
  },
  mounted () {
    this.queryList()
  },
  methods: {
    queryList () {
      this.queryActivityList(this.searchObj, this.pageIndex, this.pageSize).then(res => {
        this.list = res.list.map(this.computeActivityFields)
        this.totalPage = res.count
      })
    },
    pageChange (index) {
      this.pageIndex = index
      this.queryList()
    },
    computeActivityFields (activity) {
      var c = activity
      c.statusStr = this.isRunningCampaign(c.start_time, c.end_time)
      c.period = this.computeActivityPeriod(c.start_time, c.end_time)
      return c
    },
    search () {
      this.pageIndex = 1
      this.totalPage = 0
      this.queryList()
    }
  }
}
</script>

<style lang="scss">
</style>

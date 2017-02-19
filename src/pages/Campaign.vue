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
            <div class="pure-control-group pure-u-1">
              <button type="button" class="btn btn-warning btn-large btn-search" @click="search">查询</button>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
    <section class="table-container">
      <dot-heading heading="全部活动" module="campaign">
        <button class="btn btn-manual" @click="showModal">手动签到</button>
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
              <td><a class="sm-business-activity-link text-orange" @click="goDetail(campaign)">详情</a>
              </td>
            </tr>
          </tbody>
        </table>
        <paginate :current-page="pageIndex" :total-page="totalPage" @paginate="pageChange"></paginate>
      </div>
      <h4 v-show="list<=0" class="no-data">没有更多数据了</h4>
    </section>
    <!-- 手动核销弹出框 -->
    <modal @confirm="doCheckin" class="checkin-modal">
      <span slot="title">手动签到</span>
      <form class="pure-form pure-form-aligned">
        <fieldset>
          <div class="pure-control-group">
            <label for="checkin-code">签到码</label>
            <input type="search" name="checkin-code" placeholder="请输入签到码" v-model="checkinCode">
            <span class="icon icon--scan"></span>
          </div>
          <!--签到码对应的信息-->
          <div class="pure-control-group checkin-info">
            <h4 class="checkin-info__title">用户报名信息</h4>
            <section class="checkin-info__content" v-show="checkinInfo.checkinCode">
              <div class="pure-u-1">
                <label for="">会员姓名：</label>
                <span class="text-black">{{ checkinInfo.username }}</span>
              </div>
              <div class="pure-u-1">
                <label for="">手机号：</label>
                <span class="text-black">{{ checkinInfo.mobile }}</span>
              </div>
              <div class="pure-u-1">
                <label for="">会员姓名：</label>
                <span class="text-black">{{ checkinInfo.amount }}</span>
              </div>
              <div class="pure-u-1">
                <label for="">报名状态：</label>
                <span class="text-black">{{ checkinInfo.status | checkinStatusFilter }}</span>
              </div>
            </section>
            <h4 v-show="!checkinInfo.checkinCode">-</h4>
          </div>
        </fieldset>
      </form>
    </modal>
  </div>
</template>

<script>
import HeaderX from '../component/header.vue'
import NavBar from '../component/nav-bar.vue'
import DotHeading from '../component/dot-heading.vue'
import Paginate from '../component/paginate.vue'
import Modal from '../component/modal.vue'
import campaignMixin from './mixin/campaign.js'
import debounce from 'lodash.debounce'

export default {
  name: 'campaign',
  components: {
    HeaderX,
    NavBar,
    DotHeading,
    Paginate,
    Modal
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

      },
      checkinCode: '',
      checkinInfo: {
        username: '',
        mobile: '',
        amount: '',
        status: null,
        campaignId: null,
        checkinCode: null
      }
    }
  },
  // mounted () {
  //   this.queryList()
  // },
  activated () {
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
    },
    goDetail (campaign) {
      this.$router.push('/business/campaign-detail/' + campaign.id)
    },
    showModal: function () {
      // reset checkinInfo
      this.checkinInfo.checkinCode = null
      this.checkinCode = null
      this.$store.dispatch('showModal')
    },
    /**
     * 手动签到
     * @return {[type]} [description]
     */
    doCheckin: function () {
      if (!this.checkinInfo.checkinCode) {
        this.showToast('无效报名信息', 'error')
        return
      }
      this.manualCheckin(this.checkinInfo).then(() => {
        this.showToast('签到成功', 'success')
        this.$store.dispatch('hideModal')
      })
    },
    /**
     * 查询报名信息
     * @type {[type]}
     */
    queryCheckinInfo: debounce(function (code) {
      this.getCheckinInfoByCode(code).then(res => {
        if (res) {
          this.checkinInfo.username = res.name
          this.checkinInfo.mobile = res.phone
          this.checkinInfo.amount = res.person_num
          this.checkinInfo.status = res.status
          this.checkinInfo.campaignId = res.campaign_id
          this.checkinInfo.checkinCode = res.checkin_code
        } else {
          this.checkinInfo.checkinCode = null
        }
      })
    }, 500)
  },
  watch: {
    checkinCode: function (newCode) {
      this.queryCheckinInfo(newCode)
    }
  }
}
</script>

<style lang="scss">
.checkin-modal {
  .icon {
    &--scan {
      margin-left: .2rem;
      display: inline-block;
      height: 25px;
      width: 25px;
      background:transparent url('../assets/image/icon-scan.png') center center no-repeat / cover;
      vertical-align: middle;
    }
  }
  .checkin-info {
    &__title {
      // padding: .1rem;
    }
    &__content {
      text-align: left;
      padding-left: 2rem;
    }
  }
}
</style>

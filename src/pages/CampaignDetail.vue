<template lang="html">
  <div id="campaign-detail" class="campaign-detail">
    <headerX></headerX>
    <nav-bar :active="0"></nav-bar>
    <section class="search-container">
      <div class="heading">
        <span class="back-icon" @click="goBack"></span>
        <span class="text">活动统计</span>
      </div>
      <div class="info">
        <!--左-->
        <div class="pure-u-1 pure-u-lg-1-3 pure-u-md-1-2 pure-form pure-form-aligned">
          <fieldset>
            <div class="pure-control-group info__field">
              <label class="info__field-label" for="">活动名称</label>
              <span class="text-black">{{campaign.name ||'-'}}</span>
            </div>
            <div class="pure-control-group info__field">
              <label class="info__field-label" for="">活动类型</label>
              <span class="text-black">{{campaign.campaign_scope | campaignTypeFilter}}</span>
            </div>
            <div class="pure-control-group info__field">
              <label class="info__field-label" for="">活动时间</label>
              <span class="text-black">{{campaignPeriod}}</span>
            </div>
          </fieldset>
        </div>
        <!--中-->
        <div class="pure-u-1 pure-u-lg-1-3 pure-u-md-1-2 pure-form pure-form-aligned">
          <fieldset>
          <div class="pure-control-group info__session">
            <div>活动场次</div>
            <div>
              <select v-model="currSessionId" @change="refresh" class="session-select">
                <option :value="undefined">全部</option>
                <option v-for="session in sessionList" :value="session.seasons_id">{{ session.seasons_name + '   ' + session.seasons_duration }}</option>
              </select>
            </div>
          </div>
        </fieldset>
        </div>
        <!-- 右 -->
        <div class="pure-u-1 pure-u-lg-1-3 pure-u-md-1-2">
          <div class="info__statastic">
            <!--报名人数-->
            <div class="info__statastic-box">
              <p class="num text-orange">{{totalSignupCount}}</p>
              <p>报名人数</p>
            </div>
            <div class="info__statastic-box">
              <p class="num text-royal">{{actualCheckinCount}}</p>
              <p>实际签到人数</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 签到列表 -->
    <section class="table-container">
      <div v-show="signupList.length > 0">
        <table class="pure-table pure-table-bordered">
          <thead>
            <tr>
              <th v-for="head in tableHeader">{{ head }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(member, index) in signupList">
              <!-- <td>{{ (pageIndex - 1) * pageSize + 1 + index }}</td> -->
              <td>{{member.name}}</td>
              <td>{{member.phone}}</td>
              <td>{{member.person_num}} 人</td>
              <td>
                {{member.status | checkinStatusFilter}}
              </td>
              <td>
                <!-- 签到时间 -->
                <span v-show="member.status===4">{{member.time | formatDate}}</span>
              </td>
              <td>
                <!-- 签到码 -->
                <span v-show="member.status===4">{{member.checkin_code}}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <paginate :current-page="pageIndex" :total-page="totalPage" @paginate="pageChange"></paginate> -->
      </div>
      <h4 v-show="signupList<=0" class="no-data">没有更多数据了</h4>
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
  name: 'CampaignDetail',
  components: {
    HeaderX,
    NavBar,
    DotHeading,
    Paginate
  },
  mixins: [campaignMixin],
  data () {
    return {
      campaignId: this.$route.params.id,
      campaign: {},
      list: [],
      sessionList: [],
      currSessionId: undefined,
      signupList: [],
      totalSignupCount: 0,
      actualCheckinCount: 0,
      tableHeader: this.getDetailTableHead()
    }
  },
  activated () {
    this.queryCampaign(this.campaignId).then(res => {
      this.campaign = res
    })
    this.querySessionList(this.campaignId).then(res => {
      this.sessionList = res
    })
    this.querySignupList()
  },
  methods: {
    refresh () {
      this.querySignupList()
    },
    querySignupList () {
      this.querySignupMembers(this.campaignId, this.currSessionId).then(res => {
        this.signupList = res
        const signupStatastic = this.calcCampaignStatistics(this.signupList)
        this.totalSignupCount = signupStatastic.signinCount
        this.actualCheckinCount = signupStatastic.checkinCount
      })
    },
    goBack () {
      this.$router.back()
    }
  },
  computed: {
    campaignPeriod () {
      if (this.campaign.id) {
        return this.computeActivityPeriod(this.campaign.start_time, this.campaign.end_time)
      }
      return '-'
    }
  }
}
</script>

<style lang="scss">
@import "../style/_variable.scss";
.campaign-detail {
  .search-container {
    margin-bottom: 0;
    border-bottom: none;
    .heading {
      padding-left: .2rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 18px;
      .back-icon {
        margin-right: .1rem;
        margin-left: .1rem;
        width: .25rem;
        height: .25rem;
        border-top: 2px solid #616161;
        border-left: 2px solid #616161;
        transform: rotate(-45deg);
      }
      .text {

      }
    }
    .info {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: .25rem;
      padding: .1rem 0;
      border-top: 1px solid $border-color;
      border-bottom: 1px solid $border-color;
      &__field {
        display: flex;
      }
      &__session {
        padding-left: .2rem;
        .session-select {
          margin-top: .2rem;
        }
      }
      &__statastic {
        display: flex;
        justify-content: center;
        margin: .2rem 0;
        &-box {
          display: flex;
          flex-direction: column;
          width: 2.5rem;
          margin: 0 .1rem;
          border: 1px solid $border-color;
          border-radius: 5px;
          text-align: center;
          p {
            margin: .1rem 0;
          }
          .num {
            font-size: 22px;
            margin-top: .2rem;
          }
        }
      }
    }
  }
  .table-container {
    margin-top: 0;
    border-top: none;
  }
}
</style>

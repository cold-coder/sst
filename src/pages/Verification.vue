<template lang="html">
  <div id="verification" class="verification">
    <headerX></headerX>
    <nav-bar :active="2"></nav-bar>
    <section class="search-container">
      <form class="pure-form pure-form-aligned">
        <fieldset>
          <div class="pure-g">
            <div class="pure-control-group pure-u-1 pure-u-lg-2-5">
              <label for="">会员查询</label>
              <input type="text" v-model="searchObj.customerName" placeholder="会员卡号、手机号">
            </div>
            <div class="pure-control-group pure-u-1 pure-u-lg-3-5">
              <label for="">卡券编号</label>
              <input type="text" v-model="searchObj.couponNumber" placeholder="卡券编号">
            </div>
            <div class="pure-control-group pure-u-1 pure-u-lg-4-5">
              <label for="">核销时间</label>
              <input type="date" v-model="searchObj.startDate">
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
      <dot-heading heading="核销信息" module="verification">
        <button class="btn btn-manual" @click="showModal">手动核销</button>
      </dot-heading>
      <div v-show="list.length > 0">
        <table class="pure-table pure-table-bordered">
          <thead>
            <tr>
              <th v-for="head in tableHeader">{{ head }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(v, index) in list">
              <td>{{ (pageIndex - 1) * pageSize + 1 + index }}</td>
              <td>{{v.coupon_info.coupon_info.used_time | formatDate}}</td>
              <td>{{v.coupon_info.coupon_info.code}}</td>
              <td>{{v.coupon_info.coupon_template_info.name}}</td>
              <td>{{v.cust_info.name || '-'}}</td>
            </tr>
          </tbody>
        </table>
        <paginate :current-page="pageIndex" :total-page="totalPage" @paginate="pageChange"></paginate>
      </div>
      <h4 v-show="list<=0" class="no-data">没有更多数据了</h4>
    </section>
    <!-- 手动核销弹出框 -->
    <modal class="verify-modal" @confirm="doVerify">
      <span slot="title">手动核销</span>
      <form class="pure-form pure-form-aligned">
        <fieldset>
          <div class="pure-control-group">
            <label for="coupon-no" class="pure-u-1-3">卡券编号</label>
            <input type="search" class="pure-u-2-3" name="coupon-no" placeholder="" v-model="couponInfo.couponNo">
            <!-- <span class="icon icon--scan"></span> -->
          </div>
          <div class="pure-control-group">
            <label for="coupon-remark" class="pure-u-1-3">核销说明</label>
            <textarea class="pure-u-2-3" name="coupon-remark" placeholder="" v-model="couponInfo.remark"></textarea>
            <!-- <span class="icon icon--scan"></span> -->
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
import verificationMixin from './mixin/verification.js'
import Modal from '../component/modal.vue'
export default {
  name: 'verification',
  components: {
    HeaderX,
    NavBar,
    DotHeading,
    Paginate,
    Modal
  },
  mixins: [verificationMixin],
  data () {
    return {
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      list: [],
      tableHeader: this.getTableHead(),
      searchObj: {

      },
      couponInfo: {
        couponNo: null,
        remark: null
      }
    }
  },
  activated () {
    this.queryList()
  },
  methods: {
    queryList () {
      this.queryVerificationList(this.searchObj, this.pageIndex, this.pageSize).then(res => {
        this.list = res.list
        this.totalPage = res.count
      })
    },
    pageChange (index) {
      this.pageIndex = index
      this.queryList()
    },
    search () {
      this.pageIndex = 1
      this.totalPage = 0
      this.queryList()
    },
    showModal: function () {
      // reset checkinInfo
      this.couponInfo.couponNo = null
      this.couponInfo.remark = null
      this.$store.dispatch('showModal')
    },
    /**
     * 手动核销确认
     */
    doVerify () {
      if (!this.couponInfo.couponNo) {
        this.showToast('请输入卡券编号', 'warning')
        return
      }
      this.useCoupon(this.couponInfo).then(() => {
        this.showToast('核销成功', 'success')
        this.$store.dispatch('hideModal')
        this.queryList()
      })
    }
  }
}
</script>

<style lang="scss">
.verify-modal {
  .modal__box {
    width: 400px;
    height: 200px;
  }
}
</style>

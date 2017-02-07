<template lang="html">
  <div id="booking" class="booking">
    <headerX></headerX>
    <nav-bar :active="4"></nav-bar>
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
              <label for="">预订状态</label>
              <select v-model="searchObj.status">
                <option v-for="s in statusList" :value="s.id">{{ s.label }}</option>
              </select>
            </div>
            <div class="pure-control-group pure-u-1 pure-u-lg-4-5">
              <label for="">用餐时间</label>
              <input type="date" v-model="searchObj.reserveTimeBegin">
              <span class="dash">-</span>
              <input type="date" v-model="searchObj.reserveTimeEnd">
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
      <dot-heading heading="预订信息" module="booking">
        <div class="switch">
          <input type="radio" id="today" class="switch-input" name="" value="today" v-model="picked">
          <label for="today" class="switch-label switch-label-off">Today</label>
          <input type="radio" id="history" class="switch-input" name="" value="history" v-model="picked">
          <label for="history" class="switch-label switch-label-on">History</label>
          <span class="switch-selection"></span>
        </div>
      </dot-heading>
      <div v-show="list.length > 0">
        <table class="pure-table pure-table-bordered">
          <thead>
            <tr>
              <th v-for="head in tableHeader">{{ head }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, index) in list">
              <td> {{ (pageIndex - 1) * pageSize + 1 + index }}</td>
              <td>{{ r.meals_time|formatDate }}</td>
              <td>{{ r.meals_num }}人</td>
              <td>{{ r.cust_name || '-' }}</td>
              <td>{{ r.cust_mobile || '-' }}人</td>
              <td>{{ r.remark || '-' }}</td>
              <!--入座、取消 0：待审核；1：进行中；2：已入座；3：已取消;接受之后可以入座、取消；入座或取消之后所有按钮禁用-->
              <!--新状态码 0：待确认；1：已确认；2：已到店；3：已取消；4：不来了 -->
              <td>
                <!-- 0-待审核 -->
                <div class="button_group" v-show="r.status_code==0">
                  <!--接受-->
                  <button class="btn btn-xsmall btn-warning"
                   @click="updateBookState(r, 1)"> 入座</button>
                  <!--取消-->
                  <button class="btn btn-xsmall"
                   @click="updateBookState(r, 3)">取消</button>
                </div>
                <!-- 1-已审核 -->
                <div class="button_group" v-show="r.status_code==1">
                  <!--入座-->
                  <button class="btn btn-xsmall btn-warning"
                   @click="updateBookState(r, 2)">入座</button>
                  <!--不来-->
                  <button class="btn btn-xsmall"
                   @click="updateBookState(r, 4)">未到店</button>
                  <!--取消-->
                  <button class="btn btn-xsmall"
                   @click="updateBookState(r, 3)">取消</button>
                </div>
                <!-- 2-已入座 -->
                <div class="button_group" v-show="r.status_code==2">
                  <p>已入座</p>
                </div>
                <!-- 3-已取消 -->
                <div class="button_group" v-show="r.status_code==3">
                  <p>已取消</p>
                </div>
                <!-- 4-不来了 -->
                <div class="button_group" v-show="r.status_code==4">
                  <p>未到店</p>
                </div>
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
import bookingMixin from './mixin/booking.js'
import moment from 'moment'
export default {
  name: 'booking',
  components: {
    HeaderX,
    NavBar,
    DotHeading,
    Paginate
  },
  mixins: [bookingMixin],
  data () {
    return {
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      list: [],
      tableHeader: this.getTableHead(),
      statusList: this.getReserveStatusList(),
      picked: 'history',
      searchObj: {
        custname: '',
        status: null,
        reserveTimeBegin: undefined,
        reserveTimeEnd: undefined
      }
    }
  },
  mounted () {
    this.searchObj.status = this.statusList[1].id // 待确认
    this.queryList()
  },
  methods: {
    queryList () {
      this.queryReserveList(this.searchObj, this.pageIndex, this.pageSize).then(res => {
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
    // 更新状态
    updateBookState (book, state) {
      this.updateReserve(book.id, state).then(res => {
        book.status_code = state
        this.showToast('状态更新成功', 'success')
      })
    }
  },
  watch: {
    picked: function (val) {
      if (val === 'today') {
        this.searchObj.reserveTimeBegin = moment().format('YYYY-MM-DD')
        this.searchObj.reserveTimeEnd = moment().format('YYYY-MM-DD')
      } else if (val === 'history') {
        this.searchObj.reserveTimeBegin = undefined
        this.searchObj.reserveTimeEnd = undefined
      }
      this.search()
    }
  }
}
</script>

<style lang="scss">
</style>

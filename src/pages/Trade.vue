<template lang="html">
  <div id="trade" class="trade">
    <headerX></headerX>
    <nav-bar :active="1"></nav-bar>
    <!-- 查询条件 -->
    <section class="search-container">
      <form class="pure-form pure-form-aligned">
        <fieldset>
          <div class="pure-g">
            <div class="pure-control-group pure-u-1 pure-u-lg-2-5">
              <label for="">会员查询</label>
              <input type="text" v-model="searchObj.name" placeholder="会员卡号、手机号">
            </div>
            <div class="pure-control-group pure-u-1 pure-u-lg-3-5">
              <label for="">交易金额</label>
              <input type="number" class="input-pay" min="0" v-model="searchObj.billRangeMin">
              <span class="dash">-</span>
              <input type="number" class="input-pay" min="0" v-model="searchObj.billRangeMax">
            </div>
            <div class="pure-control-group pure-u-1 pure-u-lg-4-5">
              <label for="">消费时间</label>
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
    <!-- table -->
    <section class="table-container">
      <dot-heading heading="交易信息" module="trade">
      </dot-heading>
      <div v-show="list.length > 0">
        <table class="pure-table pure-table-bordered">
          <thead>
            <tr>
              <th v-for="head in tableHeader">{{ head }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="trade in list">
              <td>
                {{trade.trade_no}}
              </td>
              <td>{{ trade.cust_name}}</td>
              <td>{{ trade.trade_time | formatDate }}</td>
              <td>{{ trade.trade_fee / 100}}</td>
              <td>{{ trade.trade_type | tradeTypeFilter}}</td>
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
import api from 'api'
export default {
  name: 'trade',
  components: {
    HeaderX,
    NavBar,
    DotHeading,
    Paginate
  },
  data () {
    return {
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      list: [],
      tableHeader: [
        '发票编号',
        '会员名称',
        '消费日期',
        '交易金额',
        '交易类型'
      ],
      searchObj: {

      }
    }
  },
  mounted () {
    this.queryList()
  },
  methods: {
    queryList () {
      this.$http.post(api.TRADE_HISTORY, {
        shop_id: JSON.parse(window.sessionStorage.getItem('sst-userInfo')).shop_id,
        condition_name: this.searchObj.name || undefined,
        time_rang: {
          time_begin: this.searchObj.startDate ? new Date(this.searchObj.startDate).valueOf() / 1000 : undefined,
          time_end: this.searchObj.endDate ? new Date(this.searchObj.endDate).valueOf() / 1000 : undefined
        },
        amount_rang: {
          vt: 2, // 2为金额
          min: this.searchObj.billRangeMin * 100 || 0, // 收款区间-最小交易金额
          max: this.searchObj.billRangeMax * 100 || Math.MAX_VALUE // 收款区间-最大交易金额
        },
        page: {
          page_size: this.pageSize,
          page_index: this.pageIndex
        }
      }).then(res => {
        this.list = res.list
        this.totalPage = Math.ceil(res.total_count / this.pageSize)
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
    }
  }
}
</script>

<style lang="scss">
.trade {
  .input-pay {
    width: 2rem;
  }
}
</style>

<template lang="html">
  <div id="praise" class="praise">
    <headerX></headerX>
    <nav-bar :active="5"></nav-bar>
    <section class="search-container">
      <form class="pure-form pure-form-aligned">
        <fieldset>
          <div class="pure-g">
            <div class="pure-control-group pure-u-1 pure-u-lg-2-5">
              <label for="">会员查询</label>
              <input type="text" v-model="searchObj.custName" placeholder="会员卡号、手机号">
            </div>
            <div class="pure-control-group pure-u-1 pure-u-lg-3-5">
              <label for="">点赞时间</label>
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
      <dot-heading heading="点赞信息" module="review">
        <div class="switch">
          <input type="radio" id="today" class="switch-input" name="" value="review" v-model="picked">
          <label for="today" class="switch-label switch-label-off">点评信息</label>
          <input type="radio" id="history" class="switch-input" name="" value="praise" v-model="picked">
          <label for="history" class="switch-label switch-label-on">点赞列表</label>
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
            <tr v-for="(p, index) in list">
              <td> {{ (pageIndex - 1) * pageSize + 1 + index }}</td>
              <td>{{ p.cust_name }}</td>
              <td><img class="avatar--round avatar--sm" :src="p.cust_photo | loadImg" :alt="p.cust_name"></img></td>
              <td>{{ p.created_time | formatDate }}</td>
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
  name: 'praise',
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
      picked: 'praise',
      searchObj: {},
      tableHeader: [
        '序列号',
        '会员名称',
        '头像',
        '点赞时间'
      ]
    }
  },
  activated () {
    this.picked = 'praise'
    this.queryList()
  },
  methods: {
    queryList () {
      this.$http.post(api.PRAISE_HISTORY, {
        shop_id: JSON.parse(window.sessionStorage.getItem('sst-userInfo')).shop_id,
        condition_name: this.searchObj.custName || undefined, // 会员卡号或手机号
        time_horizon: {
          time_begin: this.searchObj.startDate ? new Date(this.searchObj.startDate).valueOf() / 1000 : undefined,
          time_end: this.searchObj.endDate ? new Date(this.searchObj.endDate).valueOf() / 1000 : undefined
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
  },
  watch: {
    picked: function (val) {
      if (val === 'review') {
        this.$router.push('/business/review')
      }
      return 0
    }
  }
}
</script>

<style lang="scss">
</style>

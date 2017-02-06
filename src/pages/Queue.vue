<template lang="html">
  <div id="queue" class="queue">
    <headerX></headerX>
    <nav-bar :active="3"></nav-bar>
    <!-- table -->
    <section class="table-container">
      <dot-heading heading="排队信息" module="queue">
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
            <tr v-for="(q, index) in list">
              <td> {{ (pageIndex - 1) * pageSize + 1 + index }}</td>
              <td>{{ q.created_time|formatDate }}</td>
              <td>{{ q.tel || '-' }}</td>
              <td>{{ q.tabletype || '-' }}</td>
              <td>{{ q.meals_num }}人</td>
              <td>{{ q.number || '-' }}</td>
              <td>{{ q.status_code | queueStatusFilter }}</td>
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
import queueMixin from './mixin/queue.js'
export default {
  name: 'queue',
  components: {
    HeaderX,
    NavBar,
    DotHeading,
    Paginate
  },
  mixins: [queueMixin],
  data () {
    return {
      picked: 'today',
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      list: [],
      tableHeader: this.getTableHead(),
      searchObj: {
        timeBegin: new Date(),
        timeEnd: new Date()
      }
    }
  },
  mounted () {
    this.queryList()
  },
  methods: {
    queryList () {
      this.queryQueueList(this.pageIndex, this.pageSize, this.searchObj).then(res => {
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
    }
  },
  watch: {
    picked: function (val) {
      if (val === 'today') {
        this.searchObj.timeBegin = new Date()
        this.searchObj.timeEnd = new Date()
      } else if (val === 'history') {
        this.searchObj.timeBegin = undefined
        this.searchObj.timeEnd = undefined
      }
      this.search()
    }
  }
}
</script>

<style lang="scss">
</style>

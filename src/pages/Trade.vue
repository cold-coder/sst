<template lang="html">
  <div id="trade" class="trade">
    <headerX></headerX>
    <nav-bar :active="1"></nav-bar>
    <section class="table-container">
      <dot-heading heading="交易信息" module="trade">
      </dot-heading>
    </section>
    <paginate :current-page="currentPage" :total-page="totalPage" @paginate="pageChange"></paginate>
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
      pageIndex: 0,
      pageSize: 5,
      currentPage: 1,
      totalPage: 0,
      list: []
    }
  },
  mounted () {
    this.queryList()
  },
  methods: {
    queryList () {
      this.$http.post(api.TRADE_HISTORY, {
        shop_id: this.$store.getters.shopId,
        page: {
          page_size: this.pageSize,
          page_index: this.currentPage
        }
      }).then(res => {
        this.list = res.data.list
        this.totalPage = Math.floor(res.data.total_count / this.pageSize)
      })
    },
    pageChange (page) {
      this.currentPage = page.page
      this.queryList()
    }
  }
}
</script>

<style lang="scss">
</style>

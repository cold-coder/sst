<template lang="html">
  <div id="campaign" class="campaign">
    <nav-bar :active="0"></nav-bar>
    <section class="search-container">
      <form class="pure-form pure-form-aligned">
        <fieldset>
          <div class="pure-g">
            <div class="pure-control-group pure-u-1 pure-u-md-2-5">
              <label for="">活动名称</label>
              <input type="text" name="" value="" placeholder="活动名称">
            </div>
            <div class="pure-control-group pure-u-1 pure-u-md-3-5">
              <label for="">活动时间</label>
              <input type="date">
              <span class="dash">-</span>
              <input type="date">
            </div>
            <div class="pure-u-1">
              <button type="button" class="btn btn-warning btn-large btn-search">查询</button>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
    <section class="table-container">
      <dot-heading heading="全部活动" module="campaign">
        <button class="btn btn-manual">手动签到</button>
      </dot-heading>
    </section>
  </div>
</template>

<script>
import NavBar from '../component/nav-bar.vue'
import DotHeading from '../component/dot-heading.vue'
import api from 'api'

export default {
  name: 'campaign',
  components: {
    NavBar,
    DotHeading
  },
  mounted () {
    this.$http.post(api.CAMPAIGN_LIST, {
      shop_id: '72518f28-adf0-2adc-1b56-6d4fb296d09b'
    })
  }
}
</script>

<style lang="scss">
</style>

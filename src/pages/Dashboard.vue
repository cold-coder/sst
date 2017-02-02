<template lang="html">
  <div id="dashboard" class="dashboard">
    <headerX></headerX>
    <div class="overview-container">
      <dot-heading heading="业务信息管理" module="dashboard">
        <biz-toggle></biz-toggle>
      </dot-heading>
      <overview></overview>
    </div>
  </div>
</template>

<script>
import HeaderX from '../component/header.vue'
import DotHeading from '../component/dot-heading.vue'
import BizToggle from '../component/biz-toggle.vue'
import Overview from '../component/overview.vue'
export default {
  name: 'dashboard',
  components: {
    HeaderX,
    DotHeading,
    BizToggle,
    Overview
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
</style>

<template lang="html">
  <div id="dashboard" class="dashboard">
    <headerX></headerX>
    <div class="overview-container">
      <dot-heading heading="业务信息管理" module="dashboard">
        <biz-toggle></biz-toggle>
      </dot-heading>
      <overview></overview>
    </div>
    <div class="preview-container">
      <tab :tabs="tab1">
        <preview-booking class="dashboard-preview" slot="tab1"></preview-booking>
        <preview-queue class="dashboard-preview" slot="tab2"></preview-queue>
      </tab>
      <tab :tabs="tab2">
        <preview-signup class="dashboard-preview" slot="tab1"></preview-signup>
        <preview-review class="dashboard-preview" slot="tab2"></preview-review>
      </tab>
    </div>
    <div class="chart-container">
      <div class="pure-u-sm-1-2">
      <queue-trend class="dashboard-chart"></queue-trend>
    </div><!--
    --><div class="pure-u-sm-1-2">
        <booking-trend class="dashboard-chart"></booking-trend>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderX from '../component/header.vue'
import DotHeading from '../component/dot-heading.vue'
import BizToggle from '../component/biz-toggle.vue'
import Overview from '../component/overview.vue'
import Tab from '../component/tab.vue'
import PreviewBooking from '../component/preview-booking.vue'
import PreviewQueue from '../component/preview-queue.vue'
import PreviewReview from '../component/preview-review.vue'
import PreviewSignup from '../component/preview-signup.vue'
import QueueTrend from '../component/queue-trend.vue'
import BookingTrend from '../component/booking-trend.vue'
export default {
  name: 'dashboard',
  components: {
    HeaderX,
    DotHeading,
    BizToggle,
    Overview,
    Tab,
    PreviewBooking,
    PreviewQueue,
    PreviewReview,
    PreviewSignup,
    QueueTrend,
    BookingTrend
  },
  data () {
    return {
      tab1: ['预订审核', '排队等待'],
      tab2: ['报名确认', '点评审核']
    }
  }
}
</script>
<style lang="scss">
.preview-container {
  display: flex;
  flex-wrap: wrap;
  margin: .25rem;
  background-color: transparent;
  .tab {
    flex: 1;
    min-width: 299px;
    &:first-child {
      padding-right: .1rem;
    }
    &:last-child {
      padding-left: .1rem;
    }
  }
}
.chart-container {
  // display: flex;
  margin: 0 .25rem .2rem .25rem;
  background-color: transparent;
  &>div {
    &:first-child {
      padding-right: .1rem;
    }
    &:last-child {
      padding-left: .1rem;
    }
  }
  .dashboard-chart {
    height: 270px;
    canvas {
      max-height: 210px;
    }
  }
}
</style>

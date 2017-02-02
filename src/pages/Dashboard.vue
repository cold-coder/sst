<template lang="html">
  <div id="dashboard" class="dashboard">
    <headerX></headerX>
    <div class="overview-container">
      <dot-heading heading="业务信息管理" module="dashboard">
        <div class="toggleContainer">
          <div class="pure-u-1 pure-u-md-1-3">
            <span>开启排队</span>
            <span>
              <input type="checkbox" class="toggle" id="enable-queue-toggle" v-model="isQueueEnabled">
              <label for="enable-queue-toggle"></label>
            </span>
          </div>
          <div class="pure-u-1 pure-u-md-1-3">
            <span>开启预订</span>
            <span>
              <input type="checkbox" class="toggle" id="enable-booking-toggle" v-model="isBookingEnabled">
              <label for="enable-booking-toggle"></label>
            </span>
          </div>
          <div class="pure-u-1 pure-u-md-1-3">
            <span>开启点评</span>
            <span>
              <input type="checkbox" class="toggle" id="enable-review-toggle" v-model="isReviewEnabled">
              <label for="enable-review-toggle"></label>
            </span>
          </div>
        </div>
      </dot-heading>
      <overview></overview>
    </div>
  </div>
</template>

<script>
import HeaderX from '../component/header.vue'
import DotHeading from '../component/dot-heading.vue'
import Overview from '../component/overview.vue'
export default {
  name: 'dashboard',
  components: {
    HeaderX,
    DotHeading,
    Overview
  },
  data () {
    return {
      isQueueEnabled: false,
      isBookingEnabled: false,
      isReviewEnabled: true
    }
  }
}
</script>

<style lang="scss">
</style>

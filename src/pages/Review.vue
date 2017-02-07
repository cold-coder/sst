<template lang="html">
  <div id="review" class="review">
    <headerX></headerX>
    <nav-bar :active="5"></nav-bar>
    <section class="table-container">
      <dot-heading heading="点评信息" module="review">
        <div class="switch">
          <input type="radio" id="today" class="switch-input" name="" value="review" v-model="picked">
          <label for="today" class="switch-label switch-label-off">点评信息</label>
          <input type="radio" id="history" class="switch-input" name="" value="praise" v-model="picked">
          <label for="history" class="switch-label switch-label-on">点赞列表</label>
          <span class="switch-selection"></span>
        </div>
      </dot-heading>
    </section>
  </div>
</template>

<script>
import HeaderX from '../component/header.vue'
import NavBar from '../component/nav-bar.vue'
import DotHeading from '../component/dot-heading.vue'
export default {
  name: 'review',
  components: {
    HeaderX,
    NavBar,
    DotHeading
  },
  data () {
    return {
      picked: 'review'
    }
  },
  watch: {
    picked: function (val) {
      if (val === 'review') {
        return 0
      } else if (val === 'praise') {
        this.$router.push('/business/praise')
      }
      return 0
    }
  }
}
</script>

<style lang="scss">
</style>

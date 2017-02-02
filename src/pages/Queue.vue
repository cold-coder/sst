<template lang="html">
  <div id="queue" class="queue">
    <headerX></headerX>
    <nav-bar :active="3"></nav-bar>
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
    </section>
  </div>
</template>

<script>
import HeaderX from '../component/header.vue'
import NavBar from '../component/nav-bar.vue'
import DotHeading from '../component/dot-heading.vue'
export default {
  name: 'queue',
  components: {
    HeaderX,
    NavBar,
    DotHeading
  },
  data () {
    return {
      picked: 'today'
    }
  }
}
</script>

<style lang="scss">
</style>

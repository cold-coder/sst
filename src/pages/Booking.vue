<template lang="html">
  <div id="booking" class="booking">
    <nav-bar :active="4"></nav-bar>
    <span>booking</span>
  </div>
</template>

<script>
import NavBar from '../component/nav-bar.vue'
export default {
  name: 'booking',
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
</style>

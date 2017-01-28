<template lang="html">
  <div id="campaign" class="campaign">
    <nav-bar :active="0"></nav-bar>
    <span>campaign</span>
  </div>
</template>

<script>
import NavBar from '../component/nav-bar.vue'
export default {
  name: 'campaign',
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
</style>

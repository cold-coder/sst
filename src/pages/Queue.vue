<template lang="html">
  <div id="queue" class="queue">
    <nav-bar :active="3"></nav-bar>
    <span>queue</span>
  </div>
</template>

<script>
import NavBar from '../component/nav-bar.vue'
export default {
  name: 'queue',
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
</style>

<template lang="html">
  <div id="review" class="review">
    <nav-bar :active="5"></nav-bar>
    <span>review</span>
  </div>
</template>

<script>
import NavBar from '../component/nav-bar.vue'
export default {
  name: 'review',
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
</style>

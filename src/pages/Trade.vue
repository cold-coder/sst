<template lang="html">
  <div id="trade" class="trade">
    <headerX></headerX>
    <nav-bar :active="1"></nav-bar>
    <section class="table-container">
      <dot-heading heading="交易信息" module="trade">
      </dot-heading>
    </section>
  </div>
</template>

<script>
import HeaderX from '../component/header.vue'
import NavBar from '../component/nav-bar.vue'
import DotHeading from '../component/dot-heading.vue'
export default {
  name: 'trade',
  components: {
    HeaderX,
    NavBar,
    DotHeading
  }
}
</script>

<style lang="scss">
</style>

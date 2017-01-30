<template lang="html">
  <div id="booking" class="booking">
    <nav-bar :active="4"></nav-bar>
    <section class="table-container">
      <dot-heading heading="预订信息" module="booking">
      </dot-heading>
    </section>
  </div>
</template>

<script>
import NavBar from '../component/nav-bar.vue'
import DotHeading from '../component/dot-heading.vue'
export default {
  name: 'booking',
  components: {
    NavBar,
    DotHeading
  }
}
</script>

<style lang="scss">
</style>

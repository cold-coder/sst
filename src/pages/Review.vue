<template lang="html">
  <div id="review" class="review">
    <headerX></headerX>
    <nav-bar :active="5"></nav-bar>
    <section class="table-container">
      <dot-heading heading="点评信息" module="review">
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
  }
}
</script>

<style lang="scss">
</style>

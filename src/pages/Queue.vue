<template lang="html">
  <div id="queue" class="queue">
    <headerX></headerX>
    <nav-bar :active="3"></nav-bar>
    <section class="table-container">
      <dot-heading heading="排队信息" module="queue">
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
  }
}
</script>

<style lang="scss">
</style>

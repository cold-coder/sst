<template lang="html">
  <div id="queue" class="queue">
    <nav-bar :active="3"></nav-bar>
    <section class="table-container">
      <dot-heading heading="排队信息" module="queue">
      </dot-heading>
    </section>
  </div>
</template>

<script>
import NavBar from '../component/nav-bar.vue'
import DotHeading from '../component/dot-heading.vue'
export default {
  name: 'queue',
  components: {
    NavBar,
    DotHeading
  }
}
</script>

<style lang="scss">
</style>

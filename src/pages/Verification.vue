<template lang="html">
  <div id="verification" class="verification">
    <nav-bar :active="2"></nav-bar>
    <section class="table-container">
      <dot-heading heading="核销信息" module="verification">
        <button class="btn btn-manual">手动核销</button>
      </dot-heading>
    </section>
  </div>
</template>

<script>
import NavBar from '../component/nav-bar.vue'
import DotHeading from '../component/dot-heading.vue'
export default {
  name: 'verification',
  components: {
    NavBar,
    DotHeading
  }
}
</script>

<style lang="scss">
</style>

<template lang="html">
  <div id="shop" class="shop">
    <headerX></headerX>
    <div class="table-container">
      <dot-heading heading="基本信息管理" module="setting">
      </dot-heading>
    </div>
  </div>
</template>

<script>
import HeaderX from '../component/header.vue'
import DotHeading from '../component/dot-heading.vue'
export default {
  name: 'shop',
  components: {
    HeaderX,
    DotHeading
  }
}
</script>

<style lang="scss">
</style>

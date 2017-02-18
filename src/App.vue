<template>
  <div id="app" v-on:click.stop="closeDropdown($event)">
      <side-menu></side-menu>
      <keep-alive exclude="dashboard,shop,scan">
        <router-view class="main"></router-view>
      </keep-alive>
  </div>
</template>

<script>
import SideMenu from './component/side-menu.vue'
import Bus from './misc/bus.js'
export default {
  name: 'app',
  components: {
    SideMenu
  },
  methods: {
    closeDropdown (e) {
      Bus.$emit('closeDropdown', e)
    }
  }
}
</script>

<!-- <style src="purecss"></style> -->
<style lang='scss'>
@import "./style/_variable.scss";
@import "./style/main.scss";
#app {
  position: relative;
  padding-left: 0;
  height: 100%;
}
#app, .side-menu__menu, .side-menu__link {
  transition: all .2s ease-out;
}
.main {
  height: 100%;
  overflow-y: scroll;
  background-color: #EEE;
}
@media (min-width: 48em) {
  #app {
    padding-left: $menu-width;
    .side-menu__menu {
      transform: translateX(0) !important;
    }
  }
}

.show-menu {
  padding-left: $menu-width !important;
  .side-menu__menu {
    transform: translateX(0) !important;
  }
}
</style>

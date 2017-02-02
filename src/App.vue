<template>
  <div id="app">
    <side-menu></side-menu>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
import SideMenu from './component/side-menu.vue'
export default {
  name: 'app',
  components: {
    SideMenu
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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

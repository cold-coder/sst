<template>
  <div id="app">
    <side-menu></side-menu>

    <router-view></router-view>
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

<style src="purecss"></style>
<style lang='scss'>
#app {
  position: relative;
  padding-left: 150px;
}
#app, .side-menu__menu, .side-menu__link {
  transition: all .2s ease-out;
}
@media (max-width: 48em) {
  #app {
    padding-left: 0;
  }
  .side-menu__link {
    display: block !important;
  }
  .side-menu__menu {
    transform: translateX(-150px);
  }
}
#app.active {
  padding-left: 0;
  .side-menu__link{
    display: block !important;
  }
  .side-menu__menu {
    transform: translateX(-150px);
  }
}
</style>

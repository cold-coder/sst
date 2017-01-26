<template>

  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <div class="location"></div>
    <button type="button" class="btn">Pure button</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang='scss'>
.location {
  width: 50%;
  height: 200px;
  margin: 0 auto;
  background-image: url(./assets/map.png);
  background-repeat: no-repeat;
  background-position: center center;
}
</style>

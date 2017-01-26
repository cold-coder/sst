<template lang="html">
  <div class="side-menu">
    <a href="" class="side-menu__link">
      <span></span>
    </a>
    <div class="side-menu__menu">

    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.side-menu {
  &__link {
    position: fixed;
    left: 0;
    top: 0;
    display: block;
    background-color: #000;
    background-color: rgba(0,0,0,.7);
    font-size: 10px;
    z-index: 10;
    width: 2em;
    height: auto;
    padding: 2.1em 1.6em;
    &:hover {
      #000;
    }
    span, span:before, span:after {
      background-color: #FFF;
      width: 100%;
      height: .2em;
    }
    span {
      position: relative;
      display: block;
      &:
    }
  }
}
</style>

<template lang="html">
  <div class="side-menu">
    <a v-on:click="toggleMenu" class="side-menu__link">
      <span></span>
    </a>
    <ul class="side-menu__menu">
      <div class="side-menu__menu-heading"></div>
      <div class="side-menu__menu-scan"></div>
      <router-link v-for="item in menuItem" :to="item.link" class="side-menu__menu-item">
        <div :class="item.icon"></div>
        <span v-text="item.name"></span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'side-menu',
  data() {
    return {
      menuItem: [
        {
          name: "业务管理",
          link: "/activity",
          icon: "business"
        },
        {
          name: "工作台",
          link: "/dashboard",
          icon: "dashboard"
        },
        {
          name: "基本设置",
          link: "/shop",
          icon: "shop"
        },
        {
          name: "登录",
          link: "/login",
          icon: "business"
        }
      ]
    }
  },
  methods: {
    toggleMenu: () => {
      document.getElementById("app").classList.toggle("active")
    }
  }
}
</script>

<style lang="scss">
.side-menu {
  &__link {
    position: fixed;
    left: 0;
    top: 0;
    display: none;
    background-color: #000;
    background-color: rgba(0,0,0,.7);
    font-size: 10px;
    z-index: 10;
    width: 2em;
    height: auto;
    padding: 2.1em 1.6em;
    &:hover {
      background-color: #000;
    }
    span, span:before, span:after {
      background-color: #FFF;
      width: 100%;
      height: .2em;
    }
    span {
      position: relative;
      display: block;
      &:before, &:after {
        content: " ";
        position: absolute;
      }
      &:before {
        margin-top: -.6em;
      }
      &:after {
        margin-top: .6em;
      }
    }
  }
  &__menu {
    position: fixed;
    top: 0;
    margin-top: 0;
    list-style: none;
    padding-left: 0;
    // margin-left: -150px;
    left: 0;
    width: 150px;
    bottom: 0;
    z-index: 100;
    background-image: linear-gradient(to bottom,#081F2F, #0C283A,#283F4C);
    &-heading {
      height: 9rem;
      background:transparent url('image/LOGO-Smartac.png') center center no-repeat / 70%;
    }
    &-scan {
      height: 5rem;
      background:transparent url('image/icon-scan.png') center center no-repeat / 35%;
      position: relative;
      &:before, &:after {
        content: " ";
        position: absolute;
        display: block;
        height: 1px;
        width: 100%;
        background-image: linear-gradient(to right,RGBA(84,117,148,0),RGB(84,117,148),RGBA(84,117,148,0));
      }
      &:after {
        bottom: 0;
      }
    }
    &-item {
      display: block;
      text-align: center;
      text-decoration: none;
      color: #C6CFDF;
      font-size: smaller;
      div {
        height: 4.5rem;
        background-position: center 90%;
        background-size: 30%;
        background-repeat: no-repeat;
      }
      div.business {
        background-image: url('image/icon-business.png');
      }
      div.dashboard {
        background-image: url('image/icon-dashboard.png');
      }
      div.shop {
        background-image: url('image/icon-shop.png');
      }
    }
    &-item.router-link-active {
      color: #FFB700;
      font-size: initial;
      div.business {
        background-image: url('image/icon-business-selected.png');
      }
      div.dashboard {
        background-image: url('image/icon-dashboard-selected.png');
      }
      div.shop {
        background-image: url('image/icon-shop-selected.png');
      }
    }
  }
  // @media (max-width: 48em) {
  //   &__link {
  //     display: block;
  //   }
  //   &__menu {
  //     transform: translateX(-150px);
  //   }
  // }
}
</style>

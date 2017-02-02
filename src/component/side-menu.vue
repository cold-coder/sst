<template lang="html">
  <div class="side-menu">
    <!-- <a v-on:click="toggleMenu" class="side-menu__link">
      <span></span>
    </a> -->
    <ul class="side-menu__menu">
      <div class="side-menu__menu-heading"></div>
      <div class="side-menu__menu-scan"></div>
      <router-link v-for="item in menuItem" :to="item.link"
       class="side-menu__menu-item" :class="{ 'side-menu__menu-item--active': $route.path.indexOf(item.key)>-1 }">
        <div :class="item.icon"></div>
        <span v-text="item.name"></span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'side-menu',
  data () {
    return {
      menuItem: [
        {
          name: '业务管理',
          link: '/business/campaign',
          icon: 'business',
          key: 'business'
        },
        {
          name: '工作台',
          link: '/dashboard',
          icon: 'dashboard',
          key: 'dashboard'
        },
        {
          name: '基本设置',
          link: '/shop',
          icon: 'shop',
          key: 'shop'
        },
        {
          name: '登录',
          link: '/demo',
          icon: 'business',
          key: 'demo'
        }
      ]
    }
  },
  methods: {
    // toggleMenu: () => {
    //   document.getElementById('app').classList.toggle('show-menu')
    // }
  }
}
</script>

<style lang="scss">
@import "../style/_variable.scss";
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
    width: 62px;
    height: auto;
    padding: 25px 19px;
    span, span:before, span:after {
      background-color: #FFF;
      width: 100%;
      height: 2.4px;
    }
    span {
      position: relative;
      display: block;
      &:before, &:after {
        content: " ";
        position: absolute;
      }
      &:before {
        margin-top: -.9em;
      }
      &:after {
        margin-top: .9em;
      }
    }
  }
  &__menu {
    position: fixed;
    top: 0;
    margin-top: 0;
    list-style: none;
    height: 100%;
    padding-left: 0;
    left: 0;
    width: $menu-width;
    transform: translateX(-$menu-width);
    bottom: 0;
    z-index: 30;
    background-image: linear-gradient(to bottom,#081F2F, #0C283A,#283F4C);
    &-heading {
      height: 150px;
      background:transparent url('../assets/LOGO-Smartac.png') center center no-repeat / 70%;
    }
    &-scan {
      height: 75px;
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
      font-size: 14px;
      div {
        height: 75px;
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
      &--active {
        color: $yellow;
        font-size: 15px;
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
  }
}
</style>

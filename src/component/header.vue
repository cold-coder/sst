<template lang="html">
  <div class="header">
    <div class="header__menu-button" @click="toggleSideMenu"></div>
    <div class="header__title">
      {{ shopName }}
    </div>
    <div class="header__user" @click="toggleMenu">
      <img :src="avatar | loadImg" :alt="username" class="header__user-avatar">
      <div class="header__user-name">{{ username }}</div>
    </div>
    <ul class="header__menu" v-show="isMenuShow">
      <li><a class="header__menu-item">中文</a></li>
      <li><a class="header__menu-item">English</a></li>
      <li><a class="header__menu-item" @click="logoutConfirm">用户退出</a></li>
    </ul>
    <confirm @confirm="logout">
      <div slot="msg">确认退出</div>
    </confirm>
  </div>
</template>

<script>
import Confirm from '../component/confirm.vue'
export default {
  name: 'heading',
  components: {
    Confirm
  },
  data () {
    return {
      isMenuShow: false,
      username: '-',
      shopName: '-',
      avatar: '',
      bus: this.$root.$bus
    }
  },
  created () {
    // this.bus.$on('closeDropdown', (event) => {
    //   if (this.isDescendant(this.$el.parentNode, event.target)) return // ignore the event if it is triggered inside current component element
    //   if (this.isMenuShow) {
    //     this.isMenuShow = false
    //   }
    // })
  },
  mounted () {
    const userInfo = JSON.parse(window.sessionStorage.getItem('sst-userInfo'))
    this.username = userInfo.name
    this.shopName = userInfo.shop_name
    this.avatar = userInfo.photo
  },
  methods: {
    toggleMenu () {
      this.isMenuShow = !this.isMenuShow
    },
    toggleSideMenu () {
      document.getElementById('app').classList.toggle('show-menu')
    },
    logoutConfirm () {
      this.$store.dispatch('showConfirm')
    },
    logout () {
      window.sessionStorage.removeItem('sst-sessionId')
      window.sessionStorage.removeItem('sst-token')
      this.isMenuShow = false
      this.$router.push('/login')
    },
    // http://stackoverflow.com/questions/2234979/how-to-check-in-javascript-if-one-element-is-contained-within-another
    isDescendant: function (parent, child) {
      var node = child.parentNode
      while (node !== null) {
        if (node === parent) {
          return true
        }
        node = node.parentNode
      }
      return false
    }
  }
}
</script>

<style lang="scss">
.header {
    padding: 0.35rem;
    background-color: #FFF;
    border-bottom: 1px solid rgba(0,0,0,.1);
    // box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    position: relative;
    &__menu-button {
      width: 24px;
      height: 24px;
      background-image: url('./image/icon-menu.png');
      background-repeat: no-repeat;
      background-size: 24px;
    };
    @media (min-width: 48em) {
      &__menu-button {
        display: none;
      }
    }
    &__title {
      font-size: 22px;
      padding: .2rem .2rem .2rem 60px;
      background-image: url('./image/icon-shop-heading.png');
      background-repeat: no-repeat;
    }
    &__user {
      display: flex;
      justify-content: center;
      align-items: center;
      &-avatar {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        margin-right: 10px;
      }
      &-name {
        font-size: 18px;
      }
    }
    &__menu {
      position: absolute;
      right: 5px;
      top: 85px;
      list-style: none;
      margin: 0;
      padding: 0;
      background-color: #FFF;
      border-radius: 0 0 2px 2px;
      box-shadow: 0 3px 1px rgba(0,0,0,.5);
      font-size: 1rem;
      width: 150px;
      z-index: 10;
      &-item {
        display: block;
        padding: 8px 12px;
        text-decoration: none;
        color: #000;
        font-size: 16px;
      }
    }
}
</style>

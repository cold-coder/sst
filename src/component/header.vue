<template lang="html">
  <div class="header">
    <div class="header__title">
      {{ shopName }}
    </div>
    <div class="header__user" @click="toggleMenu">
      <div class="header__user-avatar"></div>
      <div class="header__user-name">{{ username }}</div>
    </div>
    <ul class="header__menu" v-show="isMenuShow">
      <li><a class="header__menu-item">中文</a></li>
      <li><a class="header__menu-item">English</a></li>
      <li><a class="header__menu-item" @click="logout">用户退出</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'heading',
  data () {
    return {
      isMenuShow: false,
      username: '-',
      shopName: '-'
    }
  },
  mounted () {
    const userInfo = JSON.parse(window.sessionStorage.getItem('sst-userInfo'))
    this.username = userInfo.name
    this.shopName = userInfo.shop_name
  },
  methods: {
    toggleMenu () {
      this.isMenuShow = !this.isMenuShow
    },
    logout () {
      window.sessionStorage.removeItem('sst-sessionId')
      this.isMenuShow = false
      this.$router.push('/login')
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
    &__title {
      font-size: 22px;
      padding: .2rem .2rem .2rem 60px;
      background-image: url('./image/icon-shop-heading.png');
      background-repeat: no-repeat;
    }
    &__user {
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

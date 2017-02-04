<template lang="html">
  <div id="login" class="login">
    <img src="../assets/LOGO-Smartac.png" alt="ShopperConnect Logo" class="login__logo">
    <div class="login__version">版本： 3.0</div>
    <div class="login__title">商铺平台系统登录</div>
    <input type="text" class="login__input login__input--username" placeholder="帐号" v-model="username">
    <input type="password" class="login__input login__input--password" placeholder="密码" v-model="password">
    <div class="login__remember">
      <label><input type="checkbox">记住密码</label>
    </div>
    <button class="login__btn" @click="login">登 录</button>
  </div>
</template>

<script>
import api from 'api'
import md5 from 'md5'
export default {
  name: 'login',
  data () {
    return {
      password: '',
      username: ''
    }
  },
  created: () => {
    console.log(api.LOGIN)
  },
  methods: {
    login () {
      this.$http.post(api.LOGIN, {
        account_type: 2,
        userid: this.username,
        password: md5(this.password)
      })
      .then(res => {
        window.sessionStorage.setItem('sst-sessionId', res.session_id)
        window.sessionStorage.setItem('sst-userInfo', JSON.stringify(res.user_info))
        this.$router.push('/business/campaign')
      })
    }
  }
}
</script>

<style lang="scss">
@import "../style/_variable.scss";
.login {
  text-align: center;
  padding-top: 2rem;
  color: #FFF;
  background-image: linear-gradient(to bottom,#081F2F, #0C283A,#283F4C);
  &__logo {
    width: 3rem;
    margin-bottom: .2rem;
  }
  &__version {
    font-size: 12px;
  }
  &__title {
    font-size: 24px;
    font-weight: bold;
    margin: .5rem auto;
    color: $yellow;
  }
  &__input {
    display: block;
    margin: 0 auto .4rem;
    width: 5.8rem;
    height: .85rem;
    padding: .22rem 0 .22rem .9rem;
    border-radius: 5px;
    background: rgba(49, 48, 57, 0.4) 0.34rem center no-repeat;
    border: none;
    color: #FFF;
    background-repeat: no-repeat;
    background-size: .3rem;
    &:focus {
      outline: none;
   }
   &--username {
     background-image: url('./image/user-icon.png');
   }
   &--password {
     background-image: url('./image/password-icon.png');
   }
  }
  &__remember {
    width: 5.8rem;
    margin: 0 auto;
    text-align: left;
  }
  &__btn {
    width: 5.8rem;
    margin: .8rem auto;
    padding: .2rem;
    font-size: 20px;
    background-color: $yellow;
    -webkit-appearance: none;
    border: none;
    border-radius: 5px;
  }
}
</style>

<template lang="html">
  <div id="login" class="login">
    <img src="../assets/LOGO-Smartac.png" alt="ShopperConnect Logo" class="login__logo">
    <div class="login__version">版本： 3.0</div>
    <div class="login__title">商铺平台系统登录</div>
    <input type="text" class="login__input login__input--username" placeholder="帐号">
    <input type="password" class="login__input login__input--password" placeholder="密码">
    <div class="login__remember">
      <label><input type="checkbox">记住密码</label>
    </div>
    <button class="login__btn">登 录</button>
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style lang="scss">
@import "../stylesheets/_variable.scss";
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
    &:focus {
      outline: none;
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

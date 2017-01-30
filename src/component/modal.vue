<template lang="html">
  <div class="modal">
    <div class="modal__overlay" v-show="isModalShow"></div>
    <div class="modal__box" v-show="isModalShow">
      <div class="modal__box-guts">
        <div class="header">
          <button class="btn" @click="hideModal">取消</button>
          <slot name="title"></slot>
          <button class="btn btn-warning" @click="confirm">确认</button>
        </div>
        <div class="body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  methods: {
    hideModal: function () {
      this.$store.dispatch('hideModal')
    },
    confirm: function () {
      this.$emit('confirm')
    }
  },
  computed: {
    isModalShow () {
      return this.$store.getters.isModalShow
    }
  }
}
</script>

<style lang="scss">
.modal {
  &__overlay {
    position: fixed;
    top: 0;
    z-index: 50;
    background-color: rgba(0,0,0,.6);
    left: 0;
    width: 100%;
    height: 100%;
  }
  &__box {
    position: fixed;
    display: block;
    width: 500px;
    max-width: 100%;
    height: 300px;
    border-radius: 4px;
    z-index: 100;
    left: 50%;
    top: 50%;
    background: #FFF;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 60px 10px rgba(0,0,0,.4);
    &-guts {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      border-radius: 4px;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding: .2rem;
        background-color: #F5F7FA;
      }
      .body {
        padding: .2rem;
      }
    }
  }
}
</style>

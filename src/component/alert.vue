<template lang="html">
  <div class="alert">
    <div class="modal-mask" v-show="isAlertShow" transition="modal">
      <div class="modal-wrapper">
        <div class="modal-container" :style="{width: width}">
          <div class="modal-header">
            <h3>温馨提示</h3>
          </div>
          <div class="modal-body">
            <slot name="msg">
            </slot>
          </div>
          <div class="modal-footer">
            <div>
              <button class="btn btn-warning" @click="hide">确定</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'alert',
  props: {
    width: {
      default: '4.5rem'
    }
  },
  methods: {
    hide () {
      this.$store.dispatch('hideAlert')
    }
  },
  computed: {
    isAlertShow () {
      return this.$store.getters.isAlertShow
    }
  }
}
</script>

<style lang="scss">
.alert {
  position: absolute;
}
</style>

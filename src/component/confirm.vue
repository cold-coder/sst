<template lang="html">
  <div class="confirm" v-show="isConfirmShow">
    <div class="modal-mask" transition="modal">
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
              <button class="btn confirm__confirm-btn" @click="hide">取消</button>
              <button class="btn btn-warning confirm__cancel-btn" @click="confirm">确定</button>
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
      this.$store.dispatch('hideConfirm')
    },
    confirm: function () {
      this.$emit('confirm')
      this.$store.dispatch('hideConfirm')
    }
  },
  computed: {
    isConfirmShow () {
      return this.$store.getters.isConfirmShow
    }
  }
}
</script>

<style lang="scss">
.confirm {
  position: absolute;
}
.confirm__confirm-btn, .confirm__cancel-btn {
  display: inline-block;
  font-size: 14px;
  padding: 0;
  width: 1.7rem;
  height: .6rem;
  line-height: .6rem;
  border: none;
  text-align: center;
  border-radius: .05rem;
}
</style>

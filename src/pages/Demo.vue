<template lang="html">
  <div class="demo">
    <h1>功能组件</h1>
    <section class="demo__toast">
      <h2>Toast</h2>
      <button type="button" class="btn btn-success" @click="showSuccessToastr">成功提示</button>
      <button type="button" class="btn btn-error" @click="showErrorToastr">错误提示</button>
      <button type="button" class="btn btn-warning" @click="showWarningToastr">警告提示</button>
      <button type="button" class="btn btn-secondary" @click="showInfoToastr">信息提示</button>
    </section>
    <section class="demo__modal">
      <h2>Modal</h2>
      <button type="button" class="btn" @click="showModal">显示Modal</button>
    </section>
    <modal @confirm="onModalConfirm">
      <span slot="title">Title from Demo</span>
      <div>这里的表单会渲染到Modal的Body里面</div>
    </modal>
  </div>
</template>

<script>
import Modal from '../component/modal.vue'
export default {
  name: 'demo',
  components: {
    Modal
  },
  data () {
    return {
      name: 'demo'
    }
  },
  created: function () {
  },
  methods: {
    showModal: function () {
      this.$store.dispatch('showModal')
    },
    onModalConfirm: function () {
      console.log('Modal 确认事件触发')
      this.$store.dispatch('hideModal')
    },
    showSuccessToastr () {
      this.showToast('成功提示', 'success')
    },
    showErrorToastr () {
      this.showToast('错误提示', 'error')
    },
    showWarningToastr () {
      this.showToast('警告提示', 'warning')
    },
    showInfoToastr () {
      this.showToast('信息提示', 'info')
    }
  }
}
</script>

<style lang="scss">
.demo {
    padding: 0.2rem;
    &__toast {

    }
}
</style>

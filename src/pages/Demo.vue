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
      <modal @confirm="onModalConfirm">
        <span slot="title">Title from Demo</span>
        <div>这里的表单会渲染到Modal的Body里面</div>
      </modal>
    </section>
    <section class="demo__alert">
      <h2>Alert & Confirm</h2>
      <button type="button" class="btn" @click="showAlert">显示Alert</button>
      <button type="button" class="btn" @click="showConfirm">显示Confirm</button>
      <alert>
        <div slot="msg">打卡成功</div>
      </alert>
      <confirm @confirm="confirmExit">
        <div slot="msg">确认退出</div>
      </confirm>
    </section>
  </div>
</template>

<script>
import Modal from '../component/modal.vue'
import Alert from '../component/alert.vue'
import Confirm from '../component/confirm.vue'
export default {
  name: 'demo',
  components: {
    Modal,
    Alert,
    Confirm
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
    },
    showAlert () {
      this.$store.dispatch('showAlert')
    },
    showConfirm () {
      this.$store.dispatch('showConfirm')
    },
    confirmExit () {
      console.log('Confirm 确认事件触发')
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

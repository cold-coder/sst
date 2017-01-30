<template lang="html">
  <div class="demo">
    <h1>功能组件</h1>
    <section class="demo__toast">
      <h2>Toast</h2>
      <button type="button" class="btn btn-success">成功提示</button>
      <button type="button" class="btn btn-error">错误提示</button>
      <button type="button" class="btn btn-warning">警告提示</button>
      <button type="button" class="btn btn-secondary">信息提示</button>
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
    data() {
        return {
            name: 'demo'
        }
    },
    methods: {
        showModal: function() {
            this.$store.dispatch('showModal')
        },
        onModalConfirm: function() {
            console.log('Modal 确认事件触发')
            this.$store.dispatch('hideModal')
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

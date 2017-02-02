<template lang="html">
  <div class="biz-toggle toggleContainer">
    <div class="pure-u-1 pure-u-md-1-3" v-for="toggle in toggleList">
      <span>{{ toggle.title }}</span>
      <span>
        <input type="checkbox" class="toggle" :id="'enable-' + toggle.key"
         v-model="toggle.isEnable" @change="mute(toggle.typeCode, toggle.isEnable)">
        <label :for="'enable-' + toggle.key"></label>
      </span>
    </div>
  </div>
</template>

<script>
import api from 'api'
export default {
  name: 'biz-toggle',
  data () {
    return {
      toggleList: []
    }
  },
  mounted () {
    /*
     * 获取按钮状态
     */
    this.$http.post(api.SHOP, {
      shop_id: this.$store.getters.shopId
    }).then(res => {
      const bizInfo = res.data.shop.extend_info
      this.toggleList = [{
        title: '开启排队',
        key: 'queue',
        isEnable: !!bizInfo.is_queue,
        typeCode: 1
      }, {
        title: '开启预订',
        key: 'booking',
        isEnable: !!bizInfo.is_reserve,
        typeCode: 2
      }, {
        title: '开启点评',
        key: 'review',
        isEnable: !!bizInfo.is_comment,
        typeCode: 3
      }]
    })
  },
  methods: {
    mute (typeCode, isEnable) {
      this.$http.post(api.SET_BUSINESS, {
        shop_id: this.$store.getters.shopId,
        type_code: typeCode,
        status_code: isEnable ? 1 : 0
      })
    }
  }
}
</script>

<style lang="scss">
</style>

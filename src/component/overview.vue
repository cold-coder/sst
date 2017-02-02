<template lang="html">
  <div class="overview">
    <div class="overview__item" v-for="item in overviews" :class="'overview__item--' + item.class">
      <div class="overview__item-info">
        <div>{{ item.title }}</div>
        <div>{{ item.data }}</div>
        <div class="remark">{{ item.remark }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from 'api'
export default {
  name: 'overview',
  data () {
    return {
      overviews: []
    }
  },
  mounted () {
    this.$http.post(api.SHOP_SUMMARY, {
      shop_id: this.$store.getters.shopId
    }).then(res => {
      const statistics = res.data.statistics
      this.overviews = [{
        class: 'queue',
        data: statistics.queue_info,
        title: '排队',
        remark: '未入座/今日总数'
      }, {
        class: 'booking',
        data: statistics.reserve_info,
        title: '预订',
        remark: '待审核/今日总数'
      }, {
        class: 'review',
        data: statistics.comment_info,
        title: '点评',
        remark: '待审核/今日总数'
      }, {
        class: 'praise',
        data: statistics.praise_info,
        title: '点赞',
        remark: '点赞数/平均分'
      }]
    })
  }
}
</script>

<style lang="scss">
@import "../style/_variable.scss";
.overview {
  padding: .3rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  white-space: nowrap;
  overflow-x: scroll;
  &__item {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid $border-color;
    border-radius: 4px;
    margin-right: .2rem;
    padding-left: 53px;
    padding-right: 5px;
    background-repeat: no-repeat;
    background-size: 52px;
    background-position: 6px center;
    div {
      margin: .15rem;
      font-size: 15px;
    }
    &--queue {
      background-image: url('./image/icon_paidui.png');
      .remark {
        color: #FF6966
      }
    }
    &--booking {
      background-image: url('./image/icon_yuding.png');
      .remark {
        color: #00BFFB;
      }
    }
    &--review {
      background-image: url('./image/icon_dianping.png');
      .remark {
        color: #00CA98;
      }
    }
    &--praise {
      background-image: url('./image/icon_dianzan.png');
      .remark {
        color: #FFB90E;
      }
    }
  }
}
</style>

// import moment from 'moment'
import api from 'api'

const verificationMixin = {
  methods: {
    /**
     * 返回表格头配置
     * @returns {string[]}
     */
    getTableHead () {
      return [
        '序列号',
        '核销日期',
        '卡券编号',
        '卡券名称',
        '会员名称'
      ]
    },

    /**
     * 获取核销历史列表
     * @param pageIndex
     * @param pageSize
     * @param cb
     */
    queryVerificationList (searchObj, pageIndex, pageSize) {
      return this.$http.post(api.VERIFICATION_HISTORY, {
        shop_id: this.$store.getters.shopId,
        history_type: 1, // 核销历史
        no: searchObj.couponNumber || undefined,
        used_time: searchObj.startDate ? new Date(searchObj.startDate).valueOf() / 1000 : undefined,
        condition_name: searchObj.customerName,
        page: {
          page_size: pageSize,
          page_index: pageIndex
        }
      }).then(res => {
        return {
          list: res.history,
          count: Math.ceil(res.total_count / pageSize)
        }
      })
    },

    /**
     * 根据卡券编号手动核销
     * @param couponInfo
     * @param cb
     */
    useCoupon (couponInfo) {
      return this.$http.post(api.DESTORY_COUPON, {
        coupon_no: couponInfo.couponNum,
        remark: couponInfo.remark
      }).then(res => {
        return '核销成功'
      })
    },

    /**
     * 根据核销码获取核销信息，扫码处用到
     * @param code
     * @param cb
     * @param errcb
     */
    getCouponInfoByCode (code, cb, errcb) {
      return this.$http.post(api.QUERY_COUPON, {
        coupon_code: code
      }).then(res => {
        if (res.ci && res.ci.cust_info) {
          return res.ci.cust_info
        }
        return {}
      })
    }
  }
}

export default verificationMixin

// import moment from 'moment'
import api from 'api'

const reviewMixin = {
  methods: {
    /**
     * 获得预订状态列表预填充项
     * @author cheng.yao
     * @date   2016-11-14
     * @return {[type]}   [description]
     */
    getReviewStatusList () {
      return [{
        id: null,
        label: '全部'
      }, {
        id: 0,
        label: '待审核'
      }, {
        id: 1,
        label: '已审核'
      }, {
        id: 2,
        label: '已拒绝'
      }, {
        id: 3,
        label: '已审核并回复'
      }]
    },
    /**
     * 查询点评列表
     * @author cheng.yao
     * @date   2016-11-04
     * @param  {Object}   searchObj [description]
     * @param  {int}   pageIndex [description]
     * @param  {int}   pageSize  [description]
     * @return {[type]}             [description]
     */
    queryReviewList (searchObj, pageIndex, pageSize) {
      return this.$http.post(api.COMMENT_HISTORY, {
        shop_id: JSON.parse(window.sessionStorage.getItem('sst-userInfo')).shop_id,
        condition_name: searchObj.custname || undefined, // 会员卡会或手机号
        status_code: searchObj.status,
        time_horizon: {
          time_begin: searchObj.startDate ? new Date(searchObj.startDate).valueOf() / 1000 : undefined,
          time_end: searchObj.endDate ? new Date(searchObj.endDate).valueOf() / 1000 : undefined
        },
        page: {
          page_size: pageSize,
          page_index: pageIndex
        }
      }).then(res => {
        return {
          list: res.list,
          count: Math.ceil(res.total_count / pageSize),
          noMoreData: res.list.length < pageSize
        }
      })
    }
  }
}

export default reviewMixin

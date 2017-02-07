import moment from 'moment'
import api from 'api'

const bookingMixin = {
  methods: {
    /**
     * 返回表格头配置
     * @returns {string[]}
     */
    getTableHead () {
      return [
        '序列号',
        '预订时间',
        '预订人数',
        '会员姓名',
        '手机号码',
        '备注',
        '操作'
      ]
    },

    /**
     * 获得预订状态列表预填充项
     * @author cheng.yao
     * @date   2016-11-14
     * @return {[type]}   [description]
     */
    getReserveStatusList () {
      return [{
        id: null,
        label: '全部'
      }, {
        id: 0,
        label: '待确认'
      }, {
        id: 1,
        label: '已确认'
      }, {
        id: 2,
        label: '已到店'
      }, {
        id: 3,
        label: '已取消'
      }, {
        id: 4,
        label: '未到店'
      }]
    },

    /**
     * 查询预订列表
     * @author cheng.yao
     * @date   2016-11-04
     * @param  {Object}   searchObj [description]
     * @param  {int}   pageIndex [description]
     * @param  {int}   pageSize  [description]
     * @return {[type]}             [description]
     */
    queryReserveList (searchObj, pageIndex, pageSize) {
      return this.$http.post(api.RESERVE_HISTORY, {
        shop_id: JSON.parse(window.sessionStorage.getItem('sst-userInfo')).shop_id,
        condition_name: searchObj.custname || undefined, // 会员卡会或手机号
        status_code: searchObj.status,
        reserve_time_horizon: {
          time_begin: searchObj.reserveTimeBegin ? parseInt(moment(searchObj.reserveTimeBegin).format('X'), 10) : undefined,
          time_end: searchObj.reserveTimeEnd ? parseInt(moment(searchObj.reserveTimeEnd).format('X'), 10) : undefined
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
    },
    /**
     * 更新预订状态
     * @author cheng.yao
     * @date   2016-11-04
     * @param  {int}   bookId [description]
     * @param  {int}   state  [description]
     * @return {[type]}          [description]
     */
    updateReserve (bookId, state) {
      return this.$http.post(api.MODIFY_RESERVE, {
        id: bookId,
        status_code: state
      }).then(res => {
        return res
      })
    }
  }
}

export default bookingMixin

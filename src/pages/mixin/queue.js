// import moment from 'moment'
import api from 'api'

const queueMixin = {
  methods: {
    /**
     * 返回表格头配置
     * @returns {string[]}
     */
    getTableHead () {
      return [
        '序列号',
        '排号时间',
        '手机号码',
        '类型',
        '人数',
        '排号',
        '状态'
      ]
    },
    /**
     * 查询排队列表
     * @author cheng.yao
     * @date   2016-11-04
     * @param  {Object}   searchObj [description]
     * @param  {int}   pageIndex [description]
     * @param  {int}   pageSize  [description]
     * @return {[type]}             [description]
     */
    queryQueueList (searchObj, pageIndex, pageSize) {
      return this.$http.post(api.QUEUE_HISTORY, {
        shop_id: JSON.parse(window.sessionStorage.getItem('sst-userInfo')).shop_id,
        cust_name: searchObj.name,
        cust_mobile: searchObj.mobile,
        status_code: searchObj.status,
        time_horizon: {
          time_begin: searchObj.timeBegin ? searchObj.timeBegin.valueOf() / 1000 : undefined,
          time_end: searchObj.timeEnd ? searchObj.timeEnd.valueOf() / 1000 : undefined
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

export default queueMixin

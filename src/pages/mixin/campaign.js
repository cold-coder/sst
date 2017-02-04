import moment from 'moment'
import api from 'api'

const campaignMixin = {
  methods: {
    /**
     * 获取活动列表
     *
     */
    queryActivityList (searchObj, pageIndex, pageSize) {
      var starttime = searchObj.startDate ? new Date(searchObj.startDate).valueOf() / 1000 : undefined
      var endtime = searchObj.endDate ? new Date(searchObj.endDate).valueOf() / 1000 : undefined

      return this.$http.post(api.CAMPAIGN_LIST, {
        shop_id: JSON.parse(window.sessionStorage.getItem('sst-userInfo')).shop_id,
        name: searchObj.activityName || undefined,
        start_time: starttime,
        end_time: endtime,
        page: {
          page_count: pageSize,
          page_index: pageIndex
        }
      }).then(res => {
        return {
          list: res.campaign_info,
          count: Math.ceil(res.total_count / pageSize),
          noMoreData: res.campaign_info.length < pageSize
        }
      })
    },
    /**
    * 获取表格头配置
    * 2016/4/12 18:03
    */
    getTableHead () {
      return [
        '序列号',
        '活动名称',
        '活动类型',
        '活动时间',
        '状态',
        '统计'
      ]
    },

    /**
    * 手动签到
    * 2016/8/9
    **/
    manualCheckin (checkinInfo) {
      if (checkinInfo) {
        return this.$http.post(api.CAMPAIGN_CHECKIN, {
          campaign_id: checkinInfo.campaign_id,
          checkin_code: checkinInfo.checkin_code,
          checkin_source: 2 // 商铺平台
        }).then(res => {
          return res
        })
      }
      return 0
    },

    /**
    * 根据签到码获取签到信息，扫码结果处用到
    * @param checkinCode
    * @param cb
    * @param errcb
    */
    getCheckinInfoByCode (checkinCode) {
      return this.$http.post(api.CAMPAIGN_CHECKIN_INFO, {
        checkin_code: checkinCode
      }).then(res => {
        if (res.sign_info.length > 0) {
          return res.sign_info[0]
        }
        return []
      })
    },

    /**
    * 格式化活动时间 格式化规则: http://172.16.0.12/browse/SCAL-466
    * @author cheng.yao
    * @date   2016-12-20
    * @param  {[type]}   startTime [description]
    * @param  {[type]}   endTime   [description]
    * @return {[type]}             [description]
    */
    computeActivityPeriod (startTime, endTime) {
      const starttime = new Date(startTime.low * 1000)
      const endtime = new Date(endTime.low * 1000)
      // 跨年情况 第二个也显示年份
      if (starttime.getFullYear() !== endtime.getFullYear()) {
        return moment(starttime).format('YYYY.MM.DD H:mm') + ' - ' + moment(endtime).format('YYYY.MM.DD H:mm')
      }
      // 同一天情况 第二个只显示时间
      if (starttime.toDateString() === endtime.toDateString()) {
        return moment(starttime).format('YYYY.MM.DD') + ' ' + moment(starttime).format('H:mm') + ' - ' + moment(endtime).format('H:mm')
      }
      return moment(starttime).format('YYYY.MM.DD H:mm') + ' - ' + moment(endtime).format('MM.DD H:mm')
    },

    /**
    * 判断活动是否在进行中
    * @author cheng.yao
    * @date   2017-01-12
    * @param  {[type]}   startTime [description]
    * @param  {[type]}   endTime   [description]
    * @return {String}            [description]
    */
    isRunningCampaign (startTime, endTime) {
      const starttime = new Date(startTime.low * 1000)
      const endtime = new Date(endTime.low * 1000)

      const now = new Date()
      if (now < starttime) {
        return '未开始'
      } else if (now > starttime && now < endtime) {
        return '进行中'
      }
      return '已结束'
    }
  }
}

export default campaignMixin

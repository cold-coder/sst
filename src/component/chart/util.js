import moment from 'moment'
/**
 * 根据类型计算开始和结束日期
 * @param type 本周/本月
 * @return object{date,date}
 */
export function computeTrendingPeriod (type) {
  return {
    starttime: moment().startOf(type), // first of this week
    endtime: moment().endOf(type)
  }
}

/**
 * 过滤趋势数据
 * @params list
 * @return object
 */
export function filterTrendingData (list) {
  return list.slice(0, list.length).map(function (item) {
    return item.number
  })
}

/**
 * 填充日期,从每周或每月第一天开始
 * @params type
 * @return  []
 */
export function paddingTrendingLabel (type) {
  if (type === 'week') {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  } else if (type === 'month') {
    var totalDays = moment().daysInMonth()
    return Array.from({ length: totalDays }, (v, i) => i + 1) // [1, 2, 3, .... totayDays]
  }
  return []
}

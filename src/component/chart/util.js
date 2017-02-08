/**
 * 根据类型计算开始和结束日期
 * @param type 本周/本月
 * @return object{date,date}
 */
export function computeTrendingPeriod (type) {
  var today = new Date()
  var curr = new Date()
  var lastDayOfWeek = new Date()
  var lastDayOfMonth = new Date()
  lastDayOfWeek.setDate(curr.getDate() - curr.getDay() + 7)
  lastDayOfMonth.setDate(curr.getDate() + 30)
  if (type === 'week') {
    return {
      starttime: new Date(curr.setDate(curr.getDate() - curr.getDay())), // first of this week
      endtime: lastDayOfWeek
    }
  } else if (type === 'month') {
    return {
      starttime: new Date(today.getFullYear(), today.getMonth(), 1), // first of this month
      endtime: lastDayOfMonth
    }
  }
  return {}
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
 * 获得本月的天数
 *
 */
function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate()
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
    var today = new Date()
    var month = today.getMonth() + 1
    var year = today.getFullYear()
    var totalDays = daysInMonth(month, year)
    var r = []
    for (var i = 1; i <= totalDays; i++) {
      r.push(i)
    }
    return r
  }
  return []
}

import moment from 'moment'
/*
 * 在uuid前面加资源服务器地址
 */
export function loadImg (uuid, size = 'medium') {
  const defaultImg = 'data:image/png;base64,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'
  if (uuid && uuid !== '' && uuid.length > 0) {
    return window.settings.resourceServer + uuid + '/' + size
  }
  return defaultImg
}

/**
 * 交易类型
 * @author cheng.yao
 * @date   2017-02-04
 * @param  {Int}   type [description]
 * @return {String}        [description]
 */
export function tradeTypeFilter (type) {
  if (type === 1) {
    return '正常交易' // 正常交易
  } else if (type === 2) {
    return '退款' // 退款
  }
  return '未知交易类型'
}

/**
 * 格式化时间
 * @author cheng.yao
 * @date   2017-02-04
 * @param  {Object}   time                [description]
 * @param  {String}   [format='YYYY-MM-DD HH:mm']       [description]
 * @return {String}                       [description]
 */
export function formatDate (time, format = 'YYYY-MM-DD HH:mm') {
  return time.low ? moment(time.low * 1000).format(format) : moment(time).format(format)
}

/*
 * 活动类型
 */
export function campaignTypeFilter (type) {
  if (type === 2) {
    return '商场活动'
  } else if (type === 3) {
    return '店铺活动'
  }
  return '-'
}

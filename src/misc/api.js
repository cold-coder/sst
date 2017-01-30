const serviceAppPrefix = window.settings.serviceAppPrefix
const serviceAppPrefixCampaign = window.settings.serviceAppPrefixCampaign
const authenticateUrl = window.settings.oauth2.url

const api = {
    // v2.0 new api
  AUTHENTICATE: authenticateUrl, // Auth2认证
  LOGIN: serviceAppPrefix + '/req_login', // 登录
  // DASHBOARD
  SET_BUSINESS: serviceAppPrefix + '/req_set_business', // 开关排队预订点评
  SHOP_SUMMARY: serviceAppPrefix + '/req_query_shop_summary', // 业务信息总览
  QUEUE_REPORT: serviceAppPrefix + '/req_query_queue_report', // 排队趋势增长
  BOOK_REPORT: serviceAppPrefix + '/req_query_reserve_report', // 预订趋势增长
  // SHOP
  SHOP: serviceAppPrefix + '/req_get_shop', // 商铺信息
  MODIFY_SHOP: serviceAppPrefix + '/req_modify_shop', // 更新商铺信息
  // BUSINESS
  VERIFICATION_HISTORY: serviceAppPrefix + '/req_query_coupon_history', // 礼券核销历史
  DESTORY_COUPON: serviceAppPrefix + '/req_destroy_coupon', // 礼券核销
  QUERY_COUPON: serviceAppPrefix + '/req_get_coupon', // 礼券详情
  TRADE_HISTORY: serviceAppPrefix + '/req_query_trade', // 交易历史
  RESERVE_HISTORY: serviceAppPrefix + '/req_query_reserve', // 预订列表
  MODIFY_RESERVE: serviceAppPrefix + '/req_modify_reserve', // 修改预订
  QUEUE_HISTORY: serviceAppPrefix + '/req_query_queue', // 排队列表
  COMMENT_HISTORY: serviceAppPrefix + '/req_query_comment', // 点评列表
  PRAISE_HISTORY: serviceAppPrefix + '/req_query_praise', // 点赞列表
  VERIFY_COMMENT: serviceAppPrefix + '/req_verify_comment', // 审核回复点评
  CAMPAIGN_LIST: serviceAppPrefixCampaign + '/req_get_campaign_info', // 活动列表
  CAMPAIGN_SESSION_LIST: serviceAppPrefixCampaign + '/req_get_campaign_seasons_info', // 活动场次列表
  CAMPAIGN_CHECKIN: serviceAppPrefixCampaign + '/req_campaign_checkin', // 活动签到
  CAMPAIGN_CHECKIN_INFO: serviceAppPrefixCampaign + '/req_get_sign_info' // 获取报名签到信息
}

export default api

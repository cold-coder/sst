const errCodeMap = {
  '7': '缺少参数',
  '8': '系统错误',
  '10': '编码失败',
  '11': '数据库操作失败',
  '13': '登录过期',
  '18': '无效的账户',
  '1002': '用户名或密码错误',
  '1003': '创建session error',
  '1004': '用户名和密码必填',
  '1051': '会员ID在系统中不存在',
  '1052': '根据查询条件找不到会员',
  '1053': '验证码无效',
  '1054': '手机号码在系统中已存在，不可重复',
  '1055': '获取会员的礼券总数量出错',
  '1056': '身份证号码在系统中已存在，不可重复',
  '1057': '更新会员手机号码时，验证码必填',
  '1058': '更新会员失败',
  '1059': '验证码发送失败',
  '1060': '找不到该会员的积分数据',
  '1101': '根据卡号找不到相关会员',
  '1102': '找不到卡',
  '1103': '卡号必填',
  '1151': '模板ID不存在',
  '1152': '没有核销历史数据',
  '1153': '发送礼券出错',
  '1154': '订单没有成功创建',
  '1157': '库存不足',
  '1158': '礼券已过期',
  '1159': '礼券已被禁用',
  '1160': '超过该会员允许的发放数量限制',
  '1161': '不满足会员卡级别限制',
  '1162': '此券不可在服务台核销',
  '1163': '礼券编码在系统中不存在',
  '1164': '礼券已经被核销',
  '1165': '礼券编码必填',
  '1166': '积分不够',
  '1251': '问题不存在',
  '1252': '没有问题回复成功',
  '1253': '新增问题反馈失败',
  '1301': '小票凭据数据不存在',
  '1302': '不需要审核该小票凭据',
  '1303': '审核小票不成功',
  '1304': '新增小票记录不成功',
  '1305': '新增交易失败',
  '1306': '发票编号在系统中已存在',
  '1351': '代码值不存在',
  '1352': '找不到任何商铺数据',
  '1451': '规则不存在',
  '1551': '该会员已经报名',
  '1552': '报名人数已满',
  '1553': '积分不足无法报名',
  '1554': '报名人数超过限制',
  '1555': '不在报名时间内',
  '1556': '会员卡等级不符无法报名',
  '1557': '没有签到权限',
  '2002': '手机号或会员卡号在系统中已存在',
  '2003': '会员卡号已存在',
  '11018': '礼券不在有效期内'
}

export default errCodeMap

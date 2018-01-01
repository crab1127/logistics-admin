// export const ROOT = 'http://rap.taobao.org/mockjsdata/29904'
export const ROOT = 'http://123.206.122.83:8080/lg_service'

export const API = {
  login: ROOT + '/login',
  userInfo: ROOT + '/userInfo',
  areaCountry: ROOT + '/common/areaCountry',
  customer: ROOT + '/external/customer/user/manage',
  admin: ROOT + '/manage/system/user/create',
  channel: ROOT + '/admin/logistics/channel/manage', // 渠道管理
  mailCost: ROOT + '/admin/area/ladder/manage', // 运费设置
  discount: ROOT + '/admin/grade/discount/manage' // 会员登记打折
}

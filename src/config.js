// export const ROOT = 'http://rap.taobao.org/mockjsdata/29904'
// export const ROOT = 'http://123.206.122.83:8080/lg_service'
export const ROOT = 'http://139.199.184.238:8080/lg_service'
export const ROOT_IMG = 'http://139.199.184.238:81'

export const API = {
  login: ROOT + '/login',
  userInfo: ROOT + '/userInfo',
  areaCountry: ROOT + '/common/areaCountry',
  // customer: ROOT + '/external/customer/user/manage',
  customer: ROOT + '/admin/customer/manage/member',
  admin: ROOT + '/manage/system/user/create',
  channel: ROOT + '/admin/logistics/channel/manage', // 渠道管理
  mailCost: ROOT + '/admin/area/ladder/manage', // 运费设置
  discount: ROOT + '/admin/grade/discount/manage', // 会员登记打折,
  order: ROOT + '/admin/customer/order/manage',
  fundAudit: ROOT + '/admin/customer/fund/audit',
  // upload: ROOT + '/common/upload',
  upload: 'https://api.harsonserver.com/clerk/common/qnUploadFile.json?platform=36',
  cms: ROOT + '/admin/oms/index/manage',
  product: ROOT + '/admin/oms/recommend/prodSer'
}

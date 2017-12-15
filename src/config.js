export const ROOT = 'http://rap.taobao.org/mockjsdata/29904'

export const API = {
  login: ROOT + '/login',
  changPass: ROOT + '/external/customer/user/pass',
  user: ROOT + 'external/customer/user/manage',
  addressFrom: ROOT + '/external/customer/addrFrom/manage', // 发件人
  addressReach: ROOT + '/external/customer/addrReach/manage', // 收件人
  channel: ROOT + '/admin/logistics/channel/manage', // 渠道管理
  mailCost: ROOT + '/admin/area/ladder/manage' // 运费设置
}

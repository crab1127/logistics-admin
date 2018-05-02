import request from '@/utils/request'
import { API } from '../config'

// 获取渠道列表
export function fetchChannel(params) {
  return request({
    url: API.channel,
    method: 'get',
    params: params
  })
}

// 添加渠道
export function createChannel(data) {
  return request({
    url: API.channel,
    method: 'post',
    data: data
  })
}

export function fetchChannelDetail(id) {
  return request({
    url: `${API.channel}/${id}`,
    method: 'get'
  })
}

// 更改去夏
export function updateChannelStatus(id, data) {
  return request({
    url: `${API.channel}/${id}`,
    method: 'put',
    data: data
  })
}
export function updateChannel(data) {
  return request({
    url: `${API.channel}`,
    method: 'put',
    data: data
  })
}

export function delChannel(id) {
  return request({
    url: `${API.channel}/${id}`,
    method: 'delete'
  })
}

export function fetchAreaCountry(params) {
  return request({
    url: API.areaCountry,
    method: 'get',
    params
  })
}

// 会员列表
export function fetchCustomerList(params) {
  return request({
    url: API.customer,
    method: 'get',
    params
  })
}
export function updateCustomer(body) {
  return request({
    url: `${API.customer}`,
    method: 'put',
    data: body
  })
}
export function detailCustomer(id) {
  return request({
    url: `${API.customer}/${id}`,
    method: 'delete'
  })
}

// 管理员列表
export function fetchAdminList(params) {
  return request({
    url: API.admin,
    method: 'get',
    params
  })
}

export function createAdmin(body) {
  return request({
    url: API.admin,
    method: 'post',
    data: body
  })
}
export function updateAdmin(id, body) {
  return request({
    url: `${API.admin}`,
    method: 'put',
    data: body
  })
}
export function deleteAdmin(id) {
  return request({
    url: `${API.admin}/${id}`,
    method: 'delete'
  })
}

export function fetchOrderList(params) {
  return request({
    url: API.order,
    method: 'get',
    params
  })
}
export function fetchOrderDetail(id) {
  return request({
    url: `${API.order}/${id}`,
    method: 'get'
  })
}

export function updateOrder(id, body) {
  return request({
    url: `${API.order}`,
    method: 'put',
    data: body
  })
}
export function deleteOrder(id) {
  return request({
    url: `${API.order}/${id}`,
    method: 'delete'
  })
}

// 资金
export function fetchFundAudit(params) {
  return request({
    url: `${API.fundAudit}`,
    method: 'get',
    params
  })
}

export function updateFundAudit(body) {
  return request({
    url: `${API.fundAudit}`,
    method: 'post',
    data: body
  })
}

// cms
export function fetchCmsList(params) {
  return request({
    url: API.cms,
    method: 'get',
    params
  })
}
export function fetchCmsDetail(id) {
  return request({
    url: `${API.cms}/${id}`,
    method: 'get'
  })
}

export function createCms(body) {
  return request({
    url: `${API.cms}`,
    method: 'post',
    data: body
  })
}

export function updateCms(body) {
  return request({
    url: `${API.cms}`,
    method: 'put',
    data: body
  })
}

export function updateCmsStatus(id, status) {
  return request({
    url: `${API.cms}/${id}/${status}`,
    method: 'put'
  })
}

export function deleteCms(id) {
  return request({
    url: `${API.cms}/${id}`,
    method: 'delete'
  })
}

// 产品
export function fetchProductList(params) {
  return request({
    url: API.product,
    method: 'get',
    params
  })
}
export function fetchProductDetail(id) {
  return request({
    url: `${API.product}/${id}`,
    method: 'get'
  })
}

export function createProduct(body) {
  return request({
    url: `${API.product}`,
    method: 'post',
    data: body
  })
}

export function updateProduct(body) {
  return request({
    url: `${API.product}`,
    method: 'put',
    data: body
  })
}

export function updateProductStatus(id, status) {
  return request({
    url: `${API.product}/${id}/${status}`,
    method: 'put'
  })
}

export function deleteProduct(id) {
  return request({
    url: `${API.product}/${id}`,
    method: 'delete'
  })
}

// 用户产品
export function fetchCustomerProductList(params) {
  return request({
    url: API.customerProduct,
    method: 'get',
    params
  })
}
export function fetchCustomerProductDetail(id) {
  return request({
    url: `${API.customerProduct}/${id}`,
    method: 'get'
  })
}

export function createCustomerProduct(body) {
  return request({
    url: `${API.customerProduct}`,
    method: 'post',
    data: body
  })
}

export function updateCustomerProduct(body) {
  return request({
    url: `${API.customerProduct}`,
    method: 'put',
    data: body
  })
}

export function updateCustomerProductStatus(id, status) {
  return request({
    url: `${API.customerProduct}/${id}/${status}`,
    method: 'put'
  })
}

export function deleteCustomerProduct(id) {
  return request({
    url: `${API.customerProduct}/${id}`,
    method: 'delete'
  })
}


// 伙伴
// 用户产品
export function fetchPartnerList(params) {
  return request({
    url: API.partner,
    method: 'get',
    params
  })
}
export function createPartner(body) {
  return request({
    url: `${API.partner}`,
    method: 'post',
    data: body
  })
}
export function updatePartner(body) {
  return request({
    url: `${API.partner}`,
    method: 'put',
    data: body
  })
}
export function delPartner(id) {
  return request({
    url: `${API.partner}/${id}`,
    method: 'delete'
  })
}

// 服务
export function fetchServiceList(params) {
  return request({
    url: API.service,
    method: 'get',
    params
  })
}
export function fetchServiceDetail(id) {
  return request({
    url: `${API.service}/${id}`,
    method: 'get'
  })
}

export function createService(body) {
  return request({
    url: `${API.service}`,
    method: 'post',
    data: body
  })
}

export function updateService(body) {
  return request({
    url: `${API.service}`,
    method: 'put',
    data: body
  })
}

export function updateServiceStatus(id, status) {
  return request({
    url: `${API.service}/${id}/${status}`,
    method: 'put'
  })
}

export function deleteService(id) {
  return request({
    url: `${API.service}/${id}`,
    method: 'delete'
  })
}

// 区域取件服务合作商
export function fetchServiceSelfDeliveryList(params) {
  return request({
    url: API.serviceSelfDelivery,
    method: 'get',
    params
  })
}
export function fetchServiceSelfDeliveryDetail(id) {
  return request({
    url: `${API.serviceSelfDelivery}/${id}`,
    method: 'get'
  })
}

export function createServiceSelfDelivery(body) {
  return request({
    url: `${API.serviceSelfDelivery}`,
    method: 'post',
    data: body
  })
}

export function updateServiceSelfDelivery(body) {
  return request({
    url: `${API.serviceSelfDelivery}`,
    method: 'put',
    data: body
  })
}

export function updateServiceSelfDeliveryStatus(id, status) {
  return request({
    url: `${API.serviceSelfDelivery}/${id}/${status}`,
    method: 'put'
  })
}

export function deleteServiceSelfDelivery(id) {
  return request({
    url: `${API.serviceSelfDelivery}/${id}`,
    method: 'delete'
  })
}

// 区域自送服务
export function fetchServicePickupList(params) {
  return request({
    url: API.servicePickup,
    method: 'get',
    params
  })
}
export function fetchServicePickupDetail(id) {
  return request({
    url: `${API.servicePickup}/${id}`,
    method: 'get'
  })
}

export function createServicePickup(body) {
  return request({
    url: `${API.servicePickup}`,
    method: 'post',
    data: body
  })
}

export function updateServicePickup(body) {
  return request({
    url: `${API.servicePickup}`,
    method: 'put',
    data: body
  })
}

export function updateServicePickupStatus(id, status) {
  return request({
    url: `${API.servicePickup}/${id}/${status}`,
    method: 'put'
  })
}

export function deleteServicePickup(id) {
  return request({
    url: `${API.servicePickup}/${id}`,
    method: 'delete'
  })
}

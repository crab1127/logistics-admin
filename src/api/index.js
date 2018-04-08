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
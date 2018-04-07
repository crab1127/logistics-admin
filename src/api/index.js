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
export function updateCustomer(id, body) {
  return request({
    url: `${API.customer}/${id}`,
    method: 'put',
    data: body
  })
}
export function detailCustomer(id) {
  return request({
    url: `${API.customer}/${id}`,
    method: 'del'
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
    method: 'del'
  })
}

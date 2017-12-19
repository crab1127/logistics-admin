import request from '@/utils/request'
import { API } from '../config'

// 运费
export function fetchMailCostList(params) {
  return request({
    url: API.mailCost,
    method: 'get',
    params: params
  })
}
export function mailCostCreate(data) {
  return request({
    url: API.mailCost,
    method: 'post',
    data: data
  })
}
export function mailCostDetail(id) {
  return request({
    url: `${API.mailCost}/${id}`,
    method: 'get'
  })
}
export function mailCostUpdate(id) {
  return request({
    url: `${API.mailCost}/${id}`,
    method: 'put'
  })
}
export function mailCostDelete(id) {
  return request({
    url: `${API.mailCost}/${id}`,
    method: 'del'
  })
}

// 获取渠道列表
export function fetchChannel(params) {
  return request({
    url: API.channel,
    method: 'get',
    params: params
  })
}
export function createChannel(data) {
  return request({
    url: API.channel,
    method: 'post',
    data: data
  })
}

// 会员等级 打折
export function discountList(params) {
  return request({
    url: API.discount,
    method: 'get',
    params: params
  })
}
export function discountCreate(data) {
  return request({
    url: API.discount,
    method: 'post',
    data: data
  })
}
export function discountDetail(id) {
  return request({
    url: `${API.discount}/${id}`,
    method: 'get'
  })
}
export function discountUpdate(id) {
  return request({
    url: `${API.discount}/${id}`,
    method: 'put'
  })
}
export function discountDelete(id) {
  return request({
    url: `${API.discount}/${id}`,
    method: 'del'
  })
}

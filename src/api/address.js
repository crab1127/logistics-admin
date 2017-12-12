import request from '@/utils/request'
import { API } from '../config'

// 发件人
export function addressFromList(params) {
  return request({
    url: API.addressFrom,
    method: 'get',
    params: params
  })
}
export function addressFromCreate(data) {
  return request({
    url: API.addressFrom,
    method: 'post',
    data: data
  })
}
export function addressFromDetail(id) {
  return request({
    url: `${API.addressFrom}/${id}`,
    method: 'get'
  })
}
export function addressFromUpdate(id) {
  return request({
    url: `${API.addressFrom}/${id}`,
    method: 'put'
  })
}
export function addressFromDelete(id) {
  return request({
    url: `${API.addressFrom}/${id}`,
    method: 'del'
  })
}

// 收件人
export function addressReachList(params) {
  return request({
    url: API.addressReach,
    method: 'get',
    params: params
  })
}
export function addressReachCreate(data) {
  return request({
    url: API.addressReach,
    method: 'post',
    data: data
  })
}
export function addressReachDetail(id) {
  return request({
    url: `${API.addressReach}/${id}`,
    method: 'get'
  })
}
export function addressReachUpdate(id) {
  return request({
    url: `${API.addressReach}/${id}`,
    method: 'put'
  })
}
export function addressReachDelete(id) {
  return request({
    url: `${API.addressReach}/${id}`,
    method: 'del'
  })
}
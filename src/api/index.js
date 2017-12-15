import request from '@/utils/request'
import { API } from '../config'

export function login(username, password) {
  return request({
    url: API.login,
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function updateUserInfo(id, data) {
  return request({
    url: `${API.user}/${id}`,
    method: 'put',
    data
  })
}

export function updateUserPassword(data) {
  return request({
    url: API.changPass,
    method: 'put',
    data: data
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

// 添加渠道
export function createChannel(data) {
  return request({
    url: API.channel,
    method: 'post',
    data: data
  })
}

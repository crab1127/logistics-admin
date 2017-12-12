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
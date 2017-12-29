import request from '@/utils/request'
import { API } from '../config'

export function login(username, password) {
  return request({
    url: API.login,
    method: 'post',
    data: {
      username,
      password,
      clientId: 'd86b20af-1cb1-4c88-b647-ce74e2635262'
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
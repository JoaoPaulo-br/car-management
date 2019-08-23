import request from '@/utils/request'

import axios from 'axios'
import jwtDecode from 'jwt-decode'
const baseUrl = process.env.VUE_APP_BASE_API

const token = getToken()

function getToken() {
  const currentUserInfo = JSON.parse(localStorage.getItem('currentUserInfo'))
  if (currentUserInfo) {
    return currentUserInfo['x-auth-token']
  }
  return null
}

export function userLogin(data, cb) {
  const {
    username: email,
    password,
    authenticationType = 'local'
  } = data
  axios.post(`${baseUrl}/authentication/signin`, {
      email,
      password,
      authenticationType
    }).then(response => {
      if (response['data']['success']) {
        const token = response['data']['data']
        const decodedData = jwtDecode(token)
        decodedData['x-auth-token'] = token
        localStorage.setItem('currentUserInfo', JSON.stringify(decodedData))
        return cb(null, response)
      } else {
        return cb(response, null)
      }
    })
    .catch(error => cb(error, null))
}

export function userSignUp(data, cb) {
  const {
    username: name,
    email,
    mobileNo,
    password,
    authenticationType = 'local'
  } = data
  axios.post(`${baseUrl}/authentication/signup`, {
      name,
      email,
      mobileNo,
      password,
      authenticationType
    }).then(response => cb(null, response))
    .catch(error => cb(error, null))
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

const headers = {
  'Content-Type': 'application/json',
  'x-auth-token': token
}

export function deleteUser(id, cb) {
  axios.delete(`${baseUrl}/userList/delete-user/${id}`, {
      headers
    }).then(response => cb(null, response))
    .catch(error => cb(error, null))
}

export function makeAdminToUser(id, cb) {
  axios.get(`${baseUrl}/userList/make-admin-to-user/${id}`, {
      headers
    }).then(response => cb(null, response))
    .catch(error => cb(error, null))
}

export function makeUserToAdmin(id, cb) {
  axios.get(`${baseUrl}/userList/make-user-to-admin/${id}`, {
      headers
    }).then(response => cb(null, response))
    .catch(error => cb(error, null))
}

export function getUserInfo(id, cb) {
  axios.get(`${baseUrl}/userList/get-user-info/${id}`, {
      headers
    }).then(response => cb(null, response))
    .catch(error => cb(error, null))
}

export function updateUserInfo(newUserInfo, cb) {
  axios.patch(`${baseUrl}/userList/update-user-info/${newUserInfo._id}`, newUserInfo, {
      headers
    }).then(response => cb(null, response))
    .catch(error => cb(error, null))
}

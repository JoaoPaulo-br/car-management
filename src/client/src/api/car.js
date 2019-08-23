import axios from 'axios'
const baseUrl = process.env.VUE_APP_BASE_API

const currentUserInfo = JSON.parse(localStorage.getItem('currentUserInfo'))
const token = currentUserInfo['x-auth-token']

const headers = {
  'Content-Type': 'application/json',
  'x-auth-token': token
}

export function getCarsList(cb) {
  axios.get(`${baseUrl}/cars/get-cars`, {
      headers
    }).then(response => cb(null, response))
    .catch(error => cb(error, null))
}

export function getCar(id, cb) {
  axios.get(`${baseUrl}/cars/get-car/${id}`, {
      headers
    }).then(response => cb(null, response))
    .catch(error => cb(error, null))
}

export function addCar(data, cb) {
  axios.post(`${baseUrl}/cars/add-car`, data, {
      headers
    }).then(response => cb(null, response))
    .catch(error => cb(error, null))
}

export function updateCar(data, cb) {
  axios.patch(`${baseUrl}/cars/update-car/${data._id}`, data, {
      headers
    }).then(response => cb(null, response))
    .catch(error => cb(error, null))
}

export function deleteCar(id, cb) {
  axios.delete(`${baseUrl}/cars/delete-car/${id}`, {
      headers
    }).then(response => cb(null, response))
    .catch(error => cb(error, null))
}

export function getCarByOwnerId(ownerId, cb) {
  axios.get(`${baseUrl}/cars/get-car-by-owner-id/${ownerId}`, {
      headers
    }).then(response => cb(null, response))
    .catch(error => cb(error, null))
}

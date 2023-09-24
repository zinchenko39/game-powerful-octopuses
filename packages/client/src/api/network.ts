import axios from 'axios'

//TODO Вынести Base url
export const network = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
})

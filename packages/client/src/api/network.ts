import axios from 'axios'
import { BASE_URL } from '../globals'

export const network = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
})

export const BASE_URL =
  import.meta.env.VITE_API_URL || 'https://ya-praktikum.tech/api/v2'

export const BASE_API_URL = import.meta.env.DEV
  ? 'http://localhost:3001/api/v1'
  : 'http://edem-v-magadan-30.ya-praktikum.tech:3001/api/v1'

export const HOST_URL = 'http://localhost:3000'

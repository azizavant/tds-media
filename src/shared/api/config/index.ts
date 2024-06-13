import axios from 'axios'
import { API_URL } from '../../config/env.ts'
import { ApiClass } from './request.ts'


export const apiV1 = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api = new ApiClass(apiV1)
import { MicroCMSReqHeaders } from '../types/microCMS/headers'

const API_KEY = process.env.API_KEY

export const headers: MicroCMSReqHeaders = {
  'X-API-KEY': API_KEY ?? '',
}

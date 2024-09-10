import type { AMapModel } from './types'

let MAP_API = 'https://restapi.amap.com/v3/ip?key=ef7a817cfd8d2b4e62873daf64021d2c'

/**
 * 设置地图api
 * @param api
 */
export function setAMapApi(api: string): void {
  MAP_API = api
}

/**
 * 基础信息
 */
let CACHE_INFO: undefined | AMapModel

/**
 * 获取定位信息
 */
export async function getLocation(): Promise<AMapModel> {
  if (CACHE_INFO)
    return Promise.resolve(CACHE_INFO as AMapModel)
  // 如果没有缓存的情况需要去重新获取数据
  const response = await fetch(MAP_API)
  const data = await response.json()
  const array = ((data.rectangle || '' as string).split(';')?.[0] as string).split(',')
  // 设置缓存信息
  CACHE_INFO = {
    status: data.status || '',
    infoCode: data.infocode || '',
    province: data.province || '',
    city: data.city || '',
    adCode: data.adcode || '',
    geoPoint: [array[0], array[1]],
  } as AMapModel
  return CACHE_INFO
}

import type { GeoPointModel } from './types'

/**
 * 基础的信息
 */
let GEO_POINT: Partial<GeoPointModel> = {}

/**
 * 设置信息
 * @param data
 */
export function setGeoPointInfo(data: GeoPointModel) {
  GEO_POINT = {
    ...GEO_POINT,
    ...data,
  }
}

/**
 * 获取信息
 */
export function getGeoPointInfo(): GeoPointModel {
  return {
    ...GEO_POINT,
  } as GeoPointModel
}

/**
 * 清除信息
 */
export function clearGeoPointInfo() {
  GEO_POINT = {}
}

'use strict'

import { getProjectConfig } from '@own-basic-component/config'

// 文件相关配置
export const FILE_CONFIG = {
  // 默认文件前缀
  uploadPrefix: '/upload/',
  // 临时文件前缀
  tempPrefix: '/temp/',
  // 备份文件前缀
  backupPrefix: '/backup/',
  // 模板下载前缀
  templatePrefix: '',
}

/**
 * base64转blob
 * @param base64 base64
 * @returns {Blob}
 */
function base64toBlob(base64: string): Blob {
  const array = base64.split(',')
  const mime = array[0].match(/:(.*?);/)?.[1] || ''
  const blobStr = atob(array[1])
  let n = blobStr.length
  const u8arr = new Uint8Array(n)
  while (n--)
    u8arr[n] = blobStr.charCodeAt(n)
  return new Blob([u8arr], { type: mime })
}

/**
 * blob转base64
 * @param blob blob
 * @returns {Promise<string | ArrayBuffer>}
 */
function blobToBase64(blob: Blob): Promise<string | ArrayBuffer> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve(e?.target?.result || '')
    }
    reader.readAsDataURL(blob)
  })
}

/**
 * 构建文件路径
 * @param path 路径
 * @param prefix 路径前缀
 */
function buildPath(path: string, prefix: string) {
  const { baseUrl } = getProjectConfig()
  // http开头或者前缀开头，不做处理
  if (path.startsWith('http://') || path.startsWith('https://') || (baseUrl && path.indexOf(baseUrl) === 0))
    return path
  if (path.indexOf(prefix) === 0)
    return `${baseUrl}${path.replace(/\\/g, '/')}`
  return `${baseUrl}${prefix}${path.replace(/\\/g, '/')}`
}

/**
 * 获得上传文件路径
 * @param path 文件路径
 * @param suffix 文件后缀
 */
export function getUploadPath(path?: string, suffix?: string) {
  return !path ? '' : buildPath(path, FILE_CONFIG.uploadPrefix) + (suffix || '')
}

/**
 * 获得临时文件路径
 * @param path 文件路径
 * @param suffix 文件后缀
 */
export function getTempPath(path?: string, suffix?: string) {
  return !path ? '' : buildPath(path, FILE_CONFIG.tempPrefix) + (suffix || '')
}

/**
 * 获得备份文件路径
 * @param path 文件路径
 * @param suffix 文件后缀
 */
export function getBackupPath(path?: string, suffix?: string) {
  return !path ? '' : buildPath(path, FILE_CONFIG.backupPrefix) + (suffix || '')
}

/**
 * 下载文件
 * @param path
 * @param fileName
 */
export function downloadFile(path: string, fileName: string): void {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.target = '_blank'
  link.href = buildPath(path, '')
  if (fileName != null)
    link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
}

/**
 * 下载上传文件
 * @param file 文件对象
 */
export function downloadUploadFile(file: { uploadPath: string; oldFileName: string }) {
  const downPath = getUploadPath(file.uploadPath)
  downloadFile(downPath, file.oldFileName || '文件')
}

/**
 * 下载临时文件
 * @param path 文件路径
 * @param fileName 新文件文件名
 */
export function downloadTempFile(path: string, fileName: string) {
  downloadFile(getTempPath(path), fileName)
}

/**
 * 下载备份文件
 * @param path 文件路径
 * @param fileName 新文件文件名
 */
export function downloadBackupFile(path: string, fileName: string) {
  downloadFile(getBackupPath(path), fileName)
}

export {
  base64toBlob as fileBase64toBlob,
  blobToBase64 as fileBlobToBase64,
}

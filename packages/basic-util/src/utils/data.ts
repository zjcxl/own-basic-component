'use strict'

import { nanoid } from 'nanoid'
import Clipboard from 'clipboard'

/**
 * 生成uuid
 * @returns {string}
 */
const uuid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
    .replace('-', '')
}

type _typeObj = Record<string, any>

/**
 * 深拷贝
 * @param _object 如果不传返回为空对象 必须是js的{}对象
 * @param _obj 可选 返回传入的@param _object 必须是js的{}对象,
 */
const deepCopy = (_object: _typeObj, _obj: _typeObj = {}): _typeObj => {
  if (!(Object.prototype === Object.getPrototypeOf(_object)))
    return new Error('传入参数***_object***类型错误')
  for (const key in _object) {
    if (Object.prototype === Object.getPrototypeOf(_object[key]))
      _obj[key] = deepCopy(_object[key])
    else
      _obj[key] = _object[key]
  }
  return _obj
}

/**
 * 格式化html文本
 * @param html html文本
 * @returns {string}
 */
const formatTextFromHtml = (html: string): string => {
  return html.replace(/<.+?>/g, '').replace(/&nbsp;/ig, '').replace(/\s/ig, '').replace(/\n/g, '')
}

/**
 * 格式化文件大小样式
 * @param size 文件大小
 * @returns {string}
 */
const formatMemorySize = (size: number): string => {
  if (size < 1024)
    return `${size}B`
  else if (size / 1024 < 1024)
    return `${Math.round((size / 1024) * 100) / 100.0}KB`
  else if (size / 1024 / 1024 < 1024)
    return `${Math.round((size / 1024 / 1024) * 100) / 100.0}MB`
  else if (size / 1024 / 1024 / 1024 < 1024 * 100)
    return `${Math.round((size / 1024 / 1024 / 1024) * 100) / 100.0}GB`
  else
    return `${Math.round((size / 1024 / 1024 / 1024 / 1024) * 100) / 100.0}TB`
}

/**
 * 半角转全角
 * @param content
 * @returns {string}
 */
const toDBC = (content: string): string => {
  let temp = ''
  for (let i = 0; i < content.length; i++) {
    if (content.charCodeAt(i) === 32)
      temp += String.fromCharCode(12288)
    if (content.charCodeAt(i) < 127)
      temp += String.fromCharCode(content.charCodeAt(i) + 65248)
  }
  return temp
}

/**
 * 全角转半角
 * @param content
 * @returns {string}
 */
const toCDB = (content: string): string => {
  let temp = ''
  for (let i = 0; i < content.length; i++) {
    if (content.charCodeAt(i) === 12288) {
      temp += String.fromCharCode(content.charCodeAt(i) - 12256)
      continue
    }
    if (content.charCodeAt(i) > 65280 && content.charCodeAt(i) < 65375)
      temp += String.fromCharCode(content.charCodeAt(i) - 65248)
    else
      temp += String.fromCharCode(content.charCodeAt(i))
  }
  return temp
}

/**
 * 复制到剪贴板
 * @param text
 */
const copyText = (text: any) => {
  const element = document.createElement('button')
  const clipboard = new Clipboard(element, {
    text: () => String(text).valueOf() as string,
    action() { return 'copy' },
    container: document.body,
  })
  clipboard.on('success', () => {
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboard.destroy()
  })
  // 追加元素
  document.body.appendChild(element)
  // 模拟点击
  element.click()
  // 删除元素
  document.body.removeChild(element)
}

export {
  uuid as UUID,
  nanoid as NANOID,
  deepCopy as dataDeepCopy,
  formatTextFromHtml,
  formatMemorySize,
  toDBC as Text2DBC,
  toCDB as Text2CDB,
  copyText,
}

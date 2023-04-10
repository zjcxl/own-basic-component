'use strict'

export interface SearchProps {
  /**
   * 占位大小
   */
  span?: number
  /**
   * 标题字段
   */
  title?: string
  /**
   * 字段名称
   */
  field: string
  /**
   * 占位符
   */
  placeholder?: string
}

/**
 * 搜索的额外参数
 */
export interface SearchExtra {
  /**
   * 搜索的文本
   */
  searchButtonText?: string
}

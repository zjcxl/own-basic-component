'use strict'

/**
 * 计算分页的大小信息
 * @param rows 每页的大小
 * @param max 最大的大小
 */
export const calcPageSizes = (rows: number, max = 100) => {
  // 验证数据
  rows = Math.max(rows, 1)
  // 计算
  return [...new Set([
    Math.ceil(rows / 2),
    rows,
    Math.ceil(rows * 1.5),
    Math.ceil(rows * 2),
    Math.ceil(rows * 3),
    Math.ceil(rows * 5),
    Math.ceil(rows * 10),
  ])]
    .filter(item => item > 0)
    .filter(item => item <= max)
    .sort((a, b) => a - b)
}

export interface PageModel<T> {
  // 列表数据
  list: Array<T>
  // 页码
  page: number
  // 行数
  rows: number
  // 总行数
  total: number
  // 是否已经到最后
  isLastPage: boolean
}

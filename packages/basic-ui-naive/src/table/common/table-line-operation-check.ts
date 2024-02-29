import type { DataTableColumn } from 'naive-ui'
import { NButton } from 'naive-ui'
import { h } from 'vue'
import { sendAe } from '@own-basic-component/buried'
import type { OperationExtra, OperationProps } from './operation-props'

const FIELD_OPERATION = 'operation'
// 单个字符的长度是14
const CHAR_LENGTH = 14
// 最小的宽度为60
const MIN_WIDTH_LENGTH = 61
// 两边外侧的空白大小
const LEFT_BLANK_LENGTH = 17
const RIGHT_BLANK_LENGTH = 16
// 更多按钮的长度
const MORE_BUTTON_LENGTH = RIGHT_BLANK_LENGTH + CHAR_LENGTH * 3

// 计算是否需要操作栏等信息
export function getOperationColumns<T>(operations: OperationProps<T>[], extra: OperationExtra, key = FIELD_OPERATION): DataTableColumn<T> | undefined {
  extra = extra || {}
  // 单个字符的长度是14，最小的宽度为60，每个留余为16
  // 计算宽度（如果只有4个或以下直接计算，如果大于4个只计算前三项）
  if (!operations || operations.length === 0)
    return undefined

  const maxCount = Math.max(extra.max ? extra.max : 4, 2)
  // 如果大于最大的个数，会筛选出长度最长的三个进行计算
  let width: number
  if (operations.length <= maxCount) {
    width = operations.map(item => item.title.length).reduce((total, value) => total + value * CHAR_LENGTH + RIGHT_BLANK_LENGTH, 0)
  }
  else {
    width
      = operations
        .map(item => item.title.length)
        .sort((x1, x2) => x2 - x1)
        .slice(0, maxCount - 1)
        .reduce((total, value) => total + value * CHAR_LENGTH + RIGHT_BLANK_LENGTH, 0) + MORE_BUTTON_LENGTH
  }
  const finalWidth = extra.width || Math.max(width + LEFT_BLANK_LENGTH, MIN_WIDTH_LENGTH * 2)
  return <DataTableColumn<T>>{
    title: '操作',
    key,
    dataIndex: key,
    width: finalWidth,
    maxWidth: finalWidth,
    minWidth: finalWidth,
    align: 'center',
    fixed: extra.fixed || '',
    // 保存所有的render信息
    render(row) {
      return h('div', {
        style: 'display: flex;flex-flow: wrap;justify-content: space-around;align-items: center;',
      }, {
        default: () => operations.map((item) => {
          const title = item.titleRender ? item.titleRender(row) : item.title
          return h(NButton, {
            text: true,
            tag: 'a',
            type: 'primary',
            onClick: () => {
              sendAe({
                actionName: title,
                actionType: 'click',
              })
              item.action?.(row)
            },
          }, {
            default: () => title,
          })
        }),
      })
    },
  }
}

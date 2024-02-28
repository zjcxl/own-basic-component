import type { DateRangeShortcutsType } from './types'

/**
 * 今天的时间范围
 */
export function today(): DateRangeShortcutsType {
  const now = new Date()
  const nowTimestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  return {
    [`今天`]: [nowTimestamp, nowTimestamp + 24 * 60 * 60 * 1000],
  }
}

/**
 * 昨天
 */
export function yesterday(): DateRangeShortcutsType {
  const now = new Date()
  const nowTimestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  return {
    [`昨天`]: [nowTimestamp - 24 * 60 * 60 * 1000, nowTimestamp],
  }
}

/**
 * 近n天
 * @param n
 * @param text
 */
export function lastNDays(n: number, text: string = `近${n}天`): DateRangeShortcutsType {
  const now = new Date()
  const nowTimestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  return {
    [text]: [nowTimestamp - n * 24 * 60 * 60 * 1000, nowTimestamp],
  }
}

/**
 * 近7天
 */
export function last7Days(): DateRangeShortcutsType {
  return lastNDays(7)
}

/**
 * 近15天
 */
export function last15Days(): DateRangeShortcutsType {
  return lastNDays(15)
}

/**
 * 本月
 */
export function thisMonth(): DateRangeShortcutsType {
  const now = new Date()
  const firstTimestamp = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
  const lastTimestamp = new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime()
  return {
    [`本月`]: [firstTimestamp, lastTimestamp],
  }
}

/**
 * 上月
 */
export function prevMonth(): DateRangeShortcutsType {
  const now = new Date()
  const firstTimestamp = new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime()
  const lastTimestamp = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
  return {
    [`上月`]: [firstTimestamp, lastTimestamp],
  }
}

/**
 * 本年
 */
export function thisYear(): DateRangeShortcutsType {
  const now = new Date()
  const firstTimestamp = new Date(now.getFullYear(), 1, 1).getTime()
  const lastTimestamp = new Date(now.getFullYear() + 1, 1, 1).getTime()
  return {
    [`本年`]: [firstTimestamp, lastTimestamp],
  }
}

/**
 * 去年
 */
export function prevYear(): DateRangeShortcutsType {
  const now = new Date()
  const firstTimestamp = new Date(now.getFullYear() - 1, 1, 1).getTime()
  const lastTimestamp = new Date(now.getFullYear(), 1, 1).getTime()
  return {
    [`去年`]: [firstTimestamp, lastTimestamp],
  }
}

/**
 * 默认的快捷操作
 */
export const DEFAULT_SHORTCUTS = {
  ...today(),
  ...yesterday(),
  ...last7Days(),
  ...last15Days(),
  ...thisMonth(),
  ...prevMonth(),
  ...thisYear(),
  ...prevYear(),
}

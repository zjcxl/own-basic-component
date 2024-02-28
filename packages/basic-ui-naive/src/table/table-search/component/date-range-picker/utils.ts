import type { DateRangeShortcutsType } from './types'

/**
 * 今天的时间范围
 */
export function todayDate(): DateRangeShortcutsType {
  const now = new Date()
  const nowTimestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  return {
    [`今天`]: [nowTimestamp, nowTimestamp + 24 * 60 * 60 * 1000],
  }
}

/**
 * 昨天
 */
export function yesterdayDate(): DateRangeShortcutsType {
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
export function lastNDaysDate(n: number, text: string = `近${n}天`): DateRangeShortcutsType {
  const nowTimestamp = new Date().getTime()
  return {
    [text]: [nowTimestamp - n * 24 * 60 * 60 * 1000, nowTimestamp],
  }
}

/**
 * 近7天
 */
export function last7DaysDate(): DateRangeShortcutsType {
  return lastNDaysDate(7)
}

/**
 * 近15天
 */
export function last15DaysDate(): DateRangeShortcutsType {
  return lastNDaysDate(15)
}

/**
 * 本月
 */
export function thisMonthDate(): DateRangeShortcutsType {
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
export function prevMonthDate(): DateRangeShortcutsType {
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
export function thisYearDate(): DateRangeShortcutsType {
  const now = new Date()
  const firstTimestamp = new Date(now.getFullYear(), 0, 1).getTime()
  const lastTimestamp = new Date(now.getFullYear() + 1, 0, 1).getTime()
  return {
    [`本年`]: [firstTimestamp, lastTimestamp],
  }
}

/**
 * 去年
 */
export function prevYearDate(): DateRangeShortcutsType {
  const now = new Date()
  const firstTimestamp = new Date(now.getFullYear() - 1, 0, 1).getTime()
  const lastTimestamp = new Date(now.getFullYear(), 0, 1).getTime()
  return {
    [`去年`]: [firstTimestamp, lastTimestamp],
  }
}

/**
 * 默认的快捷操作
 */
export const DEFAULT_DATE_SHORTCUTS = {
  ...todayDate(),
  ...yesterdayDate(),
  ...last7DaysDate(),
  ...last15DaysDate(),
  ...thisMonthDate(),
  ...prevMonthDate(),
  ...thisYearDate(),
  ...prevYearDate(),
}

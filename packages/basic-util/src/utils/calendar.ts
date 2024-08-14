// export interface CalendarDate {
//   /**
//    * 日期
//    */
//   date: Date
//   /**
//    * 是否是今天
//    */
//   isToday: boolean
//   /**
//    * 是否是当前月
//    */
//   isCurrentMonth: boolean
//   /**
//    * 是否是当前星期，会根据每周的起始日进行判断
//    */
//   isCurrentWeek: boolean
// }
//
// const ONE_DAY = 24 * 60 * 60 * 1000
//
// /**
//  * 获取某年某月包含42个日期的数组，开始日期根据指定的星期开始
//  * @param {number} year - 年份
//  * @param {number} month - 月份（1-12）
//  * @param {number} startOfWeek - 以哪一天为周开始（0-6，0表示周日）
//  * @returns {CalendarDate[]} - 包含42个日期的数组
//  */
// export function getMonthCalendar(
//   year: number,
//   month: number,
//   startOfWeek: number,
// ): CalendarDate[] {
//   // 获取今日的日期
//   const now = new Date()
//   // 创建当前月份的第一天
//   const date = new Date(year, month - 1, 1)
//   // 获取日期的星期
//   const firstDayOfWeek = date.getDay()
//   // 计算需要回溯到上个月的天数
//   const lastMonthDays = (firstDayOfWeek - startOfWeek + 7) % 7
//   // 回溯到上个月的日期
//   const first = new Date(date.getTime() - ONE_DAY * lastMonthDays)
//   // 创建一个数组来存储日期
//   const dateArray: CalendarDate[] = [{
//     date: first,
//     isToday: false,
//     isCurrentMonth: false,
//     isCurrentWeek: false,
//   }]
//   // 获取42个日期
//   for (let i = 0; i < 42; i++) {
//     dates.push(new Date(date))
//     date.setDate(date.getDate() + 1)
//   }
//   // 返回日期数组
//   return dates
//
//   return []
// }

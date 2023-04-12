'use strict'

import { browserIsSafari, browserIsTrident } from './browser'

/**
 * 格式化时长（ms）
 * @param value 时长
 * @param format 格式化的格式
 * @returns {TimestampModel}
 */
function formatByTimestamp(value = 0, format = 'hh:mm:ss.SSS') {
  return new TimestampModel(value, format)
}

/**
 * 格式化时长（s）
 * @param value 时长
 * @param format 格式化的格式
 * @returns {TimeModel}
 */
function formatByTime(value = 0, format = 'hh:mm:ss.SSS') {
  return new TimeModel(value, format)
}

/**
 * 格式化日期
 * @param value 日期或时间戳
 * @param format 格式化的格式
 * @returns {DateModel}
 */
function formatByDate(value = new Date(), format = 'yyyy-MM-dd HH:mm.ss.SSS') {
  return new DateModel(value, format)
}

/**
 * 格式化日期
 * @param date
 * @param format 格式化的格式
 * @returns {DateModel}
 */
function formatByString(date: string, format = 'yyyy-MM-dd HH:mm.ss.SSS') {
  const replaceDate = date.replace(/T/, ' ').replace(/-/g, '/')
  const value = new Date(replaceDate)
  return formatByDate(value, format)
}

/**
 * 本地日期格式化
 * @param dateTime
 * @param needSlash 是否需要斜杠
 * @param length
 */
function formatDateTimeWithSub(dateTime: string | undefined, length: number, needSlash?: boolean): string {
  if (!dateTime)
    return ''

  dateTime = dateTime.replace('T', ' ')
  if (dateTime.length > length) {
    const date = dateTime.substring(0, length)
    return needSlash ? date.replace(/-/g, '/') : date
  }
  else {
    return dateTime
  }
}

/**
 * 本地日期格式化
 * @param dateTime
 * @param needSlash 是否需要斜杠
 */
function formatSubDate(dateTime: string | undefined, needSlash?: boolean): string {
  return formatDateTimeWithSub(dateTime, 10, needSlash)
}

/**
 * 本地日期格式化
 * @param dateTime
 * @param needSlash 是否需要斜杠
 */
function formatSubDateTime(dateTime: string | undefined, needSlash?: boolean): string {
  return formatDateTimeWithSub(dateTime, 16, needSlash)
}

/**
 * 格式化数字
 * @param number 数字
 * @param length 格式化后的长度
 * @returns {string} 字符串
 */
function text(number = 0, length = 2) {
  return (`${number}`).padStart(length, '0')
}

/**
 * 时间戳对象
 */
class TimestampModel {
  private _text: string
  private _day: number
  private _hour: number
  private _minute: number
  private _second: number
  private _sss: number

  constructor(value = 0, format = 'hh:mm:ss.SSS') {
    this._text = ''
    this._day = 0
    this._hour = 0
    this._minute = 0
    this._second = 0
    this._sss = 0
    this._renderValue(value)
    this._format(format)
  }

  _renderValue(value = 0) {
    this._sss = value % 1000
    value = Number(Math.floor(value / 1000).toFixed(0))
    this._second = value % 60
    value = Number(Math.floor(value / 60).toFixed(0))
    this._minute = value % 60
    value = Number(Math.floor(value / 60).toFixed(0))
    this._hour = value % 24
    value = Number(Math.floor(value / 24).toFixed(0))
    this._day = value
  }

  _format(format = 'hh:mm:ss.SSS') {
    let tempText = this._day === 0 ? format.replace(/d+:?/gi, '') : format
    tempText = this._hour === 0 ? tempText.replace(/h+:?/gi, '') : tempText
    tempText = tempText.replace(/d+/gi, this._day.toString())
    tempText = tempText.replace(/h+/gi, /d/.test(format) ? text(this._hour) : text((this._day || 0) * 24 + this._hour))
    tempText = tempText.replace(/m+/gi, /h/.test(format) ? text(this._minute) : text((this._hour || 0) * 60 + this._minute))
    tempText = tempText.replace(/s+/g, text(this._second))
    tempText = tempText.replace(/S+/g, text(this._sss, 3))
    this._text = tempText
  }

  get sss(): number {
    return this._sss
  }

  get second(): number {
    return this._second
  }

  get minute(): number {
    return this._minute
  }

  get hour(): number {
    return this._hour
  }

  get day(): number {
    return this._day
  }

  get text(): string {
    return this._text
  }
}

/**
 * 时间对象
 */
class TimeModel {
  public readonly text: string
  public readonly day: number
  public readonly hour: number
  public readonly minute: number
  public readonly second: number

  constructor(value = 0, format = 'hh:mm:ss') {
    const model = new TimestampModel(value * 1000, format)
    this.text = model.text
    this.day = model.day
    this.hour = model.hour
    this.minute = model.minute
    this.second = model.second
  }
}

/**
 * 日期对象
 */
class DateModel {
  private _text: string
  private _year: number
  private _month: number
  private _day: number
  private _hour: number
  private _minute: number
  private _second: number
  private _sss: number
  private _week: number
  private _date: Date
  private _timestamp: number

  constructor(value = new Date(), format = 'yyyy-MM-dd HH:mm.ss.SSS') {
    this._year = 0
    this._month = 0
    this._day = 0
    this._hour = 0
    this._minute = 0
    this._second = 0
    this._sss = 0
    this._week = 0
    this._date = new Date()
    this._timestamp = this._date.getTime()
    this._text = ''
    this._renderValue(value)
    this._format(format)
  }

  _renderValue(value: Date | string = new Date()) {
    value = (typeof value === 'string' && (browserIsSafari() || browserIsTrident())) ? value.replace(/-/g, '/') : value
    this._date = value instanceof Date ? value : new Date(value)
    this._year = this._date.getFullYear()
    this._month = this._date.getMonth() + 1
    this._day = this._date.getDate()
    this._hour = this._date.getHours()
    this._minute = this._date.getMinutes()
    this._second = this._date.getSeconds()
    this._sss = this._date.getMilliseconds()
    this._week = this._date.getDay()
    this._timestamp = this._date.getTime()
  }

  _format(format = 'yyyy-MM-dd HH:mm.ss.SSS') {
    this._text = format
      .replace(/y+/gi, text(this._year))
      .replace(/M+/g, text(this._month))
      .replace(/d+/gi, text(this._day))
      .replace(/H+/g, text(this._hour))
      .replace(/h+/g, text(this._hour >= 12 ? this._hour - 12 : this._hour))
      .replace(/m+/g, text(this._minute))
      .replace(/s+/g, text(this._second))
      .replace(/S+/g, text(this._sss, 3))
      .replace(/e+/gi, text(this._week))
  }

  get timestamp(): number {
    return this._timestamp
  }

  get date(): Date {
    return this._date
  }

  get week(): number {
    return this._week
  }

  get sss(): number {
    return this._sss
  }

  get second(): number {
    return this._second
  }

  get minute(): number {
    return this._minute
  }

  get hour(): number {
    return this._hour
  }

  get day(): number {
    return this._day
  }

  get month(): number {
    return this._month
  }

  get year(): number {
    return this._year
  }

  get text(): string {
    return this._text
  }
}

interface TimeCountType {
  o?: number | null
  time?: number
  isStart?: boolean
  isFinish?: boolean
  isInProgress?: boolean
  isCountdown?: boolean
  step?: number
  finishMethod?: () => void
}

const TIME_COUNT_DEFAULT_VALUE: TimeCountType = {
  o: null,
  time: 0,
  isStart: false,
  isFinish: false,
  isInProgress: false,
  isCountdown: false,
  step: 1,
}

/**
 * 计时工具
 */
class TimeCountModel implements TimeCountType {
  o?: number | null
  time: number
  isStart?: boolean
  isFinish?: boolean
  isInProgress?: boolean
  isCountdown?: boolean
  step?: number

  finishMethod?: () => void

  constructor(value: TimeCountType) {
    this.isCountdown = value.isCountdown || TIME_COUNT_DEFAULT_VALUE.isCountdown
    this.isFinish = value.isFinish || TIME_COUNT_DEFAULT_VALUE.isFinish
    this.isInProgress = value.isInProgress || TIME_COUNT_DEFAULT_VALUE.isInProgress
    this.isStart = value.isStart || TIME_COUNT_DEFAULT_VALUE.isStart
    this.o = value.o || TIME_COUNT_DEFAULT_VALUE.o
    this.step = value.step || TIME_COUNT_DEFAULT_VALUE.step
    this.time = value.time || TIME_COUNT_DEFAULT_VALUE.time || 0
    this.finishMethod = value.finishMethod || TIME_COUNT_DEFAULT_VALUE.finishMethod
    this.init()
  }

  // 初始化
  init() {
    // 如果是倒计时。将默认事件设置为60
    this.time = this.isCountdown ? (this.time > 0 ? this.time : 60) : this.time
  }

  // 开始计时
  start() {
    if (!this.isStart || !this.isInProgress) {
      this.o = window.setInterval(() => {
        if (this.isCountdown) {
          this.time--
          // 如果倒计时等于0则自动停止
          if (this.time < 0) {
            this.finish()
            this.time = 0
          }
        }
        else {
          this.time++
        }
      }, 1000)
      this.isStart = true
      this.isInProgress = true
      this.isFinish = false
    }
    else {
      throw new Error('计时已经开始，请先结束计时')
    }
    return this
  }

  // 结束计时
  finish() {
    if (this.o && this.isStart && this.isInProgress && !this.isFinish) {
      clearInterval(this.o)
      this.isStart = true
      this.isFinish = true
      this.isInProgress = false
      if (this.finishMethod)
        this.finishMethod()
    }
    else {
      throw new Error('计时结束错误')
    }
    return this
  }
}

export {
  formatByTimestamp,
  formatByTime,
  formatByDate,
  formatByString,
  formatDateTimeWithSub,
  formatSubDate,
  formatSubDateTime,
  TimestampModel,
  TimeModel,
  DateModel,
  TimeCountType,
  TimeCountModel,
}

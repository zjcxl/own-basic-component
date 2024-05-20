import type { BaseTaskRunner, BaseTaskRunnerOptions } from './types'

/**
 * 任务执行器选项
 */
export interface TaskRunnerItemOptions extends BaseTaskRunnerOptions {

  /**
   * 并发数量
   */
  concurrency?: number

}

/**
 * 任务执行器
 */
export interface TaskRunnerItem<T> extends BaseTaskRunner<T> {
/**
 * 开始
 */
  start: () => void
  /**
   * 停止
   */
  stop: () => void
}

/**
 * 任务执行器
 * @param func
 * @param options
 */
export function useTaskRunnerItem<T>(func: (item: T) => Promise<void>, options: TaskRunnerItemOptions): TaskRunnerItem<T> {
  /**
   * 并发数量
   */
  const concurrency = options.concurrency || 1
  /**
   * 是否自动开始
   */
  const autoStart = options.auto ?? true

  /**
   * 是否停止
   */
  let isStop: boolean = false

  /**
   * 待执行的任务列表
   */
  const waitingArray: T[] = []
  /**
   * 当前执行的任务列表
   */
  const executingArray: Promise<void>[] = []

  /**
   * 执行任务的方法
   */
  const run = async (): Promise<void> => {
    if (isStop)
      return
    // 如果当前执行的任务数量超过并发限制，则等待任意一个任务完成
    while (waitingArray.length > 0) {
      if (isStop)
        return
      if (executingArray.length >= concurrency)
        await Promise.race(executingArray)
      // 如果剩余的任务数量大于0，则执行下一个任务
      if (waitingArray.length > 0) {
        // 获取剩余未执行的任务中的第一个
        const item = waitingArray.shift()!
        const p = func(item).then(() => {
          // 从正在执行的任务列表中移除已完成的任务
          executingArray.splice(executingArray.indexOf(p), 1)
        })
        executingArray.push(p)
      }
    }
    // 等待所有剩余任务完成
    await Promise.all(executingArray)
  }

  return {
    start: () => {
      isStop = false
      run().then(() => {})
    },
    stop: () => {
      isStop = true
    },
    append: (...tasks: T[]) => {
      waitingArray.push(...tasks)
      // 如果设置了自动开始，则立即开始执行任务
      if (autoStart)
        run().then(() => {})
    },
  }
}

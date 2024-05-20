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
  const auto = options.auto ?? true
  /**
   * 正在执行的数量
   */
  let executingCount = 0

  /**
   * 是否停止
   */
  let isStop: boolean = false

  /**
   * 待执行的任务列表
   */
  const waitingArray: T[] = []

  /**
   * 执行任务的方法
   */
  const run = async (): Promise<void> => {
    if (isStop)
      return Promise.resolve()
    // 如果没有任务则不执行
    if (waitingArray.length === 0)
      return Promise.resolve()
    // 如果当前执行的任务数量大于并发数量则不执行
    if (executingCount >= concurrency)
      return Promise.resolve()
    // 获取等待列表中的第一个任务
    const item = waitingArray.shift()
    if (!item)
      return Promise.resolve()
    // 将执行的任务数量加一
    executingCount++
    // 执行任务
    func(item).finally(() => {
      // 将执行的任务数量减一
      executingCount--
      // 递归执行任务
      run()
    })
    // 递归执行任务（并发执行）
    return run()
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
      if (auto)
        run().then(() => {})
    },
  }
}

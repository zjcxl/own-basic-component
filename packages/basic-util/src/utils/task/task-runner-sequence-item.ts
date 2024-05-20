import type { BaseTaskRunner, BaseTaskRunnerOptions } from './types'

/**
 * 任务执行器
 */
export interface TaskRunnerSequenceItem<T> extends BaseTaskRunner<T> {

  /**
   * 是否有下一个
   */
  hasNext: () => boolean

  /**
   * 执行
   */
  run: () => Promise<void>

}

/**
 * 任务执行器
 * @param func
 * @param options
 */
export function useTaskRunnerSequenceItem<T>(
  func: (item: T) => Promise<void>,
  options?: BaseTaskRunnerOptions,
): TaskRunnerSequenceItem<T> {
  /**
   * 是否自动开始
   */
  const auto = options?.auto ?? true
  /**
   * 待执行的任务列表
   */
  const waitingArray: T[] = []
  let isRunning = false

  const run = async (): Promise<void> => {
    if (isRunning)
      return Promise.resolve()

    if (waitingArray.length > 0) {
      await func(waitingArray.shift()!)
      isRunning = false
    }
    return Promise.resolve()
  }

  return {
    hasNext: (): boolean => waitingArray.length > 0,
    run,
    append: (...tasks: T[]) => {
      waitingArray.push(...tasks)
      if (auto)
        run().then(() => {})
    },
  }
}

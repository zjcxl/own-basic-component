import type { BaseTaskRunner } from './types'

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
 */
export function useTaskRunnerSequenceItem<T>(func: (item: T) => Promise<void>): TaskRunnerSequenceItem<T> {
  /**
   * 待执行的任务列表
   */
  const waitingArray: T[] = []

  return {
    hasNext: (): boolean => waitingArray.length > 0,
    run: async (): Promise<void> => {
      if (waitingArray.length > 0)
        await func(waitingArray.shift()!)
      return Promise.resolve()
    },
    append: (...tasks: T[]) => {
      waitingArray.push(...tasks)
    },
  }
}

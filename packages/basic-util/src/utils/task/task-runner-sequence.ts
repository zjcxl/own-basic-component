import type { BaseTaskRunner, TaskType } from './types'

/**
 * 任务执行器
 */
export interface TaskRunnerSequence extends BaseTaskRunner {

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
 */
export function useTaskRunnerSequence(): TaskRunnerSequence {
  /**
   * 待执行的任务列表
   */
  const waitingArray: TaskType[] = []

  return {
    hasNext: (): boolean => waitingArray.length > 0,
    run: async (): Promise<void> => {
      if (waitingArray.length > 0)
        await waitingArray.shift()!()
      return Promise.resolve()
    },
    append: (...tasks: TaskType[]) => {
      waitingArray.push(...tasks)
    },
  }
}

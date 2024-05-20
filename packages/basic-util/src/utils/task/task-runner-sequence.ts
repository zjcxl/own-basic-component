import type { TaskType } from './types'
import type { TaskRunnerSequenceItem } from './task-runner-sequence-item'
import { useTaskRunnerSequenceItem } from './task-runner-sequence-item'

/**
 * 任务执行器
 */
export interface TaskRunnerSequence extends TaskRunnerSequenceItem<TaskType> {}

/**
 * 任务执行器
 */
export function useTaskRunnerSequence(): TaskRunnerSequence {
  return useTaskRunnerSequenceItem((item) => {
    return item()
  })
}

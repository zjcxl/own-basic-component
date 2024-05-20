import type { BaseTaskRunnerOptions, TaskType } from './types'
import type { TaskRunnerSequenceItem } from './task-runner-sequence-item'
import { useTaskRunnerSequenceItem } from './task-runner-sequence-item'

/**
 * 任务执行器
 */
export interface TaskRunnerSequence extends TaskRunnerSequenceItem<TaskType> {}

/**
 * 任务执行器
 * @param options
 */
export function useTaskRunnerSequence(
  options?: BaseTaskRunnerOptions,
): TaskRunnerSequence {
  return useTaskRunnerSequenceItem(item => item(), options)
}

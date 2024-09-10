import { useTaskRunnerSequenceItem } from './task-runner-sequence-item'
import type { TaskRunnerSequenceItem } from './task-runner-sequence-item'
import type { BaseTaskRunnerOptions, TaskType } from './types'

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

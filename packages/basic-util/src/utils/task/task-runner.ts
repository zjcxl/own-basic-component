import type { TaskType } from './types'
import type { TaskRunnerItem, TaskRunnerItemOptions } from './task-runner-item'
import { useTaskRunnerItem } from './task-runner-item'

/**
 * 任务执行器选项
 */
export interface TaskRunnerOptions extends TaskRunnerItemOptions {}

/**
 * 任务执行器
 */
export interface TaskRunner extends TaskRunnerItem<TaskType> {}

/**
 * 任务执行器
 * @param options
 */
export function useTaskRunner(options: TaskRunnerOptions): TaskRunner {
  return useTaskRunnerItem(item => item(), options)
}

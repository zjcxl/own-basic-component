/**
 * 任务类型
 */
export type TaskType = () => Promise<void>

/**
 * 基础任务执行器选项
 */
export interface BaseTaskRunnerOptions {

  /**
   * 是否自动开始
   */
  auto?: boolean

}

/**
 * 任务执行器
 */
export interface BaseTaskRunner {
  /**
   * 添加任务
   * @param tasks 任务列表
   */
  append: (...tasks: TaskType[]) => void
}

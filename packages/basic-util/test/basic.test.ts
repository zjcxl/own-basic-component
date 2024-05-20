import { describe } from 'vitest'
import { useTaskRunner } from '@own-basic-component/util'

/**
 * 延时函数
 * @param ms
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

describe('task-runner', () => {
  const task = async () => {
    await delay(1000)
    // eslint-disable-next-line no-console
    console.log('task')
  }

  const runner = useTaskRunner({
    concurrency: 1,
  })
  runner.append(task)
})

import { useTaskRunner } from '@own-basic-component/util'
import { beforeEach, describe, expect, it, vi } from 'vitest'

/**
 * 延时函数
 * @param ms
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

describe('task-runner', async () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  const task = async () => {
    await delay(1000)
    // eslint-disable-next-line no-console
    console.log('task')
  }

  it('1', () => {
    const runner = useTaskRunner({
      concurrency: 1,
    })
    runner.append(task)
    expect('')
  })
})

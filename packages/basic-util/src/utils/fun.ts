/**
 * 异步函数参数
 */
type TypePromiseParam<P extends any[]> = P
/**
 * 异步函数
 */
type TypePromiseFunction<T, P extends any[]> = (...args: TypePromiseParam<P>) => Promise<T>

/**
 * 异步函数在执行期间内只执行一次
 */
export function asyncOnce<T, P extends any[]>(fun: TypePromiseFunction<T, P>): TypePromiseFunction<T, P> {
  const cache: Record<string, {
    resolve: Array<(value: T | PromiseLike<T>) => void>
    reject: Array<(reason?: any) => void>
    isPending: boolean
  }> = {}
  return (...args: TypePromiseParam<P>) => new Promise<T>((resolve, reject) => {
    const key = JSON.stringify(args)
    if (!cache[key]) {
      cache[key] = {
        resolve: [],
        reject: [],
        isPending: false,
      }
    }
    const state = cache[key]!
    state.resolve.push(resolve)
    state.reject.push(reject)
    if (state.isPending) {
      return
    }
    state.isPending = true
    fun(...args)
      .then((value) => {
        state.resolve.forEach(fun => fun(value))
      })
      .catch((reason) => {
        state.reject.forEach(fun => fun(reason))
      })
      .finally(() => {
        delete cache[key]
      })
  })
}

type TypeEvent = (...args: any[]) => void

class EventEmits {
  /**
   * 事件集合
   */
  events: Record<string, Set<TypeEvent>> = {}

  on(eventName: string, fun: TypeEvent) {
    ;(this.events[eventName] ??= new Set<TypeEvent>()).add(fun)
  }

  emit(eventName: string, ...args: any[]) {
    this.events[eventName]?.forEach(fun => fun(...args))
  }

  off(eventName: string, fun: TypeEvent) {
    this.events[eventName]?.delete(fun)
    if (this.events[eventName]?.size === 0) {
      delete this.events[eventName]
    }
  }

  once(eventName: string, fun: TypeEvent) {
    const _fun = (...args: any[]) => {
      fun(...args)
      this.off(eventName, _fun)
    }
    this.on(eventName, _fun)
  }
}

export const EVENT_EMITS_UTIL = new EventEmits()

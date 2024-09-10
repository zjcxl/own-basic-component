import { sendAe } from '@own-basic-component/buried'
import type { App, DirectiveBinding } from 'vue'

/**
 * 发送按钮点击事件的方法
 * @param name 按钮名称
 * @param type 事件类型
 */
function sendFunction(name: string, type: string) {
  sendAe({
    actionName: name,
    actionType: type,
  })
}

/**
 * 自定义按钮埋点指令
 */
function buriedDirective() {
  return {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      const name = binding.value || el.textContent || ''
      const type = binding.arg || 'click'
      if (name) {
        // 如果是浏览类型，直接保存,目前只考虑点击类型
        el.addEventListener(
          'click',
          () => sendFunction(name, type),
          false,
        )
      }
    },
    unmounted(el: HTMLElement, binding: DirectiveBinding) {
      const name = binding.value || el.textContent || ''
      const type = binding.arg || 'click'
      if (name)
        el.removeEventListener('click', () => sendFunction(name, type), false)
    },
  }
}

// 以插件形式注册
export default {
  install: (app: App) => {
    app.directive('buried', buriedDirective())
  },
}

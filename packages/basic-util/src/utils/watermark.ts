const id = '1.23452384164.123412415'

/**
 * 设置水印信息
 * @param title
 * @param subTitle
 */
function setWatermark(title: string, subTitle?: string) {
  // 获取页面上的水印元素
  const element = document.getElementById(id)
  // 如果已经存在水印元素，则删除
  if (element !== null)
    document.body.removeChild(element)
  // 获取画布
  const canvas = document.createElement('canvas')
  canvas.width = 280
  canvas.height = 160
  // 获取画布上下文
  const context = canvas.getContext('2d')!
  context.rotate(-20 * Math.PI / 180)
  context.font = '15px Vedana'
  context.fillStyle = 'rgba(180, 180, 180, 0.3)'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(title, canvas.width / 2, canvas.height / 2 + 10)
  if (subTitle)
    context.fillText(subTitle, canvas.width / 2, canvas.height / 2 + 30)

  const div = document.createElement('div')
  div.id = id
  div.style.pointerEvents = 'none'
  div.style.top = '3px'
  div.style.left = '0px'
  div.style.position = 'fixed'
  div.style.zIndex = '100000'
  div.style.width = `${document.documentElement.clientWidth}px`
  div.style.height = `${document.documentElement.clientHeight}px`
  div.style.background = `url(${canvas.toDataURL('image/png')}) left top repeat`
  document.body.appendChild(div)
  return id
}

/**
 * 开启水印
 * @param title
 * @param subTitle
 */
function openFunction(title: string, subTitle?: string) {
  return () => {
    setWatermark(title, subTitle)
  }
}

const watermark = {
  open: (title: string, subTitle?: string) => {
    const fun = openFunction(title, subTitle)
    // 开启一次
    fun()
    // 监听窗口变化
    window.addEventListener('resize', fun)
    window.onbeforeunload = () => {
      window.removeEventListener('resize', fun)
    }
  },
  clear: () => {
    const element = document.getElementById(id)
    if (element !== null)
      document.body.removeChild(element)
  },
}

export {
  watermark,
}

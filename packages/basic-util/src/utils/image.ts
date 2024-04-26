export interface CompressImageOptions {
  /**
   * 压缩的首次质量 0-1
   */
  quality: number
  /**
   * 压缩的步伐
   */
  step: number
  /**
   * 最大的压缩次数
   */
  maxCompressCount: number
}

/**
 * 压缩图片
 * @param src
 * @param targetSize
 * @param options
 */
export function compressImage(src: string, targetSize: number, options?: Partial<CompressImageOptions>): Promise<string> {
  return new Promise((resolve) => {
    compressImageCallback(src, targetSize, (data) => {
      resolve(data)
    }, options)
  })
}

/**
 * 压缩图片
 * @param src
 * @param targetSize
 * @param callback
 * @param options
 */
function compressImageCallback(src: string, targetSize: number, callback: ((base64: string) => void), options?: Partial<CompressImageOptions>) {
  const img = new Image()
  img.src = src
  img.onload = function () {
    const width = img.width
    const height = img.height

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    canvas.width = width
    canvas.height = height

    context!.drawImage(img, 0, 0, width, height)

    // 压缩质量
    let compressQuality = options?.quality ?? 1
    const base64String = canvas.toDataURL('image/jpeg', compressQuality)

    function resizeCanvasToTargetSize(base64String: string, targetSize: number, count = 0) {
      if (options?.maxCompressCount && count >= options?.maxCompressCount) {
        callback(base64String)
        return
      }
      const bytes = atob(base64String.split(',')[1])
      const length = bytes.length
      const targetLength = targetSize * 1024

      if (length > targetLength) {
        compressQuality -= options?.step ?? 0.01
        base64String = canvas.toDataURL('image/jpeg', compressQuality)
        return resizeCanvasToTargetSize(base64String, targetSize, count + 1)
      }
      else {
        callback(base64String)
      }
    }

    resizeCanvasToTargetSize(base64String, targetSize, 0)
  }
}

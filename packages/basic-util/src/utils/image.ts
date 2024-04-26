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
      let compressQuality = options?.quality ?? 0.9
      const base64String = canvas.toDataURL('image/png', compressQuality)
      // 递归压缩图片
      function resizeCanvasToTargetSize(base64String: string, targetSize: number, count = 0) {
        if (options?.maxCompressCount && count > options.maxCompressCount) {
          resolve(base64String)
          return
        }
        const bytes = atob(base64String.split(',')[1])
        const length = bytes.length
        const targetLength = targetSize * 1024
        // 判断是否超过目标大小
        if (length > targetLength) {
          compressQuality -= options?.step ?? 0.01
          base64String = canvas.toDataURL('image/png', compressQuality)
          return resizeCanvasToTargetSize(base64String, targetSize, count++)
        }
        else {
          resolve(base64String)
        }
      }
      resizeCanvasToTargetSize(base64String, targetSize, 0)
    }
  })
}

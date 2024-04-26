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
 * @param base64
 * @param targetSize
 * @param options
 */
export function compressImage(base64: string, targetSize: number, options?: Partial<CompressImageOptions>): Promise<string> {
  return new Promise((resolve) => {
    compressImageCallback(base64, targetSize, (data) => {
      resolve(data)
    }, options)
  })
}

/**
 * 压缩图片
 * @param base64
 * @param targetSize
 * @param callback
 * @param options
 */
function compressImageCallback(base64: string, targetSize: number, callback: ((base64: string) => void), options?: Partial<CompressImageOptions>) {
  const img = new Image()
  img.src = base64
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

/**
 * 压缩图片到指定尺寸
 * @param base64
 * @param maxWidth
 * @param maxHeight
 */
export function compressImageToSize(base64: string, maxWidth: number, maxHeight: number): Promise<string> {
  return new Promise((resolve) => {
    const image = new Image()
    image.src = base64
    image.onload = function () {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      let width = image.width
      let height = image.height
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width
          width = maxWidth
        }
      }
      else {
        if (height > maxHeight) {
          width *= maxHeight / height
          height = maxHeight
        }
      }
      canvas.width = width
      canvas.height = height
      context!.drawImage(image, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', 1))
    }
  })
}

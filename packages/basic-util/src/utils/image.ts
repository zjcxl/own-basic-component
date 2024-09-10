import { NANOID } from './data'
import { fileBase64toBlob } from './file'

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
 * 压缩图片到文件
 * @param base64
 * @param targetSize
 * @param options
 */
export function compressImageToFile(base64: string, targetSize: number, options?: Partial<CompressImageOptions>): Promise<File> {
  return compressImageToBase64(base64, targetSize, options).then((data) => {
    const blob = fileBase64toBlob(data)
    return new File([blob], `${NANOID(24)}.jpeg`, { type: 'image/jpeg' })
  })
}

/**
 * 压缩图片
 * @param base64
 * @param targetSize
 * @param options
 */
export function compressImageToBase64(base64: string, targetSize: number, options?: Partial<CompressImageOptions>): Promise<string> {
  return new Promise((resolve) => {
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
          resolve(base64String)
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
          resolve(base64String)
        }
      }

      resizeCanvasToTargetSize(base64String, targetSize, 0)
    }
  })
}

/**
 * 压缩图片到文件
 * @param base64
 * @param maxWidth
 * @param maxHeight
 */
export function compressImageSizeToFile(base64: string, maxWidth: number, maxHeight: number): Promise<File> {
  return compressImageSizeToBase64(base64, maxWidth, maxHeight).then((data) => {
    const blob = fileBase64toBlob(data)
    return new File([blob], `${NANOID(24)}.jpeg`, { type: 'image/jpeg' })
  })
}

/**
 * 压缩图片到指定尺寸
 * @param base64
 * @param maxWidth
 * @param maxHeight
 */
export function compressImageSizeToBase64(base64: string, maxWidth: number, maxHeight: number): Promise<string> {
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

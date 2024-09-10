/**
 * 文件处理方法
 */
export type FileResolveMethod<T = File> = (file: File) => Promise<T>

/**
 * 处理文件信息
 * @param fileList 文件列表
 * @param method 处理方式
 */
export async function resolveFileList<T>(fileList: FileList, method: FileResolveMethod<T>): Promise<T[]> {
  const array: Promise<T>[] = []
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i]
    array.push(resolveFile(file, method))
  }
  return Promise.all(array)
}

/**
 * 处理文件信息
 * @param file 文件
 * @param method 处理方式
 */
export async function resolveFile<T>(file: File, method: FileResolveMethod<T>): Promise<T> {
  return method(file)
}

/**
 * 将文件列表转换为数组
 * @param fileList 文件列表
 */
export function resolveFileListToArray(fileList: FileList): File[] {
  const array: File[] = []
  for (let i = 0; i < fileList.length; i++)
    array.push(fileList[i])
  return array
}

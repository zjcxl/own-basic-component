/**
 * 将某个字段改为必填
 */
export type RequiredField<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

/**
 * 将某个字段改为选填
 */
export type PartialField<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * 将多个字段改为必填
 */
export type RequiredFields<T, K extends (keyof T)[]> = Omit<T, K[number]> & Required<Pick<T, K[number]>>

/**
 * 将多个字段改为选填
 */
export type PartialFields<T, K extends (keyof T)[]> = Omit<T, K[number]> & Partial<Pick<T, K[number]>>

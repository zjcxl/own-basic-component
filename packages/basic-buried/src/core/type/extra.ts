'use strict'

import type { AuthInfoModel } from '../auth'
import type { BuriedAeModel, SimpleBuriedAeModel } from '../event/ae/types'
import type { BuriedOpModel, SimpleBuriedOpModel } from '../event/op/types'
import type { BuriedPvModel, SimpleBuriedPvModel } from '../event/pv/types'
import type { BuriedStModel, SimpleBuriedStModel } from '../event/st/types'
import type { AppInfoModel, BaseInfoModel } from './model'

export type ExtraInfoPvType = BuriedPvModel & Record<string, any>
export type ExtraInfoAeType = BuriedAeModel & Record<string, any>
export type ExtraInfoStType = BuriedStModel & Record<string, any>
export type ExtraInfoOpType = BuriedOpModel & Record<string, any>

export type BuriedPvModelValue<T> = T extends keyof BuriedPvModel ? BuriedPvModel[T] : any
export type BuriedAeModelValue<T> = T extends keyof BuriedAeModel ? BuriedAeModel[T] : any
export type BuriedStModelValue<T> = T extends keyof BuriedStModel ? BuriedStModel[T] : any
export type BuriedOpModelValue<T> = T extends keyof BuriedOpModel ? BuriedOpModel[T] : any

export type SimpleExtraInfoPvType = SimpleBuriedPvModel & Record<string, any>
export type SimpleExtraInfoAeType = SimpleBuriedAeModel & Record<string, any>
export type SimpleExtraInfoStType = SimpleBuriedStModel & Record<string, any>
export type SimpleExtraInfoOpType = SimpleBuriedOpModel & Record<string, any>

export type SimpleBuriedPvModelValue<T> = T extends keyof SimpleExtraInfoPvType ? SimpleExtraInfoPvType[T] : any
export type SimpleBuriedAeModelValue<T> = T extends keyof SimpleExtraInfoAeType ? SimpleExtraInfoAeType[T] : any
export type SimpleBuriedStModelValue<T> = T extends keyof SimpleExtraInfoStType ? SimpleExtraInfoStType[T] : any
export type SimpleBuriedOpModelValue<T> = T extends keyof SimpleExtraInfoOpType ? SimpleExtraInfoOpType[T] : any

export type SimpleBuriedModelType =
  SimpleExtraInfoPvType
  | SimpleExtraInfoAeType
  | SimpleExtraInfoStType
  | SimpleExtraInfoOpType
export type BuriedModelType<T = SimpleBuriedModelType> = T & AppInfoModel & AuthInfoModel & BaseInfoModel & Record<string, any>

export type PartialBuriedModelType =
  Partial<ExtraInfoAeType>
  | Partial<ExtraInfoPvType>
  | Partial<ExtraInfoStType>
  | Partial<ExtraInfoOpType>

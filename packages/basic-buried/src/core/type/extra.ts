'use strict'

import type { AuthInfoModel } from '../auth'
import type { BuriedAeModel, SimpleBuriedAeModel } from '../event/ae/types'
import type { BuriedPvModel, SimpleBuriedPvModel } from '../event/pv/types'
import type { BuriedStModel, SimpleBuriedStModel } from '../event/st/types'
import type { AppInfoModel, BaseInfoModel } from './model'

export type ExtraInfoPvType = BuriedPvModel & Record<string, string>
export type ExtraInfoAeType = BuriedAeModel & Record<string, string>
export type ExtraInfoStType = BuriedStModel & Record<string, string>

export type BuriedPvModelValue<T> = T extends keyof BuriedPvModel ? BuriedPvModel[T] : string
export type BuriedAeModelValue<T> = T extends keyof BuriedAeModel ? BuriedAeModel[T] : string
export type BuriedStModelValue<T> = T extends keyof BuriedStModel ? BuriedStModel[T] : string

export type SimpleExtraInfoPvType = SimpleBuriedPvModel & Record<string, string>
export type SimpleExtraInfoAeType = SimpleBuriedAeModel & Record<string, string>
export type SimpleExtraInfoStType = SimpleBuriedStModel & Record<string, string>

export type SimpleBuriedPvModelValue<T> = T extends keyof SimpleExtraInfoPvType ? SimpleExtraInfoPvType[T] : string
export type SimpleBuriedAeModelValue<T> = T extends keyof SimpleExtraInfoAeType ? SimpleExtraInfoAeType[T] : string
export type SimpleBuriedStModelValue<T> = T extends keyof SimpleExtraInfoStType ? SimpleExtraInfoStType[T] : string

export type SimpleBuriedModelType = SimpleExtraInfoPvType | SimpleExtraInfoAeType | SimpleExtraInfoStType
export type BuriedModelType<T = SimpleBuriedModelType> = T & AppInfoModel & AuthInfoModel & BaseInfoModel & Record<string, string>

export type PartialBuriedModelType = Partial<ExtraInfoAeType> | Partial<ExtraInfoPvType> | Partial<ExtraInfoStType>

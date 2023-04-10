'use strict'

import type { ResultModel } from '@own-basic-component/config'

/**
 * 二次确认框
 */
export interface ConfirmModel {
  key: string
  token: string
}

export type ResultModelConfirm = ResultModel<ConfirmModel>

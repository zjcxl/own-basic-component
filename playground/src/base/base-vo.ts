export interface BaseBeanVo {
  // 主键
  id: string
  // 创建时间
  gmtCreate: string
}

export interface BaseCreateVo extends BaseBeanVo {
  // 创建人id
  createUserId: string
  // 创建人名称
  createUserName: string
}

export interface BaseModifiedVo extends BaseCreateVo {
  // 更新人用户名
  updateUserId: string
  // 更新人名称
  updateUserName: string
  // 更新时间
  gmtModified: string
}

export interface BaseVo extends BaseModifiedVo {
  // 备注
  remark: string
  // 数据版本号
  version: number
}

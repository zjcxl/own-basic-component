import {
  PostRequestModel,
} from '@own-basic-component/request'
import type { QueryType } from '@own-basic-component/config'
import type { PageModel } from '~/base/page-model'
import type { LogOperationVo } from '~/module/log-operation/log-operation-vo'

const API_PREFIX = 'm/log/operation'

export default {

  /**
   * 分页查询数据信息
   * @param query 查询条件
   */
  page: (query: QueryType) => new PostRequestModel<PageModel<LogOperationVo>>(`${API_PREFIX}/page`, query).request(),

}

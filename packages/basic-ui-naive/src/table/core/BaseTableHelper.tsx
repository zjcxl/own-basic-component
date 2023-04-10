import { NDataTable, NDivider, NPagination, NSpace, dataTableProps } from 'naive-ui'
import type { PropType } from 'vue'
import { computed, defineComponent, onMounted, reactive, ref, unref } from 'vue'
import type { PageInfo, RowDataType } from '../common'
import { baseTableProps, calcPageSizes } from '../common'
import TableSearchHelper from './TableSearchHelper'

export const tableHelperProps = {
  // naive表格的基础属性
  ...dataTableProps,
  // 自定义的表格属性
  ...baseTableProps,
  // 列表还是表格
  helperType: {
    type: String as PropType<'table' | 'list'>,
    default: 'table',
  },
} as const

export default defineComponent({
  name: 'TableHelper',
  components: {
    NDataTable,
    TableSearchHelper,
  },
  props: tableHelperProps,
  setup(props) {
    // 定义默认的rows
    const defaultRows = unref(props.defaultRows)

    // 定义分页的参数信息
    const pageInfo = reactive<PageInfo>({
      page: unref(props.defaultPage),
      rows: unref(props.defaultRows),
      total: 0,
    })

    // 定义数据列
    const dataList = ref<Array<RowDataType>>([])

    // 分页大小数组
    const pageSizes = computed<Array<number>>(() => calcPageSizes(defaultRows, props.maxRows))

    /**
     * 获取数据的方法
     */
    const fetchData = async () => {
      const beforeParams = await props.beforeFetch()
      // 混合请求参数
      props.fetchMethod?.({
        // 默认的参数
        ...props.defaultParams,
        ...beforeParams,
        page: pageInfo.page,
        rows: pageInfo.rows,
      }).then(({ data }) => {
        pageInfo.page = data.page
        pageInfo.rows = data.rows
        pageInfo.total = data.total
        dataList.value = data.list
      })
    }

    /**
     * 修改页数的方法
     * @param page
     */
    const handleChangePage = async (page: number) => {
      pageInfo.page = Math.max(page, 1)
      await fetchData()
    }

    /**
     * 修改分页大小的方法
     * @param rows
     */
    const handleChangePageSize = async (rows: number) => {
      pageInfo.rows = Math.max(rows, 1)
      // 需要将页数重置为1
      pageInfo.page = 1
      await fetchData()
    }

    onMounted(async () => {
      await fetchData()
    })

    // 暴露接口
    const exposeMethods = {
      // 刷新
      refresh: async (pageInit: number | boolean = false) => {
        // eslint-disable-next-line no-console
        console.log('refresh2')
        if (typeof pageInit == 'boolean') {
          // 需要初始化页面，回到第一页
          if (pageInit)
            pageInfo.page = 1
          await fetchData()
        }
        // 直接跳转到对应的页数
        if (typeof pageInit == 'number') {
          pageInfo.page = pageInit
          await fetchData()
        }
      },
      // 获取数据
      getDataList: () => dataList.value,
    }

    return {
      ...exposeMethods,
      dataList,
      pageInfo,
      pageSizes,
      handleChangePage,
      handleChangePageSize,
    }
  },
  render() {
    const {
      dividerName,
      helperType,
      search,
      searchExtra,
    } = this.$props
    return (
      <div>
        {/* 搜索栏 */}
        <TableSearchHelper search={search} search-extra={searchExtra} onSearchAction={() => this.refresh(1)}>
          {{
            ...this.$slots,
          }}
        </TableSearchHelper>
        {/* 分隔栏 */}
        <NDivider title-placement="left">
          {dividerName}
        </NDivider>
        {/* 表格数据主体 */}
        {
          helperType === 'table'
            ? <NDataTable {...this.$props } data={this.dataList} pagination={false} />
            : <div>{this.$slots.data?.({ list: this.dataList })}</div>
        }
        {/* 分页组件 */}
        <br/>
        <NSpace justify="end">
          <NPagination
            page={this.pageInfo.page}
            pageSize={this.pageInfo.rows}
            size="medium"
            page-sizes={this.pageSizes}
            item-count={this.pageInfo.total}
            show-quick-jumper
            show-size-picker
            on-update:page={this.handleChangePage}
            on-update:page-size={this.handleChangePageSize}
          />
        </NSpace>
        <br/>
      </div>
    )
  },
})

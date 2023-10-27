import { computed, defineComponent, h, ref } from 'vue'
import { NButton, NDivider, NSpace } from 'naive-ui'
import { SearchOutline } from '@vicons/ionicons5'
import type { SearchValueData } from '../common'
import { calcSearchItems, searchProps } from '../common'

export default defineComponent({
  name: 'TableSearchHelper',
  props: searchProps,
  emits: ['searchAction'],
  setup(props, { slots, emit }) {
    // 是否需要搜索按钮
    const needSearch = computed<boolean>(() => !!slots.search)
    // 是否需要分隔竖线
    const needDivider = computed<boolean>(() => !!slots.operation)
    // 搜索的事件
    const handleClickSearch = () => {
      emit('searchAction', {})
    }
    // 创建值的收集对象
    const values = ref<SearchValueData>({
      data: {},
    })
    props.search.forEach((item) => {
      values.value.data[item.field] = undefined
    })
    return {
      values,
      needSearch,
      needDivider,
      handleClickSearch,
    }
  },
  render() {
    const {
      searchExtra: extra = {},
      search,
    } = this.$props
    return (
      <NSpace align='center' justify='start'>
        { calcSearchItems(search, this.values) }
        { this.$slots.search?.() }
        <NButton type='primary' onClick={() => this.handleClickSearch()}>
          {{
            default: () => extra.searchButtonText || '搜索',
            icon: () => h(SearchOutline),
          }}
        </NButton>
        { this.needDivider && <NDivider vertical/> }
        {/* 搜索栏操作区 */}
        { this.$slots.operation?.() }
      </NSpace>
    )
  },
})

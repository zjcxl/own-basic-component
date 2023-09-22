import { computed, defineComponent, h } from 'vue'
import { NButton, NDivider, NInput, NSpace } from 'naive-ui'
import { SearchOutline } from '@vicons/ionicons5'
import { searchProps } from '../common'

export default defineComponent({
  name: 'TableSearchHelper',
  props: searchProps,
  emits: ['searchAction'],
  setup(props, { slots, emit }) {
    // 是否需要搜索按钮
    const needSearch = computed<boolean>(() => !!slots.search)
    // 是否需要分隔竖线
    const needDivider = computed<boolean>(() => !!slots.operation)

    /**
     * 搜索的事件
     */
    const handleClickSearch = () => {
      emit('searchAction', {})
    }

    return {
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
    const { operation } = this.$slots
    const { needDivider } = this
    return (
      <NSpace align='center' justify='start'>
        {
          search.map((item, index) => {
            return h(NInput, {
              key: index,
            })
          })
        }
        { this.$slots.search?.() }
        <NButton type='primary' onClick={() => this.handleClickSearch()}>
          {{
            default: () => extra.searchButtonText || '搜索',
            icon: () => h(SearchOutline),
          }}
        </NButton>
        { needDivider && <NDivider vertical/> }
        {/* 搜索栏操作区 */}
        { operation?.() }
      </NSpace>
    )
  },
})

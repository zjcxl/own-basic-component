import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TestSlots',
  render() {
    console.log(this.$slots)
    return (
      <div>
        {this.$slots.test?.()}
      </div>
    )
  },
})

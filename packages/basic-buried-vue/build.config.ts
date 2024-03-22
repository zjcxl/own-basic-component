import {defineBuildConfig} from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
  ],
  clean: true,
  declaration: true,
  externals: [
    'vue',
    'vue-router',
    '@own-basic-component/buried'
  ],
  rollup: {
    emitCJS: true,
  },
})

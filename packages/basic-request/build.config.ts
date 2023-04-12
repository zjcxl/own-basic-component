import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  clean: true,
  declaration: true,
  externals: [
    '@own-basic-component/config',
    '@own-basic-component/util',
  ],
  rollup: {
    emitCJS: true,
  },
})

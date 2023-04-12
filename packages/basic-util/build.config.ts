import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  clean: true,
  declaration: true,
  externals: [
    '@own-basic-component/config',
  ],
  rollup: {
    emitCJS: true,
  },
})

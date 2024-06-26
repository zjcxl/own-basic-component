import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
  ],
  declaration: true,
  clean: true,
  externals: [
    '@own-basic-component/config',
  ],
  rollup: {
    emitCJS: true,
  },
})

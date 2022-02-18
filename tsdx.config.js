const postcss = require('rollup-plugin-postcss')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')
const commonjs = require('@rollup/plugin-commonjs')

module.exports = {
  rollup(config) {
    if (config.output.format === 'umd') {
      delete config.external
    }
    config.plugins.push(
      peerDepsExternal(),
      nodeResolve({
        ignoreGlobal: false,
        include: ['node_modules/**'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        skip: ['react', 'react-dom']
      }),
      postcss({
        config: {
          path: './postcss.config.js'
        },
        extensions: ['.css'],
        minimize: true,
        inject: {
          insertAt: 'top'
        }
      }),
      commonjs({
        namedExports: {
          'react-js': ['isValidElementType']
        }
      })
    )
    return config
  }
}

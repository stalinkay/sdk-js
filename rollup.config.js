import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
  {
    input: 'index.js',
    output: {
      name: 'remote',
      file: pkg.browser,
      format: 'umd',
      exports: 'named',
    },
    plugins: [
      resolve(),
      commonjs(),
      buble({
        exclude: ['node_modules/**']
      }),
      terser()
    ]
  },
  {
    input: 'index.js',
    external: ['axios', 'qs'],
    output: [
      { file: pkg.main, format: 'cjs', exports: 'named' },
      { file: pkg.module, format: 'es', exports: 'named' },
    ],
    plugins: [
      resolve(),
      commonjs()
    ]
  }
];

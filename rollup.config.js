import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';

const legacy = () => {
  return babel({
    extensions: ['.ts'],
    babelHelpers: 'bundled',
    include: ['src/**/*'],
  });
};

const build = (input, config) => ({
  input,
  external: [],
  plugins: [
    resolve({ extensions: ['.ts'] }),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: { compilerOptions: { target: config.target } },
    }),
    config.legacy ? legacy() : undefined,
  ],
  output: config.output,
  onwarn: () => {},
});

export const buildAll = (input, config) => {
  const buildOutput = [];

  // Development build
  buildOutput.push({
    file: config.output[0],
    format: config.format,
    name: 'Lucia',
    globals: {},
    strict: true,
  });

  // Production build
  buildOutput.push({
    file: config.output[1],
    format: config.format,
    plugins: [terser({ format: { comments: false } })],
    name: 'Lucia',
    globals: {},
    strict: true,
  });

  return build(input, {
    output: buildOutput,
    legacy: config.legacy,
    target: config.target,
  });
};

export default [
  buildAll('./src/browser.ts', {
    output: ['dist/lucia.js', 'dist/lucia.min.js'],
    format: 'iife',
    target: 'es2018',
  }),
  buildAll('./src/browser.ts', {
    output: ['dist/legacy/lucia.js', 'dist/legacy/lucia.min.js'],
    format: 'iife',
    target: 'es5',
    legacy: true,
  }),
  buildAll('./src/index.ts', {
    output: ['dist/lucia.esm.js', 'dist/lucia.esm.min.js'],
    format: 'esm',
    target: 'es2018',
  }),
  buildAll('./src/index.ts', {
    output: ['dist/legacy/lucia.esm.js', 'dist/legacy/lucia.esm.min.js'],
    format: 'esm',
    target: 'es5',
    legacy: true,
  }),
  buildAll('./src/index.ts', {
    output: ['dist/lucia.cjs.js', 'dist/lucia.cjs.min.js'],
    format: 'cjs',
    target: 'es2018',
  }),
  buildAll('./src/index.ts', {
    output: ['dist/legacy/lucia.cjs.js', 'dist/legacy/lucia.cjs.min.js'],
    format: 'cjs',
    target: 'es5',
    legacy: true,
  }),
];

import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default {
    input: 'src/StyleObserver.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
        },
        {
            file: pkg.module,
            format: 'es',
        },
        {
            file: pkg.umd,
            format: 'umd',

            name: 'StyleObserver'
        },
    ],
    plugins: [
        commonjs(),
        typescript({
            typescript: require('typescript'),
        }),
        babel(),
        nodeResolve({
            // use "jsnext:main" if possible
            // see https://github.com/rollup/rollup/wiki/jsnext:main
            jsnext: true
        })
    ],
}
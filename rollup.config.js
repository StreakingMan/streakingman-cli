import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'index.ts',
    output: {
        file: 'index.js',
        format: 'cjs',
        banner: '#!/usr/bin/env node',
    },
    plugins: [typescript({}), json(), nodeResolve(), commonjs()],
    external: ['inquirer'],
};

import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/index.ts',
  noExternal: [
    'fs-extra/esm',
    'tinyglobby',
    'tinyexec',
    '@actions/core',
  ],
})

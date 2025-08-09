import { defineConfig } from 'bc-deeplib/build';

export default defineConfig({
  entry: 'index.ts',
  outfile: 'index.js',
  globalName: 'CATS',
  distDirName: 'dist',
  publicDirName: 'public',
  scripts: ['./scripts/copy_files.js'],
  prodRemoteURL: 'https://ddeeplb.github.io/CATS-BC',
  devRemoteURL: 'https://ddeeplb.github.io/CATS-BC/dev',
  target: ['es2020'],
  plugins: [],
  defines: {},
  host: 'localhost',
  port: 45009,
});
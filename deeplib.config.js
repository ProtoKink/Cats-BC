import { defineConfig } from 'bc-deeplib/build';

export default defineConfig({
  entry: 'index.ts',
  outfile: 'index.js',
  globalName: 'CATS',
  modInfo: {
    name: 'CATS',
    fullName: 'Chat Auto Translator System',
    repository: 'https://github.com/ProtoKink/Cats-BC',
  },
  distDirName: 'dist',
  publicDirName: 'public',
  scripts: ['./scripts/copy_files.js'],
  prodRemoteURL: 'https://protokink.github.io/Cats-BC',
  devRemoteURL: 'https://ProtoKink.github.io/Cats-BC/dev',
  host: 'localhost',
  port: 45009,
});
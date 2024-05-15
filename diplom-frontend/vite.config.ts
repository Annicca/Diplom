import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint';
import postcssNesting from 'postcss-nesting';
import svgr from "vite-plugin-svgr";
import sass from 'sass';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
      include: ['./src/**/*.ts', './src/**/*.tsx'],
      exclude: [],
    }),
    svgr({
      include: "**/*.svg?react",

    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
        postcssNesting
      },
    },
  },
  resolve: {
    alias: {
      src: "/src",
      components: '/src/components',
      hooks: 'src/hooks',
      utils: '/src/utils',
      assets: '/src/assets',
      types: '/src/types',
      'react-windowed-select': 'react-windowed-select/dist/main.js',
    }
  }
})

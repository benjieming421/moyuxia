import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  devServer: {
    port: 8066
  },
  base: './',
  publicPath: './',
  history: {
    type: 'hash'
  }
});

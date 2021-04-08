import path from 'path'
export default {
  'alias': {
    '@': path.resolve('src'),
  },
  "proxy": {
    '/api/1.0': {
      // target: 'http://193.112.125.195:18080',
      'target': 'http://localhost:18080',
      'changeOrigin': true,
      'pathRewrite': {
        '^': '',
      },
    },
  }
}

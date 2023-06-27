module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
        // 路由不需要，引用较少
        // 'router': '@/router',
      }
    }
  }
}
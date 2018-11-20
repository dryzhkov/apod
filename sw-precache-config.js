module.exports = {
    staticFileGlobs: [
      'build/static/css/**.css',
      'build/static/js/**.js'
    ],
    swFilePath: './build/service-worker.js',
    //templateFilePath: './service-worker.tmpl',
    stripPrefix: 'build/',
    handleFetch: true,
    runtimeCaching: [{
      // urlPattern: /apod\.nasa\.gov\/apod\/image\/.*.jpg/,
      urlPattern: /.*jpg/,
      handler: 'cacheFirst'
    }],
    skipWaiting: true
  }
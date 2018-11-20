module.exports = {
  globDirectory: "build/",
  globPatterns: ["**/*.{json,ico,js,css,svg}"],
  swDest: "build/service-worker.js",
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      urlPattern: new RegExp(".*jpg"),
      handler: "cacheFirst",
      options: {
        cacheName: "images-cache"
      }
    }
  ]
};

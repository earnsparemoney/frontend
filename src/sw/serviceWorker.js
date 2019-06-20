importScripts('/workbox/workbox-sw.js')

const runtimeCacheName = 'earnsparemoney'
const offlineHtml = '/index.html'

workbox.setConfig({ debug: false })

workbox.setConfig({
  modulePathPrefix: '/workbox/'
})

// 安装完成跳过wait节点
workbox.core.skipWaiting()

// 安装完成掌握控制权
workbox.core.clientsClaim()

// 设置CacheStorage预缓存和运行时的的名字
workbox.core.setCacheNameDetails({
  prefix: '',
  suffix: '',
  precache: runtimeCacheName,
  runtime: runtimeCacheName
})

// 预缓存资源
workbox.precaching.precache(['/'].concat(self.__precacheManifest.map(precache => ({ url: precache.url }))))

// 对主页资源使用网络优先的方案
workbox.routing.registerRoute(
  function ({ url, event }) {
    if (event.request.destination === 'document') {
      fetch(offlineHtml).then(res => {
        if (res.status === 200) {
          caches.open(runtimeCacheName).then(cache => {
            cache.put(offlineHtml, res)
          })
        }
      })
      return true
    }
  },
  new workbox.strategies.NetworkFirst()
)

// 哈希码的存在，静态资源使用缓存优先的方案
workbox.routing.registerRoute(
  /\.(js|css)$/,
  new workbox.strategies.CacheFirst({
    cacheName: runtimeCacheName
  })
)

// 图片存储在单独的CacheStorage中，因此要设置过期时间
workbox.routing.registerRoute(
  /\.(png|jpg|webp)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60
      })
    ]
  })
)

// 单页面应用，路径不存在时返回主页缓存
workbox.routing.setCatchHandler(({ event }) => {
  switch (event.request.destination) {
    case 'document':
      return caches.match(offlineHtml)
    case 'image':
      return caches.match(event.request)
  }
})

// 测试notification
self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox'
  const options = {
    body: event.data.text()
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

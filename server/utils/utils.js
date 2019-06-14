const path = require('path')

function resolve (filePath) {
  return path.join(__dirname, filePath)
}

function getClearClientManifest (clientManifest) {
  const newAsync = []
  clientManifest.async.forEach(item => {
    if (!(item.includes('serviceWorker') ||
          item.includes('workbox') ||
          item.includes('precache'))) {
      if (item.includes('dll')) {
        clientManifest.initial.unshift(item)
      } else {
        newAsync.push(item)
      }
    }
  })
  clientManifest.async = newAsync
}

module.exports = {
  resolve,
  getClearClientManifest
}

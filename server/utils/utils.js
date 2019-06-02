const path = require('path')

function resolve (filePath) {
  return path.join(__dirname, filePath)
}

function getClearClientManifest (clientManifest) {
  for (var i = 0; i < clientManifest.async.length;) {
    if (clientManifest.async[i].includes('serviceWorker.js') || clientManifest.async[i].includes('precache')) {
      clientManifest.async.splice(i, 1)
    } else {
      i++
    }
  }
  clientManifest.initial.unshift(clientManifest.async.pop())
  clientManifest.all.unshift(clientManifest.all.pop())
}

module.exports = {
  resolve,
  getClearClientManifest
}

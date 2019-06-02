const path = require('path')

function resolve (filePath) {
  return path.join(__dirname, filePath)
}

function getClearClientManifest (clientManifest) {
  clientManifest.all.shift()
  clientManifest.all.shift()
  clientManifest.async.shift()
  clientManifest.async.shift()
  clientManifest.initial.unshift(clientManifest.async.pop())
  clientManifest.all.unshift(clientManifest.all.pop())
}

module.exports = {
  resolve,
  getClearClientManifest
}

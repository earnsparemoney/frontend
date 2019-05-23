const path = require('path')

function resolve (filePath) {
  return path.join(__dirname, filePath)
}

module.exports = {
  resolve
}

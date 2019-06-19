const path = require('path')
const UAParser = require('ua-parser-js')
const semver = require('semver')

const ModernBrowsers = {
  Edge: '16',
  Firefox: '60',
  Chrome: '61',
  'Chrome Headless': '61',
  Chromium: '61',
  Iron: '61',
  Safari: '10.1',
  Opera: '48',
  Yandex: '18',
  Vivaldi: '1.14',
  'Mobile Safari': '10.3'
};

const modernBrowsers = Object.keys(ModernBrowsers)
  .reduce((allBrowsers, browser) => {
    allBrowsers[browser] = semver.coerce(ModernBrowsers[browser]);
    return allBrowsers
  }, {});

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

const isModernBrowser = (ua) => {
  if (!ua) {
    return false
  }
  const { browser } = UAParser(ua)
  const browserVersion = semver.coerce(browser.version)
  if (!browserVersion) {
    return false
  }
  return Boolean(modernBrowsers[browser.name] && semver.gte(browserVersion, modernBrowsers[browser.name]))
}

module.exports = {
  resolve,
  getClearClientManifest,
  isModernBrowser
}

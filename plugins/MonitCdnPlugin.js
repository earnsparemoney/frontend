const monitCdnJS = '!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){function n(e){"script"===(e.tagName||"").toLowerCase()&&(e.onerror=r)}function r(e){fetch(e.target.src).then(function(e){let t;200===e.status?(console.log("%c SRI 错误","background: #222; color: #bada55"),t="SRI"):(console.log("%c 非 SRI 错误","background: #222; color: #bada55"),t="Non SRI"),function(e,t){let n=`type=${t}&src=${e.url}`,r=document.createElement("img");e.headers.forEach(function(e,t){"x-via"!==t&&"content-length"!==t||(console.log(t+":"+e),n+=`&${t}=${e}`)}),r.src="http://s.166.net/slog?"+n}(e,t)})}"integrity"in document.createElement("script")&&new MutationObserver(function(e){for(var t=0;t<e.length;++t)for(var r=e[t].addedNodes,o=0;o<r.length;++o)n(r[o])}).observe(document,{childList:!0,attributes:!0,characterData:!1,subtree:!0,attributeOldValue:!1})}]);'

class MonitCdnPlugin {
  constructor() {}

  apply(compiler) {
    const ID = 'MonitCdnPlugin'
    compiler.hooks.compilation.tap(ID, compilation => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(ID, async (data, cb) => {
        data.body.unshift({
          tagName: 'script',
          closeTag: true,
          innerHTML: monitCdnJS
        })

        cb()
      })
    })
  }
}

module.exports = MonitCdnPlugin

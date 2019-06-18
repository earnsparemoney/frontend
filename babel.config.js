module.exports = {
  presets: [
    [
      '@vue/app',
      // {
      //   polyfills: [
      //     // 'es6.promise',
      //     'es6.symbol',
      //     'es6.set'
      //   ]
      // }
    ]
  ],
  plugins: [
    ["@babel/plugin-syntax-dynamic-import"],
    ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "lib", "style": "css" }]
  ]
}

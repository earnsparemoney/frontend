module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    ["@babel/plugin-syntax-dynamic-import"],
    ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "lib", "style": "css" }]
  ]
}

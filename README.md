# 挣闲钱——前端

## 待实现
- 基本功能
- PWA
- autotrack埋点

## 已完成
- 使用自定义webpack4环境进行打包
- 规范commit信息

## 启动
- `cnpm i`
- `npm run dll`
- `npm run dev`

## 打包
- `npm run build`

## 代码提交
- git add .
- npx git-cz
- git push

## 服务端渲染
### 测试
#### 开发环境
- `npm run dev`
- 进入`localhost:3000`，查看页面源代码可见服务端渲染结果
- 进入`localhost:8080`，该页面则为普通spa
#### 生产环境
- `npm run build`
- `npm start`
- 进入`localhost:3000`

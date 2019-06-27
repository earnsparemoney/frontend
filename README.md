# 挣闲钱——前端

## 代码提交
- git add .
- npx git-cz
- git push

## 启动
- 安装依赖：`cnpm i`
- `npm run dev`，进入`localhost:3000`或`localhost:8080`

## 打包
- npm run build
- npm run build:docker
- 访问localhost:3000即可

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

## Docker For Mac
- [阿里云镜像](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors): 加速镜像下载
- `npm run build:docker`: 重新构建
- `npm run docker`: 启动docker
- 进入`localhost: 3000`

### 常用指令
- docker stop $(docker ps -a -q): 停止所有container
- docker rm $(docker ps -a -q): 删除所有container
- docker rmi $(docker images -q): 删除所有image

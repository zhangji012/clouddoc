## 安装注意
  1. electron使用cnpm
  2. [electron-builder所有的下载方式都不行，翻墙也不行](https://blog.csdn.net/cctvcqupt/article/details/87904368),这个网址的方法感觉有些复杂，先建个项目单独yarn add electron-builder --dev可以，再复制过来的

## 使用的一些库的作用
  1. electron-is-dev 判断是否在开发环境 
  2. concurrently 跨平台的情况下命令运行
  3. cross-env BROWSER=none npm start 运行时设置环境变量为none不会打开浏览器窗口
  4. wait-on http://localhost:3000 && electron .   监听3000，当3000端口执行后再执行electron
  5. uuidv4 提供唯一识别码
  6. electron-store 持久化保存数据

## 进程通信
  1. ipcMain ipcRenderer
  2. remote 模块为渲染进程（web页面）和主进程通信（IPC）提供了一种简单方法

## 使用技巧
  1. Flatten State
  2. `{[id]: '12312'}`, 对象里id是变量时可以使用这种方式
  3. [react哲学](https://react.docschina.org/docs/thinking-in-react.html)
  4. 项目中使用window.require代替require引入模块，使用window后webpack不会再操作，直接使用require会有问题
  5. html5中data的使用data-id  el.dataset.id

## package.json里的一些介绍
  1. "pack": "electron-builder --dir" 生成一个安装完毕的文件
  2. "dist": "electron-builder"  真正的生成一个安装包 
  3. "prepack": "npm run build && npm run buildMain",  钩子命令，在运行pack之前先运行build和buildMain
  4. files 手动配置打包文件，但是这样的话，所有的都需要配置
  5. homepage 使用相对路径
  6. extraMetadata 用这个路径替换原始的路径
  7. 自动发布release的部分非常好，整张最后再看一遍


## 介绍的文章
  1. https://blog.csdn.net/qq_40196738/article/details/103269790

## 还不清楚的地方
  1. 更新为什么需要 dev-app-update.yml
  2. webpack.config 的__dirname: false不清楚
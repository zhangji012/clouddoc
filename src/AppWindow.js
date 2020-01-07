// 创建和控制浏览器窗口
const { BrowserWindow } = require('electron')
// todo这个继承的方法用的非常好，多看
class AppWindow extends BrowserWindow {
  constructor(config, urlLocation) {
    const basicConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      },
      show: false,
      backgroundColor: '#efefef',
    }
    const finalConfig = { ...basicConfig, ...config }
    super(finalConfig)  // 调用父类的constructor
    // 加载远程URL,或加载本地HTML文件
    this.loadURL(urlLocation)
    // 在加载页面时，渲染进程第一次完成绘制时，会发出 ready-to-show 事件 。 在此事件后显示窗口将没有视觉闪烁
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

module.exports = AppWindow
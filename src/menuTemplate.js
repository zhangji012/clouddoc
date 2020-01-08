const { app, shell, ipcMain } = require('electron')
const Store = require('electron-store')
const settingsStore = new Store({ name: 'Settings'})
// ipcMain 一些其他用法，可以看原型上的，文档上不全,如emit继承的EventEmitter
// 返回一个boolean值
const qiniuIsConfiged =  ['accessKey', 'secretKey', 'bucketName'].every(key => !!settingsStore.get(key))
let enableAutoSync = settingsStore.get('enableAutoSync')  // 自动同步
// 菜单详解 https://electronjs.org/docs/api/menu-item
// todo browserWindow.webContents.send 和 ipcMain.emit区别
let template = [{
  label: '文件',
  submenu: [{
    label: '新建',
    accelerator: 'CmdOrCtrl+N',
    click: (menuItem, browserWindow, event) => {
      // 通过channel向渲染器进程发送异步消息，可以发送任意参数。 在内部，参数会被序列化为 JSON
      // https://electronjs.org/docs/api/web-contents
      browserWindow.webContents.send('create-new-file')
    }
  },{
    label: '保存',
    accelerator: 'CmdOrCtrl+S',
    click: (menuItem, browserWindow, event) => {
      browserWindow.webContents.send('save-edit-file')
    }
  },{
    label: '搜索',
    accelerator: 'CmdOrCtrl+F',
    click: (menuItem, browserWindow, event) => {
      browserWindow.webContents.send('search-file')
    }
  },{
    label: '导入',
    accelerator: 'CmdOrCtrl+O',
    click: (menuItem, browserWindow, event) => {
      browserWindow.webContents.send('import-file')
    }
  }]
},
{
  label: '编辑',
  submenu: [
    {
      label: '撤销',
      accelerator: 'CmdOrCtrl+Z',
      role: 'undo'
    }, {
      label: '重做',
      accelerator: 'Shift+CmdOrCtrl+Z',
      role: 'redo'
    }, {
      type: 'separator'
    }, {
      label: '剪切',
      accelerator: 'CmdOrCtrl+X',
      role: 'cut'
    }, {
      label: '复制',
      accelerator: 'CmdOrCtrl+C',
      role: 'copy'
    }, {
      label: '粘贴',
      accelerator: 'CmdOrCtrl+V',
      role: 'paste'
    }, {
      label: '全选',
      accelerator: 'CmdOrCtrl+A',
      role: 'selectall'
    }
  ]
},
{
  label: '云同步',
  submenu: [{
    label: '设置',
    accelerator: 'CmdOrCtrl+,',
    click: () => {
      ipcMain.emit('open-settings-window')
    }
  }, {
    label: '自动同步',
    type: 'checkbox',
    enabled: qiniuIsConfiged,
    checked: enableAutoSync,
    click: () => {
      settingsStore.set('enableAutoSync', !enableAutoSync)
    }
  }, {
    label: '全部同步至云端',
    enabled: qiniuIsConfiged,
    click: () => {
      ipcMain.emit('upload-all-to-qiniu')
    }
  }, {
    label: '从云端下载到本地',
    enabled: qiniuIsConfiged,
    click: () => {
      
    }
  }]
},
{
  label: '视图',
  submenu: [
    {
      label: '刷新当前页面',
      accelerator: 'CmdOrCtrl+R',
      click: (item, focusedWindow) => {
        if (focusedWindow)
        // todo 为什么用if,focusedWindow和上面的browserWindow有和不同
        // 刷新页面
          focusedWindow.reload();
      }
    },
    {
      label: '切换全屏幕',
      accelerator: (() => {
        if (process.platform === 'darwin')
          return 'Ctrl+Command+F';
        else
          return 'F11';
      })(),
      click: (item, focusedWindow) => {
        if (focusedWindow)
          // 当前窗口不是全屏就设置全屏
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
      }
    },
    {
      label: '切换开发者工具',
      accelerator: (function() {
        if (process.platform === 'darwin')
          return 'Alt+Command+I';
        else
          return 'Ctrl+Shift+I';
      })(),
      click: (item, focusedWindow) => {
        if (focusedWindow)
        // 在当前窗口中隐藏/显示开发者工具  https://electronjs.org/docs/api/menu-item
          focusedWindow.toggleDevTools();
      }
    },
  ]
},
{
  label: '窗口',
  role: 'window',
  submenu: [{
    label: '最小化',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  }, {
    label: '关闭',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }]
},
{
  label: '帮助',
  role: 'help',
  submenu: [
    {
      label: '学习更多',
      // 使用默认应用程序管理文件和 url,这边是在用户的默认浏览器中打开 URL
      click: () => { shell.openExternal('http://electron.atom.io') }
    },
  ]
},
]
// mac特有的
// process.platform 属性返回字符串，标识 Node.js 进程运行其上的操作系统平台
// http://nodejs.cn/api/process.html#process_process_platform
if (process.platform === 'darwin') {
  // 返回 String-当前应用程序的名称, 它是应用程序的 package. json 文件中的名称
  const name = app.getName()
  template.unshift({
    label: name,
    submenu: [{
      label: `关于 ${name}`,
      role: 'about'
    }, {
      type: 'separator'
    }, {
      label: '设置',
      accelerator: 'Command+,',
      click: () => {
        ipcMain.emit('open-settings-window')
      }
    }, {
      label: '服务',
      role: 'services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      label: `隐藏 ${name}`,
      accelerator: 'Command+H',
      role: 'hide'
    }, {
      label: '隐藏其它',
      accelerator: 'Command+Alt+H',
      role: 'hideothers'
    }, {
      label: '显示全部',
      role: 'unhide'
    }, {
      type: 'separator'
    }, {
      label: '退出',
      accelerator: 'Command+Q',
      click: () => {
        // 退出应用
        app.quit()
      }
    }]
  })
} else {
  template[0].submenu.push({
    label: '设置',
    accelerator: 'Ctrl+,',
    click: () => {
      ipcMain.emit('open-settings-window')
    }
  })
}

module.exports = template

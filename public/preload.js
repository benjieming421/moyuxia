const mainHandler = {
    my: { // 注意：键对应的是 plugin.json 中的 features.code
      mode: "list", // 列表模式
      args: {
        // 进入插件时调用（可选）
        enter: (action, callbackSetList) => {
          // 如果进入插件就要显示列表数据
          callbackSetList([{
            title: '摸鱼挂件',
            description: '可以看今天工作摸了多少钱的挂件',
            icon: '', // 图标(可选)
            url: 'http://localhost:8066/'
          }])
        },
        // 用户选择列表中某个条目时被调用
        select: (action, itemData, callbackSetList) => {
          const url = itemData.url
          const ubWindow = utools.createBrowserWindow('./index.html', {
            show: false,
            "width": 800,
            "height": 1000,
            title: '测试窗口',
            webPreferences: {
              preload: 'preload.js',
            }
          }, () => {
            // 显示
            ubWindow.show()
            // 置顶
            ubWindow.setAlwaysOnTop(true)
            // 向子窗口传递数据
            ubWindow.webContents.send('ping')
            //打开tools
            ubWindow.webContents.openDevTools()
            require('electron').ipcRenderer.sendTo(ubWindow.webContents.id, 'ping')
            // 执行脚本
            ubWindow.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())')
              .then((result) => {
                console.log(result) // Will be the JSON object from the fetch call
              })
          })
        },
      }
    }
  }
  
  window.exports = {
    ...mainHandler
  }
  
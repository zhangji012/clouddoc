import { useEffect, useRef } from 'react'
// remote在渲染进程中使用主进程模块
const { remote } = window.require('electron')
const { Menu, MenuItem } = remote

const useContextMenu = (itemArr, targetSelector, deps) => {
  let clickedElement = useRef(null) // 在多次渲染之间记住
  useEffect(() => {
    const menu = new Menu()
    itemArr.forEach(item => {
      menu.append(new MenuItem(item))
    })
    const handleContextMenu = (e) => {
      // only show the context menu on current dom element or targetSelector contains target
      // js中的contains方法不能判断字符串是否包含中文，只能判断英文，如果需要判断是否包含中文，只能用indexOf方法
      // 感觉还是indexof更常用
      if (document.querySelector(targetSelector).contains(e.target)) {
        clickedElement.current = e.target
        // 参照案例 https://electronjs.org/docs/api/menu
        menu.popup({window: remote.getCurrentWindow() }) // 在当前的window弹出
      }
    }
    // 鼠标右击
    window.addEventListener('contextmenu', handleContextMenu)
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu)
    }
  }, deps)
  return clickedElement
}

export default useContextMenu
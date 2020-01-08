// 这边几个定义的方法比较好，平时可以使用
/**
 * 将数组转换为对象
 * @param arr [Arrary]
 */
export const flattenArr = (arr) => {
  return arr.reduce((map, item) => {
    map[item.id] = item
    return map
  }, {})
}
/**
 * 将对象转换为数组
 */
export const objToArr = (obj) => {
  return Object.keys(obj).map(key => obj[key])
}
// 这个方法挺好
export const getParentNode = (node, parentClassName) => {
  let current = node
  while(current !== null) {
    // classList 属性返回元素的类名, js的contains方法用来查看dom元素的包含关系
    if (current.classList.contains(parentClassName)) {
      return current
    }
    current = current.parentNode
  }
  return false
}

export const timestampToString = (timestamp) => {
  const date = new Date(timestamp)
  // 2020/1/7 下午2:09:31,项目中还是用day.js 好
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}
// 获取本地浏览器数据
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 存储数据到本地浏览器
export const setItem = (key, value) => {
  if (typeof (value) === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 删除本地浏览器的指定数据
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}

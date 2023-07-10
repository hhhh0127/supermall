export function debounce(func, delay) {

  let timer = null;

  return function (...args) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay);
  }
}

export function formatDate(date, fmt) {
  // 1.获取年份
  // y+ 一个或者多个y
  if (/(y+)/.test(fmt)) {
    // RegExp.$1 是匹配到的yyyy $1 原来是第一组匹配到的数据
    // substr( )第二个参数不传的话，就默认匹配到字符串的最后
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  // 2.获取
  // + 一到多（最少1） *零到多（可以没有） ? 零到1（要不有一个，要不就没有）
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

// 4:4:4 => 04:04:04
// 补齐为两位
// 比较巧妙
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

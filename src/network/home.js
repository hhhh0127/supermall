import {request} from './request'

// 封装首页的各种请求，便于管理，防止与home.vue耦合过深
// Home.vue面向home.js开发
export function getHomeMultidata() {
  // 返回的Promise对象
  return request({
    // 注意url别写错
    url: '/home/multidata'
  })
}
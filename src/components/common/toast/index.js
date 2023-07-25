import Toast from './Toast.vue'

const obj = {}

obj.install = function (Vue) {
  // 这里的1-4步是为了把元素挂载到我们页面内，取代我们前面重复到每个页面import,components,templeate挂载了

  // 1.创建组件构造器
  const toastContructor = Vue.extend(Toast)
  // 2.new 的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContructor()
  // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'));
  // 4.toast.$el对应就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;
}

export default obj
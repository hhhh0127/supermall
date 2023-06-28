import axios from "axios";

// 法1：传入success，failure两个回调函数获取请求结果并且处理
export function request1(config, success, failure) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000",
    timeout: 5000
  });

  // 2.axios的拦截器
  // axios.interceptors 全局拦截

  // 2.1 请求拦截
  instance.interceptors.request.use(config => {
    // config 是请求的配置信息
    console.log(config);
    // 需要返回config，不然会请求失败，因为config被拦截了
    return config
  }, err => {
    console.log(err);
  })
  // 2.2 响应拦截

  instance.interceptors.response.use(res => {
    // res是服务器响应的结果
    console.log(res);
    // 也需要返回，res.data才是真正需要的数据
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  instance(config)
    .then(res => {
      // console.log(res);
      success(res);
    })
    .catch(err => {
      // console.log(err);
      failure(err);
    });
}

// 法2：参数只有一个，且为对象，从对象中取出相应的东西
export function request2(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000",
    timeout: 5000
  });

  // 发送真正的网络请求
  instance(config.baseConfig)
    .then(res => {
      // console.log(res);
      config.success(res);
    })
    .catch(err => {
      // console.log(err);
      config.failure(err);
    });
}

// 法3：return Promise对象
export function request3(config) {
  return new Promise((resolve, reject) => {
    // 1.创建axios的实例
    const instance = axios.create({
      baseURL: "http://123.207.32.32:8000",
      timeout: 5000
    });

    // 发送真正的网络请求
    instance(config)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      });
  });
}

// 法4：直接return instance(config)，本身axios.create({})创建的实例就是一个Promise对象
export function request4(config) {
    // 1.创建axios的实例
    const instance = axios.create({
      baseURL: "http://123.207.32.32:8000",
      timeout: 5000
    });

    // 发送真正的网络请求
    return instance(config)
}

// 想要多个实例对象的话，就多次调用request就行了，传入不同的参数

// 
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  return instance(config)
}

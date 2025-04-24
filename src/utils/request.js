// import axios from "axios";

// const token = `sk-cwaywqlygtnafnhsgfndicsqryarbcojsvgfjjssqtmjsdwe`;
// const request = axios.create({
//   baseURL: "https://api.siliconflow.cn/v1",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
// });

// // 请求拦截器
// request.interceptors.request.use(
//   function (config) {
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// // 响应拦截器
// request.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// export default request;

//官网的api
//////////////////////////////
// import axios from 'axios'

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_DEEPSEEK_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
//   }
// })
// // 在axios实例中添加拦截器
// instance.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response?.status === 429) {
//       alert('请求过于频繁，请稍后再试')
//     }
//     return Promise.reject(error)
//   }
// )
// export default instance



//阿里云的api
import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_DEEPSEEK_API_URL,
  headers: {
    'Content-Type': 'application/json',//application/json
    'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
  }
  //apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
})
// 在axios实例中添加拦截器
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 429) {
      alert('请求过于频繁，请稍后再试')
    }
    return Promise.reject(error)
  }
)
export default instance

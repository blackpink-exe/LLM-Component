// import requset from "@/utils/request";
// // 创建文本对话请求
// // '{"model":"deepseek-ai/DeepSeek-V2.5","messages":[{"role":"user","content":"SiliconCloud推出分层速率方案与免费模型RPM提升10倍，对于整个大模型应用领域带来哪些改变？"}],"stream":false,"max_tokens":512,"stop":"","temperature":0.7,"top_p":0.7,"top_k":50,"frequency_penalty":0.5,"n":1,"response_format":{"type":"text"},"tools":[{"type":"function","function":{"description":"<string>","name":"<string>","parameters":{},"strict":true}}]}'
// export const quickChat = async (content) => {
//   return requset({
//     url: "/chat/completions",
//     method: "post",
//     data: {
//       model: "deepseek-ai/DeepSeek-V2.5",
//       messages: [
//         {
//           role: "user",
//           content,
//         },
//       ],
//     },
//   });
// };



//官网的api
//////////////////////////////
// import instance from "@/utils/request";
// export const chatCompletion = async (messages) => {
//   //console.log('最终发送的messages类型:', Array.isArray(messages) ? '数组' : '非数组')
//   //console.log('消息内容示例:', JSON.stringify(messages[0], null, 2))
//   try {
//     const response = await instance.post('', {
//       model: "deepseek-chat",  // 根据文档调整
//       messages,
//       temperature: 0.7,
//       max_tokens: 500
//     })
//     return response.data.choices[0].message.content
//   } catch (error) {
//     //添加额度检查提示
//     if (error.response?.data?.error?.code === 'invalid_request_error') {
//       alert('API额度不足,请检查账户余额')
//     }
//     console.error('API Error:', error.response?.data || error.message)
//     throw new Error('获取回复失败，请稍后重试')

//   }
// }




//阿里云的api
//////////////////////////////
import instance from "@/utils/request";
export const chatCompletion = async (messages) => {
  //console.log('最终发送的messages类型:', Array.isArray(messages) ? '数组' : '非数组')
  //console.log('消息内容示例:', JSON.stringify(messages[0], null, 2))
  try {
    const response = await instance.post('', {
      model: "deepseek-r1",  // 根据文档调整 deepseek-chat
      messages,
      temperature: 0.7,
      max_tokens: 500
    })
    return response.data.choices[0].message.content
  } catch (error) {
    //添加额度检查提示
    if (error.response?.data?.error?.code === 'invalid_request_error') {
      alert('API额度不足,请检查账户余额')
    }
    console.error('API Error:', error.response?.data || error.message)
    throw new Error('获取回复失败，请稍后重试')

  }
}
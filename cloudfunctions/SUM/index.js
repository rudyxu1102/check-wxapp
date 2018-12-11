// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-644476'
})
// // 或者传入自定义配置
// cloud.init({
//   env: 'some-env-id'
// })
// 云函数入口函数
exports.main = (event, context) => {
    console.log(event)
    console.log(context)
    return {
        sum: event.a + event.b
    }
}

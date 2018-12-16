// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-644476'
})

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  db.collection('user').add({
    data: {
      username: '测试',
      password: '123456',
      account: 'acct'
    },
    success: (res) => {
      console.log('[数据库] [新增记录] 成功，记录 _id: ', res);
    },
    fail: err => {
      console.error('[数据库] [新增记录] 失败：', err);
    }
  })
}
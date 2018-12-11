// 云函数入口文件
const cloud = require('wx-server-sdk')

// 云函数入口函数
exports.main = async (event, context) => {
  // let isDebug = event.isDebug;
  cloud.init({
    env: 'test-644476',
    traceUser: true
  });
  const db = cloud.database();
  let date = new Date();
  console.log(date)
  db.collection('user').add({
    data: {
      password: date.getDate() + '-' + date.getMinutes() + '-' + date.getMilliseconds(),
      username: 'timer_test',
      account: 'timer'
    },
    success: res => {
      return res
      console.log('[数据库] [新增记录] 成功，记录 _id: ', res)
    },
    fail: err => {
      console.log('添加失败', err)
      return err
    }
  })
}
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'test-644476'
});
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let date = new Date();
  let nowTime = date.getTime();
  let result = await db.collection('cycleWork').get();
  result.data.forEach((element) => {
    let startDate = new Date(element.startDate).getTime();
    let cycle = element.cycle - 0;
    console.log(Math.floor((nowTime - startDate) / (24 * 60 * 60 * 1000)) % cycle)
    if (startDate < nowTime &&  Math.floor((nowTime - startDate) / (24 * 60 * 60 * 1000)) % cycle === 0) {
      let personList = JSON.parse(element.personList);
      console.log(1, personList)
      personList.forEach((item) => {
        let work = {
          personId: item,
          device: element.device,
          factor: element.factor,
          method: element.method,
          standard: element.standard,
          type: element.type,
          checkDate: nowTime
        };
        db.collection('todayWork').add({
          data: work,
          success: (res) => {
            console.log('[数据库] [新增记录] 成功，记录 _id: ', res);
          },
          fail: err => {
            console.error('[数据库] [新增记录] 失败：', err);
          }
        })
      })
    }
  })
}
// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  env: 'test-644476'
});
const db = cloud.database();

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
// 云函数入口函数
exports.main = async (event, context) => {
  let date = new Date(new Date().getTime() + 28800 * 1000);
  console.log(date)
  let nowTime = date.getTime();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let result = await db.collection('cycleWork').get();
  await asyncForEach(result.data, async (element) => {
    let startDate = new Date(element.startDate).getTime();
    let endDate = new Date(element.endDate + ' 23:59:59').getTime();
    let cycle = element.cycle - 0;
    if (startDate < nowTime && endDate > nowTime && Math.floor((nowTime - startDate) / (24 * 60 * 60 * 1000)) % cycle === 0) {
      let personList = element.personList;
      await asyncForEach(personList, async (item) => {
        let work = {
          personId: item.id,
          _openid: item.openid,
          device: element.device,
          factor: element.factor,
          method: element.method,
          standard: element.standard,
          type: element.type,
          checkDate: year + '-' + month + '-' + day,
          done: 0,
          imgUpload: element.imgUpload,
          checkValue: ''
        };
        console.log(work)
        await db.collection('todayWork').add({
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
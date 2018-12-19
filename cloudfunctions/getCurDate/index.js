exports.main = (event, context) => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let todayDate = year + '-' + month + '-' + day;
  let time = date.getTime();

  return {
    todayDate: todayDate,
    curTime: time
  }
}

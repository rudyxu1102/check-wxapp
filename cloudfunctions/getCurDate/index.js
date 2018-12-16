exports.main = (event, context) => {
  let date = new Date(new Date().getTime() + 28800 * 1000);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let todayDate = year + '-' + month + '-' + day;

  return {
    todayDate: todayDate
  }
}

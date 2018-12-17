// miniprogram/pages/home/index.js
const db = wx.cloud.database();
let globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // workList: [
      // {
      //   content: '检查2#冷料机',
      //   status: 0
      // }, {
      //   content: '检查2#烘干筒',
      //   status: 1
      // }, {
      //   content: '检查保养2#热提',
      //   status: 0
      // }, {
      //   content: '检查2#计量拌和',
      //   status: 1
      // }, {
      //   content: '检查2#空气压缩机',
      //   status: 0
      // }, {
      //   content: '检查2#粉提',
      //   status: 1
      // }, {
      //   content: '检查2#保养打黄油',
      //   status: 1
      // }, {
      //   content: '铲车保养打黄油',
      //   status: 1
      // },
    // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.getWorkList();
  },  

  getWorkList: function () {
    let userInfo = wx.getStorageSync("loginInfo");
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (!this.data.workList) {
      wx.showLoading();
    }
    wx.cloud.callFunction({
      name: 'getCurDate',
    }).then(res => {
      let todayDate = res.result.todayDate
      db.collection('todayWork').where({
        personId: userInfo.userId,
        checkDate: todayDate
      }).get({
        success: res => {
          wx.hideLoading();
          this.setData({
            workList: res.data
          })
        },
        fail: err => {
          wx.hideLoading();
          wx.showToast({
            image: '/images/error.png',
            title: '查询记录失败'
          })
        }
      })
    })
   
  },
  goCheckPage: function (e) {
    let index = e.target.dataset.index;
    let workData = this.data.workList[index];
    wx.navigateTo({
      url: `/pages/home/check-device/index?workData=${JSON.stringify(workData)}`,
    })
  }
})
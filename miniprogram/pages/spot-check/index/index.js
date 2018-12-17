// miniprogram/pages/spot-check/index/index.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // cycleList: [
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
  onLoad: function (options) {
    this.getCycleList();
  },

  getCycleList: function () {
    let userInfo = wx.getStorageSync("loginInfo");
    const _ = db.command;
    wx.showLoading();
    db.collection('cycleWork').get({
      success: res => {
        let allCycleList = res.data;
        wx.hideLoading();
        let cycleList = []
        allCycleList.forEach(function (element) {
          if (element.searchIdList.indexOf(userInfo.userId) !== -1) {
            cycleList.push(element)
          }
        })
        this.setData({
          cycleList: cycleList
        })
      },
      fail: err => {
        console.log(err)
        wx.hideLoading();
        wx.showToast({
          image: '/images/error.png',
          title: '查询记录失败'
        })
      }
    })
  },

  goCheckView: function (e) {
    let index = e.target.dataset.index;
    let cycleData = this.data.cycleList[index];
    wx.navigateTo({
      url: `/pages/spot-check/check-view/index?cycleData=${JSON.stringify(cycleData)}`,
    })
  }

})
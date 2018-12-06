// miniprogram/pages/user-center/index/index.js
let globalData = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    resDomain: 'https://cd.faisys.com/image/wcdWxApp/'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
  },

  onShow: function () {
    this.getUserInfo();
  },

  // 获取账户信息 
  getUserInfo: function () {
    const db = wx.cloud.database();
    let loginInfo = wx.getStorageSync('loginInfo');
    if (!loginInfo) {
      wx.navigateTo({
        url: '/pages/user-center/login/index',
      })
      return
    }
    let userId = loginInfo.userId;
    db.collection('user').doc(userId).get({
      success: res => {
        this.setData({
          account: res.data.account,
          username: res.data.username
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
  },

  // 退出登录 
  quitOut: function () {
    this.setData({
      isShowModal: true
    })
  },

  hideModal: function () {
    this.setData({
      isShowModal: false
    })
  },

  confirmQuit: function () {
    this.setData({
      isShowModal: false
    })
    wx.clearStorage();
    wx.navigateTo({
      url: '/pages/user-center/login/index',
    })
  }
})
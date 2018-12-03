// miniprogram/pages/user-center/change-password/index.js
let md5 = require('../../../utils/util.js').md5;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    resDomain: 'https://cd.faisys.com/image/wcdWxApp/',
    firstPas: '',
    secPas: '',
    showPas: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  toFirstPasBlur: function (e) {
    let value = e.detail.value;
    this.setData({
      firstPas: value
    })
  },

  toSecPasBlur: function (e) {
    let value = e.detail.value;
    this.setData({
      secPas: value
    })
  },

  toggleShowPas: function () {
    this.setData({
      showPas: !this.data.showPas
    })
  },

  changePas: function () {
    if (!this.data.firstPas || !this.data.secPas) {
      this.setData({
        isShowTip: true,
        tip: '请输入密码'
      })
      return
    }
    if (this.data.firstPas !== this.data.secPas) {
      this.setData({
        isShowTip: true,
        tip: '请输入相同的密码'
      })
      return
    }
    let userInfo = wx.getStorageSync('loginInfo');
    let userId = userInfo.userId;
    const db = wx.cloud.database();
    db.collection('user').doc(userId).update({
      data: {
        password: md5(this.data.firstPas) 
      },
      success: res => {
        wx.showToast({
          icon: 'success',
          title: '修改成功'
        })
        wx.clearStorage();
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/user-center/login/index',
          })
        }, 1000)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })    
  }
})
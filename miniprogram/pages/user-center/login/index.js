// miniprogram/pages/user-center/login/index.js
let md5 = require('../../../utils/util.js').md5;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    resDomain: 'https://cd.faisys.com/image/wcdWxApp/',
    username: '',
    password: ''
  },
  toUsernameBlur: function (e) {
    let value = e.detail.value;
    this.setData({
      username: value
    })
  },
  toPasswordBlur: function (e) {
    let value = e.detail.value;
    this.setData({
      password: value
    })
  },
  onLogin: function () {
    let account = this.data.username;
    let password = md5(this.data.password);
    if (!account) {
      this.setData({
        isShowTip: true,
        tip: '请输入登录账号'
      })
      return
    }
    if (!password) {
      this.setData({
        isShowTip: true,
        tip: '请输入登录密码'
      })
      return
    }
    let that = this;
    const db = wx.cloud.database();
    db.collection('user').where({
      account: account,
      password: password
    }).get({
      success: res => {
        if (res.data.length > 0) {
          wx.setStorageSync('loginInfo', {
            userId: res.data[0]._id,
            isAdm: res.data[0].isAdm,
            username: res.data[0].username,
            account: res.data[0].account,
            company: res.data[0].company
          });  
          
          wx.switchTab({
            url: '/pages/home/index/index',
          })
               
        } else {
          that.setData({
            isShowTip: true,
            tip: '请输入正确的账号和密码'
          })
        }
      },
      fail: err => {
        that.setData({
          isShowTip: true,
          tip: '登录失败'
        })
      }
    })
  }
})
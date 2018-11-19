// miniprogram/pages/user-center/user-manage/user-add/index.js
let md5 = require('../../../../utils/util.js').md5;

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
  addUser: function () {
    let password = md5(this.data.password);
    let username = this.data.username;
    if (!username) {
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
    const db = wx.cloud.database();
    db.collection('user').add({
      data: {
        password: password,
        account: username
      },
      success: res => {
        wx.showToast({
          title: '添加用户成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '添加失败'
        })
      }
    })
  }
})
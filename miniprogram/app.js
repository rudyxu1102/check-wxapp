//app.js
let isDebug = 1;

App({
  onLaunch: function () { 
    wx.cloud.init({
      env: isDebug ? 'test-644476' : 'demo-5cdb02',
      traceUser: true
    })
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        this.globalData.openid = res.result.openid
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取 openid',
        })
      }
    })
  },
  globalData: {

  }
})

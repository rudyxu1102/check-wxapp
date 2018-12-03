//app.js
let isDebug = 1;

App({
  onLaunch: function () { 
    wx.cloud.init({
      env: isDebug ? 'test-644476' : 'demo-5cdb02',
      traceUser: true
    })
    this.getOpenid();
  },
  globalData: {

  },
  getOpenid: function () {
    let hasOpenid = !!wx.getStorageSync('openid');
    if (hasOpenid) {
      return
    }
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        wx.setStorageSync('openid', res.result.openid);
        this.globalData.openid = res.result.openid;
        console.log(res.result.openid)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取openid失败',
        })
      }
    })
  }
})

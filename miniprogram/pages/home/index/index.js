// miniprogram/pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workList: [
      {
        content: '检查2#冷料机',
        status: 0
      }, {
        content: '检查2#烘干筒',
        status: 1
      }, {
        content: '检查保养2#热提',
        status: 0
      }, {
        content: '检查2#计量拌和',
        status: 1
      }, {
        content: '检查2#空气压缩机',
        status: 0
      }, {
        content: '检查2#粉提',
        status: 1
      }, {
        content: '检查2#保养打黄油',
        status: 1
      }, {
        content: '铲车保养打黄油',
        status: 1
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getWorkList: function () {
    
  }
})
// miniprogram/pages/home/check-device/index.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dealWorkData(options)
  },

  confirmPicker: function () {
    this.setData({
      isShowFooter: false
    })
  },

  dealWorkData: function (options) {
    let workData = JSON.parse(options.workData);
    console.log(workData)
    let temData = {
      workData: workData
    }
    if (workData.type === 1) {
      temData['options'] = JSON.parse(workData.standard)
    }
    this.setData(temData)
  },
  // 提交范围的picker
  bindPickerChange: function (e) {
    let value = e.detail.value;
    this.setData({
      curCheck: this.data.options[value[0]].value
    })
  },
  openPicker: function () {
    this.setData({
      isShowFooter: true
    })
  },

  changeInput: function (e) {
    let value = e.detail.value;
    this.setData({
      curCheck: value
    })
  },

  updateData: function () {
    console.log(23333)
    if (!this.data.curCheck) {
      this.setData({
        isShowTip: true,
        tip: '请录入今日的点检情况'
      })
      return
    }
    let id = this.data.workData._id;
    let that = this;
    db.collection('todayWork').doc(id).update({
      data: {
        done: 1,
        checkValue: that.data.curCheck
      },
      success(res) {
        console.log(res)
        wx.showToast({
          icon: 'success',
          title: '录入成功',
        })
      },
      fail: function (err) {
        console.log(err)
        that.setData({
          isShowTip: true,
          tip: '录入失败，请稍后重新录入',
        })
      }
    })
  }
})
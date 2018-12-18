// miniprogram/pages/home/check-device/index.js
const db = wx.cloud.database();
let globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resVersion: globalData.resVersion,

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
      temData['options'] = workData.standard
    }
    if (workData.imgFileId) {
      wx.cloud.downloadFile({
        fileID: workData.imgFileId, // 文件 ID
        success: res => {
          // 返回临时文件路径
          this.setData({
            tempFilePath: res.tempFilePath
          })
        },
      })
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

  uploadImg: function () {
    let name = this.data.workData.device + '-' + this.data.workData.factor + '-' + this.data.workData._id + '.png'
    wx.showLoading({
      title: '正在上传中...',
    })
    wx.chooseImage({
      success: chooseResult => {
        wx.cloud.uploadFile({
          cloudPath: './work/' + name,
          filePath: chooseResult.tempFilePaths[0],
          success: res => {
            if (res.statusCode === 200) {
              let fileID = res.fileID;
              console.log(res)
              wx.cloud.downloadFile({
                fileID: res.fileID, // 文件 ID
                success: res => {
                  wx.showToast({
                    icon: 'success',
                    title: '上传成功',
                  })
                  // 返回临时文件路径
                  this.setData({
                    imgFileId: fileID,
                    tempFilePath: res.tempFilePath
                  })
                },
              })

            }
          },
        })
      },
    })
  },

  updateData: function () {
    if (!this.data.curCheck) {
      this.setData({
        isShowTip: true,
        tip: '请录入今日的点检情况'
      })
      return
    }
    let id = this.data.workData._id;
    let that = this;
    wx.cloud.callFunction({
      name: 'getCurDate',
    }).then(res => {
      let todayDate = res.result.todayDate
      db.collection('todayWork').doc(id).update({
        data: {
          done: 1,
          checkValue: that.data.curCheck,
          actDate: todayDate,
          imgFileId: this.data.imgFileId
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
    })
  }
})
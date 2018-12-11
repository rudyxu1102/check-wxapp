// miniprogram/pages/user-center/spot-manage/spot-add/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkType: 0,
    options: [{
      id: 0,
      value: ''
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  openPicker: function () {
    this.setData({
      isShowFooter: true
    })
  },
  hidePicker: function () {
    this.setData({
      isShowFooter: false,
      // curPickerVal: this.data.element && [this.data.element.submitScope]
    })
  },

  confirmPicker: function () {
    this.setData({
      isShowFooter: false,
      // [`element.submitScope`]: this.data.curPickerVal[0]
    })
  },

  // 提交范围的picker
  bindPickerChange: function (e) {
    let value = e.detail.value;
    this.setData({
      checkType: value[0]
    })
  },

  // 添加单选的选项
  addRadioOpt: function () {
    if (this.data.options) {
      let length = this.data.options.length;
      let obj = {
        id: this.data.options[length - 1].id + 1,
        value: ''
      };
      this.setData({
        [`options[${length}]`]: obj
      })
    }
  },

  // 删除单选的选项
  delRadioOpt: function (e) {
    let index = parseInt(e.target.dataset.index);
    let arr = this.data.options.slice();
    arr.splice(index, 1);
    this.setData({
      ['options']: arr
    })
  },
  updateRadioOpt: function (e) {
    let value = e.detail.value;
    let index = parseInt(e.target.dataset.index);
    this.setData({
      [`options[${index}].value`]: value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  changeInput: function (e) {
    let value = e.detail.value;
    let key = e.target.dataset.key;
    let checkType = this.data.checkType;

    if (checkType === 1 && key === 'standard') {
      return
    }
    if (key === 'cycle') {
      let num = /\d*/.exec(value)[0];
      value = num;
    }
    this.setData({
      [key]: value
    })
  },
  changeSwitch: function (e) {
    let value = e.detail;
    let key = e.target.dataset.key;
    this.setData({
      [key]: value
    })
  },

  addCycleWork: function () {
    let standard = this.data.standard;
    if (this.data.checkType === 1) {
      let options = this.data.options;
      standard = JSON.stringify(options);
    }
    let result = {
      device: this.data.device,
      factor: this.data.factor,
      method: this.data.method,
      type: this.data.checkType,
      standard: standard,
      cycle: this.data.cycle,
      startDate: this.data.startDate,
      imgUpload: this.data.imgUpload
    }
    const db = wx.cloud.database()
    db.collection('cycleWork').add({
      data: result,
      success: res => {
        wx.showToast({
          title: '新增点检成功',
        })
      },
      fail: err => {
        wx.showToast({
          image: '/images/error.png',
          title: '新增点检失败'
        })
      }
    })
  }
})
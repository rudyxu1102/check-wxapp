// miniprogram/pages/user-center/spot-manage/spot-add/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkType: 0,
    personIdList: [],
    options: ['']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPersonList();
  },

  selectPerson: function (e) {
    let id = e.target.dataset.id;
    let openid = e.target.dataset.openid;
    if (!id) {
      return
    }
    let personIdList = this.data.personIdList.slice();
    let index = personIdList.indexOf(id);
    if (index === -1) {
      personIdList.push({
        id: id,
        openid: openid
      });      
    } else {
      personIdList.splice(index, 1);
    } 
    this.setData({
      'personIdList': personIdList
    })
  },

  getPersonList: function () {
    const db = wx.cloud.database();
    // 查询当前用户所有的 counters
    db.collection('user').where({
      isAdm: 0
    }).get({
      success: res => {
        let personList = [];
        res.data.forEach((element, index) => {
          let obj = {
            id: element._id,
            openid: element._openid,
            username: element.username
          }
          personList[index] = obj;
        })
        this.setData({
          personList: personList
        })
      },
      fail: err => {
        wx.showToast({
          image: '/images/error.png',
          title: '查询记录失败'
        })
      }
    })
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
      this.setData({
        [`options[${length}]`]: ''
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
      [`options[${index}]`]: value
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
    if (this.data.loading) {
      return
    }
    let standard = this.data.standard;
    if (this.data.checkType === 1) {
      let options = this.data.options;
      standard = options;
    }
    let searchIdList = [];
    this.data.personIdList.forEach(function (element) {
      searchIdList.push(element.id)
    })
    let that = this;
    this.setData({
      loading: 1
    })

    let result = {
      device: this.data.device,
      factor: this.data.factor,
      method: this.data.method,
      type: this.data.checkType,
      standard: standard,
      cycle: this.data.cycle,
      startDate: this.data.startDate,
      imgUpload: this.data.imgUpload,
      personList: this.data.personIdList,
      searchIdList: searchIdList
    }
    const db = wx.cloud.database()
    db.collection('cycleWork').add({
      data: result,
      success: res => {
        wx.showToast({
          title: '新增点检成功',
        })
        that.data.loading = 0;
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
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
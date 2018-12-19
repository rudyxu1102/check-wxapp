// miniprogram/pages/user-center/user-manage/user-add/index.js
let md5 = require('../../../../utils/util.js').md5;
const db = wx.cloud.database();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    resDomain: 'https://cd.faisys.com/image/wcdWxApp/',
    account: '',
    password: ''
  },
  onLoad: function (options) {
    this.setData({
      state: parseInt(options.state)
    })
    this.getCodeList();
  },
  // 获取所有的公司识别码
  getCodeList: function () {
    let codeList = [];
    let that = this;
    db.collection('company').get({
      success: function (res) {
        res.data.forEach((element) => {
          codeList.push(element.code)
        })
        that.setData({
          codeList: codeList
        })
      }
    })

  },
  toAccountBlur: function (e) {
    let value = e.detail.value;
    this.setData({
      account: value
    })
    this.checkAccount(value);
  },
  checkAccount: function (value) {
    db.collection('user').where({
      account: value
    }).get({
      success: res => {
        if (res.data.length !== 0) {
          this.setData({
            accountCanUse: false,
            isShowTip: true,
            tip: '当前账号已被使用！请重新输入'
          })
        } else {
          this.setData({
            accountCanUse: true
          })
        }
      },
      fail: err => {
        this.setData({
          accountCanUse: true
        })
      }
    })
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
  toSecPasswordBlur: function (e) {
    let value = e.detail.value;
    this.setData({
      secPas: value
    })
  },
  addUser: function () {
    this.checkAccount(value);
    let password = md5(this.data.password);
    let account = this.data.account;
    let that = this;
    if (!account) {
      this.setData({
        isShowTip: true,
        tip: '请输入登录账号'
      })
      return
    }
    if (!this.data.username) {
      this.setData({
        isShowTip: true,
        tip: '请输入用户名称'
      })
      return
    }
    if (!this.data.accountCanUse) {
      this.setData({
        isShowTip: true,
        tip: '当前账号已被使用！请重新输入'
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
    if (!this.data.code) {
      this.setData({
        isShowTip: true,
        tip: '请输入公司识别码'
      })
      return
    }
    if (this.data.password !== this.data.secPas) {
      this.setData({
        isShowTip: true,
        tip: '请输入相同的登录密码'
      })
      return
    }
    if (this.data.codeList.indexOf(value) === -1) {
      this.setData({
        isShowTip: true,
        tip: '请输入正确的公司识别码'
      })
      return
    } 
    db.collection('user').add({
      data: {
        password: password,
        username: this.data.username,
        account: account,
        code: this.data.code,
        isAdm: 0
      },
      success: res => {
        wx.showToast({
          title: '添加用户成功',
        })
        wx.navigateTo({
          url: '/pages/user-center/user-manage/user-add/index?state=2',
        })
      },
      fail: err => {
        wx.showToast({
          image: '/images/error.png',
          title: '添加失败'
        })
      }
    })
  },
  toCodeBlur: function (e) {
    let value = e.detail.value - 0;
    if (value && this.data.codeList.indexOf(value) === -1) {
      this.setData({
        isShowTip: true,
        tip: '请输入正确的公司识别码'
      })
    } 
    this.setData({
      code: value
    })
  },
  goUserCenter: function () {
    wx.navigateTo({
      url: '/pages/user-center/login/index',
    })
  }
})
// components/listItem/list-item.js
let globalData = getApp().globalData;

Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        // item的高度
        height: {
            type: String,
            value: '110rpx'
        },
        customStyle: {
            type: String,
            value: ''
        },
        // 是否有下边框（不占item高度）
        hasBottomBorder: {
            type: Boolean,
            value: false
        },
        // 是否有上边框（不占item高度）
        hasTopBorder: {
            type: Boolean,
            value: false
        },
        // 左边的文字描述
        tabName: {
            type: String
        },
        // 右边是否是开关
        hasSwitch: {
            type: Boolean,
            value: false
        },
        // 开关是否打开
        switchCheck: {
            type: Boolean,
            value: true
        },
        // item的marginTop
        marginTop: {
            type: String,
            value: '0rpx'
        },
        // 右边是否是计数器
        hasCounter: {
            type: Boolean,
            value: false
        },
        // 计数器单位
        counterUnit: {
            type: String
        },
        // 计数初始值
        times: {
            type: Number
        },
        // 计数最小值
        minTime: {
            type: Number,
            value: 0
        },
        // 计数最大值
        maxTime: {
            type: Number,
            value: 100000
        },
        hasInput: {
            type: Boolean,
            value: false
        },
        inputValue: {
            type: String
        },
        placeholder: {
          type: String
        },
        // 是否上拉页面
        adjustPos: {
            type: Boolean,
            value: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        resDomain: globalData.resDomain,
        resVersion: globalData.resVersion,
        focusInput: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        switchChange: function (e) {
            this.setData({
                switchCheck: e.detail.value
            })
            this.triggerEvent('switchChange', e.detail.value)
        },
        addTimes: function () {
            let times = this.data.times + 1;
            if (times <= this.data.maxTime) {
                this.setData({
                    times: times
                })
                this.triggerEvent('counterChange', {
                    value: this.data.times
                })            
            } else {
                this.triggerEvent('counterChange', {
                    value: this.data.times,
                    isToMax: true
                }) 
            }
        },

        changeInput: function (e) {
            let value = e.detail.value;
            this.triggerEvent('inputChange', {
                value: value
            }) 
        },

        clickTab: function () {
            if (this.data.hasInput) {
                this.setData({
                    focusInput: true
                })
            }
        },

        reduceTimes: function () {
            let times = this.data.times - 1;
            if(times >= this.data.minTime) {
                this.setData({
                    times: times
                })
                this.triggerEvent('counterChange', {
                    value: this.data.times
                }) 
            } else {
                this.triggerEvent('counterChange', {
                    value: this.data.times,
                    isToMin: true
                }) 
            }
                                   
        }
    }
})

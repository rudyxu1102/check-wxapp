// components/footerOption/footerOption.js
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        isShow: {
            type: Boolean,
            value: false
        },
    },

    attached: function () {
        this.judgePhone();
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        closeModal: function () {
            this.setData({
                isShow: false
            })
        },
        judgePhone: function () {
            let system = wx.getSystemInfoSync();
            let isIphoneX = /<iPhone1[1-9],\d>|<iPhone10,3>/i.test(system.model);
            if (isIphoneX) {
                this.setData({
                    isIphoneX: true
                })
            }
        }
    }
})

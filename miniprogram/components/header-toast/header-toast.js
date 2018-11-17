// components/headerToast/headerToast.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 提示的内容
        title: {
            type: String,
            value: ''
        },

        // 是否显示提示
        isShow: {
            type: Boolean,
            value: false,
            observer: function (newVal, oldVal, changedPath) {
                let that = this;
                if (newVal) {
                    setTimeout(function () {
                        that.setData({
                            isShow: false
                        })
                    }, 1600)
                }
            }
        }

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

    }
})

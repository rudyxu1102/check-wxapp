// components/customModal/customModal.js
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
            value: false,
            observer: function () {
                this.makeClassName();
            }
        },
        padding: {
            type: String,
            value: '0rpx'
        },
        footerStyle: {
            type: String,
            value: ''
        },
        // 是否有动画过渡
        showAnime: {
            type: Boolean,
            value: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        modalShowClass: ''
    },

    attached () {
        this.makeClassName();
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 生成弹窗样式名
        makeClassName () {
            if (this.data.isShow) {
                if (this.data.showAnime) {
                    this.setData({
                        modalShowClass: 'modal-anime-visilble'
                    })
                } else {
                    this.setData({
                        modalShowClass: 'modal-no-anime-visilble'
                    })
                }
            } else {
                if (this.data.showAnime) {
                    this.setData({
                        modalShowClass: 'modal-anime-hidden'
                    })
                } else {
                    this.setData({
                        modalShowClass: 'modal-no-anime-hidden'
                    })
                }
            }
        },

        // 隐藏弹框
        hideModal () {
            this.setData({
                isShow: false
            })
        },
        // 展示弹框
        showModal () {
            this.setData({
                isShow: true
            })
        },
        cancelCabk () {
            // 触发取消回调
            this.triggerEvent("cancelEvent");
        },
        confirmCabk () {
            // 触发成功回调
            this.triggerEvent("confirmEvent");
        }
    }
})

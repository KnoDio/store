// pages/add/add.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        n: "",
        p: ""
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.n = ''
        this.data.p = ''
        wx.getUserInfo({
            success: function (res) {
                console.log(res);
                var avatarUrl = 'userInfo.avatarUrl';
                var nickName = 'userInfo.nickName';
                that.setData({
                    [avatarUrl]: res.userInfo.avatarUrl,
                    [nickName]: res.userInfo.nickName,
                })
            }
        })
    },
    show() {
        this.setData({
            select: !this.data.select
        })
    },
    choose(e) {
        console.log(e)
        this.setData({
            index: e.detail.value
        })
    },
    chooseimage() {
        let img = this.data.tempFilePath
        wx.chooseImage({
            count: 2,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                console.log(res.tempFilePaths)

                for (let i = 0; i < res.tempFilePaths.length; i++) {
                    img.push(res.tempFilePaths[i])
                }
                this.setData({
                    tempFilePath: img,
                    isselect: false
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    /**
     * 获得输入的商品信息
     */

    password: function (e) {
        console.log(e)
        this.setData({
            p: e.detail.value
        })
        console.log(this.data.p)
    },
    /** 
     * 用户发布商品
     */
    Onupload: function (e) {
        console.log(this.data.p)
        if (this.data.p.length == 0 || this.data.n.length == 0) {
            wx.showToast({
                title: '输入不为空',
                icon: 'error'
            })
        } else {
            wx.request({
                url: 'http://8.130.175.220:8081/user/edit',
                method: 'POST',
                header: {
                    'content-Type': 'application/json'
                },
                data: {
                    id: wx.getStorage(option),
                    name: this.data.n,
                    password: this.data.p,
                },
                success: res => {
                    this.setData({
                        n: '',
                        p: ''
                    })
                }
            })
        }
    },
    name: function (e) {
        console.log(e)
        this.setData({
            n: e.detail.value
        })
        console.log(this.data.n)
    }
})
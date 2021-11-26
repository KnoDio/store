Page({
    data: {
        //image.helpmessage标题（求助的信息）
        image: [],
        //真正的resmessage
        resmessage: [],
        e: ""
    },

    onLoad: function (options) {
        this.setData({
            image: JSON.parse(options.data)
        })
        console.log(this.data.image)
        wx.request({
            url: 'http://8.130.175.220:8081/help/allres?uid=' + this.data.image.uid,
            method: 'post',
            header: {
                'content-type': 'application/json'
            },
            success: (result) => {
                this.setData({
                    resmessage: result.data,
                })
            },
            fail: (res) => {},
        })
    },

    refresh: function (options) {
        wx.request({
            url: 'http://8.130.175.220:8081/help/allres?uid=' + this.data.image.uid, //？
            method: 'post',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: (result) => {
                this.setData({
                    resmessage: result.data,
                })
            },
            fail: (res) => {},
        })
    },

    send: function () {
        if(this.data.e.length!=0)
        wx.request({
            url: 'http://8.130.175.220:8081/res/add',
            method: 'post',
            header: {
                'content-type': 'application/json' // 默认值
            },
            data: {
                uid: this.data.image.id,
                resmessage: this.data.e
            },
            success: res => {
                this.setData({
                    e: ''
                })
                this.refresh()
            }
        })
    },

    getres: function (e) {
        this.setData({
            e: e.detail.value
        })
    }
})
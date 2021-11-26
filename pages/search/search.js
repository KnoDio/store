Page({
    data: {
        //要搜索的内容
        searchdata: "",
        //返回的内容
        image: []
    },
    onLoad: function (options) {
        this.setData({
            searchdata: options.data
        })
        wx.request({
            url: 'http://8.130.175.220:8081/shop/search?name=' + this.data.searchdata,
            success: (result) => {
                console.log(result)
                this.setData({
                    image: result.data,
                })
            },
            fail: (res) => {},
        })
    },

    tap: function (value) {
        var data = JSON.stringify(this.data.image[value.currentTarget.dataset.index])
        wx.navigateTo({
            url: '/pages/detail/detail?data=' + data
        })
    },
})
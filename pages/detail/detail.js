// pages/detail/detail.js
Page({
    data: {
        url: "",
        //商品数据
        image: [],
        //image.name商品名
        //image.details描述
        //image.picture图片url
        //image.picture2
        //image.picture3
        //image.username用户名
        //image.prices价格
    },

    onLoad: function (options) {
        this.setData({
            image: JSON.parse(options.data)
        })
        console.log(this.data.image);
        this.setData({
                item:this.data.image
        })
    },
})
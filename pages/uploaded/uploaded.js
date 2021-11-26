const app=getApp();
Page({
  data: {
    //商品数据
    image: [],
    //id
    id: 0
  },
  onLoad: function (options) {
    console.log(app.globalData.id)
      wx.request({
        url: 'http://8.130.175.220:8081/shop/query?id=' + app.globalData.id,
        method: 'post',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: (result) => {
          this.setData({
            image: result.data,
          })
        },
        fail: (res) => {},
      })
  },

  // tap: function (value) {
  //   var data = JSON.stringify(this.data.image[value.currentTarget.dataset.index])
  //   wx.navigateTo({
  //     url: '/pages/detail2/detail2?data=' + data
  //   })
  // },

  deltap: function (val) {
    console.log(this.data.image[val.currentTarget.dataset.index].loadid)
    wx.request({
      url: 'http://8.130.175.220:8081/shop/delete?loadid=' + this.data.image[val.currentTarget.dataset.index].loadid,
    })
    this.onLoad()
  }
})
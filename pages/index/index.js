// index.js
Page({
  data: {
    //商品数据
    image: [],
  },
  onLoad: function (options) {
    wx.request({
      url: 'http://8.130.175.220:8081/shop/all',
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

  //物品点击事件
  tap: function (value) {
    var data = JSON.stringify(this.data.image[value.currentTarget.dataset.index])
    wx.navigateTo({
      url: '/pages/detail/detail?data=' + data
    })
  },

  data: {
    //用于保存和显示输入框中的值
    inputValue: ""
  },
  //搜索点击事件
  tapselect: function (options) {
    if (this.data.inputValue != "") {
      wx.navigateTo({
        url: '/pages/search/search?data=' + this.data.inputValue,
      })
      this.setData({
        inputValue: ''
      })
    }
  },

  //通过input的事件获取文本框的值
  onInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading(); //在标题栏中显示加载图标
    wx.request({
      url: 'http://8.130.175.220:8081/shop/all',
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
      complete: function (res) {
        wx.hideNavigationBarLoading(); //完成停止加载图标
        wx.stopPullDownRefresh();
      }
    })
  },
})
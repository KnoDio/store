// pages/addf/addf.js
Page({

  add1: function () {
    wx.navigateTo({
      url: '/pages/add2/add2',
    })
  },

  add2: function () {
    wx.navigateTo({
      url: '/pages/add/add',
    })
  }
})
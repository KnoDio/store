// app.js
App({
  onLaunch() {
    

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.getStorage({
      key: "user",
      success: res => {
        //console.log(res)
        this.globalData.id=res.data.num
        console.log(this.globalData.id)
      }
    })
  },
  globalData: {
    userInfo: null,
    id:0,
    code:""
  }
})

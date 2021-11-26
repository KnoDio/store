// pages/user/user.js
const app=getApp();
Page({
  data: {
    ispass: false,
    iserror: false,
    iss: false,
    nn:'',
    pp:''
  },

  loginuser: function (options) {
    var n = options.detail.value[1]
    var p = options.detail.value[2]
    wx.request({
      url: 'http://8.130.175.220:8081/user/login',
      method: 'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        //num: 0,
        name: n,
        password: p,
      },

      success: res => {
        
        console.log(res)
        if (res.data>0) 
        {
        this.data.nn=n;
        this.data.pp=p;
          this.setData({
            ispass: true,
            iserror: false
          })
          wx.setStorage({
            key:'user',
            data:{
                num:res.data,
                name:this.data.nn,
                password:this.data.pp
            }
          }) 
          app.globalData.id=res.data 
          console.log(app.globalData)
          wx.switchTab({
            url: '../index/index',
          })
        } else {
          this.setData({
            ispass: false,
            iserror: true
          })
        }
        console.log(res)
      }
    })
  },

  adduser: function (options) {
    var n = options.detail.value[1]
    var p = options.detail.value[2]
    wx.request({
      url: 'http://8.130.175.220:8081/user/add',
      method: 'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        name: n,
        password: p,
      },
      success: res => {
        if (res.data != 0) {
          this.setData({
            iss: false
          })
          console.log(res)
          wx.setStorage({
            key: 'user',
            data: {
              //num: res.data,
              name: n,
              password: p
            }
          })
        } else {
          this.setData({
            iss: true
          })
        }
      }
    })
  },

  getuser: function () {
    wx.getStorage({
      key: 'user',
      success: res => {
        console.log(res)
      }
    })
  },

  switchTab: function () {
    wx.navigateTo({
      url: '../regist/regist',
    })
  }
})
// pages/regist/regist.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    adduser:function(options){
        var n = options.detail.value[1]
        var p = options.detail.value[2]
        wx.request({
          url: 'http://8.130.175.220:8081/user/add',
          method:'post',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data:{
                name:n,
                password:p,
            },
            success:res=>{
              if(res.data!=0){
                this.setData({
                  iss:false
                })
                wx.setStorage({
                  key:'user',
                  data:{
                    num:res.data,
                    name:n,
                    password:p
                  }
                })
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              }
              else{
                this.setData({
                  iss:true
                })
              }
            }
        })
      }
})
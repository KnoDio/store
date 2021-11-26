// pages/add/add.js
Page({
    data: {
        url:"http://8.130.175.220:8081/help/add",
        isselect:true,
        index:0,
        id:0,
        name:'',
        resmessage:"",
        tempFilePaths:[]
    },

    onLoad: function (options) {
        wx.getStorage({
            key:'user',
            success:res=>{
              console.log(res)
              this.setData({
                  id:res.data.num,
                  name:res.data.name
              })
            }
        })
    },

    choose(e){
        console.log(e)
        this.setData({
            index:e.detail.value
        })
    },
    getmessage:function(e){
        console.log(e)
        this.setData({
            resmessage:e.detail.value
        })
    },
    formsubmit(e){
        var that =this
        var type = this.data.type
        var index = this.data.index
        
        wx.request({
          url: this.data.url,
          data:{
              uid:this.data.id,
              helpmessage:this.data.resmessage
          },
          method:"POST",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success:res=>{
              console.log(res)
              if(res.data==="success"){
                  wx.showToast({
                title: '发布成功',
                icon: 'success',
                duration: 2000
                })
              }
              else{
                  wx.showToast({
                    title: '发布失败',
                    icon:'error',
                    duration:1500
                  })
                  
              }
              wx.reLaunch({
                    url: '../addf/addf',
                })
            
          }
        })
    }
})
// pages/add/add.js
Page({
    data: {
        url:"http://8.130.175.220:8081/shop/add",
        isselect:true,
        index:0,
        id:0,
        name:'',
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
    show(){
        this.setData({
            select:!this.data.select
        })
    },
    choose(e){
        console.log(e)
        this.setData({
            index:e.detail.value
        })
    },
    formsubmit(e){
        var that =this
        var type = this.data.type
        var index = this.data.index 
        var n = e.detail.value[1]
        var p = e.detail.value[2]
        var d = e.detail.value[3]
        console.log(e.detail.value[3])
        
        wx.request({
          url: this.data.url,
          data:{
              id:this.data.id,
              name:n,
              price:p,
              details:d,
              picture:this.data.tempFilePaths[0],
              picture2:this.data.tempFilePaths[1],
              picture3:this.data.tempFilePaths[2],
              username:this.data.name
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
    },
    chooseimage(){
        var that =this
        var img = this.data.tempFilePaths
        wx.chooseImage({
          count: 2,
          sizeType:['original','compressed'],
          sourceType:['album','camera'],
          success:(res)=>{
            this.data.tempFilePaths = res.tempFilePaths
            console.log( this.data.tempFilePaths)
            for(let i=0;i<res.tempFilePaths.length;i++){
                console.log(res.tempFilePaths[i]) 
                
                 wx.uploadFile({
                   filePath: res.tempFilePaths[i],
                   name: 'file',
                   url: 'http://8.130.175.220:8081/shop/upload',
                   formData: {
                    'user': 'test'
                    },
                    success:res=>{
                       img.push(res.data)
                        console.log(res.data)
                        this.setData({
                            tempFilePaths:img,
                            isselect:false
                        })
                    },
                    
                 })
            }
        }
    })
    }
})
const app = getApp();
const c = app.globalData.code;
Page({
  data: {
    user_input_text: '',//用户输入文字
    inputValue: '',
    returnValue: '',
    addImg: false,
    //格式示例数据，可为空
    allContentList: [12,'dssc'],
    num: 0,
    me:[],
    code:'',
  },
  //创建连接
found: function () {

    // var url = 'ws://localhost:8081/websocket/hello';
    // this.data.code = wx.connectSocket({
    //   url: url,
    //   method: "GET"
    // });
    this.data.code=wx.connectSocket({
        url:'ws://8.130.175.220:8081/websocket/hellofakerlrz',
        method: "GET",
      })
    this.data.code.onOpen(res => {
      console.log('连接打开成功');
    });
    this.data.code.onError(res => {
      console.info('连接识别');
      console.error(res);
    });

    this.data.code.onClose(() => {
      console.info('连接关闭');
    });
  },
  //发送内容
  send: function () {
      let a = this.data.allContentList
      
      if (this.data.code.readyState == this.data.code.OPEN) {
        this.data.code.send({
        data:'hello|world',
        success: () => {console.log("sdfs")},
      });
    } else {
      console.error('连接已经关闭');
    }
    this.data.code.onMessage(res => {
      var data = res.data;
      console.log(data);
      data=data.split(":")[1]
    });
    this.data.code.close();
  },
 
  //关闭连接
  shut: function () {
    
  }
})
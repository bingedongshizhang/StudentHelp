// pages/index/study/study_list/study_list.js
Page({
  data: {
    current: 0,
    list1: [],
    list2: [],
    boxShow1: false,
    boxShow2: false
  },
  onLoad: function (options) {
  },
  tap: function(e){
    var code = e.currentTarget.dataset.code;
    this.setData({
      current: code
    });
    this.request(code);
  },
  swiper: function (e) {
    if (e.detail.current == 0) {
      this.request(0);
    } else {
      this.request(1);
    }
    this.setData({
      current: e.detail.current
    });
  },
  request: function(isfix){
    var _this = this;
    console.log(isfix)
    //查找所以维修信息
    wx.request({
      url: 'https://wx.bingexxx.net/CollegeApp2.4/PartTimeAction.action?type=userid',
      data: {
        status: isfix
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': getApp().globalData.cookie
      },
      success: function (res) {
        console.log(res.data);
        if (!res.data.lists){
          if (isfix == 0){
            _this.setData({
              boxShow1: true,
              list1: []
            })
          }else{
            _this.setData({
              boxShow2: true,
              list2: []
            })
          }
          return;
        }
        if (res.data.lists.time) {
          var list = [];
          list.push(res.data.lists);
          res.data.lists = list;
        }
        console.log(res.data)
        var lists = res.data.lists;
        for(var i=0;i<lists.length;i++){
          var introduce = lists[i].introduce;
          introduce = JSON.parse(introduce);
          if (introduce.detail == ''){
            introduce.detail = '暂无简历';
          }
          lists[i].introduce = introduce;
        }
        console.log(lists)
        if (isfix == 0) {
          _this.setData({
            list1: lists
          })
        }else{
          _this.setData({
            list2: lists
          })
        }
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '网络出现点问题了',
          showCancel: false
        })
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    this.request(0);
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  previewPicture() {
    wx.previewImage({
      current: 'http://img4.imgtn.bdimg.com/it/u=1430167557,2058196111&fm=26&gp=0.jpg', // 当前显示图片的http链接
      urls: [
        'http://img4.imgtn.bdimg.com/it/u=1430167557,2058196111&fm=26&gp=0.jpg',
        'http://img0.imgtn.bdimg.com/it/u=1330098495,3850809559&fm=26&gp=0.jpg'
      ] // 需要预览的图片http链接列表
    })
  }
})
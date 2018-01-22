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
    //查找所以维修信息
    wx.request({
      url: 'https://wx.bingexxx.net/CollegeApp2.4/FixAction.action?type=owner',
      data: {
        isfix: isfix
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': getApp().globalData.cookie
      },
      success: function (res) {
        if (res.data.listcount == 0){
          if (isfix == 0){
            _this.setData({
              boxShow1: true
            })
          }else{
            _this.setData({
              boxShow2: true
            })
          }
        }
        if (res.data.listcount == 1) {
          var list = [];
          list.push(res.data.lists);
          res.data.lists = list;
        }
        var lists = res.data.lists;
        console.log(lists)
        for(var i=0;i<lists.length;i++){
          var detail = lists[i].fixdetail;
          detail = JSON.parse(detail);
          lists[i].fixdetail = detail.detail;
          if(lists[i].wokername == ''){
            lists[i].wokername = '尚未接单';
          }
        }
        if (isfix == 0) {
          _this.setData({
            list1: res.data.lists
          })
        }else{
          _this.setData({
            list2: res.data.lists
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
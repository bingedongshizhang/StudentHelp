// pages/news/news.js
Page({
  data:{
    current: 0,
    person: {},
    system: {},
    boxShow1: false,
    boxShow2: false
  },
  onLoad:function(options){
    wx.request({
      url: 'https://wx.bingexxx.net/CollegeApp2.4/MessageAction.action?type=informsendget',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': getApp().globalData.cookie
      },
      success: function (res) {
        console.log(res)
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
  swiper: function(e){
    if (e.detail.current == 0){
      this.tap();
    }else{
      this.tap2();
    }
  },
  onShow:function(){
    this.tap();
  },
  tap: function(){
    this.setData({
      current: 0
    })
    var _this = this;
    wx.request({
      url: 'https://wx.bingexxx.net/CollegeApp2.4/GetStudyAction.action?type=usermessage',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': getApp().globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 1) {
          if (!res.data.lists) {
            _this.setData({
              boxShow1: true
            })
            return;
          }
          var data = res.data.lists;
          if (data.time) {
            var temp = [];
            temp.push(data);
            data = temp;
          }
          console.log(data)
          _this.setData({
            person: data
          });
        } else {
          //获取失败
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
  tap2: function () {
    var _this = this;
    this.setData({
      current: 1
    });
    wx.request({
      url: 'https://wx.bingexxx.net/CollegeApp2.4/MessageAction.action?type=informget',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': getApp().globalData.cookie
      },
      success: function (res) {
        if(res.data.code == 1){
          if (!res.data.lists){
            _this.setData({
              boxShow2: true
            })
            return;
          }
          var data = res.data.lists;
          if (data.time){
            var temp = [];
            temp.push(data);
            data = temp;
          }
          console.log(data)
          _this.setData({
            system: data
          });
        }else{
          //获取失败
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
  nav_to: function (e) {
    var studyid = e.currentTarget.dataset.studyid;
    wx.navigateTo({
      url: '/pages/index/study/study_detail/study_detail?studyId=' + studyid
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
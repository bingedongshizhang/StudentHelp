// pages/login/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'avatarUrl': '',
    'type': [
      '学生',
      '维修工',
      '商家'
    ],
    'index': 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var _this = this;
    //获取用户信息
    wx.getUserInfo({
      success: function (res) {
        getApp().globalData.userInfo = res.userInfo;
        _this.setData({
          avatarUrl: res.userInfo.avatarUrl
        })
      }
    })
  },
  bindPickerChange: function(e){
    console.log(e.detail);
    this.setData({
      index: e.detail.value
    })
  }
})
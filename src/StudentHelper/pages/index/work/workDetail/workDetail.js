// pages/index/work/workDetail/workDetail.js
Page({
  data: {
    jobid: '',
    jobDetail: {}
  },
  onLoad: function (options) {
    console.log(options.jobid);
    this.setData({
      jobid: options.jobid
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function (options) {
    var _this = this;
    var jobDetail = wx.getStorageSync('jobDetail');
    this.setData({
      jobDetail: jobDetail
    })
  },
  send: function(){
    wx.navigateTo({
      url: '/pages/index/work/send/send?jobid=' + this.data.jobid
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  call: function () {
    var phone = this.data.jobDetail.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  }
})
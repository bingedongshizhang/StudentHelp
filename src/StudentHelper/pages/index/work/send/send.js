// pages/index/work/send/send.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'type': [
      '男',
      '女'
    ],
    'index': 0,
    'jobid': '',
    'name': '',
    'gender': 0,
    'phone': '',
    'detail': ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.jobid);
    this.setData({
      jobid: options.jobid
    });
  },
  onShow: function () {
    console.log(this.data.jobid)
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      gender: e.detail.value
    })
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  detailInput: function (e) {
    this.setData({
      detail: e.detail.value
    })
  },
  send: function () {
    var _this = this;
    var introduce = {};
    if (this.data.name=='' || this.data.phone=='' || this.data.detail==''){
      wx.showModal({
        title: '提示',
        content: '请补全信息',
        showCancel: false
      })
      return;
    }
    introduce['name'] = this.data.name;
    introduce['gender'] = this.data.gender;
    introduce['phone'] = this.data.phone;
    introduce['detail'] = this.data.detail;
    introduce = JSON.stringify(introduce);
    wx.request({
      url: 'https://wx.bingexxx.net/CollegeApp2.4/PartTimeAction.action?type=usersend',
      data: {
        jobid: this.data.jobid,
        introduce: introduce
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': getApp().globalData.cookie
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 1) {
          wx.showToast({
            title: '投递成功',
            icon: 'info',
            duration: 1000,
            mask: true,
            success: function(){
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/index/work/workDetail/workDetail?jobid=' + _this.data.jobid
                })
              }, 1000);
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '服务器抽风了, 请稍后再试',
            showCancel: false
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
  }
})
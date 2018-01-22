// pages/index/fix/send/send.js
Page({

  data: {
    'position': '',
    'detail': '',
    'phone': ''
  },

  positionInput: function (e) {
    this.setData({
      position: e.detail.value
    })
  },
  detailInput: function (e) {
    this.setData({
      detail: e.detail.value
    })
  },
  phoneInput: function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  send: function(){
    var _this = this;
    if (!this.data.position) {
      wx.showModal({
        title: '提示',
        content: '地点不能为空',
        showCancel: false
      })
    } else if (!this.data.detail) {
      wx.showModal({
        title: '提示',
        content: '故障详情不能为空',
        showCancel: false
      })
    } else {
      var detail = {};
      detail['detail'] = this.data.detail;
      detail['phone'] = this.data.phone;
      detail = JSON.stringify(detail);
      wx.request({
        url: 'https://wx.bingexxx.net/CollegeApp2.4/FixAction.action?type=send',
        data: {
          position: this.data.position,
          detail: detail
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
              title: '提交成功',
              icon: 'info',
              duration: 1000,
              mask: true,
              success: function(){
                setTimeout(function () {
                  wx.redirectTo({
                    url: '/pages/index/fix/index/index'
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
  }
})
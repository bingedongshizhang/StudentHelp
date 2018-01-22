// pages/me/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: ""
  },

  textarea: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  send: function () {
    var _this = this;
    if (this.data.content == ""){
      wx.showModal({
        title: '提交',
        content: '输入的内容不能为空',
        showCancel: false
        
      })
      return;
    }
    wx.request({
      url: 'https://wx.bingexxx.net/CollegeApp2.4/MessageAction.action',
      data: {
        content: this.data.content,
        type: "advicesend"
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': getApp().globalData.cookie
      },
      success: function (res) {
        if(res.data.code == 1){
          wx.showToast({
            title: '提交成功',
            icon: 'info',
            duration: 1000,
            mask: true,
            success: function () {
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/me/index/index'
                })
              }, 1000);
            }
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
})
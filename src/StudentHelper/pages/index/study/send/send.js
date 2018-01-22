// pages/index/study/send/send.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pictures: [],
    content: "",
  },

  choosePicture: function () {
    var _this = this;
    wx.chooseImage({
      sizeType: 'original',
      success: function (res) {
        res.tempFilePaths = _this.data.pictures.concat(res.tempFilePaths);
        console.log(res.tempFilePaths)
        _this.setData({
          pictures: res.tempFilePaths
        })
      }
    })
  },

  send: function () {
    //先上传内容
    var _this = this;
    wx.showLoading({
      title: '上传中',
      mask: true
    });
    wx.request({
      url: 'https://wx.bingexxx.net/CollegeApp2.4/BaseStudyAction.action?type=send',
      data: {
        content: this.data.content
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': getApp().globalData.cookie
      },
      success: function (res) {
        console.log(res)
        var num = 0;
        if (res.data.code == 1) {
          console.log(res.data.studyid);
          var pic = _this.data.pictures;
          for (var i = 0; i < pic.length; i++) {
            console.log(pic[i])
            wx.uploadFile({
              url: 'https://wx.bingexxx.net/CollegeApp2.4/WxUpLoadAction.action', //仅为示例，非真实的接口地址
              filePath: pic[i],
              name: 'file',
              formData: {
                'type': 'studypic',
                "studyid": res.data.studyid
              },
              success: function (res) {
                num++;
                if (num == pic.length) {
                  wx.hideLoading();
                  wx.redirectTo({
                    url: '/pages/index/study/study_list/study_list'
                  })
                }

              }
            })
          }
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
  },

  textarea: function (e) {
    this.setData({
      content: e.detail.value
    })
  }
})
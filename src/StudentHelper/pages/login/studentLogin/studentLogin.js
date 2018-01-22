Page({
  data: {
    avatarUrl: "",
    studentid: "",
    password: "",
    nick: "",
    'items': [
      {
        'name': '学生',
        'checked': true
      },
      {
        'name': '维修工',
        'checked': false
      },
      {
        'name': '商家',
        'checked': false
      }
    ],
    'type': '学生'
  },
  onLoad: function (options) {
    var _this = this;
    //判断是否已经登录
    try {
      var value = wx.getStorageSync('isLogin')
      if (value) {
        // wx.switchTab({
        //   url: '/pages/index/index/index'
        // })
      }
    } catch (e) {
    }
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
  login: function () {
    var _this = this;
    if (!this.data.studentid) {
      wx.showModal({
        title: '提示',
        content: '学号不能为空',
        showCancel: false
      })
    } else if (!this.data.password) {
      wx.showModal({
        title: '提示',
        content: '密码不能为空',
        showCancel: false
      })
    } else {
      var url = 'https://wx.bingexxx.net/CollegeApp2.4/LoginAction.action?logintype=';
      if (_this.data.type == '学生'){
        url += '0';
      } else if (_this.data.type == '维修工'){
        url += '1';
      } else if (_this.data.type == '商家') {
        url += '2';
      }
      wx.request({
        url: url,
        data: {
          username: this.data.studentid,
          password: this.data.password
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 1) {
            try {
              wx.setStorageSync('isLogin', true);
            } catch (e) {
            }
            //保存cookie
            var cookie = res.header['Set-Cookie'].split(";")[0];
            getApp().globalData.cookie = cookie;
            wx.showToast({
              title: '登录成功',
              icon: 'info',
              duration: 1500,
              mask: true,
              complete: function () {
                wx.switchTab({
                  url: '/pages/index/headLine/headLineList/headLineList'
                })
              }
            })
            console.log(getApp().globalData.cookie)

            //上传微信头像
            wx.downloadFile({
              url: _this.data.avatarUrl, 
              success: function (res) {
                // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                if (res.statusCode === 200) {
                  console.log(res.tempFilePath);
                  wx.uploadFile({
                    url: 'https://wx.bingexxx.net/CollegeApp2.4/WxUpLoadAction.action', //仅为示例，非真实的接口地址
                    filePath: res.tempFilePath,
                    name: 'file',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                      'Cookie': getApp().globalData.cookie
                    },
                    formData: {
                      'type': 'icon'
                    },
                    success: function (res) {
                      var data = res.data
                      console.log(res)
                      //上传昵称
                      wx.request({
                        url: 'https://wx.bingexxx.net/CollegeApp2.4/MesChangeAction.action?changetype=change',
                        data: {
                          nick: "bin"
                        },
                        method: "POST",
                        header: {
                          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                          'Cookie': getApp().globalData.cookie
                        },
                        success: function (res) {
                          console.log(res)
                        }
                      })
                      //do something
                    }
                  })
                }
              }
            })
            
          } else {
            wx.showModal({
              title: '提示',
              content: '登录失败',
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
  },
  idInput: function (e) {
    this.setData({
      studentid: e.detail.value
    })
  },
  pwdInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  //修改个人资料
  updateInfo: function () {
    var _this = this;
    this.setData({
      nick: _this.data.nick,
    })
  },
  radioChange: function (e) {
    this.setData({
      type: e.detail.value
    })
  }
})
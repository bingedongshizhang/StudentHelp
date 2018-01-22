// pages/index/study/study_list/study_list.js
Page({
  data: {
    lists: [],
    curPicture: "",
    boxShow: false
  },
  onLoad: function (options) {
    this.request();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    this.request();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  nav_to: function (e) {
    var studyid = e.currentTarget.dataset.studyid;
    wx.navigateTo({
      url: '/pages/index/study/study_detail/study_detail?studyId=' + studyid
    })
  },
  previewPicture(e) {
    this.setData({
      curPicture: e.currentTarget.dataset.curpicture
    })
    console.log(e.currentTarget.dataset)
  },
  previewPictures: function (e) {
    var _this = this;
    console.log(e.currentTarget.dataset.pictures)
    console.log(_this.data.curPicture)
    wx.previewImage({
      current: _this.data.curPicture, // 当前显示图片的http链接
      urls: e.currentTarget.dataset.pictures
    })
  },
  oper: function (e) {
    var _this = this;
    var code = e.currentTarget.dataset.code;
    var studyid = e.currentTarget.dataset.studyid;
    wx.request({
      url: 'https://wx.bingexxx.net/CollegeApp2.4/BaseStudyAction.action?type=' + code,
      data: {
        studyid: studyid
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': getApp().globalData.cookie
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 1) {
          var lists = _this.data.lists;
          for (var i = 0; i < lists.length; i++) {
            if (lists[i].studyId == studyid) {
              if (code == 'like') {
                lists[i].islike = true;
                lists[i].like++;
              } else if (code == 'unlike') {
                lists[i].islike = false;
                lists[i].like--;
              } else if (code == 'collected') {
                lists[i].iscollect = true;
                lists[i].collections++;
              } else if (code == 'uncollected') {
                lists[i].iscollect = false;
                lists[i].collections--;
              }
              _this.setData({
                lists: lists
              })
              console.log(code)
              break;
            }
          }
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
  request: function(){
    // 页面显示
    var _this = this;
    wx.request({
      url: 'https://wx.bingexxx.net/CollegeApp2.4/GetStudyAction.action?type=outline',
      // data: {
      //   start: '0',
      //   length: '100'
      // },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': getApp().globalData.cookie
      },
      success: function (res) {
        if (res.data.code == 1) {
          if (!res.data.lists) {
            _this.setData({
              boxShow: true
            })
            return;
          }
          if (res.data.lists.content) {
            var arr = [];
            arr.push(res.data.lists)
            res.data.lists = arr;
          }
          console.log(res.data)
          var lists = res.data.lists;
          for (var i = 0; i < lists.length; i++) {
            res.data.lists[i].icon = "https://wx.bingexxx.net/CollegeApp2.4/" + res.data.lists[i].icon;
            var pictures = [];
            for (var key in lists[i].pictures) {
              pictures.push("https://wx.bingexxx.net/CollegeApp2.4/" + lists[i].pictures[key])
            }
            lists[i].pictures = pictures;

          }
          _this.setData({
            lists: res.data.lists
          })
          console.log(_this.data.lists)
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
  nav_toSend(e) {
    wx.navigateTo({
      url: '/pages/index/study/send/send'
    })
  }
})
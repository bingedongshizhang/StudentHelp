//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    lists: [],
    boxShow: false
  },
  onLoad: function () {
    console.log('onLoad')
  },
  onShow: function(){
    // 页面显示
    var _this = this;
    wx.request({
      url: 'https://wx.bingexxx.net/CollegeApp2.4/GetHeadLineAction.action?type=outline',
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
          var lists = res.data.lists;
          if (lists.time) {
            var temp = [];
            temp.push(lists);
            lists = temp;
          }
          for (var i = 0; i < lists.length; i++) {
            var picList = [];
            var n = 1;
            for (var key in lists[i].pictures) {
              picList.push(lists[i].pictures['url' + n])
              n++;
            }
            lists[i].pictures = picList;
            for (var j = 0; j < lists[i].pictures.length; j++) {
              var url = 'https://wx.bingexxx.net/CollegeApp2.4/' + lists[i].pictures[j];
              lists[i].pictures[j] = url;
            }
          }
          console.log(lists)
          _this.setData({
            lists: lists
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
  previewPicture(e) {
    this.setData({
      curPicture: e.currentTarget.dataset.curpicture
    })
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
  nav_to: function (e) {
    var headlineid = e.currentTarget.dataset.headlineid;
    wx.navigateTo({
      url: '/pages/index/headLine/headLineDetail/headLineDetail?headlineid=' + headlineid
    })
  },
})

// pages/index/work/workList/workList.js
Page({
  data: {
    lists: {},
    tap: 0,
    title: '',
    select: {
      'type': 2,
      'gender': '男女不限',
      'status': 0
    },
    boxShow: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    this.request(0, 'https://wx.bingexxx.net/CollegeApp2.4/PartTimeAction.action?type=sellerall');
  },
  request: function (code,url,title) {
    // 页面显示
    var data = {};
    if(code != 3){
      data.status = code;
    }else{
      data.title = title;
    }
    var _this = this;
    wx.request({
      url: url,
      data: data,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': getApp().globalData.cookie
      },
      success: function (res) {
        console.log(res)
        // if (res.data.code == 1) {
        if (!res.data.lists) {
          _this.setData({
            boxShow: true
          })
          return;
        }
        if (res.data.lists.time) {
          var arr = [];
          arr.push(res.data.lists)
          res.data.lists = arr;
        }
        console.log(res.data)
        var data = res.data;
        for (var i = 0; i < data.lists.length; i++) {
          data.lists[i].detail = JSON.parse(data.lists[i].detail)
          var gender = data.lists[i].detail.gender;
          if (gender == '0') {
            gender = '男女不限';
          } else if (gender == '1') {
            gender = '只限男生';
          } else if (gender == '2') {
            gender = '只限女生';
          }
          data.lists[i].detail.gender = gender;
          var type = data.lists[i].detail.type;
          if (type == '0') {
            type = '短期招聘';
          } else if (type == '1') {
            type = '长期招聘';
          }
          data.lists[i].detail.type = type;
        }
        console.log(data)
        _this.setData({
          lists: data.lists
        })
        // }
        //对列表进行筛选
        var temp = [];
        var lists = _this.data.lists;
        console.log(lists)
        for (var i = 0; i < lists.length; i++) {
          if (_this.data.select.type == 2 && lists[i].detail.gender == _this.data.select.gender) {
            if (lists[i].detail.gender == _this.data.select.gender){
              temp.push(lists[i]);
            }
          } else {
            if (lists[i].detail.gender == _this.data.select.gender && lists[i].detail.type == _this.data.select.type) {
              temp.push(lists[i]);
            }
          }
        };
        _this.setData({
          lists: temp
        })

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
  tap: function (e) {
    var tap = e.currentTarget.dataset.tap;
    if (this.data.tap == tap) {
      tap = 0;
    }
    this.setData({
      tap: tap
    })
  },
  select: function (e) {
    this.setData({
      tap: 0
    })
    //对状态进行筛选
    var select = this.data.select;
    if (e.currentTarget.dataset.type == 'status') {
      select.status = e.currentTarget.dataset.code
      this.setData({
        select: select
      })
    }
    this.request(this.data.select.status, 'https://wx.bingexxx.net/CollegeApp2.4/PartTimeAction.action?type=sellerall');
    if (e.currentTarget.dataset.type == 'gender') {
      select.gender = e.currentTarget.dataset.code
      this.setData({
        select: select
      })
    } else if (e.currentTarget.dataset.type == 'type') {
      select.type = e.currentTarget.dataset.code
      this.setData({
        select: select
      })
    }
  },
  bindInput: function(e){
    this.setData({
      title: e.detail.value
    })
  },
  find: function(){
    var url = 'https://wx.bingexxx.net/CollegeApp2.4/PartTimeAction.action?type=sellersearch';
    console.log(url)
    this.request(3, url, this.data.title);
  },
  nav_to: function (e) {
    var jobid = e.currentTarget.dataset.jobid;
    var lists = this.data.lists;
    for(var i=0;i<lists.length;i++){
      if (lists[i].jobid == jobid){
        console.log(lists[i])
        wx.setStorageSync('jobDetail', lists[i]);
        break;
      }
    }
    wx.navigateTo({
      url: '/pages/index/work/workDetail/workDetail?jobid=' + jobid
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
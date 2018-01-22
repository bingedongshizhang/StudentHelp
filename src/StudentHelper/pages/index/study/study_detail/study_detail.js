// pages/index/study/study_detail/study_detail.js
Page({
  data: {
    hidden: false,
    studyid: "",
    lists: '',
    curPicture: "",
    focus: false,
    content: "",
    commentid: -1,
    comments: [],
    tempNick: "",
    inputValue: "说点什么..."
  },
  onLoad: function (options) {
    console.log(options.studyId);
    this.setData({
      studyid: options.studyId
    });
    this.request();
  },
  oper: function (e) {
    var _this = this;
    var code = e.currentTarget.dataset.code;
    var studyid = this.data.studyid;
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
        if (res.data.code == 1) {
          var lists = _this.data.lists;
          if (code == 'like') {
            lists.islike = true;
            lists.like++;
          } else if (code == 'unlike') {
            lists.islike = false;
            lists.like--;
          } else if (code == 'collected') {
            lists.iscollect = true;
            lists.collections++;
          } else if (code == 'uncollected') {
            lists.iscollect = false;
            lists.collections--;
          }
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
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
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
  comment: function (e) {
    var commentid = e.currentTarget.dataset.commentid;
    console.log(commentid)
    var nick = e.currentTarget.dataset.nick;
    if (commentid) {
      this.setData({
        commentid: commentid,
        tempNick: nick,
        inputValue: "回复" + nick
      })
    }
    this.setData({
      focus: true
    })
  },
  bindInput: function (e) {
    this.setData({
      content: e.detail.value
    })
    console.log(this.data.content)
  },
  publish: function () {
    console.log(this.data.studyid)
    var data = {};
    var url;
    if(this.data.content == ''){
      return;
    }
    if (this.data.commentid == -1) {
      url = 'https://wx.bingexxx.net/CollegeApp2.4/BaseStudyAction.action?type=comment';
      data.content = this.data.content;
      data.studyid = this.data.studyid;
    } else {
      url = 'https://wx.bingexxx.net/CollegeApp2.4/BaseStudyAction.action?type=commentchaild';
      data.content = this.data.content;
      data.commentid = this.data.commentid;
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
        if (res.data.code == 1) {
          _this.setData({
            content: ''
          });
          _this.request();
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
  request: function(){
    var _this = this;
    wx.request({
      url: 'https://wx.bingexxx.net/CollegeApp2.4/GetStudyAction.action?type=detail',
      data: {
        studyid: this.data.studyid
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': getApp().globalData.cookie
      },
      success: function (res) {
        console.log(res)
        var lists = res.data.lists;
        lists.icon = 'https://wx.bingexxx.net/CollegeApp2.4/' + lists.icon;
        var pictures = [];
        for (var key in lists.pictures) {
          pictures.push("https://wx.bingexxx.net/CollegeApp2.4/" + lists.pictures[key])
        }
        lists.pictures = pictures;
        _this.setData({
          lists: lists
        })
        var comments = res.data.comments.commentlist;
        if (comments && comments.UserNickName) {
          var temp = [];
          temp.push(comments);
          comments = temp
        }
        for (var i = 0; i < comments.length; i++) {
          if (comments[i].commentchaildcount == 1) {
            var temp = comments[i].commentchaildlist;
            comments[i].commentchaildlist = [];
            comments[i].commentchaildlist.push(temp)
          }
          for (var j = 0; j < comments[i].commentchaildcount; j++) {
            comments[i].commentchaildlist[j].content = comments[i].commentchaildlist[j].UserNickName + '回复:' + comments[i].commentchaildlist[j].commentdetail;
          }
        }
        _this.setData({
          comments: comments
        })
        console.log(_this.data.comments)
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
  // ,
  // bindblur: function(){
  //   this.setData({
  //     tempCommentid: "",
  //     tempNick: "",
  //     inputValue: "说点什么...",
  //     commentid: -1
  //   })
  // }
})
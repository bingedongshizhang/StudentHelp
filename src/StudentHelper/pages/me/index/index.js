// pages/me/me.js
Page({
  data:{
    'nickName': '',
    'avatarUrl': '',
    'signature': ''
  },
  onLoad:function(){
    //设置用户头像
    this.setData({
      avatarUrl: getApp().globalData.userInfo.avatarUrl,
      nickName: getApp().globalData.userInfo.nickName
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  abouts: function(){
    wx.showModal({
      title: '关于我们',
      content: '我们是广东海洋大学的技术类型团队',
      showCancel: false
    })
  }

  // information: function () {
  //   console.log(11)
  //   wx.navigateTo({
  //     url: '/pages/me/information/information'
  //   })
  // }
})
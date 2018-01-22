util = {
    showModel: function (content) {
        wx.showModal({
            title: '提示',
            content: content,
            showCancel: false
        })
    }
}

exports.util = util
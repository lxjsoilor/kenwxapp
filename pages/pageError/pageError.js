var a = getApp();

Page({
    data: {},
    onLoad: function() {},
    refresh: function() {
        if (wx.showLoading({
            title: "",
            mask: !0
        }), a.globalData.networkConnected) a.globalData.errorPageShow && (a.globalData.errorPageShow = !1), 
        wx.navigateBack({
            delta: 1
        }); else setTimeout(function(a) {
            wx.hideLoading();
        }, 1e3);
    }
});
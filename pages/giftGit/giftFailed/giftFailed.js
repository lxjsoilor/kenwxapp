var a = getApp();

Page({
    data: {
        isIPX: a.globalData.isIPX,
        imageBg: a.globalData.imgUrl.giftFailed
    },
    onLoad: function() {
        a.mta.Page.init();
    },
    goToDetail: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    }
});
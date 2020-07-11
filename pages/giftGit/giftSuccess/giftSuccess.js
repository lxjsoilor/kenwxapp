var a = getApp();

Page({
    data: {
        isIPX: a.globalData.isIPX,
        imageBg: a.globalData.imgUrl.giftSuccess
    },
    onLoad: function() {},
    goToDetail: function() {
        wx.switchTab({
            url: "/pages/plp/plp"
        });
    }
});
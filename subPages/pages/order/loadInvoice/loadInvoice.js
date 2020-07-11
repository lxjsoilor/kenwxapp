var a = getApp();

Page({
    data: {
        isIPX: a.globalData.isIPX
    },
    onLoad: function(o) {
        a.mta.Page.init();
        var n = a.globalData.loadInvoiceUrl;
        this.data.url = n, this.setData({
            url: n
        }), console.log("url-------------------------\x3e", n);
    },
    onReady: function() {},
    onShow: function(a) {},
    onHide: function() {},
    onUnload: function() {}
});
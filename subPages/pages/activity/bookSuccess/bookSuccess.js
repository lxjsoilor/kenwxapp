var a = getApp();

a.VICTSTORE, a.BEN;

Page({
    data: {
        pageStatus: {
            isIPX: a.globalData.isIPX,
            needRefresh: !1,
            loadStatus: "unloaded",
            error: {
                title: "",
                btn: "",
                method: ""
            }
        },
        bannerImgUrl: a.globalData.imgUrl.bookSuccessBanner
    },
    store: {
        config: {
            needOnLoad: !0,
            pageLife: a.globalData.pageLife,
            pageLoadedTime: null
        }
    },
    page_init: function(e) {
        var t = e.date, n = e.address;
        this.setData({
            date: t,
            address: n
        }), a.page_change_loaded(this);
    },
    onLoad: function(e) {
        this.setData({
            "pageStatus.isIPX": a.globalData.isIPX
        });
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    go_to_index: function() {
        a.switchTab(this, {
            url: "/pages/index/index"
        });
    },
    onShow: function() {
        a.page_load(this);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});
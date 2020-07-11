var e = getApp();

e.VICTSTORE, e.BEN;

Page({
    data: {
        pageStatus: {
            isIPX: e.globalData.isIPX,
            needRefresh: !1,
            loadStatus: "unloaded",
            error: {
                title: "",
                btn: "",
                method: ""
            }
        },
        bannerImgUrl: e.globalData.imgUrl.voteSuccessBanner
    },
    store: {
        config: {
            needOnLoad: !0,
            pageLife: e.globalData.pageLife,
            pageLoadedTime: null
        }
    },
    page_init: function(t) {
        e.page_change_loaded(this);
    },
    onLoad: function(t) {
        this.setData({
            "pageStatus.isIPX": e.globalData.isIPX
        });
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    go_to_voteResults: function() {
        e.navigateTo(this, {
            url: "../voteResults/voteResults"
        });
    },
    go_to_index: function() {
        e.switchTab(this, {
            url: "/pages/index/index"
        });
    },
    onShow: function() {
        e.page_load(this);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
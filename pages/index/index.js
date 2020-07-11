var t = getApp(), e = t.VICTSTORE;

Page({
    data: {
        pageStatus: {
            isIPX: t.globalData.isIPX,
            needRefresh: !1,
            loadStatus: "unloaded",
            error: {
                title: "",
                btn: "",
                method: ""
            }
        },
        viewData: {},
        scroImgList: [],
        currentIndex: 0,
        intoViewItem: 0,
        needAuth: !1
    },
    store: {
        config: {
            needOnLoad: !0,
            pageLife: t.globalData.pageLife,
            pageLoadedTime: null
        }
    },
    page_init: function(e) {
        this.setPageHeight(), this.initView();
        var a = wx.getStorageSync("unionId");
        a ? t.globalData.unionId = a : this.findAccountInfo(), this.trackingCode = wx.getStorageSync("trackingCode"), 
        console.log("this.trackingCode--------------", this.trackingCode), t.mta.Event.stat("pageindexSource", {
            tc: this.trackingCode
        });
    },
    page_refresh: function() {
        this.page_init(this.options), this.setCartNum();
    },
    onLoad: function() {
        t.mta.Page.init(), this.setData({
            "pageStatus.isIPX": t.globalData.isIPX
        }), this.memberModel = e.use("member"), this.cartModel = e.use("cart");
    },
    onReady: function() {
        this.videoContext = wx.createVideoContext("myVideo", this);
    },
    onShow: function() {
        console.log("index.onShow-------------------------\x3e"), wx.hideTabBar({
            fail: function() {
                setTimeout(function() {
                    wx.hideTabBar;
                }, 100);
            }
        }), t.page_load(this), this.setCartNum(), t.mta.Event.stat("btnTabBannerSlide", {
            banner: this.data.currentIndex + 1
        });
    },
    onHide: function() {
        console.log("onhide-------------");
        for (var t in this.data.viewData) if (this.data.viewData[t].play) {
            var e;
            this.setData((e = {}, e["viewData." + t + ".play"] = !1, e));
        }
    },
    findAccountInfo: function() {
        var e = this;
        t.loginWarranty().then(function(a) {
            e.memberModel.findAccount({
                useUnex: !0
            }).then(function(a) {
                var n = a.unionId, i = a.userCode;
                i && (t.globalData.userCode = i), n ? e.saveUnionId(n) : e.getUnionIdWithLoginPromise();
            }).catch(function(t) {
                e.setData({
                    needAuth: !0
                });
            });
        }).catch(function(t) {
            e.setData({
                needAuth: !0
            });
        });
    },
    getUnionIdWithLoginPromise: function() {
        var t = this;
        e.promise.openid.then(function(e) {
            var a = e.unionId;
            a ? t.saveUnionId(a) : t.setData({
                needAuth: !0
            });
        }).catch(function(e) {
            t.setData({
                needAuth: !0
            });
        });
    },
    saveUnionId: function(e) {
        t.globalData.unionId = e, wx.setStorageSync("unionId", e), this.setData({
            needAuth: !1
        });
    },
    setPageHeight: function() {
        var e = t.globalData.systemInfo.statusBarHeight, a = t.globalData.isIPhone ? 44 : 48;
        this.setData({
            header_height: a,
            statusBarHeight: e
        });
    },
    setCartNum: function() {
        var e = this;
        t.loginWarranty().then(function(a) {
            e.cartModel.getCartNum({
                cartLineFormat: t.cartLineFormat
            }).then(function(t) {
                e.setData({
                    cartNum: t.disableTotal + t.total
                });
            });
        });
    },
    initView: function() {
        var e = this;
        this.loadView().then(function(a) {
            console.log("res-----------", a);
            var n = e.viewData(a), i = e.scroImgList(a);
            t.page_change_loaded(e, {
                viewData: n,
                scroImgList: i
            });
        }).catch(function(a) {
            t.page_change_error(e);
        });
    },
    loadView: function() {
        var e = {
            tenantCode: t.globalData.tenantCode,
            modelCode: "xcx",
            smodelCode: "index",
            browseEnv: "PC"
        };
        return new Promise(function(a, n) {
            t.POST(t.apiUrl.cms.cmsUrl, e).then(function(t) {
                console.log("首页loadView-----res----", t), t.success ? a(t.data.first.value) : n(t);
            }).catch(function(t) {
                console.log("首页loadView-----catch-----", t), n(t);
            });
        });
    },
    viewData: function(t) {
        var e = {};
        return t.forEach(function(t, a) {
            t.sourcetype ? e[a] = {
                type: "video",
                sourcetype: t.sourcetype,
                imgUrl: t.videobgurl,
                videoUrl: t.imgurl,
                play: !1,
                moreUrl: t.imgdes
            } : e[a] = {
                type: "img",
                imgUrl: t.videobgurl,
                toUrl: t.imgdes
            };
        }), e;
    },
    scroImgList: function(t) {
        var e = t.map(function(t, e) {
            return t.sourcetype ? {
                code: e,
                type: "video",
                sourcetype: t.sourcetype,
                url: t.imgfile
            } : {
                code: e,
                type: "img",
                url: t.imgfile
            };
        });
        return e;
    },
    click: function(e) {
        console.log("ev-------", e);
        var a = e.currentTarget.dataset.code;
        t.mta.Event.stat("btnTabBannerSlide", {
            banner: a + 1
        }), this.setData({
            currentIndex: a,
            intoViewItem: a
        }), this.resetPlay();
    },
    swiper_change: function(e) {
        console.log("swiper_change________ev", e), t.mta.Event.stat("btnTabBannerSlide", {
            banner: e.detail.current + 1
        }), this.setData({
            currentIndex: e.detail.current,
            intoViewItem: e.detail.current
        }), this.resetPlay();
    },
    resetPlay: function() {
        var t = !1;
        for (var e in this.data.viewData) this.data.viewData[e].play && (this.data.viewData[e].play = !1, 
        t = !0);
        t && this.setData({
            viewData: this.data.viewData
        });
    },
    play: function(t) {
        var e;
        console.log("ev-------", t);
        var a = t.currentTarget.dataset.code;
        this.setData((e = {}, e["viewData." + a + ".play"] = !0, e));
    },
    playEnd: function(t) {
        var e;
        console.log("playend---------ev", t);
        var a = t.currentTarget.dataset.code;
        this.setData((e = {}, e["viewData." + a + ".play"] = !1, e));
    },
    more: function(e) {
        console.log("ev-------", e), t.mta.Event.stat("btnTabProduct", {
            banner: this.data.currentIndex + 1,
            tc: this.trackingCode
        });
        var a = e.currentTarget.dataset.url;
        "/pages/plp/plp" == a ? t.switchTab(this, {
            url: a
        }) : t.navigateTo(this, {
            url: a
        });
    },
    navTo: function(e) {
        t.mta.Event.stat("btnTabProduct", {
            banner: this.data.currentIndex + 1,
            tc: this.trackingCode
        });
        var a = e.currentTarget.dataset.url;
        console.log("url----------", a), "/pages/plp/plp" == a ? t.switchTab(this, {
            url: a
        }) : t.navigateTo(this, {
            url: a
        });
    },
    onShareAppMessage: function() {}
});
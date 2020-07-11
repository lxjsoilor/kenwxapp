var t = getApp(), e = t.apiUrl, o = t.VICTSTORE;

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
        scrollTop: 5,
        itemList: [],
        likeCountObj: {},
        needAuth: !1,
        noMore: !1
    },
    store: {
        config: {
            needOnLoad: !1,
            pageLife: t.globalData.pageLife,
            pageLoadedTime: null
        },
        articleCodes: [],
        pageNum: 1,
        pageSize: 5
    },
    page_init: function(e) {
        this.setPageHeight();
        var o = wx.getStorageSync("unionId");
        o ? t.globalData.unionId = o : this.findAccountInfo(), this.getMenueTree();
    },
    page_refresh: function() {
        this.page_init(this.options), this.setCartNum();
    },
    setPageHeight: function() {
        var e = t.globalData.systemInfo.statusBarHeight, o = t.globalData.isIPhone ? 44 : 48;
        this.setData({
            header_height: o,
            statusBarHeight: e
        });
    },
    setCartNum: function() {
        var e = this;
        t.loginWarranty().then(function(o) {
            e.cartModel.getCartNum({
                cartLineFormat: t.cartLineFormat
            }).then(function(t) {
                e.setData({
                    cartNum: t.disableTotal + t.total
                });
            });
        });
    },
    onLoad: function() {
        t.mta.Page.init(), this.setData({
            "pageStatus.isIPX": t.globalData.isIPX
        }), this.memberModel = o.use("member"), this.cartModel = o.use("cart"), this.getHeaderHeight();
    },
    onShow: function(e) {
        t.page_load(this, e), this.setCartNum();
    },
    getHeaderHeight: function() {
        var e = t.globalData.systemInfo.statusBarHeight, o = t.globalData.isIPhone;
        console.log("isIPhone-----------------------\x3e", o);
        var a = o ? 44 : 48, n = o ? 78 : 58, i = a + e;
        this.setData({
            headerHeight: i,
            tabbarHeight: n
        });
    },
    findAccountInfo: function() {
        var e = this;
        t.loginWarranty().then(function(o) {
            e.memberModel.findAccount({
                useUnex: !0
            }).then(function(o) {
                var a = o.unionId, n = o.userCode;
                n && (t.globalData.userCode = n), a ? e.saveUnionId(a) : e.getUnionIdWithLoginPromise();
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
        o.promise.openid.then(function(e) {
            var o = e.unionId;
            o ? t.saveUnionId(o) : t.setData({
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
    getMenueTree: function() {
        var o = this, a = {
            menuParentCode: "root",
            menuType: "0",
            menuUrlType: "0"
        };
        t.POST(e.cms.cmsMenuTree, a).then(function(t) {
            var e = (t.data || []).filter(function(t) {
                return "精选晒单" == t.menuName;
            })[0].menuCode;
            e && (o.store.menuCode = e, o.getDataListWithMenuCode());
        });
    },
    getDataListWithMenuCode: function(a) {
        var n = this;
        wx.showLoading();
        var i = this.store, s = {
            menuCode: i.menuCode,
            pageNum: i.pageNum,
            pageSize: i.pageSize
        };
        t.POST(e.cms.queryDocList, s).then(function(e) {
            var i = e.data.list || [], s = e.data.paginator.totalCount, r = n.data.itemList || [];
            if (!(i.length <= 0)) {
                var u = s <= (r = r.concat(i)).length;
                r.map(function(t) {
                    var e = t.doclistCode;
                    n.store.articleCodes.push(e);
                }), o.promise.openid.then(function(e) {
                    var o = e.openid;
                    o && (t.globalData.openid = o), n.setData({
                        openid: o
                    }), n.getLikeNumbers();
                }).catch(function(t) {}), wx.stopPullDownRefresh(), "fresh" == a ? t.page_change_loaded(n, {
                    itemList: r,
                    noMore: u,
                    scrollTop: 5
                }) : t.page_change_loaded(n, {
                    itemList: r,
                    noMore: u
                });
            }
        }).catch(function(e) {
            wx.hideLoading(), t.page_change_error(n);
        });
    },
    getLikeNumbers: function() {
        var o = this, a = t.globalData, n = {
            tenantCode: a.tenantCode,
            optType: 2,
            optName: a.openid,
            codes: this.store.articleCodes
        };
        t.POST(e.like.query, n).then(function(t) {
            var e = t.data || [], a = o.data.likeCountObj;
            e.map(function(t, e) {
                var o = t.content, n = t.sum, i = t.optName;
                a[o] = {}, a[o].optName = i, a[o].sum = n;
            }), o.setData({
                likeCountObj: a
            }), wx.hideLoading();
        }).catch(function(t) {
            wx.hideLoading();
        });
    },
    onFavorClick: function(t) {
        var e = t.currentTarget.dataset.id, o = this.data, a = o.likeCountObj, n = o.openid;
        a[e].optName == n ? this.cancelLikedWithRequest(e) : this.willLikeWithRequest(e);
    },
    willLikeWithRequest: function(o) {
        var a = this, n = t.globalData, i = n.tenantCode, s = n.openid, r = {
            optNum: 1,
            tenantCode: i,
            optType: 2,
            optName: s,
            content: o,
            need: !0
        };
        t.POST(e.like.doActivity, r).then(function(t) {
            var e = t.statusCode, n = a.data.likeCountObj;
            n[o] = n[o] || {};
            var i = n[o].sum || 0;
            "100010" == e && (n[o].sum = i + 1, n[o].optName = s, a.setData({
                likeCountObj: n
            }));
        });
    },
    cancelLikedWithRequest: function(o) {
        var a = this, n = t.globalData, i = {
            tenantCode: n.tenantCode,
            optType: 2,
            optName: n.openid,
            content: o
        };
        t.POST(e.like.cancel, i).then(function(t) {
            var e = a.data.likeCountObj;
            e[o] = e[o] || {}, e[o].optName = "";
            var n = e[o].sum || 0;
            e[o].sum = n - 1, a.setData({
                likeCountObj: e
            });
        });
    },
    onMoreClick: function(e) {
        var o = e.currentTarget.dataset.page;
        (o = o || "") && ([ "pages/index/index", "pages/plp/plp", "pages/orderShare/orderShare", "pages/shoppingCart/shoppingCart", "pages/myAccount/myAccount" ].filter(function(t) {
            return o.indexOf(t) >= 0;
        }).length > 0 ? t.switchTab(this, {
            url: o
        }) : t.navigateTo(this, {
            url: o
        }));
    },
    onTouchEnd: function() {
        console.log("touchend"), this.store.upper ? (this.store.upper = !1, this.freshPage()) : this.store.lower && (this.store.lower = !1, 
        this.toLoadMore());
    },
    onTouchStart: function() {
        console.log("onTouchStart");
    },
    onScrolltoupper: function() {
        console.log("onScrolltoupper"), this.store.upper = !0;
    },
    onScrolltolower: function() {
        console.log("onScrolltolower"), this.store.lower = !0;
    },
    onscroll: function(t) {},
    onPullDownRefresh: function() {
        console.log("onPullDownRefresh"), this.store.pageNum = 1, this.data.noMore = !1, 
        this.data.itemList = [], this.getDataListWithMenuCode();
    },
    freshPage: function() {
        this.store.pageNum = 1, this.data.noMore = !1, this.data.itemList = [];
        this.getDataListWithMenuCode("fresh");
    },
    toLoadMore: function() {
        var t = this.data.noMore;
        console.log("toLoadMore", t), t || (this.store.pageNum += 1, this.getDataListWithMenuCode());
    },
    onReachBottom: function() {}
});
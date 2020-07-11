var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
}, a = getApp();

Page({
    data: {
        pageStatus: {
            isIPX: a.globalData.isIPX,
            needRefresh: !1,
            loadStatus: "unloaded",
            error: {
                icon: "",
                title: "",
                btn: "",
                method: ""
            }
        },
        tabTitles: [ {
            status: 1,
            name: "available",
            text: "未使用"
        }, {
            status: 3,
            name: "used",
            text: "已使用"
        }, {
            status: 9,
            name: "invalid",
            text: "已过期"
        } ],
        onTabName: "available",
        count: {},
        dataList: {
            available: {
                list: [],
                isNoMore: !1,
                loading: !1,
                refresh: !1,
                url: a.apiUrl.coupons.query,
                req: {
                    data: {
                        status: "1"
                    },
                    page: 1,
                    size: 5
                },
                total: ""
            },
            used: {
                list: [],
                isNoMore: !1,
                loading: !1,
                refresh: !1,
                url: a.apiUrl.coupons.query,
                req: {
                    data: {
                        status: "2"
                    },
                    page: 1,
                    size: 10
                },
                total: ""
            },
            invalid: {
                list: [],
                isNoMore: !1,
                loading: !1,
                refresh: !1,
                url: a.apiUrl.coupons.query,
                req: {
                    data: {
                        status: "3"
                    },
                    page: 1,
                    size: 10
                },
                total: ""
            }
        },
        available: {
            list: [],
            isNoMore: !1,
            loading: !1,
            refresh: !1,
            url: a.apiUrl.coupons.query,
            req: {
                data: {
                    status: "1"
                },
                page: 1,
                size: 10
            },
            total: ""
        },
        noMoreConfig: {
            icon: "icon-coupon1",
            none: "您还没有相关优惠券",
            noMore: "已无更多数据"
        },
        currentDate: ""
    },
    store: {
        config: {
            needOnLoad: !1,
            pageLife: a.globalData.pageLife,
            pageLoadedTime: null
        }
    },
    promise: {},
    page_init: function(t) {
        var e = this, i = a.globalData.systemInfo.statusBarHeight + (a.globalData.isIPhone ? 44 : 48);
        this.setData({
            nfixeTop: i
        });
        var s = this.transformList, n = this.setSetting, o = this.data.tabTitles;
        this.getCurrentTime(), o.forEach(function(t) {
            a.getDataList(e, {
                name: "dataList." + t.name,
                transformList: s,
                setSetting: n
            });
        }), a.page_change_loaded(this);
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    onLoad: function(t) {
        a.mta.Page.init();
    },
    getCurrentTime: function() {
        var t = new Date(), a = t.getFullYear(), e = t.getMonth() + 1, i = t.getDate(), s = t.getHours(), n = t.getMinutes(), o = t.getSeconds(), r = a + "" + (e = e < 10 ? "0" + e : e) + (i = i < 10 ? "0" + i : i) + (s = s < 10 ? "0" + s : s) + (n = n < 10 ? "0" + n : n) + (o = o < 10 ? "0" + o : o);
        this.setData({
            currentDate: r
        }), console.log("getCurrentTime------\x3e>>", t, r);
    },
    onReady: function() {},
    onShow: function() {
        a.page_load(this);
    },
    onHide: function() {},
    onUnload: function() {},
    _status_on_tab: function(t) {
        var a = this;
        this.getCurrentTime();
        var e = this.data, i = e.onTabName, s = e.dataList, n = t.currentTarget.dataset.name;
        if (n !== i) {
            var o, r = s[n].list;
            this.setData((o = {}, o["dataList." + n + ".list"] = [], o["dataList." + n + ".loading"] = !0, 
            o.onTabName = n, o)), setTimeout(function(t) {
                var e;
                a.setData((e = {}, e["dataList." + n + ".list"] = r, e["dataList." + n + ".loading"] = !1, 
                e));
            }, 500);
        }
    },
    reset_data_list: function(e, i, s) {
        e[i].req.page = 1, e[i].loading = !1, e[i].isNoMore = !1, e[i].list = [], a.getDataList(this, t({
            name: "dataList." + i,
            transformList: this.transformList
        }, s));
    },
    onReachBottom: function(t) {
        var e = this.data.onTabName;
        this.getCurrentTime(), a.getDataList(this, {
            name: "dataList." + e,
            transformList: this.transformList
        });
    },
    onPullDownRefresh: function(t) {
        this.getCurrentTime(), console.log("enablePullDownRefresh.begin");
        var a = this.data, e = a.dataList, i = a.onTabName, s = e[i];
        if (s.refresh) wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(); else {
            var n;
            s.refresh = !0, this.reset_data_list(e, i, {
                end: function() {
                    console.log("enablePullDownRefresh.end"), wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), 
                    s.refresh = !1;
                }
            }), this.setData((n = {}, n["dataList." + i + ".list"] = [], n));
        }
    },
    transformList: function(t, a) {
        return new Promise(function(e) {
            var i = [];
            try {
                i = (i = t.data.list).filter(function(t) {
                    return "03" !== t.couponType;
                });
            } catch (t) {
                console.log(t);
            }
            i.length && i.forEach(function(t) {
                t.status_des = a;
            }), e(i);
        });
    },
    setSetting: function(t, a, e) {
        try {
            var i = a.data.total;
            i && !this.data.dataList[e.split(".")[1]].total && (t[e + ".total"] = i);
        } catch (t) {
            console.log(t);
        }
    },
    onCouponUseClick: function(t) {
        var a = this.data.onTabName, e = t.currentTarget.dataset.canjump;
        "available" === a && e && wx.switchTab({
            url: "/pages/plp/plp"
        });
    }
});
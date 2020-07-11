var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (t[r] = a[r]);
    }
    return t;
}, e = getApp(), a = e.apiUrl, r = e.VICTSTORE;

e.filters;

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
        tabList: [ "全部", "待支付", "待发货", "待收货" ],
        orderList: {
            "全部": {
                list: [],
                url: a.order.orderList,
                req: {
                    pageIndex: 1,
                    pageSize: 100,
                    orderStatus: "",
                    externalOrderId: null
                },
                loading: !1,
                isNoMore: !1,
                refresh: !1,
                needUpdate: !0
            },
            "待支付": {
                list: [],
                url: a.order.orderList,
                req: {
                    pageIndex: 1,
                    pageSize: 100,
                    orderStatus: 21,
                    externalOrderId: null
                },
                loading: !1,
                isNoMore: !1,
                refresh: !1,
                needUpdate: !0
            },
            "待发货": {
                list: [],
                url: a.order.orderList,
                req: {
                    pageIndex: 1,
                    pageSize: 100,
                    orderStatus: 31,
                    externalOrderId: null
                },
                loading: !1,
                isNoMore: !1,
                refresh: !1,
                needUpdate: !0
            },
            "待收货": {
                list: [],
                url: a.order.orderList,
                req: {
                    pageIndex: 1,
                    pageSize: 100,
                    orderStatus: 41,
                    externalOrderId: null
                },
                loading: !1,
                isNoMore: !1,
                refresh: !1,
                needUpdate: !0
            }
        },
        noMoreConfig: {
            icon: "icon-orderlist_empty",
            none: "您还没有相关订单",
            noMore: "已无更多数据"
        },
        onTabStatus: "全部",
        logistic: {
            open: !1,
            logiInfo: {}
        }
    },
    store: {
        config: {
            needOnLoad: !0,
            pageLife: e.globalData.pageLife,
            pageLoadedTime: null
        }
    },
    promise: {},
    go_to_groupDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../../spellDetail/spellDetail?orderId=" + e
        });
    },
    go_to_order_detail: function(t) {
        var a = t.currentTarget.dataset.id, r = this.data, o = r.onTabStatus, s = r.orderList[o].list.find(function(t) {
            return t.orderId === a;
        }), i = s.bGift, n = s.bTeam;
        e.navigateTo(this, {
            url: "../orderDetail/orderDetail?id=" + a + "&bGift=" + i + "&bTeam=" + n
        });
    },
    page_init: function(t) {
        var a = this, o = e.globalData.systemInfo.statusBarHeight + (e.globalData.isIPhone ? 44 : 48), s = t.nStatus, i = this.data.orderList, n = this.data.tabList[s] || this.data.onTabStatus;
        this.data.onTabStatus = n, i[n].needUpdate = !1, this.setData({
            nfixeTop: o,
            onTabStatus: n
        }), e.loginWarranty().then(function(t) {
            r.promise.openid.then(function(t) {
                e.getDataList(a, {
                    name: "orderList." + n,
                    transformList: a.transformList
                }), e.page_change_loaded(a);
            });
        });
    },
    onLoad: function(t) {
        wx.hideShareMenu(), this.setData({
            "pageStatus.isIPX": e.globalData.isIPX
        }), this.wechatModel = r.use("wechat"), this.memberModel = r.use("member");
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    onShow: function(t) {
        e.page_load(this);
        var a = this.data.orderList, r = this.data.onTabStatus;
        if (this.findUserInfo(), this.findBaseInfo(), e.globalData.bOrderStatusChange && (e.globalData.bOrderStatusChange = !1, 
        a[r].needUpdate = !0), a[r].needUpdate) {
            var o;
            this.setData((o = {}, o["orderList." + r + ".list"] = [], o)), this.reset_order_list(a, r);
        }
    },
    findBaseInfo: function() {
        e.globalData.userCode || this.memberModel.findAccount().then(function(t) {
            e.globalData.userCode = t.userCode;
        });
    },
    findUserInfo: function() {
        e.globalData.userInfo || this.memberModel.findInfo().then(function(t) {
            e.globalData.userInfo = {
                nickName: t.nickname
            };
        });
    },
    transformList: function(t) {
        var a = this;
        return new Promise(function(r) {
            var o = a.data, s = o.onTabStatus;
            o.orderList[s].needUpdate = !1;
            var i = t.body.list, n = [], d = [];
            if (i) for (var u = [ {
                status: 21,
                title: "待支付",
                bShowPayBtn: !0
            }, {
                status: 31,
                title: "待发货"
            }, {
                status: 41,
                title: "待收货"
            }, {
                status: 51,
                title: "交易成功"
            }, {
                status: 61,
                title: "交易成功"
            }, {
                status: 71,
                title: "交易关闭"
            }, {
                status: 72,
                title: "交易关闭"
            } ], l = 0; l < i.length; ++l) {
                (function(t) {
                    var e = i[t];
                    if (e.externalOrderId && "ACTIVITY" == e.externalOrderId) return "continue";
                    var a = {};
                    a.orderId = e.orderId, a.sign = e.sign, d.push(a.orderId), a.orderDate = e.orderDate, 
                    a.orderType = e.orderType, a.bTeam = !1, a.bGift = !1, 71 == a.orderType && (a.bGift = !0), 
                    a.orderStatus = e.orderStatus, a.orderStatusName = "", u.map(function(t, e) {
                        t.status == a.orderStatus && (a.orderStatusName = t.title, a.bShowPayBtn = t.bShowPayBtn);
                    }), 31 != a.orderStatus || 71 != a.orderType || e.hasReceiptInfo || (a.bShowGiveBtn = !0);
                    var r = e.orderPorductOutList;
                    a.bOneGoods = !0, a.bMoreGoods = !1, r.length > 1 && (a.bOneGoods = !1), r.length > 3 && (a.bMoreGoods = !0), 
                    a.goodsList = [];
                    var o = r.length;
                    o > 3 && (o = 3);
                    for (var s = 0; s < o; ++s) {
                        var l = {}, f = r[s], h = !1;
                        "0" === f.customReqDesc && (h = !0), l.isAdvance = h, l.skuId = f.skuId, l.goodsName = f.skuName;
                        var g = f.attribute.split(",");
                        l.size = g[0], l.series = g[1] || "", l.imgUrl = f.image, l.csellPrice = f.sellPrice, 
                        l.count = f.count, l.isGift = f.isGift, l.amount = f.amount, 1 == r.length ? a.iGoods = l : a.goodsList.push(l);
                    }
                    a.porductNum = e.porductNum, a.amount = e.amount, n.push(a);
                })(l);
            }
            var f = {
                orderCodes: d
            };
            e.POST(e.apiUrl.order.checkIsTeam, f).then(function(t) {
                var e = t.data;
                if (e && e.length > 0) for (var a = 0; a < e.length; ++a) !function(t) {
                    var a = e[t].orderCode, r = n.find(function(t) {
                        return t.orderId === a;
                    });
                    r && (r.bTeam = !0, r.teamId = e[t].teamId, r.orderStatus > 21 && 71 != r.orderStatus && 72 != r.orderStatus && (r.bShowTeamDetail = !0));
                }(a);
                r(n);
            });
        });
    },
    order_toPayTap: function(t) {
        var a = this, r = this, o = t.currentTarget.dataset, s = o.id, i = (o.index, this.data), n = i.onTabStatus, d = i.orderList, u = d[n].list.find(function(t) {
            return t.orderId === s;
        }), l = u.amount, f = u.orderId, h = u.orderDate, g = e.filters.transformTimeToStr(h);
        this.payFlag = !0;
        var c = {
            totalAmount: l,
            orderId: f,
            orderTime: g
        };
        this.payFlag && (this.payFlag = !1, this.wechatModel.pay(c).then(function(t) {
            a.payFlag = !0, e.shopListAddOrder(f), a.setData({
                showToast: !0,
                toastText: "支付成功",
                icon: "none"
            }), u.bTeam && r.updatePinTuanStatus(f, u.teamId), setTimeout(function(t) {
                var e;
                d[n].needUpdate = !0, a.setData((e = {}, e["orderList." + n + ".list"] = [], e)), 
                a.reset_order_list(d, n);
            }, 0);
        }).catch(function(t) {
            console.error("rej", t), a.payFlag = !0, a.setData({
                showToast: !0,
                toastText: "支付失败",
                icon: "none"
            }), setTimeout(function(t) {
                var e;
                d[n].needUpdate = !0, a.setData((e = {}, e["orderList." + n + ".list"] = [], e)), 
                a.reset_order_list(d, n);
            }, 0);
        }));
    },
    updatePinTuanStatus: function(t, a) {
        return new Promise(function(r, o) {
            var s = {
                teamId: a,
                orderCode: t
            };
            e.POST(e.apiUrl.team.updatePinTuanStatus, s).then(function(t) {
                r(t);
            });
        }).catch(function(t) {
            return reject(t);
        });
    },
    _status_on_tab: function(t) {
        var e = this, a = t.currentTarget.dataset.status, r = this.data, o = r.orderList;
        if (r.onTabStatus != a) {
            var s, i = o[a].list;
            this.setData((s = {}, s["orderList." + a + ".list"] = [], s["orderList." + a + ".loading"] = !0, 
            s.onTabStatus = a, s)), o[a].needUpdate ? this.reset_order_list(o, a) : setTimeout(function(t) {
                var r;
                e.setData((r = {}, r["orderList." + a + ".list"] = i, r["orderList." + a + ".loading"] = !1, 
                r));
            }, 500);
        }
    },
    reset_order_list: function(a, r, o) {
        a[r].req.pageIndex = 1, a[r].loading = !1, a[r].isNoMore = !1, a[r].list = [], e.getDataList(this, t({
            name: "orderList." + r,
            transformList: this.transformList
        }, o));
    },
    onPullDownRefresh: function(t) {
        console.log("enablePullDownRefresh.begin");
        var e = this.data, a = e.orderList, r = e.onTabStatus, o = a[r];
        if (o.refresh) wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(); else {
            var s;
            o.refresh = !0, this.reset_order_list(a, r, {
                end: function() {
                    console.log("enablePullDownRefresh.end"), wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), 
                    o.refresh = !1;
                }
            }), this.setData((s = {}, s["orderList." + r + ".list"] = [], s));
        }
    },
    onReachBottom: function(t) {
        var a = this.data.onTabStatus;
        e.getDataList(this, {
            name: "orderList." + a,
            transformList: this.transformList
        });
    },
    shareReturnFalse: function() {
        return !1;
    },
    onShareAppMessage: function(t) {
        var a = t.target.dataset.id, r = this.data, o = r.onTabStatus, s = r.orderList[o].list.find(function(t) {
            return t.orderId === a;
        }).sign, i = e.globalData.userCode, n = e.globalData.imgUrl.gift, d = e.globalData.userInfo.nickName;
        return console.log("userCode---------\x3e" + i + "------nickname-----------\x3e" + d), 
        {
            title: "好友" + d + "送你一份礼物， 快拆开看看！",
            path: "/pages/gift/gift?orderId=" + a + "&sign=" + s + "&accountId=" + i,
            imageUrl: n,
            success: function() {},
            fail: function() {}
        };
    }
});
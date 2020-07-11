var e = getApp(), t = e.filters, a = e.VICTSTORE, o = (e.apiUrl, e.BEN);

Page({
    data: {
        pageStatus: {
            isIPX: e.globalData.isIPX,
            needRefresh: !0,
            loadStatus: "unloaded",
            error: {
                title: "",
                btn: "",
                method: ""
            }
        },
        y_steps: {
            list: [],
            current: 1,
            decoration: "y"
        },
        sign: "",
        diff_time: "",
        timer: {},
        time_counter: {},
        stTimeTxt: "",
        bOpenSteps: !1,
        bShowPage: !1,
        bGift: !1,
        bTeam: !1
    },
    store: {
        config: {
            needOnLoad: !0,
            pageLife: e.globalData.pageLife,
            pageLoadedTime: null
        }
    },
    promise: {},
    _set_time_counting: function(t) {
        var a = this, i = this, n = (this.data.stOrderId, !0);
        this.data.timer.time_counter = o.time_counting({
            diff_time: t,
            type: "day",
            onCount: function(e) {
                var t = " 剩余支付时间：" + e.h + ":" + e.m + ":" + e.s;
                a.setData({
                    time_counter: e,
                    countShow: !0,
                    stTimeTxt: t
                }), n && (n = !1, wx.hideToast());
            },
            onEnd: function() {
                e.globalData.bOrderStatusChange = !0, i.page_refresh();
            }
        });
    },
    confirmOrder: function() {
        var t = this, a = this, o = this.data.iOrderMonetInfo.nAmount, i = this.data.stOrderId, n = this.data.stOrderDate, s = e.filters.transformTimeToStr(n);
        this.payFlag = !0;
        var r = {
            totalAmount: o,
            orderId: i,
            orderTime: s
        };
        this.payFlag && (this.payFlag = !1, this.wechatModel.pay(r).then(function(o) {
            if (t.payFlag = !0, e.shopListAddOrder(i), a.data.bTeam) {
                var n = a.data.teamId;
                a.updatePinTuanStatus(i, n);
            }
            e.globalData.bOrderStatusChange = !0, setTimeout(function() {
                a.page_refresh();
            }, 1e3);
        }).catch(function(e) {
            console.error("rej", e), t.payFlag = !0, a.page_refresh();
        }));
    },
    updatePinTuanStatus: function(t, a) {
        return new Promise(function(o, i) {
            var n = {
                teamId: a,
                orderCode: t
            };
            e.POST(e.apiUrl.team.updatePinTuanStatus, n).then(function(e) {
                o(e);
            });
        }).catch(function(e) {
            return reject(e);
        });
    },
    go_to_groupDetail: function() {
        e.redirectTo(this, {
            url: "../../spellDetail/spellDetail?orderId=" + this.data.stOrderId
        });
    },
    fnCancel: function() {
        this.setData({
            modalOpen: !0
        });
    },
    ensureDel: function(t) {
        function a(t) {
            wx.hideLoading(), t.success ? (e.globalData.bOrderStatusChange = !0, wx.showToast({
                title: "取消成功",
                icon: "none"
            }), setTimeout(function() {
                o.page_refresh();
            }, 1e3)) : wx.showToast({
                title: "取消失败",
                icon: "none"
            });
        }
        t.detail(), wx.showLoading({
            mask: !0
        });
        var o = this, i = this.data.stOrderId, n = {
            tenantCode: e.globalData.tenantCode,
            orderId: i
        };
        e.POST(e.apiUrl.order.cancelOrder, n).then(function(e) {
            a(e);
        });
    },
    cancelDel: function(e) {
        e.detail();
    },
    showStepsView: function() {
        this.data.isManyExpress ? e.navigateTo(this, {
            url: "../logistics/logistics"
        }) : this.setData({
            bOpenSteps: !0
        });
    },
    page_init: function(a) {
        function o() {
            var t = this, a = {
                orderId: d
            };
            e.POST(e.apiUrl.order.queryReturnGift, a).then(function(e) {
                e.data && (t.data.iStatusData.desc = "礼品未被领取，订单已取消，将尽快为您退款。");
            });
        }
        function i(a, i) {
            a && (l = !0);
            var n = {
                tenantCode: e.globalData.tenantCode,
                orderId: d
            };
            e.POST(e.apiUrl.order.orderDetail, n).then(function(a) {
                var n = a.body;
                71 == n.ordertype && (c = !0);
                var d = n.orderStatus, u = n.orderReceiptInfoOut, h = !u.location, p = "", f = "", m = "", g = !1, b = !1, S = !1, v = !1, I = !1, w = !1, D = !1, T = !1, O = !1, C = n.orderExpressProductList, y = !1;
                C && (y = !0, s.store.orderExpressProductList = C), r.map(function(t, a) {
                    if (t.status == d) {
                        if (g = t.bshowCancelBtn, p = t.title, f = t.desc, S = t.bShowBtnWrap, c && (f = t.giftDesc, 
                        31 != d || u.location || (p = "等待赠送", v = !0, S = !0, f = "48小时内未送出礼物，订单将自动取消"), 
                        72 == d && o()), y && 41 == d) {
                            var n = !1, s = !1;
                            C.forEach(function(e) {
                                0 == e.subOrderStatus && (s = !0), 1 != e.subOrderStatus && 2 != e.subOrderStatus || (n = !0);
                            }), n && s && (p = "部分发货", f = "您的部分包裹已发出，请查看物流详情");
                        }
                        l && (31 != d && 41 != d && 51 != d && 61 != d || (S = !0), 21 != d && (0 == i ? (f = "付款后未成团不影响发货！", 
                        T = !1) : 1 == i ? (f = "待成团，快去邀请好友参团吧！", T = !0) : 2 == i ? (f = "组团成功！继续邀请更多好友参团！", 
                        m = "￥" + e.globalData.couponMoney + "现金券将于倒计时结束后2小时内发放", T = !0) : 3 == i ? (f = "未成团，没关系，订单将照常发货", 
                        T = !1, O = !0) : 4 == i && (f = "组团成功！", m = "￥" + e.globalData.couponMoney + "现金券将于倒计时结束后2小时内发放", 
                        T = !1, O = !0)), 71 != d && 72 != d || (f = t.teamDesc)), (w = t.bShowPayBtn || w) || v || T || O || (S = !1), 
                        b = t.bShowTime, D = t.bShowStepsBtn, I = t.bShowCheckInvoice, S = S, w = w, v = v, 
                        T = T, O = O;
                    }
                });
                var P = {
                    title: p,
                    bshowCancelBtn: g,
                    bShowTime: b,
                    desc: f,
                    stTitleBottomDesc: m,
                    bShowStepsBtn: D
                }, x = {
                    bNoHasAddress: h,
                    name: u.name,
                    mobile: u.mobile,
                    province: u.province,
                    city: u.city,
                    district: u.district,
                    address: u.location
                }, _ = n.expressMap;
                s.store.iExpressMap = _;
                var B = {};
                B.bShowExpressList = !0, B.expressList = [];
                var L = e.myUtil.objToArr(_);
                console.log("_lists------------", L), L && L.length && (L = L[0]) && L.length > 0 && (1 != L.length || L[0].createTime || (B.bShowExpressList = !1), 
                B.companyName = L[0].companyName, B.expressCode = L[0].expressCode, e.POST(e.apiUrl.order.logistics, {
                    logisticsCode: "sf",
                    transNo: L[0].expressCode
                }).then(function(e) {
                    if (console.log("logisticsRes---------", e), "100010" == e.statusCode) {
                        var t;
                        if (e.data.details.length) B.bShowExpressList = !0, B.expressList = e.data.details; else for (var a = 0; a < L.length; ++a) {
                            var o = L[a];
                            B.companyName = o.companyName, B.expressCode = o.expressCode;
                            var i = {
                                createTime: o.createTime,
                                remark: o.remark
                            };
                            B.expressList.push(i);
                        }
                        s.setData((t = {
                            iExpress: B
                        }, t["y_steps.list"] = B.expressList, t)), console.log("iExpress----------------\x3e", B);
                    }
                }));
                for (var k = n.orderPorductOutList, U = [], M = 0, E = 0; E < k.length; ++E) {
                    var N = {}, A = k[E], R = !1;
                    "0" === A.customReqDesc && (R = !0), N.isAdvance = R, N.skuId = A.skuId, N.goodsName = A.skuName;
                    var W = A.attribute.split(",");
                    N.size = W[0], N.series = W[1] || "", N.imgUrl = A.image, N.csellPrice = t.formatePrice(A.sellPrice), 
                    N.count = A.count, N.isGift = A.isGift, N.amount = t.formatePrice(A.amount), 1 != A.isGift && (M += A.count), 
                    U.push(N);
                }
                s.store.goodsList = U;
                var G = {};
                G.nTotalNum = M, G.nProductAmount = t.formatePrice(n.productAmount), G.nCoupon = t.formatePrice(n.coupon), 
                G.nFreight = t.formatePrice(n.freight), G.nAmount = t.formatePrice(n.amount);
                var F = {};
                F.title = n.orderOpenInvoiceOut.tittle, F.bShow = !0, F.title || (F.bShow = !1), 
                F.invoiceType = n.orderOpenInvoiceOut.invoiceType, F.isPersonInVoice = n.orderOpenInvoiceOut.isPersonInVoice, 
                F.typeName = "个人发票", "0" == F.isPersonInVoice && (F.typeName = "公司发票"), F.taxCode = n.orderOpenInvoiceOut.taxCode, 
                F.bShowCheckInvoice = I;
                var V = n.orderId, X = n.orderDate, j = function(e) {
                    var t = e.split(" "), a = t[0];
                    return /^\d{4}-\d{2}-\d{2}$/.test(t[0]) && (a = a.replace(/\-/g, "/")), e = a + " " + t[1];
                }(n.scheduleCancelTime), q = Date.parse(j) - new Date().getTime();
                q > 0 ? s._set_time_counting(q) : wx.hideToast(), s.setData({
                    bTeam: l,
                    bGift: c,
                    isManyExpress: y,
                    iStatusData: P,
                    iAddress: x,
                    goodsList: U,
                    iOrderMonetInfo: G,
                    iOpenInvoice: F,
                    stOrderId: V,
                    diff_time: q,
                    stOrderDate: X,
                    bShowBtnWrap: S,
                    bShowPayBtn: w,
                    bShowGiveBtn: v,
                    bShowInviteBtn: T,
                    bShowTeamDetail: O
                }), e.page_change_loaded(s);
            }).catch(function(t) {
                e.page_change_error(s);
            });
        }
        var n = this;
        this.findBaseInfo();
        var s = this, r = [ {
            status: 21,
            title: "等待支付",
            bshowCancelBtn: !0,
            bShowTime: !0,
            bShowPayBtn: !0,
            bShowBtnWrap: !0,
            desc: "",
            giftDesc: "",
            teamDesc: "付款后未成团不影响发货"
        }, {
            status: 31,
            title: "等待发货",
            bShowCheckInvoice: !1,
            bShowBtnWrap: !1,
            desc: "等待商家发货",
            giftDesc: "您的礼物已经被好友领取",
            teamDesc: ""
        }, {
            status: 41,
            title: "等待收货",
            bShowStepsBtn: !0,
            bShowCheckInvoice: !0,
            bShowBtnWrap: !1,
            desc: "商家已发货，有查看物流按钮",
            giftDesc: "您的礼物已发出，预计3-5天送达",
            teamDesc: ""
        }, {
            status: 51,
            title: "交易成功",
            bShowStepsBtn: !0,
            bShowCheckInvoice: !0,
            bShowBtnWrap: !1,
            desc: "交易完成，订单关闭",
            giftDesc: "您的礼物已签收",
            teamDesc: ""
        }, {
            status: 61,
            title: "交易成功",
            bShowStepsBtn: !0,
            bShowCheckInvoice: !0,
            bShowBtnWrap: !1,
            desc: "交易完成，订单关闭",
            giftDesc: "您的礼物已签收",
            teamDesc: ""
        }, {
            status: 71,
            title: "交易关闭",
            bShowBtnWrap: !1,
            bShowCheckInvoice: !1,
            desc: "交易失败，订单关闭",
            giftDesc: "交易失败，订单关闭",
            teamDesc: "交易失败，订单关闭"
        }, {
            status: 72,
            title: "交易关闭",
            bShowBtnWrap: !1,
            bShowCheckInvoice: !1,
            desc: "逾时未付款，交易自动取消",
            giftDesc: "逾时未付款，交易自动取消",
            teamDesc: "逾时未付款，交易自动取消"
        } ], d = a.id;
        this.data.stOrderId = d, this.signOrder(d, e);
        var c = !1, l = !1, u = {
            orderCode: d
        };
        e.POST(e.apiUrl.order.groupDetail, u).then(function(e) {
            var t = e.data || null, a = "";
            if (t) {
                a = t.teamStatus;
                var o = t.activityName;
                n.setData({
                    teamId: t.teamId,
                    spellName: o
                });
            }
            i(t, a);
        });
    },
    onLoad: function(t) {
        wx.hideShareMenu(), this.setData({
            "pageStatus.isIPX": e.globalData.isIPX
        }), this.wechatModel = a.use("wechat"), this.memberModel = a.use("member");
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    onShow: function(t) {
        e.page_load(this);
        var a = getCurrentPages();
        a[a.length - 1];
        a[a.length - 2] || this.setData({
            isMsg: !0
        });
    },
    findBaseInfo: function() {
        e.globalData.userCode || this.memberModel.findAccount().then(function(t) {
            e.globalData.userCode = t.userCode;
        });
    },
    findUserInfo: function() {
        e.globalData.userInfo.nickname || this.memberModel.findInfo().then(function(t) {
            e.globalData.userInfo.nickname = t.nickname;
        });
    },
    onHide: function() {
        this.data.timer.time_counter && clearInterval(this.data.timer.time_counter);
    },
    onUnload: function() {
        this.data.timer.time_counter && clearInterval(this.data.timer.time_counter);
    },
    onPullDownRefresh: function(e) {},
    onReachBottom: function(e) {},
    signOrder: function(e, t) {
        var a = this;
        t.POST(t.apiUrl.gift.sign, {
            orderId: e
        }).then(function(e) {
            var t = e.data;
            a.data.sign = t, a.setData({
                sign: t
            });
        });
    },
    loadInvoice: function() {
        console.log("去到查看发票页");
        var t = this;
        e.Request(e.apiUrl.order.loadInvoice, {
            tenantCode: e.globalData.tenantCode,
            orderId: t.data.stOrderId
        }, null, null, "GET").then(function(a) {
            if (console.log("loadInvoice", a), "0" == a.head.code) if (a.body.appid && a.body.authUrl) wx.navigateToMiniProgram({
                appId: a.body.appid,
                path: a.body.authUrl,
                success: function(e) {
                    console.log(e);
                }
            }); else {
                var o = a.body.detailUrl;
                e.globalData.loadInvoiceUrl = o, e.navigateTo(t, {
                    url: "../loadInvoice/loadInvoice"
                });
            } else wx.showToast({
                title: "系统错误，请稍后重试",
                icon: "none",
                duration: 2e3
            });
        });
    },
    onShareAppMessage: function(t) {
        t.target.dataset.id;
        var a = this.data.sign, o = this.data.stOrderId, i = e.globalData.userCode, n = e.globalData.imgUrl.gift, s = e.globalData.userInfo.nickName;
        return console.log("userCode---------\x3e" + i + "------nickname-----------\x3e" + s), 
        {
            title: "好友" + s + "送你一份礼物， 快拆开看看！",
            path: "/pages/gift/gift?orderId=" + o + "&sign=" + a + "&accountId=" + i,
            imageUrl: n,
            success: function() {},
            fail: function() {}
        };
    }
});
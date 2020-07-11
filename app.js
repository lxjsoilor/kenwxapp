function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
}, a = e(require("./VictStore/index")), i = e(require("./utils/wrap")), r = require("utils/apiUrl.js"), n = require("utils/globalData.js"), o = require("utils/filters.js"), s = require("utils/pay.js"), c = require("utils/authorize.js"), u = require("utils/catch.js"), l = require("utils/mta_analysis.js"), g = require("benUI/plugins/ben.js"), d = require("utils/util.js"), h = new a.default({
    store: Object.assign({
        BASEURL: r.BASEURL,
        GQLUEL: r.GQLUEL,
        appCode: r.appcode,
        pay: {
            channelCode: "100",
            payment: "weixin",
            terminal: "51"
        }
    }, n)
});

App(t({
    mta: l,
    globalData: {},
    promise: {},
    apiUrl: {},
    filters: {},
    commonTimer: {},
    authorize: {},
    pay: {},
    catch: {},
    getCmsData: {},
    WRAP: {},
    myUtil: d,
    BEN: g,
    VICTSTORE: h
}, g.tabBar, {
        onLaunch: function (e) {
            this.init(), this.canUseNavToMiniProgram(), l.App.init({
                appID: "500660393",
                eventID: "500660394",
                lauchOpts: e,
                statPullDownFresh: !0,
                statShareApp: !0,
                statReachBottom: !0
            });
        },
        init: function () {
            wx.hideTabBar({
                fail: function () {
                    setTimeout(wx.hideTabBar, 100);
                }
            }), Object.assign(this.apiUrl, r), Object.assign(this.globalData, n), Object.assign(this.filters, o),
                Object.assign(this.pay, new s.PayOrder(this)), Object.assign(this.authorize, c),
                Object.assign(this.catch, u), this.WRAP = new i.default({
                    VICTSTORE: h,
                    useShowLoading: !0,
                    loadingDelay: 300,
                    needLoginList: ["pages/shoppingCart/shoppingCart", "pages/checkout/checkout", "pages/myAccount/myAccount", "pages/gift/gift", "pages/giftGit/giftGit", "subPages/pages/userInfo/userInfo", "subPages/pages/spellDetail/spellDetail", "subPages/pages/order/orderList/orderList", "subPages/pages/order/orderDetail/orderDetail", "subPages/pages/vote/voteStart/voteStart", "subPages/pages/activity/activityBooking/activityBooking", "subPages/pages/coupon/coupon"],
                    loginFail: function (e, t) {
                        console.log("loginFail-----------------\x3e", e, t), e.loginFail = function () {
                            t.loginRefresh();
                        }, WRAP.page_change_error(e);
                    },
                    errorPanel: {
                        icon: "icon-pdp_noproduct",
                        title: "哎呀，出错了",
                        btn: "刷新一下",
                        method: "page_refresh"
                    },
                    errorPanelNetWork: {
                        icon: "icon-xinhaocha",
                        title: "网络连接异常，请检查网络",
                        btn: "刷新一下",
                        method: "page_refresh"
                    }
                }), this.wechatModel = h.use("wechat"), this.cartModel = h.use("cart"), console.log("VICTSTORE-------------\x3e", this.VICTSTORE),
                console.log("WRAP-------------\x3e", this.WRAP);
        },
        onShow: function (e) {
            console.log("进入小程序参数获取==============="), console.log(e);
            var t = void 0;
            t = e.query.scene ? e.query.scene.split("$")[1] : e.query._mta_ref_id ? e.query._mta_ref_id : e._mta_ref_id ? e._mta_ref_id : "ro_" + e.scene,
                wx.setStorageSync("trackingCode", t);
            this.promise;
            wx.hideTabBar({
                fail: function () {
                    setTimeout(wx.hideTabBar, 100);
                }
            });
            var a = this.WRAP;
            a.setGlobalPromise({
                name: "openid",
                creator: this.get_openId,
                tag: "getOpenId"
            }), a.setGlobalPromise({
                name: "login_CASABA",
                creator: this.get_token,
                tag: "doLogin"
            }), a.activate(e);
        },
        onHide: function () {
            this.WRAP.frozen();
        },
        get_openId: function () {
            return this.wechatModel.get_openId();
        },
        get_token: function (e) {
            return this.wechatModel.login_CASABA_wx(e);
        },
        get_cartnum: function (e) {
            return this.cartModel.checkCartNum(e);
        },
        GET: function (e, t, a, i) {
            return h.GET(e, t, a, i);
        },
        POST: function (e, t, a, i) {
            return h.POST(e, t, a, i);
        },
        loginWarranty: function () {
            return this.WRAP.loginWarranty();
        },
        page_load: function (e) {
            return this.WRAP.page_load(e);
        },
        page_change_loaded: function (e, t) {
            return this.WRAP.page_change_loaded(e, t);
        },
        page_change_error: function (e, t, a) {
            return this.WRAP.page_change_error(e, t, a);
        },
        navigateTo: function (e, t) {
            return this.WRAP.navigateTo(t, "navigateTo", e);
        },
        redirectTo: function (e, t) {
            return this.WRAP.navigateTo(t, "redirectTo", e);
        },
        reLaunch: function (e, t) {
            return this.WRAP.navigateTo(t, "reLaunch", e);
        },
        switchTab: function (e, t) {
            return this.WRAP.navigateTo(t, "switchTab", e);
        },
        navigateBack: function (e, t) {
            return this.WRAP.navigateTo(t, "navigateBack", e);
        },
        getDataList: function (e, t) {
            return this.WRAP.getDataList(e, t);
        },
        shopListAddOrder: function (e) {
            this.POST(this.apiUrl.shopList.addOrder, {
                orderId: e,
                orderDetailPath: "/subPages/pages/order/orderDetail/orderDetail?id=" + e,
                pdpPath: "/pages/pdp/pdp?spuCode=%s&skuCode=%s",
                expressPath: "/subPages/pages/order/orderDetail/orderDetail?id=" + e,
                invoicePath: "/subPages/pages/order/orderDetail/orderDetail?id=" + e,
                phone: "021-64281201",
                contactDetailPath: "/pages/index/index"
            }).then(function (e) {
                console.log("gouwudan_addOrder-------------", e);
            });
        },
        login: function () {
            return new Promise(function (e) {
                console.log("login", e), wx.login({
                    success: function (t) {
                        console.log("res +++++++++++++++", t), e(t.code);
                    }
                });
            });
        },
        postFormId: function () {
            var e = this, t = this.globalData.tenantCode, a = h.getStore("openid");
            return new Promise(function (i, r) {
                console.log("this.catch.store.formIdList-------------------------\x3e", e.catch.store.formIdList);
                var n = e.catch.store.formIdList.map(function (e) {
                    return e.formId;
                }), o = {
                    openid: a,
                    tenantCode: t,
                    formid: n
                };
                console.log("postFormId---------------------\x3e", o), i(), e.POST(e.apiUrl.matemplate.postFormId, o).then(function (t) {
                    "100010" == t.statusCode ? (e.catch.clearFormId(), i(t.data)) : r(t.msg);
                });
            });
        },
        canUseNavToMiniProgram: function () {
            var e = wx.getSystemInfoSync().SDKVersion;
            d.compareVersion(e, "2.0.6") > 0 ? this.globalData.canUseNavToMiniProgram = !1 : this.globalData.canUseNavToMiniProgram = !0;
        },
        findUserInfo: function () {
            var e = this;
            return new Promise(function (t, a) {
                e.POST(e.apiUrl.member.findUserInfo).then(function (i) {
                    if (i.success) {
                        var r = i.data, n = {
                            name: r.name,
                            gender: r.gender,
                            telephone: r.telephone,
                            birthday: r.birthday,
                            email: r.email
                        };
                        e.globalData.centerUserInfo = n, t(i);
                    } else a(i);
                });
            });
        },
        cartLineFormat: function (e, t) {
            if (t.skuAttrSaleList && t.skuAttrSaleList.filter(function (e) {
                return "颜色分类" == e.attributeFrontName;
            }).length) {
                var a = t.skuAttrSaleList.filter(function (e) {
                    return "颜色分类" == e.attributeFrontName;
                })[0].attributeValueThumbnailURL;
                a && (e.images = a);
            }
            return e;
        }
    }));
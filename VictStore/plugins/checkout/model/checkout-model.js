function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function r(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" !== (void 0 === e ? "undefined" : a(e)) && "function" != typeof e ? t : e;
}

function o(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === e ? "undefined" : a(e)));
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

exports.__esModule = !0;

var i = t(require("../../../index")), n = t(require("../service/checkout-service")), s = t(require("./base/format")), c = t(require("./base/errMsg")), u = function(t) {
    function a(o) {
        e(this, a);
        var i = r(this, t.call(this));
        i.opt = Object.assign({
            useStoreShop: !0,
            useStoreChannel: !0
        }, o), i.utils.initModelShop(i, i.opt);
        var s = i.GET, c = i.POST, u = i.api, l = i.store;
        return i.service = new n.default({
            GET: s,
            POST: c,
            api: {
                store: u.store,
                order: u.order
            },
            store: l
        }), i.cartModel = i.use("cart"), i.stateInit(), i;
    }
    return o(a, t), a.prototype.shopInit = function(t) {
        var e = Object.assign({}, t), r = e.storeCode, o = e.channelCode;
        this.utils.initModelShop(this, Object.assign({}, this.opt, {
            storeCode: r,
            channelCode: o
        }));
    }, a.prototype.stateInit = function() {
        this.originData = {}, this.state = {
            activityFilter: this.store.activityFilter || [],
            cartLineFormat: this.store.cartLineFormat || null,
            cartData: null,
            orderType: "normal",
            promise: {},
            req: {
                orderType: "11",
                order_create: {}
            },
            cancelType: "11",
            giftActivityList: null,
            couponCode: null,
            needInvoice: !1,
            invoice: null,
            address: null,
            freight: 0,
            gift: {
                wishCard: null
            },
            autoCancelSet: null
        };
    }, a.prototype.init = function(t) {
        this.stateInit();
        var e = Object.assign({}, t);
        this.utils.initModelShop(this, e);
        var r = e.orderSettle, o = e.orderType, a = e.cancelType;
        switch (this.state.checkoutData = e, this.state.orderSettleCache = r || null, this.state.cancelType = a || "11", 
        o) {
          case "normal":
            this.state.req.orderType = "11";
            break;

          case "gift":
            this.state.req.orderType = "71";
            break;

          case "custom":
            this.state.req.orderType = "91";
            break;

          case "virtual":
            this.state.req.orderType = "31";
            break;

          default:
            this.state.req.orderType = o || "11";
        }
    }, a.prototype.recalc = function(t) {
        var e = Object.assign({
            activityFilter: this.state.activityFilter,
            needAttributes: !1,
            customRecalc: null,
            cartLineFormat: this.state.cartLineFormat
        }, t), r = e.customRecalc, o = e.cartLineFormat, a = e.activityFilter, i = this, n = this.cartModel, c = this.state, u = c.orderSettleCache, l = c.checkoutData;
        return this.state.promise.recacl_price = new Promise(function(t, c) {
            var d = function(e, o) {
                var n = e.orderSettle, u = e.cartData, l = e.serverTimeDiff;
                i.state.cartData = u, i.state.orderSettle = n.data, i.getfreight().then(function(e) {
                    var c = s.default.formatRecalcRes(n, e, r, a), d = c.orderReq, h = c.orderInfo;
                    i.state.freight = h.freight, i.state.freePostage = h.freePostage, i.state.giftActivityList = h.giftActivityList, 
                    Object.assign(i.state.req.order_create, d), o && o(), t(Object.assign(h, {
                        serverTimeDiff: l,
                        ablePromotion: u.ablePromotion,
                        disablePromotion: u.disablePromotion,
                        promotion: u.promotion,
                        ableItems: u.ableItems
                    }));
                }).catch(function(t) {
                    return c(t);
                });
            };
            if (e && e.orderSettle) d(e); else if (u) d(l, function() {
                i.state.orderSettleCache = null;
            }); else {
                var h = [];
                i.state.couponCode && h.push(i.state.couponCode);
                var f = i.utils.getReqWithStore({
                    req: {},
                    model: i,
                    actionData: e
                });
                n.orderSettle({
                    itemList: i.state.checkoutData.itemList,
                    code: h.join(","),
                    cartLineFormat: o,
                    needAttributes: e.needAttributes,
                    activityFilter: a,
                    storeData: f
                }).then(function(t) {
                    d(t);
                }).catch(function(t) {
                    return c(t);
                });
            }
        }), this.state.promise.recacl_price;
    }, a.prototype.setAddress = function(t) {
        t.address ? this.state.address = Object.assign({
            countryName: "中国",
            nationalCode: null
        }, t.address) : this.state.address = null;
    }, a.prototype.setInvoice = function(t) {
        t.invoice ? (this.state.needInvoice = !0, this.state.invoice = t.invoice) : (this.state.needInvoice = !1, 
        this.state.invoice = null);
    }, a.prototype.useCoupon = function(t) {
        var e = this, r = Object.assign({
            needAttributes: !1,
            customRecalc: null,
            cartLineFormat: this.state.cartLineFormat,
            activityFilter: this.state.activityFilter
        }, t), o = r.code, a = r.needAttributes, i = r.customRecalc, n = r.cartLineFormat, s = r.activityFilter, c = r.check, u = this.cartModel, l = this.utils.getReqWithStore({
            req: {},
            model: this,
            actionData: r
        });
        return new Promise(function(t, r) {
            u.orderSettle({
                itemList: e.state.checkoutData.itemList,
                code: o,
                storeData: l,
                cartLineFormat: n,
                needAttributes: a,
                activityFilter: s
            }).then(function(n) {
                var s = n.orderSettle, u = !1, l = null;
                s.data && s.data.shoppingCartOuts && s.data.shoppingCartOuts.filter(function(t) {
                    return t.effectiveFlag;
                }).forEach(function(t) {
                    t.couponCode == o && (u = !0, l = t);
                }), c && (u = c(s, u, e)), u ? (e.state.couponCode = o, e.recalc(Object.assign({
                    customRecalc: i,
                    needAttributes: a
                }, n)).then(function(e) {
                    t({
                        activity: l,
                        recalc: e
                    });
                }).catch(function(t) {
                    return r({
                        activity: l,
                        recalc: t
                    });
                })) : r(n);
            }).catch(function(t) {
                return r(t);
            });
        });
    }, a.prototype.cancelCoupon = function(t) {
        var e = Object.assign({
            needAttributes: !1,
            customRecalc: null,
            cartLineFormat: this.state.cartLineFormat,
            activityFilter: this.state.activityFilter
        }, t), r = e.needAttributes, o = e.customRecalc, a = e.cartLineFormat, i = e.activityFilter, n = this, s = this.cartModel, c = this.utils.getReqWithStore({
            req: {},
            model: this,
            actionData: e
        });
        return new Promise(function(t, e) {
            s.orderSettle({
                itemList: n.state.checkoutData.itemList,
                storeData: c,
                cartLineFormat: a,
                activityFilter: i
            }).then(function(a) {
                n.state.couponCode = null, n.recalc(Object.assign({
                    customRecalc: o,
                    needAttributes: r
                }, a)).then(function(e) {
                    t(e);
                }).catch(function(t) {
                    return e(t);
                });
            }).catch(function(t) {
                return e(t);
            });
        });
    }, a.prototype.createOrder = function(t) {
        var e = Object.assign({
            giftNumChange: [],
            channelCode: this.channelCode,
            storeCode: this.storeCode,
            customReqDescFormat: null,
            cartLineFormat: this.state.cartLineFormat,
            externalOrderId: null,
            wishCard: null,
            exchangeRate: null,
            requestVersion: "V2"
        }, t), r = this, o = this.store, a = this.service, i = this.cartModel, n = this.state, c = n.promise, u = n.req;
        return this.state.gift.wishCard = e.wishCard || null, new Promise(function(t, n) {
            c.recacl_price.then(function() {
                var c = function(t) {
                    var e = "";
                    t && t.code ? e = t.code : t.statusCode && (e = t.statusCode), n({
                        res: t,
                        msg: r.getErrorMessage({
                            code: e
                        })
                    });
                };
                r.state.req.order_create = s.default.format_create_order_req(r, o.appIdentifier, e), 
                console.log("req.create_order-----------------------------------\x3e", r.state.req.order_create), 
                a.createOrder(r.state.req.order_create, {
                    ver: e.requestVersion
                }).then(function(e) {
                    if (console.log("order_res------------------------\x3e", e), 0 == e.code) {
                        var n = e.data, s = n.orderId, l = n.orderTime, d = u.order_create.amount + r.state.freight;
                        "cart" === r.state.checkoutData.from && i.delete({
                            ableItems: r.state.orderSettle.ableCartItems,
                            autoRefresh: !1
                        }), a.getAutoCancelSet({
                            tenantCode: o.tenantCode,
                            cancelType: r.state.cancelType
                        }).then(function(r) {
                            t({
                                res: e,
                                orderId: s,
                                orderTime: l,
                                totalAmount: d,
                                autoCancelSet: r
                            });
                        }).catch(function() {
                            t({
                                res: e,
                                orderId: s,
                                orderTime: l,
                                totalAmount: d
                            });
                        });
                    } else c(e);
                }).catch(function(t) {
                    c(t);
                });
            });
        });
    }, a.prototype.getAutoCancelSet = function() {
        var t = this.service, e = this;
        return new Promise(function(r, o) {
            t.getAutoCancelSet().then(function(t) {
                t.head && t.head.code && "0" == t.head.code && t.body && (e.state.autoCancelSet = t.body), 
                r(e.state.autoCancelSet);
            }).catch(function(t) {
                return o(t);
            });
        });
    }, a.prototype.getfreight = function() {
        var t = this.service, e = this.store;
        return new Promise(function(r) {
            t.getfreight().then(function(t) {
                var e = void 0;
                e = t.data && t.data.postAge ? t.data.postAge : app.globalData.freight || 0, r(e);
            }).catch(function() {
                var t = e.freight || 0;
                r(t);
            });
        });
    }, a.prototype.getErrorMessage = function(t) {
        var e = Object.assign({}, t).code;
        return e && c.default[e] ? c.default[e] : c.default.default;
    }, a;
}(i.default);

exports.default = u;
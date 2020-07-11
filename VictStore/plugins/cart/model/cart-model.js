function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function a(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" !== (void 0 === e ? "undefined" : n(e)) && "function" != typeof e ? t : e;
}

function r(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === e ? "undefined" : n(e)));
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

exports.__esModule = !0;

var s = t(require("../../../index")), i = t(require("../service/cart-service")), o = t(require("./base/format")), c = t(require("./base/errMsg")), u = {
    checkCartCache: function(t) {
        var e = t.state, a = e.cartData, r = e.createTime, n = t.config.cartDataLife;
        return a && new Date().getTime() - r < n;
    }
}, h = function(t) {
    function n(r) {
        e(this, n);
        var s = a(this, t.call(this));
        s.opt = Object.assign({
            useStoreShop: !0,
            useStoreChannel: !0
        }, r), s.shopInit(s.opt);
        var o = s.GET, c = s.POST, u = s.api, h = s.store, l = u.cart, f = u.order;
        return s.service = new i.default({
            GET: o,
            POST: c,
            api: {
                cart: l,
                order: f
            },
            store: h
        }), s.config = {
            cartDataLife: s.store.cartDataLife >= 0 ? s.store.cartDataLife : 18e4
        }, s.originData = {}, s.stateInit(), s;
    }
    return r(n, t), n.prototype.shopInit = function(t) {
        var e = Object.assign({}, t), a = e.storeCode, r = e.channelCode;
        this.utils.initModelShop(this, Object.assign({}, this.opt, {
            storeCode: a,
            channelCode: r
        }));
    }, n.prototype.stateInit = function() {
        this.state = {
            cartLineFormat: this.store.cartLineFormat || null,
            share: this.store.share || !1,
            useStore: this.store.useStore || !1
        };
    }, n.prototype.init = function(t) {
        var e = Object.assign({}, t);
        this.utils.initModelShop(this, e);
    }, n.prototype.getCartData = function(t) {
        var e = Object.assign({
            useCache: !0,
            useCacheAlways: !1,
            cartLineFormat: this.state.cartLineFormat,
            share: this.state.share
        }, t), a = this.utils.getReqWithStore({
            req: {},
            model: this,
            actionData: e
        }), r = e.share, n = this, s = this.service;
        return new Promise(function(t, i) {
            e.useCache && u.checkCartCache(n) ? t(n.state.cartData) : e.useCacheAlways && n.state.cartData ? t(n.state.cartData) : s[r ? "getCartDataShare" : "getCartData"](a).then(function(a) {
                n.originData.cartData = a, n.state.cartData = o.default.formatCartData(a, e), n.state.createTime = new Date().getTime(), 
                t(n.state.cartData);
            }).catch(function(t) {
                i(t);
            });
        });
    }, n.prototype.clearCartCache = function() {
        this.originData.cartData = null, this.state.cartData = null, this.state.createTime = null;
    }, n.prototype.getProductPromotion = function(t) {
        var e = Object.assign({
            buyCount: 1
        }, t), a = this, r = this.service, n = this.utils, s = e.skuId, i = e.buyCount;
        return new Promise(function(t, c) {
            if (s) {
                var u = n.getReqWithStore({
                    req: {},
                    model: a,
                    actionData: e
                });
                r.orderSettle({
                    itemList: [ Object.assign({
                        skuCode: s,
                        quantity: i
                    }, u) ],
                    storeData: u
                }).then(function(e) {
                    t(e.success && e.data && e.data.shoppingCartOuts ? o.default.formatProductPromotion(e.data.shoppingCartOuts) : null);
                }).catch(function(t) {
                    c(t);
                });
            } else c();
        });
    }, n.prototype.select = function(t) {
        var e = this, a = Object.assign({
            cartLineFormat: this.state.cartLineFormat,
            share: this.state.share
        }, t), r = this.service, n = a.skuId, s = a.cartLineFormat, i = a.share;
        return new Promise(function(t, a) {
            if (n) {
                var o = [];
                e.state.cartData.ableItems.filter(function(t) {
                    return t.skuId == n;
                }).forEach(function(t) {
                    var e = {
                        skuCode: t.skuId,
                        selectStatus: "1" == t.selectStatus ? 0 : 1
                    };
                    t.channelCode && (e.channelCode = t.channelCode), t.storeCode && (e.storeCode = t.storeCode), 
                    o.push(e);
                }), r.cartSelect(o).then(function() {
                    e.getCartData({
                        useCache: !1,
                        cartLineFormat: s,
                        share: i
                    }).then(function(e) {
                        t(e);
                    }).catch(function(t) {
                        a(t);
                    });
                }).catch(function(t) {
                    a(t);
                });
            } else a();
        });
    }, n.prototype.selectAll = function(t) {
        var e = this, a = Object.assign({
            skuRange: null,
            cartLineFormat: this.state.cartLineFormat,
            share: this.state.share
        }, t), r = a.skuRange, n = a.share, s = this.service, i = a.cartLineFormat;
        return new Promise(function(t, a) {
            if (0 != e.state.cartData.ableItems.length) {
                var o = [], c = r ? e.state.cartData.ableItems.filter(function(t) {
                    return r.filter(function(e) {
                        return e == t.skuId;
                    }).length;
                }) : e.state.cartData.ableItems;
                (r ? c.filter(function(t) {
                    return 1 == t.selectStatus;
                }).length == c.length : e.state.cartData.selectedCount == e.state.cartData.ableItems.length) ? c.forEach(function(t) {
                    var e = {
                        skuCode: t.skuId,
                        selectStatus: "0"
                    };
                    t.channelCode && (e.channelCode = t.channelCode), t.storeCode && (e.storeCode = t.storeCode), 
                    o.push(e);
                }) : c.filter(function(t) {
                    return "0" == t.selectStatus;
                }).forEach(function(t) {
                    var e = {
                        skuCode: t.skuId,
                        selectStatus: "1"
                    };
                    t.channelCode && (e.channelCode = t.channelCode), t.storeCode && (e.storeCode = t.storeCode), 
                    o.push(e);
                }), s.cartSelect(o).then(function() {
                    e.getCartData({
                        useCache: !1,
                        cartLineFormat: i,
                        share: n
                    }).then(function(e) {
                        t(e);
                    }).catch(function(t) {
                        a(t);
                    });
                }).catch(function(t) {
                    a(t);
                });
            } else a();
        });
    }, n.prototype.changeCount = function(t) {
        var e = this, a = Object.assign({
            cartLineFormat: this.state.cartLineFormat,
            share: this.state.share
        }, t), r = this.service, n = a.skuId, s = a.buyCount, i = a.cartLineFormat, o = a.share;
        return new Promise(function(t, a) {
            if (n && s) {
                var c = {
                    skuCode: n,
                    quantity: s
                };
                e.state.cartData.ableItems.filter(function(t) {
                    return t.skuId == n;
                }).forEach(function(t) {
                    t.channelCode && (c.channelCode = t.channelCode), t.storeCode && (c.storeCode = t.storeCode);
                });
                var u = [ c ];
                r[o ? "cartChangeBuyCountShare" : "cartChangeBuyCount"](u).then(function() {
                    e.getCartData({
                        useCache: !1,
                        cartLineFormat: i,
                        share: o
                    }).then(function(e) {
                        t(e);
                    }).catch(function(t) {
                        a(t);
                    });
                }).catch(function(t) {
                    a(t);
                });
            } else a();
        });
    }, n.prototype.delete = function(t) {
        var e = this, a = Object.assign({
            skuList: null,
            autoRefresh: !0,
            cartLineFormat: this.state.cartLineFormat,
            share: this.state.share,
            useStore: this.state.useStore,
            ableItems: null
        }, t), r = this.service, n = a.skuId, s = a.cartLineFormat, i = a.share, o = a.useStore, c = a.skuList;
        if (!c) {
            var u = a.ableItems || this.state.cartData.ableItems.concat(this.state.cartData.disableItems);
            c = o && !i ? u.filter(function(t) {
                return t.skuId == n;
            }).map(function(t) {
                var e = {
                    skuList: [ t.skuId || t.skuCode ]
                };
                return t.channelCode && (e.channelCode = t.channelCode), t.storeCode && (e.storeCode = t.storeCode), 
                e;
            }) : u.filter(function(t) {
                return t.skuId == n;
            }).map(function(t) {
                return t.skuId || t.skuCode;
            });
        }
        return new Promise(function(t, n) {
            r[o && !i ? "cartDeleteForStore" : "cartDelete"](c).then(function(r) {
                a.autoRefresh ? e.getCartData({
                    useCache: !1,
                    cartLineFormat: s,
                    share: i
                }).then(function(e) {
                    t(e);
                }).catch(function(t) {
                    n(t);
                }) : (e.clearCartCache(), t(r));
            }).catch(function(t) {
                n(t);
            });
        });
    }, n.prototype.deleteAll = function(t) {
        var e = this, a = Object.assign({
            autoRefresh: !0,
            cartLineFormat: this.state.cartLineFormat,
            share: this.state.share,
            useStore: this.state.useStore
        }, t), r = a.cartLineFormat, n = a.share, s = a.useStore, i = this.service, o = [];
        return s && !n ? this.state.cartData.ableItems.concat(this.state.cartData.disableItems).forEach(function(t) {
            var e = {
                skuList: [ t.skuId ]
            };
            t.channelCode && (e.channelCode = t.channelCode), t.storeCode && (e.storeCode = t.storeCode), 
            o.push(e);
        }) : this.state.cartData.ableItems.concat(this.state.cartData.disableItems).forEach(function(t) {
            o.push(t.skuId);
        }), new Promise(function(t, c) {
            i[s && !n ? "cartDeleteForStore" : "cartDelete"](o).then(function(s) {
                a.autoRefresh ? e.getCartData({
                    useCache: !1,
                    cartLineFormat: r,
                    share: n
                }).then(function(e) {
                    t(e);
                }).catch(function(t) {
                    c(t);
                }) : (e.clearCartCache(), t(s));
            }).catch(function(t) {
                c(t);
            });
        });
    }, n.prototype.add = function(t) {
        var e = this, a = Object.assign({
            cartLineFormat: this.state.cartLineFormat,
            share: this.state.share
        }, t), r = a.itemList, n = a.cartLineFormat, s = a.share, i = this.service;
        return new Promise(function(t, a) {
            i[s ? "cartAddShare" : "cartAdd"]({
                itemList: r
            }).then(function() {
                e.getCartData({
                    useCache: !1,
                    cartLineFormat: n,
                    share: s
                }).then(function(e) {
                    t(e);
                }).catch(function(t) {
                    a(t);
                });
            }).catch(function(t) {
                a(t);
            });
        });
    }, n.prototype.checkout = function(t) {
        var e = this, a = Object.assign({
            skuRange: null,
            needAttributes: !1,
            cartLineFormat: this.state.cartLineFormat,
            activityFilter: null
        }, t), r = a.code, n = a.needAttributes, s = a.skuRange, i = this, c = this.service, u = this.utils, h = s ? this.state.cartData.ableItems.filter(function(t) {
            return s.filter(function(e) {
                return e == t.skuId;
            }).length;
        }) : this.state.cartData.ableItems;
        return new Promise(function(t, s) {
            if (0 != e.state.cartData.selectedCount) {
                var l = [];
                h.filter(function(t) {
                    return "1" == t.selectStatus;
                }).forEach(function(t) {
                    l.push({
                        skuCode: t.skuId,
                        quantity: t.buyCount
                    });
                });
                var f = u.getReqWithStore({
                    req: {},
                    model: i,
                    actionData: a
                });
                c.cartCheckout({
                    itemList: l,
                    code: r,
                    storeData: f,
                    needAttributes: n
                }).then(function(e) {
                    t({
                        orderSettle: e,
                        cartData: o.default.formatCartData(e.data, a),
                        itemList: l,
                        serverTimeDiff: e.headDate && e.headDate.getTime && e.headDate.getTime() - new Date().getTime() || null
                    });
                }).catch(function(t) {
                    s(t);
                });
            } else s();
        });
    }, n.prototype.itemCheckout = function(t) {
        var e = Object.assign({
            needAttributes: !1,
            cartLineFormat: this.state.cartLineFormat,
            activityFilter: null
        }, t), a = e.itemList, r = e.code, n = e.needAttributes, s = this.service, i = this.utils.getReqWithStore({
            req: {},
            model: this,
            actionData: e
        });
        return new Promise(function(t, c) {
            s.cartCheckout({
                itemList: a,
                code: r,
                storeData: i,
                needAttributes: n
            }).then(function(r) {
                t({
                    orderSettle: r,
                    cartData: o.default.formatCartData(r.data, e),
                    itemList: a,
                    serverTimeDiff: r.headDate && r.headDate.getTime && r.headDate.getTime() - new Date().getTime() || null
                });
            }).catch(function(t) {
                c(t);
            });
        });
    }, n.prototype.orderSettle = function(t) {
        var e = Object.assign({
            needAttributes: !1,
            cartLineFormat: this.state.cartLineFormat,
            activityFilter: null
        }, t), a = e.itemList, r = e.code, n = e.needAttributes, s = this.service, i = this.utils.getReqWithStore({
            req: {},
            model: this,
            actionData: e
        });
        return new Promise(function(t, c) {
            s.orderSettle({
                itemList: a,
                code: r,
                storeData: i,
                needAttributes: n
            }).then(function(r) {
                t({
                    orderSettle: r,
                    cartData: o.default.formatCartData(r.data, e),
                    itemList: a,
                    serverTimeDiff: r.headDate && r.headDate.getTime && r.headDate.getTime() - new Date().getTime() || null
                });
            }).catch(function(t) {
                c(t);
            });
        });
    }, n.prototype.settle = function(t) {
        var e = Object.assign({}, t).itemList, a = this.service;
        return new Promise(function(t, r) {
            a.settle({
                itemList: e
            }).then(function(e) {
                t(e);
            }).catch(function(t) {
                r(t);
            });
        });
    }, n.prototype.getCartNum = function(t) {
        var e = Object.assign({
            cartLineFormat: this.state.cartLineFormat,
            share: this.state.share
        }, t), a = e.cartLineFormat, r = e.share, n = this, s = this.state.cartData;
        return new Promise(function(t, e) {
            var i = function(e, a) {
                var r = {
                    cartLine: e.length || 0,
                    total: 0,
                    disableTotal: 0
                };
                e.forEach(function(t) {
                    r.total += t.buyCount;
                }), a.forEach(function(t) {
                    r.disableTotal += t.buyCount;
                }), t(r);
            };
            s ? i(s.ableItems, s.disableItems) : n.getCartData({
                useCache: !1,
                cartLineFormat: a,
                share: r
            }).then(function(t) {
                i(t.ableItems, t.disableItems);
            }).catch(function(t) {
                return e(t);
            });
        });
    }, n.prototype.getErrorMessage = function(t) {
        var e = Object.assign({}, t).code;
        return e && c.default[e] ? c.default[e] : c.default.default;
    }, n;
}(s.default);

exports.default = h;
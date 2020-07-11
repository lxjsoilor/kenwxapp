function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function o(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" !== (void 0 === e ? "undefined" : r(e)) && "function" != typeof e ? t : e;
}

function n(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === e ? "undefined" : r(e)));
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

exports.__esModule = !0;

var a = t(require("../../../index")), i = t(require("../service/product-service")), s = t(require("./base/format")), u = t(require("./base/actions")), c = t(require("./base/errMsg")), l = {
    getSkuErr: function(t) {
        if (!t) return null;
        var e = [];
        return t.filter(function(t) {
            return !t.valueSelected;
        }).forEach(function(t) {
            e.push(t.name);
        }), e;
    }
}, d = function(t) {
    function r(n) {
        e(this, r);
        var a = o(this, t.call(this));
        a.opt = Object.assign({
            useStoreShop: !0,
            useStoreChannel: !0
        }, n), a.utils.initModelShop(a, a.opt);
        var s = a.GET, u = a.POST, c = a.api, l = a.store, d = c.product, h = c.cms;
        return a.service = new i.default({
            GET: s,
            POST: u,
            api: {
                product: d,
                cms: h
            },
            store: l
        }), a.cartModel = a.use("cart"), a.stateInit(), a;
    }
    return n(r, t), r.prototype.shopInit = function(t) {
        var e = Object.assign({}, t), o = e.storeCode, n = e.channelCode;
        this.utils.initModelShop(this, Object.assign({}, this.opt, {
            storeCode: o,
            channelCode: n
        }));
    }, r.prototype.stateInit = function() {
        this.originData = {}, this.state = {
            cartLineFormat: this.store.cartLineFormat || null,
            share: this.store.share || null
        };
    }, r.prototype.getItemBySku = function(t) {
        var e = Object.assign({
            channelCode: null,
            storeCode: null,
            needStoreCode: !0,
            needStoreChannel: !0
        }, t), o = e.skuId, n = e.needStoreCode, r = e.needStoreChannel, a = this.service, i = this.utils.getReqWithStore({
            req: {
                skuId: o
            },
            model: this,
            actionData: e,
            needStoreCode: n,
            needStoreChannel: r
        });
        return new Promise(function(t, e) {
            a.getItemBySku(i).then(function(e) {
                t(s.default.formatSkuItem(e));
            }).catch(function(t) {
                e(t);
            });
        });
    }, r.prototype.getItemBySpu = function(t) {
        this.stateInit();
        var e = Object.assign({
            channelCode: null,
            storeCode: null,
            needStoreCode: !0,
            needStoreChannel: !0
        }, t), o = e.spuCode, n = e.needStoreCode, r = e.needStoreChannel, a = this.service, i = this, c = this.utils.getReqWithStore({
            req: {
                spuCode: o
            },
            model: this,
            actionData: e,
            needStoreCode: n,
            needStoreChannel: r
        });
        return new Promise(function(t, o) {
            a.getItemBySpu(c).then(function(o) {
                i.originData.itemData = o, i.state.itemData = s.default.formatItem(o), i.state.recommendItems = s.default.formatRecommendItems(o.recommendItemsList), 
                i.actions = new u.default(i.state.itemData, o), i.actions.checkProps(), e.initInStockSku && i.initInStockSku(), 
                e.initSkuJustOne && 1 == i.state.itemData.skuList.length && i.initInStockSku(), 
                t(i.state);
            }).catch(function(t) {
                o(t);
            });
        });
    }, r.prototype.getPromotionBySpu = function(t) {
        var e = Object.assign({
            channelCode: null,
            storeCode: null
        }, t), o = e.spuCode, n = e.brandCode, r = e.categoryCode, a = this.service, i = this.utils.getReqWithStore({
            req: {
                spuCode: o,
                brandCode: n,
                categoryCode: r
            },
            model: this,
            actionData: e
        });
        return new Promise(function(t, e) {
            a.getPromotionBySpu(i).then(function(e) {
                t(s.default.formatItemPromotion(e));
            }).catch(function(t) {
                e(t);
            });
        });
    }, r.prototype.propToggle = function(t) {
        var e = this.actions, o = t.groupId, n = t.propId;
        if (!o || !n) return null;
        var r = this.state.itemData.salesProps.filter(function(t) {
            return t.groupId == o;
        })[0].values.filter(function(t) {
            return t.propId == n;
        })[0].isActive;
        return e.activeProps(o, n, r), e.checkProps(o), e.checkSkuImage(), this.state.itemData;
    }, r.prototype.propTap = function(t) {
        var e = this.actions, o = t.groupId, n = t.propId;
        return o && n ? (e.activeProps(o, n), e.checkProps(o), e.checkSkuImage(), this.state.itemData) : null;
    }, r.prototype.propCancel = function(t) {
        var e = this.actions, o = t.groupId, n = t.propId;
        return o && n ? (e.activeProps(o, n, !0), e.checkProps(), e.checkSkuImage(), this.state.itemData) : null;
    }, r.prototype.initInStockSku = function() {
        var t = this.actions;
        return t.initProps({
            type: "init"
        }), t.checkProps(), t.checkSkuImage(), this.state.itemData;
    }, r.prototype.resetProps = function() {
        var t = this.actions;
        return t.initProps(), t.checkProps(), t.checkSkuImage(), this.state.itemData;
    }, r.prototype.joinCart = function(t) {
        var e = Object.assign({
            cartLineFormat: this.state.cartLineFormat,
            share: this.state.share
        }, t), o = this.cartModel, n = this.actions, r = e.buyCount, a = e.skuId, i = e.cartLineFormat, s = e.share, u = this;
        return new Promise(function(t, c) {
            var d = a || null;
            if (!d && u.state.itemData.skuSelected) {
                var h = n.getSkuData(u.state.itemData.skuSelected);
                h && (d = h.skuId);
            }
            d ? u.checkSkuCountInCart(d, r, e).then(function(n) {
                if (n.success) {
                    var a = u.utils.getReqWithStore({
                        req: {
                            itemList: [ {
                                skuCode: d,
                                quantity: r
                            } ],
                            cartLineFormat: i,
                            share: s
                        },
                        model: u,
                        actionData: e,
                        type: "Array",
                        root: "itemList"
                    });
                    o.add(a).then(function(e) {
                        t(e);
                    }).catch(function(t) {
                        c(t);
                    });
                } else c(n);
            }).catch(function(t) {
                return c(t);
            }) : c({
                code: "vp003",
                data: l.getSkuErr(u.state.itemData.salesProps),
                message: null,
                success: !1
            });
        });
    }, r.prototype.buyNow = function(t) {
        var e = this, o = Object.assign({
            needAttributes: !1,
            cartLineFormat: this.state.cartLineFormat
        }, t), n = this.cartModel, r = o.buyCount, a = o.skuId, i = o.needAttributes, s = o.cartLineFormat, u = this.actions;
        return new Promise(function(t, c) {
            var d = a || null;
            if (!d && e.state.itemData.skuSelected) {
                var h = u.getSkuData(e.state.itemData.skuSelected);
                h && (d = h.skuId);
            }
            if (d) {
                var p = [ {
                    skuCode: d,
                    quantity: r
                } ], f = e.utils.getReqWithStore({
                    req: {
                        itemList: p,
                        cartLineFormat: s
                    },
                    model: e,
                    actionData: o
                });
                n.itemCheckout(f).then(function(o) {
                    if (i) try {
                        var n = e.state.itemData, r = e.originData.itemData.attrList.map(function(t) {
                            return {
                                attributeFrontName: t.attributeFrontName,
                                attributeCode: t.code,
                                attributeValueList: t.attributeValueList.map(function(t) {
                                    return {
                                        attributeValueFrontName: t.attributeValueFrontName,
                                        attributeValueCode: t.code
                                    };
                                })
                            };
                        });
                        o.cartData.ableItems.forEach(function(t) {
                            t.skuId != n.skuSelected.skuId || t.attrList || (t.attrList = r);
                        }), o.orderSettle.data.ableCartItems.forEach(function(t) {
                            t.skuCode != n.skuSelected.skuId || t.skuAttrList || (t.skuAttrList = r);
                        });
                    } catch (t) {
                        console.log(t);
                    }
                    t(o);
                }).catch(function(t) {
                    c(t);
                });
            } else c({
                code: "vp003",
                data: l.getSkuErr(e.state.itemData.salesProps),
                message: null,
                success: !1
            });
        });
    }, r.prototype.checkSkuCountInCart = function(t, e, o) {
        var n = this.cartModel, r = this.store.calcuNumber, a = this;
        return new Promise(function(i, s) {
            var u = a.utils.getReqWithStore({
                req: {
                    itemList: [ {
                        skuCode: t,
                        quantity: e
                    } ]
                },
                model: a,
                actionData: o,
                type: "Array",
                root: "itemList"
            });
            n.settle(u).then(function() {
                var u = a.utils.getReqWithStore({
                    req: {
                        useCacheAlways: !0
                    },
                    model: a,
                    actionData: o
                });
                n.getCartData(u).then(function(o) {
                    var n = {
                        code: null,
                        data: t,
                        message: null,
                        success: !0
                    };
                    o.ableItems && o.ableItems.forEach(function(o) {
                        o.skuId == t && (n.cartCount = o.stock, o.buyCount + e > r && (n.success = !1, n.code = "vp002"));
                    }), i(n);
                }).catch(function(t) {
                    return s(t);
                });
            }).catch(function(t) {
                s(t);
            });
        });
    }, r.prototype.getErrorMessage = function(t) {
        var e = Object.assign({}, t).code;
        return e && c.default[e] ? c.default[e] : c.default.default;
    }, r;
}(a.default);

exports.default = d;
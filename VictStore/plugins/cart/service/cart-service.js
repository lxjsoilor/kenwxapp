function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

exports.__esModule = !0;

var e = function() {
    function e(n) {
        t(this, e), Object.assign(this, n);
    }
    return e.prototype.getCartData = function(t) {
        var e = this.api, n = this.POST;
        return new Promise(function(o, c) {
            n(e.cart.shopCartList, t).then(function(t) {
                t.success && t.data ? o(t.data) : c(t);
            }).catch(function(t) {
                c(t);
            });
        });
    }, e.prototype.getCartDataShare = function(t) {
        var e = this.api, n = this.POST;
        return new Promise(function(o, c) {
            n(e.cart.shopCartListShare, t).then(function(t) {
                t.success && t.data ? o(t.data) : c(t);
            }).catch(function(t) {
                c(t);
            });
        });
    }, e.prototype.cartAdd = function(t) {
        var e = Object.assign({}, t), n = this.api, o = this.POST, c = e.itemList;
        return new Promise(function(t, e) {
            o(n.cart.addGoods, {
                productItems: c
            }).then(function(n) {
                "0" == n.code ? t(n.data) : e(n);
            }).catch(function(t) {
                e(t);
            });
        });
    }, e.prototype.cartAddShare = function(t) {
        var e = Object.assign({}, t), n = this.api, o = this.POST, c = e.itemList;
        return new Promise(function(t, e) {
            o(n.cart.addGoodsShare, {
                productItems: c
            }).then(function(n) {
                "0" == n.code ? t(n.data) : e(n);
            }).catch(function(t) {
                e(t);
            });
        });
    }, e.prototype.cartSelect = function(t) {
        var e = this.api, n = this.POST;
        return new Promise(function(o, c) {
            t || c();
            var a = {
                selectProductItems: t
            };
            n(e.cart.changeSelect, a).then(function(t) {
                "0" == t.code ? o(t.data) : c(t);
            }).catch(function(t) {
                c(t);
            });
        });
    }, e.prototype.cartChangeBuyCount = function(t) {
        var e = this.api, n = this.POST;
        return new Promise(function(o, c) {
            t || c();
            var a = {
                updateProductItems: t
            };
            n(e.cart.changeAmount, a).then(function(t) {
                "0" == t.code ? o(t.data) : c(t);
            }).catch(function(t) {
                c(t);
            });
        });
    }, e.prototype.cartChangeBuyCountShare = function(t) {
        var e = this.api, n = this.POST;
        return new Promise(function(o, c) {
            t || c();
            var a = {
                updateProductItems: t
            };
            n(e.cart.changeAmountShare, a).then(function(t) {
                "0" == t.code ? o(t.data) : c(t);
            }).catch(function(t) {
                c(t);
            });
        });
    }, e.prototype.cartDeleteForStore = function(t) {
        var e = this.api, n = this.POST;
        return new Promise(function(o, c) {
            t || c();
            var a = {
                deleteProductItems: t
            };
            n(e.cart.delGoodsForStores, a).then(function(t) {
                "0" == t.code ? o(t.data) : c(t);
            }).catch(function(t) {
                c(t);
            });
        });
    }, e.prototype.cartDelete = function(t) {
        var e = this.api, n = this.POST;
        return new Promise(function(o, c) {
            t || c();
            var a = {
                skuList: t
            };
            n(e.cart.delGoods, a).then(function(t) {
                "0" == t.code ? o(t.data) : c(t);
            }).catch(function(t) {
                c(t);
            });
        });
    }, e.prototype.cartCheckout = function(t) {
        var e = this.api, n = this.POST, o = t.itemList, c = t.code, a = t.storeData, r = t.needAttributes;
        return new Promise(function(t, i) {
            var s = {
                products: o
            };
            a && s.products.forEach(function(t) {
                return Object.assign(t, a);
            }), n(e.cart.settle, s).then(function(s) {
                if ("0" == s.code) {
                    var u = {
                        productItems: o
                    };
                    c && (u.couponCodes = c), a && (u.productItems.forEach(function(t) {
                        return Object.assign(t, a);
                    }), Object.assign(u, a)), r && (u.needAttributes = 1), n(e.order.orderSettle, u, {
                        resDate: !0
                    }).then(function(e) {
                        var n = e.data, o = e.date;
                        "0" == n.code && n.data ? t(Object.assign(n, {
                            headDate: o
                        })) : i(n);
                    }).catch(function(t) {
                        i(t);
                    });
                } else i(s);
            }).catch(function(t) {
                i(t);
            });
        });
    }, e.prototype.settle = function(t) {
        var e = this.api, n = this.POST, o = t.itemList;
        return new Promise(function(t, c) {
            var a = {
                products: o
            };
            n(e.cart.settle, a).then(function(e) {
                "0" == e.code ? t(e) : c(e);
            }).catch(function(t) {
                c(t);
            });
        });
    }, e.prototype.orderSettle = function(t) {
        var e = this.api, n = this.POST, o = t.itemList, c = t.code, a = t.storeData, r = t.needAttributes;
        return new Promise(function(t, i) {
            var s = {
                productItems: o
            };
            c && (s.couponCodes = c), a && (s.productItems.forEach(function(t) {
                return Object.assign(t, a);
            }), Object.assign(s, a)), r && (s.needAttributes = 1), n(e.order.orderSettle, s, {
                resDate: !0
            }).then(function(e) {
                var n = e.data, o = e.date;
                "0" == n.code && n.data ? t(Object.assign(n, {
                    headDate: o
                })) : i(n);
            }).catch(function(t) {
                i(t);
            });
        });
    }, e;
}();

exports.default = e;
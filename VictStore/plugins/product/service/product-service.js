function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

exports.__esModule = !0;

var e = function() {
    function e(n) {
        t(this, e), Object.assign(this, n);
    }
    return e.prototype.getItemBySpu = function(t) {
        var e = Object.assign({}, t), n = e.spuCode, o = e.channelCode, i = e.storeCode, s = this.api, a = this.POST, c = {
            spuCode: n,
            tenantCode: this.store.tenantCode
        };
        return o && i && Object.assign(c, {
            channelCode: o,
            storeCode: i
        }), new Promise(function(t, e) {
            a(s.product.getItemBySpuCode, c).then(function(n) {
                n.data ? t(n.data) : e(n);
            }).catch(function(t) {
                e(t);
            });
        });
    }, e.prototype.getPromotionBySpu = function(t) {
        var e = Object.assign({}, t), n = e.spuCode, o = e.brandCode, i = e.categoryCode, s = e.channelCode, a = e.storeCode, c = this.api, r = this.POST, u = {
            spuCode: n,
            categoryCode: i,
            brandCode: o
        };
        return s && a && Object.assign(u, {
            channelCode: s,
            storeCode: a
        }), new Promise(function(t, e) {
            r(c.product.getPromotionBySpu, u).then(function(n) {
                n.data && n.data.length ? t(n.data) : e(n);
            }).catch(function(t) {
                e(t);
            });
        });
    }, e.prototype.getItemListBySpu = function(t) {
        var e = Object.assign({}, t), n = e.spuList, o = e.channelCode, i = e.storeCode, s = e.inventoryFlag, a = e.withPromotionFlag, c = e.type, r = e.saleStatus, u = this.api, d = this.POST, h = {
            data: {
                spuCodeList: n,
                inventoryFlag: s ? "1" : "0",
                withPromotionFlag: a ? "1" : "0",
                type: c,
                saleStatus: r
            },
            page: 1,
            size: 99
        };
        return o && (h.data.channelCode = o), i && (h.data.storeCode = i), new Promise(function(t, e) {
            d(u.product.getItemBySpuList, h).then(function(n) {
                n.data ? t(n.data) : e(n);
            }).catch(function(t) {
                e(t);
            });
        });
    }, e.prototype.getItemBySku = function(t) {
        var e = Object.assign({}, t), n = e.skuId, o = e.channelCode, i = e.storeCode, s = this.api, a = this.POST, c = {
            skuCode: n,
            tenantCode: this.store.tenantCode
        };
        return o && i && Object.assign(c, {
            channelCode: o,
            storeCode: i
        }), new Promise(function(t, e) {
            a(s.product.getItemBySkuCode, c).then(function(n) {
                n.data ? t(n.data) : e(n);
            }).catch(function(t) {
                e(t);
            });
        });
    }, e.prototype.checkSkuStock = function(t, e) {
        var n = this.api, o = this.POST, i = this.store;
        return new Promise(function(s, a) {
            o(n.product.inventoryBySku, {
                skuCodeList: [ t ],
                tenantCode: i.tenantCode
            }).then(function(n) {
                if (n && n.content && n.content.successList && n.content.successList) {
                    var o = {
                        skuId: t,
                        hasError: !0,
                        errType: 0
                    };
                    n.content && n.content.successList && n.content.successList.forEach(function(t) {
                        o.stock = t.netQty, t.netQty < e ? (o.hasError = !0, o.errType = 1) : o.hasError = !1;
                    }), s(o);
                } else a(n);
            }).catch(function(t) {
                a(t);
            });
        });
    }, e.prototype.queryPlpTemplateByCms = function(t) {
        var e = this.api, n = this.POST, o = this.store, i = t.smodelCode || "", s = t.browseEnv || "PC";
        return new Promise(function(t, a) {
            i || t(), n(e.cms.cmsUrl, {
                smodelCode: i,
                browseEnv: s,
                tenantCode: o.tenantCode,
                modelCode: o.cmsModel
            }).then(function(e) {
                t(e);
            }).catch(function(t) {
                a(t);
            });
        });
    }, e.prototype.getItemList = function(t) {
        var e = this.api, n = this.POST;
        return new Promise(function(o, i) {
            t || i(), n(e.product.getItemListbyConditions, t).then(function(t) {
                t.data ? o(t.data) : i(t);
            }).catch(function(t) {
                i(t);
            });
        });
    }, e.prototype.getConditions = function(t) {
        var e = this.api, n = this.POST;
        return new Promise(function(o, i) {
            n(e.product.getConditions, t || {}).then(function(t) {
                t.data ? o(t.data) : i(t);
            }).catch(function(t) {
                i(t);
            });
        });
    }, e.prototype.getCategoryTree = function() {
        var t = this.api, e = this.POST;
        return new Promise(function(n, o) {
            e(t.product.getCategoryTree, {}).then(function(t) {
                t.data ? n(t.data) : o(t);
            }).catch(function(t) {
                o(t);
            });
        });
    }, e.prototype.getBrandList = function() {
        var t = this.api, e = this.POST;
        return new Promise(function(n, o) {
            e(t.product.getBrandList).then(function(t) {
                t.data ? n(t.data) : o(t);
            }).catch(function(t) {
                o(t);
            });
        });
    }, e;
}();

exports.default = e;
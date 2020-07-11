function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function o(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" !== (void 0 === t ? "undefined" : n(t)) && "function" != typeof t ? e : t;
}

function r(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : n(t)));
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports.__esModule = !0;

var s = e(require("../../../index")), i = e(require("../service/shop-service")), a = e(require("./base/format")), c = e(require("./base/errMsg")), u = {
    hasTimeout: function(e) {
        var t = e.state.cache.shopList.createTime, o = e.config.shopDataLife;
        return new Date().getTime() - o > t;
    },
    setStoreCode: function(e, t, o) {
        var r = e.storeCode, n = e.channelCode, s = o._getModel();
        o.store.storeCode = r, o.state.cache.shopList.curShopInfo = t, n && (o.store.channelCode = n), 
        (r || n) && Object.keys(s).forEach(function(e) {
            s[e].shopInit && s[e].shopInit({
                storeCode: r,
                channelCode: n
            });
        });
    }
}, f = function(e) {
    function n(r) {
        t(this, n);
        var s = o(this, e.call(this)), a = Object.assign({}, r), c = s.GET, u = s.POST, f = s.api, h = s.store;
        return s.service = new i.default({
            GET: c,
            POST: u,
            api: f,
            store: h
        }), s.config = {
            shopDataLife: a.shopDataLife || 3e5
        }, s.state = {
            cache: {
                shopList: {
                    createTime: 0,
                    list: [],
                    curShopInfo: {}
                }
            }
        }, s;
    }
    return r(n, e), n.prototype.getShopList = function(e) {
        var t = this, o = Object.assign({
            useCache: !0
        }, e), r = this.service, n = this.state.cache.shopList.list, s = o.useCache, i = o.defaultWithFirstShop;
        return new Promise(function(e, o) {
            0 == n.length || u.hasTimeout(t) || !s ? r.getShopList().then(function(o) {
                var r = a.default.formatShopInfo(o);
                if (t.state.cache.shopList.list = r, t.state.cache.shopList.createTime = new Date().getTime(), 
                i) {
                    var n = r[0].storeCode;
                    t.setCurrentShopCode({
                        storeCode: n
                    });
                }
                e(r);
            }).catch(function(e) {
                o(e);
            }) : e(n);
        });
    }, n.prototype.setCurrentShopCode = function(e) {
        var t = this, o = Object.assign({}, e), r = o.storeCode;
        return new Promise(function(e, n) {
            r || n();
            var s = t.state.cache.shopList.list.filter(function(e) {
                return e.storeCode == r;
            });
            s.length <= 0 ? t.getShopList({
                useCache: !1
            }).then(function(i) {
                (s = i.filter(function(e) {
                    return e.storeCode == r;
                })).length > 0 ? (u.setStoreCode(o, s[0], t), e()) : n();
            }).catch(function() {
                n();
            }) : (u.setStoreCode(o, s[0], t), e());
            var i = t._getModel();
            Object.keys(i).forEach(function(e) {
                i[e].shopInit && i[e].shopInit({
                    storeCode: r
                }), "cart" == e && i[e].clearCartCache && i[e].clearCartCache();
            });
        });
    }, n.prototype.getCurrentShopInfo = function(e) {
        var t = this, o = Object.assign({
            useCache: !0
        }, e);
        return new Promise(function(e, r) {
            var n = t.state.cache.shopList, s = n.list, i = n.curShopInfo, a = o.storeCode || t.store.storeCode;
            if (a || r(), 0 == s.length || u.hasTimeout(t) || !o.useCache) t.getShopList().then(function(o) {
                var n = o.filter(function(e) {
                    return e.storeCode == a;
                });
                if (n.length > 0) {
                    var s = n[0];
                    t.state.cache.shopList.curShopInfo = s, e(s);
                } else r();
            }); else if (i) e(i); else {
                var c = s.filter(function(e) {
                    return e.storeCode == a;
                });
                if (0 == c.length) r(); else {
                    var f = c[0];
                    t.state.cache.shopList.curShopInfo = f, e(f);
                }
            }
        });
    }, n.prototype.getErrorMessage = function(e) {
        var t = Object.assign({}, e).code;
        return t && c.default[t] ? c.default[t] : c.default.default;
    }, n;
}(s.default);

exports.default = f;
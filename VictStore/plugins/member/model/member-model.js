function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function n(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" !== (void 0 === t ? "undefined" : a(t)) && "function" != typeof t ? e : t;
}

function o(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : a(t)));
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports.__esModule = !0;

var c = e(require("../../../index")), i = e(require("../service/member-service")), r = e(require("./base/errMsg")), u = {
    getMemberCache: function(e, t, n) {
        var o = null, a = null;
        "info" == t ? n ? (o = e.state.infoUnex && e.state.infoUnex.res, a = e.state.infoUnex && e.state.infoUnex.createTime) : (o = e.state.info && e.state.info.res, 
        a = e.state.info && e.state.info.createTime) : n ? (o = e.state.accountUnex && e.state.accountUnex.res, 
        a = e.state.accountUnex && e.state.accountUnex.createTime) : (o = e.state.account && e.state.account.res, 
        a = e.state.account && e.state.account.createTime);
        var c = e.config.accountDataLife;
        return a && new Date().getTime() - a < c && o;
    },
    updateMemberCache: function(e, t, n) {
        "info" == t ? e.state[n ? "infoUnex" : "info"] = null : e.state[n ? "accountUnex" : "account"] = null;
    }
}, s = function(e) {
    function a(o) {
        t(this, a);
        var c = n(this, e.call(this));
        c.opt = Object.assign({}, o);
        var r = c.GET, u = c.POST, s = c.api, f = c.store;
        return c.service = new i.default({
            GET: r,
            POST: u,
            api: s,
            store: f
        }), c.config = {
            accountDataLife: c.store.accountDataLife >= 0 ? c.store.accountDataLife : 3e5
        }, c.state = {
            info: null,
            account: null,
            infoUnex: null,
            accountUnex: null
        }, c;
    }
    return o(a, e), a.prototype.getToken = function(e) {
        var t = e.appIdentifier, n = e.appType, o = this.service, a = this;
        return new Promise(function(e, c) {
            o.getToken({
                appIdentifier: t,
                appType: n
            }).then(function(n) {
                a.store.appIdentifier = t, e(n);
            }).catch(function(e) {
                c(e);
            });
        });
    }, a.prototype.create = function(e) {
        var t = Object.assign({
            channelCode: null,
            storeCode: null
        }, e), n = t.account, o = t.appIdentifier, a = t.appType, c = t.password, i = t.source, r = this.service;
        return new Promise(function(e, t) {
            r.create({
                account: n,
                appIdentifier: o,
                appType: a,
                password: c,
                source: i
            }).then(function(t) {
                e(t);
            }).catch(function(e) {
                t(e);
            });
        });
    }, a.prototype.updateInfo = function(e, t) {
        var n = this, o = Object.assign({
            useUnex: !1
        }, t), a = this.service;
        return new Promise(function(t, c) {
            a[o.useUnex ? "updateInfoUnex" : "updateInfo"](e).then(function(e) {
                u.updateMemberCache(n, "info", o.useUnex), t(e);
            }).catch(function(e) {
                c(e);
            });
        });
    }, a.prototype.findInfo = function(e) {
        var t = this, n = Object.assign({
            useUnex: !1,
            useCache: !0,
            appType: "05"
        }, e), o = this.service, a = {};
        return n.useUnex && (a.appType = n.appType, a.tenantCode = this.store.tenantCode), 
        new Promise(function(e, c) {
            var i = n.useCache && u.getMemberCache(t, "info", n.useUnex);
            i ? e(i) : o[n.useUnex ? "findInfoUnex" : "findInfo"](a).then(function(o) {
                n.useUnex ? t.state.infoUnex = {
                    res: o,
                    createTime: new Date().getTime()
                } : t.state.info = {
                    res: o,
                    createTime: new Date().getTime()
                }, e(o);
            }).catch(function(e) {
                c(e);
            });
        });
    }, a.prototype.updateAccount = function(e, t) {
        var n = this, o = Object.assign({
            useUnex: !1
        }, t), a = this.service;
        return new Promise(function(t, c) {
            a[o.useUnex ? "updateAccountUnex" : "updateAccount"](e).then(function(e) {
                u.updateMemberCache(n, "account", o.useUnex), t(e);
            }).catch(function(e) {
                c(e);
            });
        });
    }, a.prototype.findAccount = function(e) {
        var t = this, n = Object.assign({
            useUnex: !1,
            useCache: !0,
            appType: "05"
        }, e), o = {};
        n.useUnex && (o.appType = n.appType, o.tenantCode = this.store.tenantCode);
        var a = this.service;
        return new Promise(function(e, c) {
            var i = n.useCache && u.getMemberCache(t, "account", n.useUnex);
            i ? e(i) : a[n.useUnex ? "findAccountUnex" : "findAccount"](o).then(function(o) {
                n.useUnex ? t.state.accountUnex = {
                    res: o,
                    createTime: new Date().getTime()
                } : t.state.account = {
                    res: o,
                    createTime: new Date().getTime()
                }, e(o);
            }).catch(function(e) {
                c(e);
            });
        });
    }, a.prototype.getErrorMessage = function(e) {
        var t = Object.assign({}, e).code;
        return t && r.default[t] ? r.default[t] : r.default.default;
    }, a;
}(c.default);

exports.default = s;
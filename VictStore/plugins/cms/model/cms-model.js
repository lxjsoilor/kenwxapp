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

var i = e(require("../../../index")), u = e(require("../service/cms-service")), a = e(require("./base/format")), s = e(require("./base/errMsg")), c = function(e) {
    function n(r) {
        t(this, n);
        var i = o(this, e.call(this));
        i.opt = Object.assign({}, r);
        var a = i.GET, s = i.POST, c = i.api, f = i.store;
        return i.service = new u.default({
            GET: a,
            POST: s,
            api: c,
            store: f
        }), i.config = {}, i.state = {}, i;
    }
    return r(n, e), n.prototype.getPageData = function(e) {
        var t = Object.assign({
            smodelCode: null
        }, e), o = this.service;
        return new Promise(function(e, r) {
            o.queryPageData(t.smodelCode).then(function(t) {
                e(a.default.formatPageData(t));
            }).catch(function(e) {
                return r(e);
            });
        });
    }, n.prototype.getErrorMessage = function(e) {
        var t = Object.assign({}, e).code;
        return t && s.default[t] ? s.default[t] : s.default.default;
    }, n;
}(i.default);

exports.default = c;
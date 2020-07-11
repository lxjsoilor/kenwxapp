function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function r(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" !== (void 0 === t ? "undefined" : n(t)) && "function" != typeof t ? e : t;
}

function o(e, t) {
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

var i = e(require("../../../index")), a = e(require("../service/order-service")), u = e(require("./base/format")), c = e(require("./base/errMsg")), f = {
    formatOrderLine: function(e) {
        return e.body && e.body.list && e.body.list.length && u.default.formatOrderLine(e.body.list) || [];
    }
}, s = function(e) {
    function n(o) {
        t(this, n);
        var i = r(this, e.call(this));
        i.opt = Object.assign({}, o);
        var u = i.GET, c = i.POST, f = i.api, s = i.store, l = f.order;
        return i.service = new a.default({
            GET: u,
            POST: c,
            api: {
                order: l
            },
            store: s
        }), i;
    }
    return o(n, e), n.prototype.formatOrderLine = function(e) {
        var t = Object.assign({}, {
            format: null
        }, e), r = [];
        return t.data && (r = f.formatOrderLine(t.data)), t.format && (r = t.format(r, t.data)), 
        r;
    }, n.prototype.getOrderDetail = function(e) {
        var t = Object.assign({}, {
            format: null
        }, e), r = t.orderId, o = t.format, n = this.service;
        return new Promise(function(e, t) {
            n.fetchOrderDetail(r).then(function(t) {
                var r = t, n = u.default.formatOrderDetail(t);
                e(o ? o(n, r) : n);
            }).catch(function(e) {
                t(e);
            });
        });
    }, n.prototype.orderCancel = function(e) {
        var t = Object.assign({}, e), r = t.orderId, o = t.cancelRemark, n = this.service;
        return new Promise(function(e, t) {
            var i = {
                orderId: r
            };
            o && (i.cancelRemark = o), n.cancelOrder(i).then(function(t) {
                e(t);
            }).catch(function(e) {
                t(e);
            });
        });
    }, n.prototype.getErrorMessage = function(e) {
        var t = Object.assign({}, e).code;
        return t && c.default[t] ? c.default[t] : c.default.default;
    }, n;
}(i.default);

exports.default = s;
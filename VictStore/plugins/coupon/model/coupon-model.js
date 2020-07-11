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
    return !t || "object" !== (void 0 === t ? "undefined" : r(t)) && "function" != typeof t ? e : t;
}

function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : r(t)));
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports.__esModule = !0;

var i = e(require("../../../index")), u = e(require("../service/coupon-service")), c = e(require("./base/errMsg")), a = function(e) {
    function r(n) {
        t(this, r);
        var i = o(this, e.call(this));
        i.opt = Object.assign({}, n);
        var c = i.GET, a = i.POST, s = i.api.coupon;
        return i.service = new u.default({
            GET: c,
            POST: a,
            api: {
                coupon: s
            }
        }), i;
    }
    return n(r, e), r.prototype.getActivityDetail = function(e) {
        var t = Object.assign({}, e), o = t.activityCode, n = t.memberLevelCode, r = t.channelCode, i = t.storeCode, u = this.service, c = {
            activityCode: o
        };
        return n && (c.memberLevelCode = n), r && (c.channelCode = r), i && (c.storeCode = i), 
        new Promise(function(e, t) {
            u.getActivityDetail(c).then(function(t) {
                e(t);
            }).catch(function(e) {
                t(e);
            });
        });
    }, r.prototype.getCoupon = function(e) {
        var t = Object.assign({
            takeLabel: "01"
        }, e), o = t.activityCode, n = t.memberLevelCode, r = t.channelCode, i = t.storeCode, u = t.takeLabel, c = this.service, a = {
            activityCode: o
        };
        return n && (a.memberLevelCode = n), r && (a.channelCode = r), i && (a.storeCode = i), 
        u && (a.takeLabel = u), new Promise(function(e, t) {
            c.getCoupon(a).then(function(t) {
                e(t);
            }).catch(function(e) {
                t(e);
            });
        });
    }, r.prototype.getUsableCoupon = function(e) {
        var t = this.service, o = {
            promoProducts: e.ableItems.map(function(e) {
                var t = [];
                return e.salesProps.forEach(function(e) {
                    t.push({
                        attributeCode: e.groupId,
                        attributeValue: e.propId
                    });
                }), {
                    attributes: t,
                    brandCode: e.brand.code,
                    categoryCode: e.category[0] && e.category[0].code,
                    productPrice: e.salePrice,
                    quantity: e.buyCount,
                    selectionFlag: "01",
                    skuCode: e.skuId,
                    spuCode: e.spuCode
                };
            })
        };
        return new Promise(function(e, n) {
            t.getUsableCoupon(o).then(function(t) {
                e(t);
            }).catch(function(e) {
                n(e);
            });
        });
    }, r.prototype.getErrorMessage = function(e) {
        var t = Object.assign({}, e).code;
        return t && c.default[t] ? c.default[t] : c.default.default;
    }, r;
}(i.default);

exports.default = a;
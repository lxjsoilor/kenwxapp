function t(t, n) {
    if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
}

exports.__esModule = !0;

var n = function() {
    function n(e) {
        t(this, n), Object.assign(this, e);
    }
    return n.prototype.fetchOrderDetail = function(t) {
        var n = this.api, e = this.POST;
        return new Promise(function(r, o) {
            e(n.order.orderDetail, {
                orderId: t
            }).then(function(t) {
                0 == t.head.code && t.body ? r(t.body) : o(t);
            }).catch(function(t) {
                o(t);
            });
        });
    }, n.prototype.cancelOrder = function(t) {
        var n = this.api, e = this.POST;
        return new Promise(function(r, o) {
            e(n.order.cancelOrder, t).then(function(t) {
                t.success ? r(t) : o(t);
            }).catch(function(t) {
                o(t);
            });
        });
    }, n;
}();

exports.default = n;
function t(t, n) {
    if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
}

exports.__esModule = !0;

var n = function() {
    function n(o) {
        t(this, n), Object.assign(this, o);
    }
    return n.prototype.getActivityDetail = function(t) {
        var n = this.api, o = this.POST;
        return new Promise(function(i, c) {
            o(n.coupon.activityDetail, t).then(function(t) {
                t.success && t.data ? i(t.data) : c(t);
            }).catch(function(t) {
                c(t);
            });
        });
    }, n.prototype.getCoupon = function(t) {
        var n = this.api, o = this.POST;
        return new Promise(function(i, c) {
            o(n.coupon.create, t).then(function(t) {
                t.success ? i(t.data) : c(t);
            }).catch(function(t) {
                c(t);
            });
        });
    }, n.prototype.getUsableCoupon = function(t) {
        var n = this.api, o = this.POST;
        return new Promise(function(i, c) {
            o(n.coupon.filter, t).then(function(t) {
                t.success ? i(t.data) : c(t);
            }).catch(function(t) {
                c(t);
            });
        });
    }, n;
}();

exports.default = n;
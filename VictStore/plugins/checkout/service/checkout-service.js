function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

exports.__esModule = !0;

var e = function() {
    function e(n) {
        t(this, e), Object.assign(this, n);
    }
    return e.prototype.getfreight = function(t) {
        var e = this.api, n = this.POST, r = this.store, o = Object.assign({}, t);
        return new Promise(function(t, i) {
            n(e.store.getFreight, {
                tenantCode: r.tenantCode
            }, o).then(function(e) {
                t(e);
            }).catch(function(t) {
                i(t);
            });
        });
    }, e.prototype.createOrder = function(t, e) {
        var n = this.api, r = this.POST, o = Object.assign({}, e), i = void 0;
        switch (o.ver) {
          case "V2":
            i = n.order.createOrderV2;
            break;

          default:
            i = n.order.createOrder;
        }
        return new Promise(function(e, n) {
            r(i, t, o).then(function(t) {
                e(t);
            }).catch(function(t) {
                n(t);
            });
        });
    }, e.prototype.getAutoCancelSet = function(t) {
        var e = this.api, n = this.POST, r = Object.assign({}, {}, t), o = r.tenantCode, i = r.cancelType;
        return new Promise(function(t, c) {
            n(e.order.getAutoCancelSet, {
                tenantCode: o,
                cancelType: i
            }, r).then(function(e) {
                t(e);
            }).catch(function(t) {
                c(t);
            });
        });
    }, e;
}();

exports.default = e;
function t(t, n) {
    if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./wechat-api")), e = function() {
    function e(i) {
        t(this, e);
        var o = Object.assign({
            BASEURL: null,
            GQLUEL: null,
            GET: null,
            POST: null,
            api: null
        }, i);
        this.GET = o.GET, this.POST = o.POST, this.api = Object.assign(o.api, n.default.getApi({
            BASEURL: o.BASEURL,
            GQLUEL: o.GQLUEL
        }));
    }
    return e.prototype.getOpenId = function(t, n) {
        var e = this.api, i = this.POST, o = Object.assign({
            encryptOpenId: !1
        }, n);
        return new Promise(function(n, a) {
            i(o.encryptOpenId ? e.wechat.getEncryptedOpenId : e.wechat.getOpenId, {
                code: t
            }).then(function(t) {
                "100010" == t.statusCode ? n(t.data) : a(t);
            }).catch(function(t) {
                a(t);
            });
        });
    }, e.prototype.pay = function(t) {
        var n = this.api, e = this.POST;
        return new Promise(function(i, o) {
            e(n.order.payOrder, t).then(function(t) {
                0 == t.code && t.data ? i(t.data) : o(t);
            }).catch(function(t) {
                o(t);
            });
        });
    }, e.prototype.loginByOpenId = function(t) {
        return this.POST(this.api.wechat.loginByOpenId, t);
    }, e.prototype.loginByUnionId = function(t) {
        return this.POST(this.api.wechat.loginByUnionId, t);
    }, e;
}();

module.exports = e;
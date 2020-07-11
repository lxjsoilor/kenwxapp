function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

exports.__esModule = !0;

var s = t(require("./store")), r = t(require("./utils/utils")), i = t(require("./request/request")), u = t(require("./request/api")), n = i.default.request, o = {}, l = {}, a = {}, p = function() {
    function t(i) {
        var l = this;
        e(this, t), this.store = s.default, this.utils = r.default, this.api = o, this.plugins = {}, 
        this.promise = a;
        var p = Object.assign({
            store: {}
        }, i);
        this.store = Object.assign(this.store, p.store), this.api = Object.assign(this.api, u.default.getApi(this.store)), 
        this.reqCount = 0, this.request = n, this.GET = function(t, e, s, r) {
            return l.request(t, e, s, r, "GET");
        }, this.POST = function(t, e, s, r) {
            return l.request(t, e, s, r, "POST");
        };
    }
    return t.prototype.use = function(t, e, s) {
        var r = Object.assign({
            url: null,
            disposable: !1
        }, s), i = Object.assign({}, e), u = l[t] || null;
        if ((!u || r.disposable) && t) {
            var n = r.url || "./plugins/" + t + "/model/" + t + "-model", o = this.plugins[t] || require(n).default;
            r.disposable ? u = new o(i) : (l[t] = new o(i), u = l[t]);
        }
        return u;
    }, t.prototype.getStore = function(t) {
        return this.store[t] || null;
    }, t.prototype._getModel = function() {
        return l;
    }, t;
}();

exports.default = p;
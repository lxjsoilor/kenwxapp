function t(t, n) {
    if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
}

exports.__esModule = !0;

var n = function() {
    function n(s) {
        t(this, n), Object.assign(this, s);
    }
    return n.prototype.getShopList = function() {
        var t = this.api, n = this.POST;
        return new Promise(function(s, e) {
            n(t.store.queryStoreList, {}).then(function(t) {
                t && t.success && t.data ? s(t.data) : e(t);
            }).catch(function(t) {
                e(t);
            });
        });
    }, n;
}();

exports.default = n;
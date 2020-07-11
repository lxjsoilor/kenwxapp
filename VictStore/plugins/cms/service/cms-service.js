function t(t, n) {
    if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
}

exports.__esModule = !0;

var n = function() {
    function n(e) {
        t(this, n), Object.assign(this, e);
    }
    return n.prototype.queryPageData = function(t) {
        var n = this.api, e = this.POST, o = this.store;
        return new Promise(function(s, a) {
            var c = {
                tenantCode: o.tenantCode,
                modelCode: o.cmsModel,
                smodelCode: t,
                browseEnv: "PC"
            };
            e(n.cms.cmsUrl, c).then(function(t) {
                t.success ? s(t.data) : a(t);
            }).catch(function(t) {
                a(t);
            });
        });
    }, n;
}();

exports.default = n;
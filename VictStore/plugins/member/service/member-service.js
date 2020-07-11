function n(n, t) {
    if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function");
}

exports.__esModule = !0;

var t = function() {
    function t(e) {
        n(this, t), Object.assign(this, e);
    }
    return t.prototype.getToken = function(n) {
        var t = this.api, e = this.POST, o = this.store;
        return new Promise(function(i, c) {
            e(t.member.getToken, n).then(function(n) {
                n.data && n.data.authorization ? (o.CASABA_TOKEN = n.data.unexUserToken, i(n.data)) : c(n);
            }).catch(function(n) {
                c(n);
            });
        });
    }, t.prototype.create = function(n) {
        var t = this.api, e = this.POST;
        return new Promise(function(o, i) {
            e(t.member.create, n).then(function(n) {
                o(n);
            }).catch(function(n) {
                i(n);
            });
        });
    }, t.prototype.findInfo = function(n) {
        var t = this.api, e = this.POST;
        return new Promise(function(o, i) {
            e(t.member.findInfo, n).then(function(n) {
                n && n.success && n.data ? o(n.data) : i(n);
            }).catch(function(n) {
                i(n);
            });
        });
    }, t.prototype.findAccount = function(n) {
        var t = this.api, e = this.POST;
        return new Promise(function(o, i) {
            e(t.member.findAccount, n).then(function(n) {
                n && n.success && n.data ? o(n.data) : i(n);
            }).catch(function(n) {
                i(n);
            });
        });
    }, t.prototype.updateInfo = function(n) {
        var t = this.api, e = this.POST;
        return new Promise(function(o, i) {
            e(t.member.updateInfo, n).then(function(n) {
                n && n.success ? o(n) : i(n);
            }).catch(function(n) {
                i(n);
            });
        });
    }, t.prototype.updateAccount = function(n) {
        var t = this.api, e = this.POST;
        return new Promise(function(o, i) {
            e(t.member.updateAccount, n).then(function(n) {
                n && n.success ? o(n) : i(n);
            }).catch(function(n) {
                i(n);
            });
        });
    }, t.prototype.findInfoUnex = function(n) {
        var t = this.api, e = this.POST;
        return new Promise(function(o, i) {
            e(t.member.findInfoUnex, n).then(function(n) {
                n && n.ok && n.content ? o(n.content) : i(n);
            }).catch(function(n) {
                i(n);
            });
        });
    }, t.prototype.findAccountUnex = function(n) {
        var t = this.api, e = this.POST;
        return new Promise(function(o, i) {
            e(t.member.findAccountUnex, n).then(function(n) {
                n && n.ok && n.content ? o(n.content) : i(n);
            }).catch(function(n) {
                i(n);
            });
        });
    }, t.prototype.updateInfoUnex = function(n) {
        var t = this.api, e = this.POST;
        return new Promise(function(o, i) {
            e(t.member.updateInfoUnex, n).then(function(n) {
                n && n.ok ? o(n) : i(n);
            }).catch(function(n) {
                i(n);
            });
        });
    }, t.prototype.updateAccountUnex = function(n) {
        var t = this.api, e = this.POST;
        return new Promise(function(o, i) {
            e(t.member.updateAccountUnex, n).then(function(n) {
                n && n.ok ? o(n) : i(n);
            }).catch(function(n) {
                i(n);
            });
        });
    }, t;
}();

exports.default = t;
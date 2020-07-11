function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

exports.__esModule = !0;

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./base/format")), i = function() {
    function i(e) {
        t(this, i), Object.assign(this, e);
    }
    return i.prototype.getItemList = function(t, i) {
        var n = this.POST, a = this.api;
        return new Promise(function(o, s) {
            var r = e.default.getItemListReq(t);
            n(a.product.getItemListbyConditionsOld, r).then(function(t) {
                if (t.data && t.data.itemDetailList) {
                    var n = t.data, a = n.count, r = n.itemDetailList, u = e.default.formatItemList(r, i);
                    o({
                        itemList: u,
                        count: a
                    });
                } else s(t);
            }).catch(function(t) {
                s(t);
            });
        });
    }, i;
}();

exports.default = i;
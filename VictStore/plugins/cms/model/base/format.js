exports.__esModule = !0, exports.default = {
    formatPageData: function(t) {
        var e = {}, n = [ "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth" ];
        return e.fixedCMS = n.map(function(e) {
            var n = t[e];
            return n && n.value ? n : null;
        }), e.customCMS = t.dynamic && t.dynamic.map(function(t) {
            return t && t.value;
        }) || [], e;
    }
};
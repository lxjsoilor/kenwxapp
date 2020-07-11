module.exports = {
    ben_form: require("./ben_form/ben_form.js"),
    ben_filter: require("./ben_filter/ben_filter.js"),
    toastMsg: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2e3, n = arguments[2], o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "none";
        wx.showToast({
            title: t,
            icon: o,
            image: n || "",
            duration: e
        });
    },
    seconds_counting: function(t) {
        var e, n = t.page, o = t.model, r = t.count, i = t.onStart, a = t.onCount, f = t.onEnd, s = o.key, u = o.placeholder;
        r = r || 60, "function" == typeof i ? i(r, o) : n.setData((e = {}, e[s + ".text"] = r + "s", 
        e[s + ".active"] = !0, e));
        var c = setInterval(function(t) {
            if (0 === r) {
                var e;
                clearInterval(c), n.setData((e = {}, e[s + ".text"] = u, e[s + ".active"] = !1, 
                e)), "function" == typeof f && f(o);
            } else {
                var i;
                r--, "function" == typeof a ? a(r, o) : n.setData((i = {}, i[s + ".text"] = r + "s", 
                i));
            }
        }, 1e3);
        return c;
    },
    formatNumber: function(t) {
        return t < 10 ? "0" + t : t;
    },
    time_counting: function(t) {
        var e = this;
        console.log("ben_filter=====>", this.ben_filter);
        var n = t.diff_time, o = t.onStart, r = t.onCount, i = t.onEnd, a = t.type, f = void 0;
        if (!n || n <= 0) return console.log("the diff_time is less than 0"), !1;
        var s = this.ben_filter.format_D_H_M_S(parseInt(n / 1e3), a), u = s.d, c = s.h, l = s.m, m = s.s;
        "function" == typeof o && o(s);
        var v = setInterval(function(t) {
            m > 0 ? m-- : (m = 59, --l < 0 && (l = 59, --c < 0 && (void 0 === u ? (c = 0, l = 0, 
            m = 0, f = "over", clearInterval(v), "function" == typeof i && i({
                d: u,
                h: c,
                m: l,
                s: m
            })) : (c = 23, --u < 0 && (f = "over", clearInterval(v), "function" == typeof i && i({
                d: u,
                h: c,
                m: l,
                s: m
            })), u = e.formatNumber(u))), c = e.formatNumber(c)), l = e.formatNumber(l)), m = e.formatNumber(m), 
            "over" !== f && "function" == typeof r && r({
                d: u,
                h: c,
                m: l,
                s: m
            });
        }, 1e3);
        return v;
    }
};
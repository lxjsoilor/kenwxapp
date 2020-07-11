var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = "function" == typeof Symbol && "symbol" === t(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : t(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
};

module.exports = {
    formatTime: function(t) {
        var e = t.getFullYear(), n = t.getMonth() + 1, r = t.getDate(), o = t.getHours(), i = t.getMinutes(), u = t.getSeconds();
        return [ e, n, r ].map(formatNumber).join(".") + " " + [ o, i, u ].map(formatNumber).join(":");
    },
    formatNumber: function(t) {
        return (t = t.toString())[1] ? t : "0" + t;
    },
    objToArr: function(t, e) {
        var n = [];
        for (var r in t) e && (t[r][e] = r), n.push(t[r]);
        return n;
    },
    arrToObj: function(t, e) {
        var n = {};
        return t.forEach(function(t) {
            n[t[e]] = t;
        }), n;
    },
    createQueryList: function(t) {
        if (!t) return "";
        var e = [];
        for (var n in t) t[n] && e.push(n + "=" + t[n]);
        return e;
    },
    createQueryString: function(t) {
        var e = this.createQueryList(t);
        return e.length ? "?" + e.join("&") : "";
    },
    setCounting: function(t, e, n) {
        var r, o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 60;
        t.setData((r = {}, r[e + ".text"] = o + "s", r[e + ".active"] = !0, r));
        var i = setInterval(function(r) {
            if (0 === o) {
                var u;
                clearInterval(i), t.setData((u = {}, u[e + ".text"] = n.placeholder, u[e + ".active"] = !1, 
                u));
            } else {
                var f;
                o--, t.setData((f = {}, f[e + ".text"] = o + "s", f));
            }
        }, 1e3);
        return i;
    },
    detectNetwork: function() {
        wx.getNetworkType({
            success: function(t) {
                "none" != t.networkType || wx.navigateTo({
                    url: "/pages/network-error/network-error"
                });
            }
        });
    },
    isEqualObject: function(t, e) {
        var n = Object.getOwnPropertyNames(t), r = Object.getOwnPropertyNames(e);
        if (n.length != r.length) return !1;
        for (var o = 0; o < n.length; o++) {
            var i = n[o];
            if (t[i] !== e[i]) return console.log("diff---------propName--------------------------\x3e", i), 
            !1;
        }
        return !0;
    },
    compareVersion: function(t, e) {
        t = t.split("."), e = e.split(".");
        for (var n = 0, r = t.length >= e.length ? t.length : e.length, o = 0; o < r; o++) {
            if (void 0 === t[o]) {
                n = -1;
                break;
            }
            if (void 0 === e[o]) {
                n = 1;
                break;
            }
            if (Number(t[o]) > Number(e[o])) {
                n = 1;
                break;
            }
            if (Number(t[o]) < Number(e[o])) {
                n = -1;
                break;
            }
        }
        return n;
    },
    getSetting: function(t, e) {
        var n = e.success, r = e.fail, o = e.refuse;
        wx.getSetting({
            success: function(e) {
                var i = e.authSetting["scope." + t];
                if (void 0 === i) {
                    if ("userInfo" === t) return !1;
                    wx.authorize({
                        scope: "scope." + t,
                        success: function(t) {
                            "function" == typeof n && n(t);
                        },
                        fail: function(t) {
                            "function" == typeof r ? r(t) : setTimeout(function(t) {
                                wx.openSetting();
                            }, 100);
                        }
                    });
                } else !1 === i ? "function" == typeof o ? o(e) : wx.openSetting() : "function" == typeof n && n(e);
            }
        });
    },
    isPlainObject: function(t) {
        return "{}" === JSON.stringify(t);
    },
    isArray: function(t) {
        return t instanceof Array;
    },
    extend: function() {
        var t, n, r, o, i, u, f = arguments[0] || {}, a = 1, c = arguments.length, s = !1;
        for ("boolean" == typeof f && (s = f, f = arguments[1] || {}, a = 2), "object" === (void 0 === f ? "undefined" : e(f)) || this.isFunction(f) || (f = {}), 
        c === a && (f = this, --a); a < c; a++) if (null != (t = arguments[a])) for (n in t) r = f[n], 
        f !== (o = t[n]) && (s && o && (this.isPlainObject(o) || (i = this.isArray(o))) ? (i ? (i = !1, 
        u = r && this.isArray(r) ? r : []) : u = r && this.isPlainObject(r) ? r : {}, f[n] = this.extend(s, u, o)) : void 0 !== o && (f[n] = o));
        return f;
    }
};
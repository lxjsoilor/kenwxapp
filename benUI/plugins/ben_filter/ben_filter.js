module.exports = {
    isFloat: function(e) {
        return ~~e !== e;
    },
    formatCurrency: function(e, r) {
        var s = (e = Number(e)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, function(e, r) {
            return r + ",";
        });
        switch (r) {
          case "int":
            return s.split(".")[0];

          case "float":
            return s;

          case "auto":
            return this.isFloat(e) ? s : s.split(".")[0];

          default:
            return s;
        }
    },
    combine_time_string: function(e) {
        return e.replace(/[-:/\s]/g, "");
    },
    transformTime: function(e, r, s) {
        s = s || "-";
        var a, m = e.substring(0, 4), t = e.substring(4, 6), n = e.substring(6, 8), i = e.substring(8, 10), y = e.substring(10, 12), o = e.substring(12, 14);
        switch (r) {
          case void 0:
            a = "" + m + s + t + s + n + " " + i + ":" + y;
            break;

          case "yyyy":
            a = "ZH_CN" === s ? m + "年" : "" + m;
            break;

          case "yyyy-mm":
            a = "ZH_CN" === s ? m + "年" + t + "月" : "" + m + s + t;
            break;

          case "mm-dd":
            a = "ZH_CN" === s ? t + "月" + n + "日" : "" + t + s + n;
            break;

          case "yyyy-mm-dd":
            a = "ZH_CN" === s ? m + "年" + t + "月" + n + "日" : "" + m + s + t + s + n;
            break;

          case "mm-dd hh:mm":
            a = "ZH_CN" === s ? t + "月" + n + "日 " + i + ":" + y : "" + t + s + n + " " + i + ":" + y;
            break;

          case "mm-dd hh:mm:ss":
            a = "ZH_CN" === s ? t + "月" + n + "日 " + i + ":" + y + ":" + o : "" + t + s + n + " " + i + ":" + y + ":" + o;
            break;

          case "yyyy-mm-dd hh:mm":
            a = "ZH_CN" === s ? m + "年" + t + "月" + n + "日 " + i + ":" + y : "" + m + s + t + s + n + " " + i + ":" + y;
            break;

          case "yyyy-mm-dd hh:mm:ss":
            a = "ZH_CN" === s ? m + "年" + t + "月" + n + "日 " + i + ":" + y : "" + m + s + t + s + n + " " + i + ":" + y + ":" + o;
            break;

          case "hh:mm":
            a = i + ":" + y;
            break;

          case "hh:mm:ss":
            a = i + ":" + y + ":" + o;
        }
        return a;
    },
    formatTime: function(e, r, s) {
        s = s || "-";
        var a = e.getFullYear(), m = e.getMonth() + 1, t = e.getDate(), n = e.getHours(), i = e.getMinutes(), y = e.getSeconds(), o = this.formatNumber, c = [ a, m, t ].map(o), d = [ n, i, y ].map(o), u = "";
        switch (r) {
          case void 0:
            u = ("ZH_CN" === s ? c[0] + "年" + c[1] + "月" + c[2] + "日" : c.join(s)) + " " + d.join(":");
            break;

          case "yyyy-mm-dd hh:mm:ss.S":
            u = ("ZH_CN" === s ? c[0] + "年" + c[1] + "月" + c[2] + "日" : c.join(s)) + " " + d.join(":") + " " + e.getMilliseconds();
            break;

          case "yyyy-mm-dd hh:mm:ss":
            u = ("ZH_CN" === s ? c[0] + "年" + c[1] + "月" + c[2] + "日" : c.join(s)) + " " + d.join(":");
            break;

          case "yyyy-mm-dd hh:mm":
            u = ("ZH_CN" === s ? c[0] + "年" + c[1] + "月" + c[2] + "日" : c.join(s)) + " " + [ d[0], d[1] ].join(":");
            break;

          case "yyyy":
            u = "ZH_CN" === s ? c[0] + "年" : c[0];
            break;

          case "yyyy-mm":
            u = "ZH_CN" === s ? c[0] + "年" + c[1] + "月" : [ c[0], c[1] ].join(s);
            break;

          case "mm-dd":
            u = "ZH_CN" === s ? c[1] + "月" + c[2] + "日" : [ c[1], c[2] ].join(s);
            break;

          case "mm-dd hh:mm":
            u = ("ZH_CN" === s ? c[1] + "月" + c[2] + "日" : [ c[1], c[2] ].join(s)) + " " + [ d[0], d[1] ].join(":");
            break;

          case "yyyy-mm-dd":
            u = "ZH_CN" === s ? c[0] + "年" + c[1] + "月" + c[2] + "日" : c.join(s);
            break;

          case "hh:mm":
            u = [ d[0], d[1] ].join(":");
            break;

          case "hh:mm:ss":
            u = d.join(":");
        }
        return u;
    },
    formatNumber: function(e) {
        return e < 10 ? "0" + e : e;
    },
    format_D_H_M_S: function(e, r, s) {
        var a = "day" === (r = r || "day") ? parseInt(e / 86400) : void 0, m = e - 86400 * (a || 0), t = "day" === r ? parseInt(m / 3600) : parseInt(e / 3600), n = parseInt(m % 3600 / 60), i = parseInt(m % 60);
        return t = s ? this.formatNumber(t) : t, n = s ? this.formatNumber(n) : n, i = s ? this.formatNumber(i) : i, 
        "day" === r ? {
            d: a,
            h: t,
            m: n,
            s: i
        } : {
            h: t,
            m: n,
            s: i
        };
    }
};
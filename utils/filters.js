module.exports = {
    formatePrice: function(e, r) {
        var t = r || "";
        if (isNaN(e)) return e;
        if (e) {
            var s = e.toString(), a = s.split(".")[1];
            return a ? 1 == a.length && (s += "0") : s += ".00", s.toString().replace(/(\d)(?=(\d{3})+\.)/g, function(e, r) {
                return r + t;
            });
        }
        return "0.00".toString().replace(/(\d)(?=(\d{3})+\.)/g, function(e, r) {
            return r + t;
        });
    },
    transformTimeToStr: function(e) {
        var r = e.split(" ")[0].split("-").join("");
        console.log(r);
        var t = r + (e = e.split(" ")[1]).split(":").join("");
        return t;
    },
    transformTime: function(e, r, t) {
        t = t || "-";
        var s, a = e.substring(0, 4), n = e.substring(4, 6), m = e.substring(6, 8), i = e.substring(8, 10), o = e.substring(10, 12), y = e.substring(12, 14);
        switch (r) {
          case void 0:
            s = "" + a + t + n + t + m + " " + i + ":" + o;
            break;

          case "yyyy":
            s = "ZH_CN" === t ? a + "年" : "" + a;
            break;

          case "yyyy-mm":
            s = "ZH_CN" === t ? a + "年" + n + "月" : "" + a + t + n;
            break;

          case "mm-dd":
            s = "ZH_CN" === t ? n + "月" + m + "日" : "" + n + t + m;
            break;

          case "yyyy-mm-dd":
            s = "ZH_CN" === t ? a + "年" + n + "月" + m + "日" : "" + a + t + n + t + m;
            break;

          case "mm-dd hh:mm":
            s = "ZH_CN" === t ? n + "月" + m + "日 " + i + ":" + o : "" + n + t + m + " " + i + ":" + o;
            break;

          case "mm-dd hh:mm:ss":
            s = "ZH_CN" === t ? n + "月" + m + "日 " + i + ":" + o + ":" + y : "" + n + t + m + " " + i + ":" + o + ":" + y;
            break;

          case "yyyy-mm-dd hh:mm":
            s = "ZH_CN" === t ? a + "年" + n + "月" + m + "日 " + i + ":" + o : "" + a + t + n + t + m + " " + i + ":" + o;
            break;

          case "yyyy-mm-dd hh:mm:ss":
            s = "ZH_CN" === t ? a + "年" + n + "月" + m + "日 " + i + ":" + o : "" + a + t + n + t + m + " " + i + ":" + o + ":" + y;
            break;

          case "hh:mm":
            s = i + ":" + o;
            break;

          case "hh:mm:ss":
            s = i + ":" + o + ":" + y;
        }
        return s;
    },
    formatTime: function(e, r, t) {
        t = t || "-";
        var s = e.getFullYear(), a = e.getMonth() + 1, n = e.getDate(), m = e.getHours(), i = e.getMinutes(), o = e.getSeconds(), y = e.getMilliseconds(), c = this.formatNumber, d = [ s, a, n ].map(c), u = [ m, i, o ].map(c), h = "";
        switch (r) {
          case void 0:
            h = ("ZH_CN" === t ? d[0] + "年" + d[1] + "月" + d[2] + "日" : d.join(t)) + " " + u.join(":");
            break;

          case "yyyy-mm-dd hh:mm:ss.S":
            h = ("ZH_CN" === t ? d[0] + "年" + d[1] + "月" + d[2] + "日" : d.join(t)) + " " + u.join(":") + " " + y;
            break;

          case "yyyy-mm-dd hh:mm:ss":
            h = ("ZH_CN" === t ? d[0] + "年" + d[1] + "月" + d[2] + "日" : d.join(t)) + " " + u.join(":");
            break;

          case "yyyy-mm-dd hh:mm":
            h = ("ZH_CN" === t ? d[0] + "年" + d[1] + "月" + d[2] + "日" : d.join(t)) + " " + [ u[0], u[1] ].join(":");
            break;

          case "yyyy":
            h = "ZH_CN" === t ? d[0] + "年" : d[0];
            break;

          case "yyyy-mm":
            h = "ZH_CN" === t ? d[0] + "年" + d[1] + "月" : [ d[0], d[1] ].join(t);
            break;

          case "mm-dd":
            h = "ZH_CN" === t ? d[1] + "月" + d[2] + "日" : [ d[1], d[2] ].join(t);
            break;

          case "mm-dd hh:mm":
            h = ("ZH_CN" === t ? d[1] + "月" + d[2] + "日" : [ d[1], d[2] ].join(t)) + " " + [ u[0], u[1] ].join(":");
            break;

          case "yyyy-mm-dd":
            h = "ZH_CN" === t ? d[0] + "年" + d[1] + "月" + d[2] + "日" : d.join(t);
            break;

          case "hh:mm":
            h = [ u[0], u[1] ].join(":");
            break;

          case "hh:mm:ss":
            h = u.join(":");
        }
        return h;
    },
    formatNumber: function(e) {
        return e < 10 ? "0" + e : e;
    },
    getCurrentCountDown: function(e, r) {
        var t = Object.assign({}, {
            type: "nomal",
            serverTime: null,
            textStart: "",
            textEnd: ""
        }, r || {}), s = "", a = t.serverTime ? new Date(t.serverTime.replace(/-/g, "/")).getTime() : new Date().getTime(), n = (e || new Date().getTime()) - a, m = parseInt(n / 1e3 / 60 / 60 / 24) || 0, i = parseInt(n / 1e3 / 60 / 60 % 24) || 0, o = parseInt(n / 1e3 / 60 % 60) || 0, y = parseInt(n / 1e3 % 60) || 0;
        switch (t.type) {
          case "byHour":
            i += 24 * m, m = 0;
        }
        return n > 0 && (s = 0 == m && 0 == i && 0 == o && 0 == y ? "" : t.textStart + (m > 0 ? m + "天" : "") + (m > 0 || i > 0 ? i + "时" : "") + (m > 0 || i > 0 || o > 0 ? o + "分" : "") + (m > 0 || i > 0 || o > 0 || y > 0 ? y + "秒" : "") + t.textEnd), 
        {
            days: m,
            hours: i,
            minutes: o,
            seconds: y,
            timeText: s
        };
    },
    format_D_H_M_S: function(e, r) {
        var t = "day" === (r = r || "day") ? parseInt(e / 86400) : void 0, s = e - 86400 * (t || 0), a = "day" === r ? parseInt(s / 3600) : parseInt(e / 3600), n = parseInt(s % 3600 / 60), m = parseInt(s % 60);
        return "day" === r ? {
            d: t,
            h: a,
            m: n,
            s: m
        } : {
            h: a,
            m: n,
            s: m
        };
    }
};
exports.__esModule = !0, exports.default = {
    formatePrice: function(e, r) {
        var t = r || "";
        if (isNaN(e)) return e;
        if (e) {
            var n = e.toString(), o = n.split(".")[1];
            return o ? 1 == o.length && (n += "0") : n += ".00", n.toString().replace(/(\d)(?=(\d{3})+\.)/g, function(e, r) {
                return r + t;
            });
        }
        return "0.00".toString().replace(/(\d)(?=(\d{3})+\.)/g, function(e, r) {
            return r + t;
        });
    },
    transformTime: function(e, r, t) {
        t = t || "-";
        var n, o = e.substring(0, 4), s = e.substring(4, 6), a = e.substring(6, 8), d = e.substring(8, 10), c = e.substring(10, 12), i = e.substring(12, 14);
        switch (r) {
          case void 0:
            n = "" + o + t + s + t + a + " " + d + ":" + c;
            break;

          case "yyyy":
            n = "ZH_CN" === t ? o + "年" : "" + o;
            break;

          case "yyyy-mm":
            n = "ZH_CN" === t ? o + "年" + s + "月" : "" + o + t + s;
            break;

          case "mm-dd":
            n = "ZH_CN" === t ? s + "月" + a + "日" : "" + s + t + a;
            break;

          case "yyyy-mm-dd":
            n = "ZH_CN" === t ? o + "年" + s + "月" + a + "日" : "" + o + t + s + t + a;
            break;

          case "mm-dd hh:mm":
            n = "ZH_CN" === t ? s + "月" + a + "日 " + d + ":" + c : "" + s + t + a + " " + d + ":" + c;
            break;

          case "mm-dd hh:mm:ss":
            n = "ZH_CN" === t ? s + "月" + a + "日 " + d + ":" + c + ":" + i : "" + s + t + a + " " + d + ":" + c + ":" + i;
            break;

          case "yyyy-mm-dd hh:mm":
            n = "ZH_CN" === t ? o + "年" + s + "月" + a + "日 " + d + ":" + c : "" + o + t + s + t + a + " " + d + ":" + c;
            break;

          case "yyyy-mm-dd hh:mm:ss":
            n = "ZH_CN" === t ? o + "年" + s + "月" + a + "日 " + d + ":" + c : "" + o + t + s + t + a + " " + d + ":" + c + ":" + i;
            break;

          case "hh:mm":
            n = d + ":" + c;
            break;

          case "hh:mm:ss":
            n = d + ":" + c + ":" + i;
        }
        return n;
    },
    initModelShop: function(e, r) {
        var t = Object.assign({}, r), n = t.useStoreShop, o = t.useStoreChannel;
        e.channelCode = t.channelCode || (o ? e.store.channelCode : null), e.storeCode = t.storeCode || (n ? e.store.storeCode : null);
    },
    getReqWithStore: function(e) {
        var r = Object.assign({
            req: {},
            model: {
                opt: {}
            },
            actionData: null,
            type: "Object",
            root: "",
            needStoreCode: !0,
            needStoreChannel: !0
        }, e), t = r.req, n = r.model, o = r.actionData, s = r.type, a = r.root, d = r.needStoreCode, c = {};
        switch (r.needStoreChannel && (o.channelCode ? c.channelCode = o.channelCode : n.channelCode && (c.channelCode = n.channelCode)), 
        d && (o.storeCode ? c.storeCode = o.storeCode : n.storeCode && (c.storeCode = n.storeCode)), 
        s) {
          case "Array":
            a ? t[a].forEach(function(e) {
                return Object.assign(e, c);
            }) : t.forEach(function(e) {
                return Object.assign(e, c);
            });
            break;

          default:
            Object.assign(a ? t[a] : t, c);
        }
        return t;
    }
};
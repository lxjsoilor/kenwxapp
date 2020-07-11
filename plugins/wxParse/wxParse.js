function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    var t = this, a = e.target.dataset.src, i = e.target.dataset.from;
    void 0 !== i && i.length > 0 && wx.previewImage({
        current: a,
        urls: t.data[i].imageUrls
    });
}

function a(e) {
    var t = this, a = e.target.dataset.from, r = e.target.dataset.idx;
    void 0 !== a && a.length > 0 && i(e, r, t, a);
}

function i(e, t, a, i) {
    var n, d = a.data[i];
    if (d && 0 != d.images.length) {
        for (var s = d.images, o = r(e.detail.width, e.detail.height, a, i), g = "" + i, l = s[t].index.split("."), h = Array.isArray(l), m = 0, l = h ? l : l[Symbol.iterator](); ;) {
            var v;
            if (h) {
                if (m >= l.length) break;
                v = l[m++];
            } else {
                if ((m = l.next()).done) break;
                v = m.value;
            }
            g += ".nodes[" + v + "]";
        }
        var u = g + ".width", f = g + ".height";
        a.setData((n = {}, n[u] = o.imageWidth, n[f] = o.imageheight, n));
    }
}

function r(e, t, a, i) {
    var r = 0, n = 0, d = 0, g = {}, l = a.data[i].view.imagePadding;
    return r = s - 2 * l, o, e > r ? (d = (n = r) * t / e, g.imageWidth = n, g.imageheight = d) : (g.imageWidth = e, 
    g.imageheight = t), g;
}

var n = e(require("./showdown.js")), d = e(require("./html2json.js")), s = 0, o = 0;

wx.getSystemInfo({
    success: function(e) {
        s = e.windowWidth, o = e.windowHeight;
    }
}), module.exports = {
    wxParse: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wxParseData", i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "html", r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', s = arguments[3], o = arguments[4], g = s, l = {};
        if ("html" == i) l = d.default.html2json(r, e); else if ("md" == i || "markdown" == i) {
            var h = new n.default.Converter().makeHtml(r);
            l = d.default.html2json(h, e), console.log(JSON.stringify(l, " ", " "));
        }
        l.view = {}, l.view.imagePadding = 0, void 0 !== o && (l.view.imagePadding = o);
        var m = {};
        m[e] = l, g.setData(m), g.wxParseImgLoad = a, g.wxParseImgTap = t;
    },
    wxParseTemArray: function(e, t, a, i) {
        for (var r = [], n = i.data, d = null, s = 0; s < a; s++) {
            var o = n[t + s].nodes;
            r.push(o);
        }
        e = e || "wxParseTemArray", (d = JSON.parse('{"' + e + '":""}'))[e] = r, i.setData(d);
    },
    emojisInit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", a = arguments[2];
        d.default.emojisInit(e, t, a);
    }
};
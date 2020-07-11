var t = getApp();

module.exports = {
    promise: {},
    banner: {},
    QR: {},
    bg: null,
    width: null,
    height: null,
    getImageInfo: function(t) {
        return new Promise(function(e, i) {
            wx.getImageInfo({
                src: t,
                success: function(t) {
                    t.path = t.path.indexOf("://") > -1 ? t.path : "/" + t.path, e(t);
                },
                fail: function(t) {
                    e(null);
                }
            });
        });
    },
    download_file: function(e) {
        var i = this, n = e.url, o = e.query;
        return o = t.myUtil.createQueryString(o), new Promise(function(e, h) {
            wx.downloadFile({
                url: n + o,
                header: {
                    "x-auth-token": t.globalData["x-auth-token"]
                },
                success: function(t) {
                    console.log("downloadFile.file_success--------------\x3e", t), i.QR[o.scene] = new Promise(function(e) {
                        e(t.tempFilePath);
                    }), e({
                        path: t.tempFilePath
                    });
                },
                fail: function(t) {
                    console.log("downloadFile.file_failed--------------\x3e", t), h(t);
                }
            });
        });
    },
    create: function(t, e, i) {
        var n = this, o = e.itemCode, h = e.banner, l = e.QR;
        this.width = t.width, this.height = t.height, this.bannerImg = this.getImageInfo(h), 
        console.log("this.QR[" + o + "]---------------------------------\x3e", this.QR[o]), 
        this.QR[o] || (console.log(o + "-------------------------------------------\x3e", o), 
        this.QR[o] = this.getImageInfo(l));
        var a = [ this.bannerImg, this.QR[o] ];
        return this.promise[o] || (this.promise[o] = new Promise(function(o) {
            n.draw(a, t, e).then(function(e) {
                if (console.log("rst====>", e), e) {
                    var h = {
                        canvasId: t.id,
                        fileType: i || "jpg",
                        success: function(t) {
                            console.log("temp_image-----------\x3e", t), o(t.tempFilePath);
                        }
                    };
                    wx.canvasToTempFilePath(h, n);
                } else console.log("绘制图片失败"), o(null);
            });
        })), this.promise[o];
    },
    draw: function(t, e, i) {
        var n = this, o = i.detail;
        return new Promise(function(i) {
            Promise.all(t).then(function(t) {
                console.log("canvas---------------\x3e", e);
                var h = wx.createCanvasContext(e.id);
                n.ctx = h, n.ctxTop = 0, console.log("result---------------\x3e1", t), h.clearRect(0, 0, e.width, e.height), 
                h.setFillStyle("#E8E8E8"), h.fillRect(0, n.ctxTop, e.width, e.height), n.ctxTop = 0;
                var l = e.height - 121;
                n.draw_the_image(t[0], {
                    width: 375,
                    height: l,
                    x: "center",
                    y: n.ctxTop
                }), n.ctxTop = l, h.setFillStyle("#ffffff"), h.fillRect(0, n.ctxTop, e.width, e.height - n.ctxTop), 
                n.ctxTop += 20;
                var a = n.ctxTop + 36;
                n.draw_the_image(t[1], {
                    width: 81,
                    height: 81,
                    x: 20,
                    y: n.ctxTop
                }), h.setTextAlign("left"), h.setFillStyle("#3e3d3e"), h.font = "normal bold 14px sans-serif", 
                h.fillText(o.title, 120, a), h.setFillStyle("#a4a3a4"), h.font = "normal bold 12px sans-serif", 
                h.fillText("来自Rothys官方商城", 120, a + 22), h.draw(!0, function(t) {
                    i(!0);
                });
            }).catch(function(t) {
                console.log("ShareCard.draw.error"), i(null);
            });
        });
    },
    draw_the_image: function(t, e) {
        var i = e.width, n = e.height, o = e.x, h = e.y, l = e.border, a = e.ctxMove, s = void 0 === a || a;
        if (t) {
            var r = this.format_image_setting(t, {
                width: i,
                height: n,
                x: o,
                y: h
            });
            this.ctx.drawImage(r.path, r.x, r.y, r.width, r.height), l && (this.ctx.setLineWidth(l.width || 1), 
            this.ctx.setStrokeStyle(l.color || "#000000"), this.ctx.strokeRect(r.x, r.y, r.width, r.height)), 
            s && (this.ctxTop += r.height);
        }
    },
    format_image_setting: function(t, e) {
        var i = e.width, n = e.height, o = e.x, h = e.y;
        if (t && t.errMsg.indexOf("ok")) {
            var l = n || i / (t.width / t.height);
            return {
                path: t.path,
                width: i,
                height: l,
                x: "center" === o ? (this.width - i) / 2 : o || 0,
                y: "bottom" === h ? this.height - l : h
            };
        }
    },
    _renderText: function(t, e, i) {
        var n = this.ctx;
        if (e.fontSize && n.setFontSize(e.fontSize), e.font && (n.font = e.font), e.color = e.color || "#000000", 
        n.setFillStyle(e.color), this.ctxTop += e.padding[0] + e.fontSize + (e.lineHeight ? (e.lineHeight - e.fontSize) / 2 : 0), 
        e.wordBreak) {
            var o = /[\u4e00-\u9fa5]/g, h = e.text.split(" "), l = "", a = 1, s = [], r = t.width - (e.padding[1] + (e.padding[3] || e.padding[1] || 0));
            h.forEach(function(t, e) {
                if (o.test(t)) {
                    var i = e < h.length - 1 ? [].concat(t.split(""), [ " " ]) : t.split("");
                    s.push.apply(s, i);
                } else {
                    var n = e < h.length - 1 ? [ t, " " ] : [ t ];
                    s.push.apply(s, n);
                }
            });
            for (var c = 0; c < s.length; c++) {
                if (!(a <= e.wordBreak)) {
                    this.ctxTop += e.lineHeight ? (e.lineHeight - e.fontSize) / 2 : 0;
                    break;
                }
                if (n.measureText(l + s[c]).width <= r) {
                    if (l += s[c], c === s.length - 1) {
                        n.fillText(l, e.padding[1], this.ctxTop), e.lineHeight && (this.ctxTop += e.lineHeight ? (e.lineHeight - e.fontSize) / 2 : 0);
                        break;
                    }
                } else a == e.wordBreak && (l = l.replace(/.{1}$/, "...")), n.fillText(l, e.padding[1], this.ctxTop), 
                a < e.wordBreak && (this.ctxTop += e.lineHeight), a += 1, l = s[c];
            }
        } else e.fontSize && n.setFontSize(e.fontSize), e.font && (n.font = e.font), n.fillText(e.text, e.padding[1], this.ctxTop);
        this.ctxTop += e.padding[2] ? e.padding[2] : e.padding[0];
    }
};
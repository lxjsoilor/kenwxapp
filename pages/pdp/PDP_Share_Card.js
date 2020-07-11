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
        return o = t.myUtil.createQueryString(o), new Promise(function(e, l) {
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
                    console.log("downloadFile.file_failed--------------\x3e", t), l(t);
                }
            });
        });
    },
    create: function(t, e, i) {
        var n = this, o = e.itemCode, l = e.banner, a = e.QR;
        this.width = t.width, this.height = t.height, this.banner[o] || (this.banner[o] = this.getImageInfo(l)), 
        console.log("this.QR[" + o + "]---------------------------------\x3e", this.QR[o]), 
        this.QR[o] || (console.log(o + "-------------------------------------------\x3e", o), 
        this.QR[o] = this.getImageInfo(a));
        var h = [ this.banner[o], this.QR[o] ];
        return this.promise[o] || (this.promise[o] = new Promise(function(o) {
            n.draw(h, t, e).then(function(e) {
                if (console.log("rst====>", e), e) {
                    var l = {
                        canvasId: t.id,
                        fileType: i || "jpg",
                        success: function(t) {
                            console.log("temp_image-----------\x3e", t), o(t.tempFilePath);
                        }
                    };
                    wx.canvasToTempFilePath(l, n);
                } else console.log("绘制图片失败"), o(null);
            });
        })), this.promise[o];
    },
    draw: function(t, e, i) {
        var n = this, o = i.detail;
        return new Promise(function(i) {
            Promise.all(t).then(function(t) {
                console.log("canvas---------------\x3e", e);
                var l = wx.createCanvasContext(e.id);
                n.ctx = l, n.ctxTop = 0, console.log("result---------------\x3e1", t), l.clearRect(0, 0, e.width, e.height), 
                l.setFillStyle("#E8E8E8"), l.fillRect(0, n.ctxTop, e.width, e.height);
                var a = {
                    text: o.title,
                    fontSize: 20,
                    lineHeight: 28,
                    font: "normal normal 20px sans-serif",
                    color: "#3e3d3e",
                    wordBreak: 1,
                    padding: [ 26, 30, 2 ]
                };
                n._renderText(e, a), console.log("result---------------\x3e2", t);
                var h = {
                    text: o.subTitle,
                    fontSize: 12,
                    lineHeight: 17,
                    font: "normal normal 12px sans-serif",
                    color: "#7e7d7e",
                    wordBreak: 1,
                    padding: [ 0, 30, 10 ]
                };
                n._renderText(e, h), console.log("result---------------\x3e3", t), o.price && (l.setFillStyle("#3e3d3e"), 
                l.font = "normal normal 22px sans-serif", l.fillText("￥" + o.price, 30, 109)), n.ctxTop = 124, 
                n.draw_the_image(t[0], {
                    width: 375,
                    height: 375,
                    x: "center",
                    y: n.ctxTop
                }), n.ctxTop = 499, l.setFillStyle("#ffffff"), l.fillRect(0, n.ctxTop, e.width, e.height - n.ctxTop), 
                n.ctxTop += 20, n.draw_the_image(t[1], {
                    width: 81,
                    height: 81,
                    x: 20,
                    y: n.ctxTop
                }), l.setTextAlign("left"), l.setFillStyle("#3e3d3e"), l.font = "normal bold 14px sans-serif", 
                l.fillText("长按识别太阳码", 120, 558), l.setFillStyle("#a4a3a4"), l.font = "normal bold 12px sans-serif", 
                l.fillText("分享来自 ROTHY’S 小程序", 120, 580), l.draw(!0, function(t) {
                    i(!0);
                });
            }).catch(function(t) {
                console.log("ShareCard.draw.error"), i(null);
            });
        });
    },
    draw_the_image: function(t, e) {
        var i = e.width, n = e.height, o = e.x, l = e.y, a = e.border, h = e.ctxMove, r = void 0 === h || h;
        if (t) {
            var s = this.format_image_setting(t, {
                width: i,
                height: n,
                x: o,
                y: l
            });
            this.ctx.drawImage(s.path, s.x, s.y, s.width, s.height), a && (this.ctx.setLineWidth(a.width || 1), 
            this.ctx.setStrokeStyle(a.color || "#000000"), this.ctx.strokeRect(s.x, s.y, s.width, s.height)), 
            r && (this.ctxTop += s.height);
        }
    },
    format_image_setting: function(t, e) {
        var i = e.width, n = e.height, o = e.x, l = e.y;
        if (t && t.errMsg.indexOf("ok")) {
            var a = n || i / (t.width / t.height);
            return {
                path: t.path,
                width: i,
                height: a,
                x: "center" === o ? (this.width - i) / 2 : o || 0,
                y: "bottom" === l ? this.height - a : l
            };
        }
    },
    _renderText: function(t, e, i) {
        var n = this.ctx;
        if (e.fontSize && n.setFontSize(e.fontSize), e.font && (n.font = e.font), e.color = e.color || "#000000", 
        n.setFillStyle(e.color), this.ctxTop += e.padding[0] + e.fontSize + (e.lineHeight ? (e.lineHeight - e.fontSize) / 2 : 0), 
        e.wordBreak) {
            var o = /[\u4e00-\u9fa5]/g, l = e.text.split(" "), a = "", h = 1, r = [], s = t.width - (e.padding[1] + (e.padding[3] || e.padding[1] || 0));
            l.forEach(function(t, e) {
                if (o.test(t)) {
                    var i = e < l.length - 1 ? [].concat(t.split(""), [ " " ]) : t.split("");
                    r.push.apply(r, i);
                } else {
                    var n = e < l.length - 1 ? [ t, " " ] : [ t ];
                    r.push.apply(r, n);
                }
            });
            for (var c = 0; c < r.length; c++) {
                if (!(h <= e.wordBreak)) {
                    this.ctxTop += e.lineHeight ? (e.lineHeight - e.fontSize) / 2 : 0;
                    break;
                }
                if (n.measureText(a + r[c]).width <= s) {
                    if (a += r[c], c === r.length - 1) {
                        n.fillText(a, e.padding[1], this.ctxTop), e.lineHeight && (this.ctxTop += e.lineHeight ? (e.lineHeight - e.fontSize) / 2 : 0);
                        break;
                    }
                } else h == e.wordBreak && (a = a.replace(/.{1}$/, "...")), n.fillText(a, e.padding[1], this.ctxTop), 
                h < e.wordBreak && (this.ctxTop += e.lineHeight), h += 1, a = r[c];
            }
        } else e.fontSize && n.setFontSize(e.fontSize), e.font && (n.font = e.font), n.fillText(e.text, e.padding[1], this.ctxTop);
        this.ctxTop += e.padding[2] ? e.padding[2] : e.padding[0];
    }
};
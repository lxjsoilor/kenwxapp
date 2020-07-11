function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function n(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

function t(e, n) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !n || "object" !== (void 0 === n ? "undefined" : i(n)) && "function" != typeof n ? e : n;
}

function o(e, n) {
    if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : i(n)));
    e.prototype = Object.create(n && n.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
}

var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports.__esModule = !0;

var r = e(require("../../../index")), s = e(require("../service/wechat-service")), c = {
    randPassword: function(e, n) {
        var t = 0, o = "", i = void 0;
        for (n = !!n; t < e; ) {
            if (i = Math.floor(100 * Math.random()) % 94 + 33, !n) {
                if (i >= 33 && i <= 47) continue;
                if (i >= 58 && i <= 64) continue;
                if (i >= 91 && i <= 96) continue;
                if (i >= 123 && i <= 126) continue;
            }
            t++, o += String.fromCharCode(i);
        }
        return o;
    }
}, a = function(e) {
    function i(o) {
        n(this, i);
        var r = t(this, e.call(this));
        r.opt = Object.assign({}, o), r.memberModel = r.use("member");
        var c = r.GET, a = r.POST, u = r.api;
        return r.service = new s.default({
            BASEURL: r.store.BASEURL,
            GQLUEL: r.store.GQLUEL,
            GET: c,
            POST: a,
            api: u
        }), r.openid = null, r.sessionKey = null, r.encryptOpenId = r.store.encryptOpenId || !1, 
        r.hiddenOpenId = r.store.hiddenOpenId || !1, r;
    }
    return o(i, e), i.prototype.get_openId = function() {
        var e = this, n = this.service, t = this.encryptOpenId;
        return new Promise(function(o, i) {
            wx.login({
                success: function(r) {
                    n.getOpenId(r.code, {
                        encryptOpenId: t
                    }).then(function(n) {
                        var t = n.openid, i = n.sessionKey, r = n.unionid;
                        e.openid = t, e.sessionKey = i, e.store.openid = t, e.store.unionId = r, e.store.sessionKey = i, 
                        o(n);
                    }).catch(function(e) {
                        i(e);
                    });
                },
                fail: function(e) {
                    i(e);
                }
            });
        });
    }, i.prototype.login_CASABA_wx = function() {
        var e = this.memberModel, n = this.openid;
        return new Promise(function(t, o) {
            e.getToken({
                appIdentifier: n,
                appType: "05"
            }).then(function(e) {
                t(e);
            }).catch(function() {
                var i = c.randPassword(8), r = {
                    account: n,
                    appIdentifier: n,
                    appType: "05",
                    password: i,
                    source: "05"
                };
                e.create(r).then(function() {
                    e.getToken({
                        appIdentifier: n,
                        appType: "05"
                    }).then(function(e) {
                        t(e);
                    }).catch(function(e) {
                        o(e);
                    });
                }).catch(function(e) {
                    o(e);
                });
            });
        });
    }, i.prototype.pay = function(e) {
        var n = Object.assign({}, e), t = n.orderId, o = n.orderTime, i = n.totalAmount, r = this.service, s = this.openid, c = this.utils, a = this.store, u = this.hiddenOpenId, d = a.brandTittle, p = a.tenantCode, l = a.tenantUrl, f = {
            channelType: "weixin",
            currency: "cny",
            memo: t,
            orderDesc: d,
            payAmount: c.formatePrice(i).replace(",", ""),
            paymentType: "applet",
            tenant_code: p,
            tenantOrderNo: t,
            tenantOrderTime: c.transformTime(o, "yyyy-mm-dd hh:mm:ss"),
            tenantReturnUrl: l
        };
        if (!u && s) {
            var y = JSON.stringify({
                openid: s,
                spbill_create_ip: "127.0.0.1"
            });
            f.extendParams = y;
        }
        return new Promise(function(e, n) {
            r.pay(f).then(function(t) {
                var o = t.weixin_timestamp, i = t.weixin_nonce_str, r = t.weixin_wx_package, s = t.weixin_sign;
                wx.requestPayment({
                    timeStamp: o,
                    nonceStr: i,
                    package: r,
                    signType: "MD5",
                    paySign: s,
                    fail: function(e) {
                        console.log("pay_fail------------------------------\x3e", e), e.errMsg && e.errMsg.split(" ").length >= 2 && "cancel" === e.errMsg.split(" ")[1] ? wx.showToast({
                            title: "取消支付",
                            icon: "none",
                            duration: 2e3
                        }) : wx.showToast({
                            title: "支付失败",
                            icon: "none",
                            duration: 2e3
                        }), setTimeout(function() {
                            n(e);
                        }, 2e3);
                    },
                    success: function(n) {
                        wx.showToast({
                            title: "支付成功",
                            icon: "success",
                            duration: 2e3
                        }), setTimeout(function() {
                            e(n);
                        }, 2e3);
                    }
                });
            }).catch(function(e) {
                wx.showToast({
                    title: "支付失败",
                    icon: "none",
                    duration: 2e3
                }), setTimeout(function() {
                    n(e);
                }, 2e3);
            });
        });
    }, i.prototype.login_we_jscode = function(e) {
        var n = this, t = Object.assign({
            storeCode: null,
            channelCode: null,
            mode: "def"
        }, e), o = t.storeCode, i = t.channelCode, r = t.mode, s = {
            def: 3,
            loginOnly: 2,
            getOnly: 1
        }, c = this.store, a = c.tenantCode, u = c.encryptOpenId;
        return new Promise(function(e, t) {
            wx.login({
                success: function(c) {
                    console.log("loginByOpenId.wx.login---------------------------------------------------\x3e", c);
                    var d = {
                        tenantCode: a,
                        opType: s[r],
                        appType: "05",
                        jsCode: c.code
                    };
                    "getOnly" !== r && Object.assign(d, {
                        storeCode: o,
                        channelCode: i,
                        isEncryted: !!u
                    }), console.log("reqData------------------------------------------------------------\x3e", d), 
                    n.service.loginByOpenId(d).then(function(o) {
                        console.log("loginByOpenId.res--------------------------------------------\x3e", o), 
                        o.data && o.data.unexUserToken ? (n.store.CASABA_TOKEN = o.data.unexUserToken, e()) : t();
                    }).catch(function() {
                        return t();
                    });
                },
                fail: function() {
                    t();
                }
            });
        });
    }, i.prototype.login_we_unionId = function(e) {
        var n = this, t = Object.assign({
            rawData: o,
            encryptedData: i,
            iv: r,
            mode: "def",
            storeCode: null,
            channelCode: null
        }, e), o = t.rawData, i = t.encryptedData, r = t.iv, s = t.storeCode, c = t.channelCode, a = t.mode, u = {
            def: 3,
            loginOnly: 2,
            getOnly: 1
        }, d = this.store, p = d.tenantCode, l = d.encryptOpenId;
        return new Promise(function(e, t) {
            var d = {
                tenantCode: p,
                opType: u[a],
                appType: "01",
                rawData: o,
                encryptedData: i,
                iv: r
            };
            "getOnly" !== a && Object.assign(d, {
                storeCode: s,
                channelCode: c,
                isEncryted: !!l
            }), console.log("reqData------------------------------------------------------------\x3e", d), 
            n.service.loginByUnionId(d).then(function(o) {
                console.log("loginByOpenId.res--------------------------------------------\x3e", o), 
                o.data && o.data.unexUserToken ? (n.store.CASABA_TOKEN = o.data.unexUserToken, e()) : t();
            }).catch(function() {
                return t();
            });
        });
    }, i.prototype.sessionKey_refresh = function() {
        var e = this, n = this.service, t = this.store, o = t.tenantCode, i = t.encryptOpenId, r = t.hiddenOpenId;
        return new Promise(function(t, s) {
            wx.login({
                success: function(c) {
                    if (r) {
                        var a = {
                            tenantCode: o,
                            opType: 1,
                            appType: "05",
                            jsCode: c.code
                        };
                        e.service.loginByOpenId(a).then(function() {
                            return t();
                        }).catch(function() {
                            return s();
                        });
                    } else n.getOpenId(c.code, {
                        encryptOpenId: i
                    }).then(function(n) {
                        var o = n.openid, i = n.sessionKey, r = n.unionid;
                        e.openid = o, e.sessionKey = i, e.store.openid = o, e.store.unionId = r, e.store.sessionKey = i, 
                        t(n);
                    }).catch(function(e) {
                        s(e);
                    });
                },
                fail: function(e) {
                    s(e);
                }
            });
        });
    }, i;
}(r.default);

exports.default = a;
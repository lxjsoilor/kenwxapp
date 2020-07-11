module.exports = {
    getSetting: function(n, e) {
        var t = e.success, o = e.fail, i = e.refuse;
        wx.getSetting({
            success: function(e) {
                var s = e.authSetting["scope." + n];
                if (void 0 === s) {
                    if ("userInfo" === n) return !1;
                    wx.authorize({
                        scope: "scope." + n,
                        success: function(n) {
                            "function" == typeof t && t(n);
                        },
                        fail: function(n) {
                            "function" == typeof o ? o(n) : setTimeout(function(n) {
                                wx.openSetting();
                            }, 100);
                        }
                    });
                } else !1 === s ? "function" == typeof i ? i(e) : wx.openSetting() : "function" == typeof t && t(e);
            }
        });
    },
    getUserInfo: function(n) {
        var e = n.success, t = n.fail;
        wx.getUserInfo({
            withCredentials: !0,
            success: function(n) {
                "function" == typeof e && e(n);
            },
            fail: function(n) {
                "function" == typeof t && t(n);
            }
        });
    },
    getAddress: function() {
        var n = this;
        return new Promise(function(e, t) {
            n.getSetting("address", {
                success: function(n) {
                    wx.chooseAddress({
                        success: function(n) {
                            console.log(n), e(n);
                        }
                    });
                }
            });
        });
    },
    getUnionId: function(n, e, t) {
        var o = n.detail, i = o.userInfo, s = o.encryptedData, u = o.iv, a = o.rawData, c = o.signature;
        return new Promise(function(n, t) {
            i ? (e.globalData.userInfo = i, e.VICTSTORE.promise.openid.then(function(o) {
                var i = o.sessionKey, r = o.openid;
                o && i && e.POST(e.apiUrl.member.getUserInfo, {
                    encryptedData: s,
                    iv: u,
                    rawData: a,
                    signature: c,
                    sessionKey: i
                }).then(function(o) {
                    if (o && o.data && o.data.unionId) {
                        var i = o.data.unionId;
                        e.globalData.openid = r, e.globalData.unionId = i, wx.setStorageSync("unionId", i), 
                        n(o.data);
                    } else t();
                });
            })) : t();
        });
    },
    updateUnionId: function(n, e, t) {
        var o = this;
        return new Promise(function(i, s) {
            o.getUnionId(n, e, t).then(function(n) {
                var t = n.unionId, o = n.openId;
                e.VICTSTORE.promise.login_CASABA.then(function(u) {
                    var a = u.unexUserToken;
                    e.VICTSTORE.use("member").findAccount({
                        useUnex: !0
                    }).then(function(u) {
                        var c = u.userCode;
                        e.globalData.userCode = c;
                        var r = {
                            appIdentifier: o,
                            appType: "05",
                            unionId: t,
                            userCode: c
                        };
                        e.POST(e.apiUrl.member.updateThirdUserInfo, r, {}, {
                            unexUserToken: a
                        }).then(function(o) {
                            o.success ? (console.log("更新unionId成功", o), e.globalData.unionId = t, wx.setStorageSync("unionId", t), 
                            i(n.data)) : (console.log("更新unionId失败"), s());
                        }).catch(function(n) {
                            console.log("更新unionId失败"), s(n);
                        });
                    });
                });
            }).catch(function(n) {
                s(n);
            });
        });
    }
};
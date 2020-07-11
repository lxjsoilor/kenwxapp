exports.__esModule = !0;

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./fetch")), n = e.default.requestFn, s = e.default.casabaTokenRefresh, r = e.default.gqlTokenRefresh, o = e.default.customResCheck, t = e.default.customResCheckCallBack;

exports.default = {
    request: function(e, a, i, c, u) {
        var l = this;
        u = u || "POST";
        var d = this.store, k = d.reqMax, T = d.tenantCode, h = d.tenantUrl, f = d.xAuthToken, g = d.CASABA_TOKEN, p = this.api, v = Object.assign({
            allRes: !1,
            resDate: !1,
            resHeader: !1,
            processingInToken: !1,
            store: this.store
        }, i), q = Object.assign({}, c);
        return e == p.gql.server ? (Object.assign(q, {
            "X-Tenant-Code": T
        }), g && Object.assign(q, {
            "X-Access-Token": g
        })) : (Object.assign(q, {
            "invoke-source": h
        }), g && Object.assign(q, {
            unexUserToken: g
        })), f && Object.assign(q, {
            xAuthToken: f
        }), new Promise(function(d, T) {
            n({
                url: e,
                method: u,
                header: q,
                data: a,
                success: function(n) {
                    var T = n.res, h = n.res_data, f = n.res_header, g = n.res_date, q = function() {
                        l.promise.refreshToken.then(function() {
                            l.request(e, a, Object.assign({}, i, {
                                processingInToken: !0
                            }), c, u).then(function(e) {
                                d(e), l.reqCount = 0, l.invalidToken && delete l.invalidToken;
                            });
                        });
                    };
                    console.log("request_success-------------\x3e", h), e !== p.member.getToken && e !== p.wechat.loginByOpenId && e !== p.wechat.loginByUnionId || (l.store.xAuthToken = f.xAuthToken || f.xauthtoken), 
                    "00510103" == h.code || "00510104" == h.code ? !l.invalidToken || v.processingInToken ? (l.invalidToken = !0, 
                    l.reqCount += 1, l.reqCount < k && (l.promise.refreshToken = s(l), q())) : q() : h.errors && h.errors.length && h.errors.filter(function(e) {
                        return "HH001" == e.errorCode;
                    }).length > 0 ? !app.invalidToken || v.processingInToken ? (app.invalidToken = !0, 
                    l.reqCount += 1, l.reqCount < app.reqMax && (l.promise.refreshToken = r(l), q())) : q() : o(h) ? !l.invalidToken || v.processingInToken ? (l.invalidToken = !0, 
                    l.reqCount += 1, l.reqCount < k && (l.promise.refreshToken = new Promise(function(e, n) {
                        t(l).then(function() {
                            a.variables && a.variables.accessToken && (a.variables.accessToken = l.store.CASABA_TOKEN), 
                            e();
                        }).catch(function(e) {
                            n(e);
                        });
                    }), q())) : q() : d(v.allRes ? T : v.resDate ? {
                        data: h,
                        date: g
                    } : v.resHeader ? {
                        data: h,
                        header: f
                    } : h);
                },
                fail: function(e) {
                    var n = e.res;
                    T(v.allRes ? n : n.errMsg);
                },
                complete: null,
                opt: v
            });
        });
    }
};
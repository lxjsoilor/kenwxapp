exports.__esModule = !0, exports.default = {
    requestFn: function(e) {
        var o = e.url, r = e.method, s = e.header, i = e.data, n = e.success, a = e.fail, d = e.complete, t = e.opt.store.appCode;
        Object.assign(s, {
            appCode: t
        }), wx.showNavigationBarLoading(), wx.request({
            url: o,
            method: r,
            header: s,
            data: i,
            success: function(e) {
                var o = e.data, r = e.header, s = new Date(e.header.Date);
                200 == e.statusCode && "request:ok" == e.errMsg ? n && n({
                    res: e,
                    res_data: o,
                    res_header: r,
                    res_date: s
                }) : a && a({
                    res: e,
                    res_data: o,
                    res_header: r,
                    res_date: s
                });
            },
            fail: function(e) {
                var o = e.data, r = e.header, s = e.header && e.header.Date;
                a && a({
                    res: e,
                    res_data: o,
                    res_header: r,
                    res_date: s
                });
            },
            complete: function() {
                wx.hideNavigationBarLoading(), d && d();
            }
        });
    },
    casabaTokenRefresh: function(e) {
        var o = e.use("wechat");
        return e.getStore("hiddenOpenId") ? (e.promise.login_jscode = o.login_we_jscode({
            mode: "loginOnly"
        }), e.promise.login_jscode) : (e.promise.openid = o.get_openId(), e.promise.login_CASABA = o.login_CASABA_wx(e.promise.openid), 
        e.promise.login_CASABA);
    },
    gqlTokenRefresh: function() {
        var e = VICTSTORE.use("wechat");
        return VICTSTORE.getStore("hiddenOpenId") ? (VICTSTORE.promise.login_jscode = e.login_we_jscode({
            mode: "loginOnly"
        }), VICTSTORE.promise.login_jscode) : (VICTSTORE.promise.openid = e.get_openId(), 
        VICTSTORE.promise.login_CASABA = e.login_CASABA_wx(VICTSTORE.promise.openid), VICTSTORE.promise.login_CASABA);
    },
    customResCheck: function(e) {
        return "100012" == e.statusCode;
    },
    customResCheckCallBack: function(e) {
        var o = e.use("wechat");
        return e.getStore("hiddenOpenId") ? (e.promise.login_jscode = o.login_we_jscode(), 
        e.promise.login_jscode) : (e.promise.openid = o.get_openId(), e.promise.login_CASABA = o.login_CASABA_wx(e.promise.openid), 
        e.promise.login_CASABA);
    }
};
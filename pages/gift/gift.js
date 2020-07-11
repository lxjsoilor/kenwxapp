var e = getApp(), a = e.globalData.tenantCode;

Page({
    data: {
        pageStatus: {
            isIPX: e.globalData.isIPX,
            needRefresh: !1,
            loadStatus: "unloaded",
            error: {
                icon: "",
                title: "",
                btn: "",
                method: ""
            }
        },
        giftBg: e.globalData.imgUrl.gift,
        userImage: "",
        wishCard: "",
        nickname: "",
        btnFlag: !1
    },
    store: {
        config: {
            needOnLoad: !1,
            pageLife: e.globalData.pageLife,
            pageLoadedTime: null
        }
    },
    page_init: function(t) {
        var o = this;
        console.log("page.options-------------\x3e", t);
        var n = t.sign, i = t.orderId, r = t.accountId, s = getCurrentPages();
        this.setData({
            noBack: s.length < 2
        });
        var d = {
            tenantCode: e.globalData.tenantCode,
            orderId: i,
            sign: n,
            signParams: {
                orderId: i,
                accountId: r
            }
        };
        console.log("data", d), e.POST(e.apiUrl.order.orderDetail, d).then(function(a) {
            if (console.log("送礼标题", a), 0 == a.head.code) {
                var t = a.body, r = t.account, s = t.accountId, d = t.wishCard, g = t.orderPorductOutList, c = t.orderReceiptInfoOut, l = g[0], u = l.image, f = l.spuCode, m = l.skuId, p = l.skuName, h = l.attribute, I = l.count, b = l.customReqDesc, k = l.customReqImage, v = h.split(","), C = v[0], _ = v[1] || "", D = !1;
                "0" === b && (D = !0);
                var P = c.name, w = c.mobile, L = {
                    sign: n,
                    orderId: i,
                    account: r,
                    accountId: s,
                    image: u,
                    skuId: m,
                    skuName: p,
                    attribute: h,
                    count: I,
                    size: C,
                    series: _,
                    spuCode: f,
                    isAdvance: D
                };
                e.page_change_loaded(o, {
                    wishCard: k || d,
                    obj: L,
                    btnFlag: !0,
                    name: P,
                    mobile: w
                });
            } else e.page_change_error(o);
        }).catch(function(a) {
            e.page_change_error(o);
        });
        var g = {
            appType: "05",
            tenantCode: a,
            userCode: r
        };
        e.POST(e.apiUrl.member.findUserInfore, g).then(function(e) {
            console.log("送礼人信息", e);
            var a = e.content, t = a.nickname, n = a.portrait;
            o.setData({
                userImage: n,
                nickname: t
            });
        });
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    onLoad: function(a) {
        e.mta.Page.init();
    },
    onShow: function(a) {
        e.page_load(this);
    },
    onGotUserInfo: function(e) {
        if ("getUserInfo:ok" == e.detail.errMsg) if (this.data.name && this.data.mobile) wx.redirectTo({
            url: "../giftGit/giftFailed/giftFailed"
        }); else {
            var a = e.detail.userInfo.nickName;
            wx.navigateTo({
                url: "../giftGit/giftGit?obj=" + JSON.stringify(this.data.obj) + "&nickName=" + a
            });
        }
    }
});
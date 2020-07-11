var e = getApp(), t = e.globalData.tenantCode, a = e.VICTSTORE;

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
        getGiftBg: e.globalData.imgUrl.getGiftBg,
        getGiftBgTwo: e.globalData.imgUrl.getGiftBgTwo,
        image: "",
        skuName: "",
        attribute: "",
        count: "",
        region: [ "省份", "城市", "地区" ],
        nameFlag: !1,
        phoneFlag: !1,
        areaFlag: !1,
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
        console.log(t);
        var a = JSON.parse(t.obj), n = a.sign, o = a.spuCode, i = a.orderId, s = a.account, r = a.accountId, g = a.image, c = a.skuId, l = a.skuName, d = a.attribute, u = a.size, h = a.series, m = a.count, p = a.isAdvance;
        e.page_change_loaded(this, {
            sign: n,
            orderId: i,
            account: s,
            accountId: r,
            image: g,
            skuId: c,
            skuName: l,
            attribute: d,
            size: u,
            series: h,
            count: m,
            nickName: t.nickName,
            isAdvance: p
        }), this.pdpDetailInit(o);
        var f = wx.getStorageSync("giftUserInFo");
        if (f) {
            var v = f.username, I = f.phone, F = f.region, S = f.textarea;
            this.setData({
                username: v,
                phone: I,
                region: F,
                textarea: S,
                nameFlag: !0,
                phoneFlag: !0,
                areaFlag: !0,
                btnFlag: !0
            });
        }
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    onLoad: function(t) {
        e.mta.Page.init(), this.pdpModel = a.use("product");
    },
    onShow: function(t) {
        e.page_load(this);
    },
    pdpDetailInit: function(t) {
        var a = this;
        this.pdpModel.getItemBySpu({
            initSelectFirstProp: !0,
            spuCode: t
        }).then(function(n) {
            console.log(8899, n);
            var o = n.itemData.attrList;
            o && o.forEach(function(t) {
                "预售提示" == t.name && e.page_change_loaded(a, {
                    advanceTipsShow: !0,
                    advanceTips: t.value[0].name
                });
            }), a.giftInit(t, n.itemData.brand.code || "", n.itemData.category[0].code || "");
        });
    },
    giftInit: function(e, t, a) {
        var n = this;
        this.pdpModel.getPromotionBySpu({
            spuCode: e,
            brandCode: t,
            categoryCode: a
        }).then(function(e) {
            console.log("res============================"), console.log(e);
            var t = [];
            e.length > 0 && e.forEach(function(e) {
                e.activityGifts && e.activityGifts.length > 0 && (t = t.concat(e.activityGifts));
            }), console.log("giftList=============="), console.log(t), n.setData({
                giftList: t
            });
        });
    },
    username: function(e) {
        var t = e.detail.value, a = !1;
        0 != t.length && (a = !0), this.setData({
            username: t,
            nameFlag: a
        }), this.regAll();
    },
    phone: function(e) {
        this.phoneReg(e);
    },
    phoneBlur: function(e) {
        var t = e.detail.value.length;
        t > 0 && t < 11 ? wx.showToast({
            title: "手机号输入不正确",
            icon: "none"
        }) : this.phoneReg(e);
    },
    phoneReg: function(e) {
        var t = this, a = /^1[345678]\d{9}$/, n = e.detail.value, o = this.data.username, i = !1;
        11 == n.length && (a.test(n) ? 0 != o.length && (i = !0) : wx.showToast({
            title: "手机号输入不正确",
            icon: "none"
        })), t.setData({
            phone: n,
            phoneFlag: i
        }), this.regAll();
    },
    bindRegionChange: function(e) {
        this.setData({
            region: e.detail.value
        }), this.regAll();
    },
    getTextarea: function(e) {
        var t = !1;
        0 != e.detail.value.length && (t = !0), this.setData({
            textarea: e.detail.value,
            areaFlag: t
        }), this.regAll();
    },
    regAll: function() {
        var e = this.data, t = e.nameFlag, a = e.phoneFlag, n = e.region, o = e.areaFlag, i = e.btnFlag;
        i = !!(t && a && "省份" != n[0] && o), this.setData({
            btnFlag: i
        });
    },
    getLocaltion: function() {
        function e() {
            wx.chooseAddress({
                success: function(e) {
                    var a = !1;
                    e.userName && e.telNumber && e.provinceName && e.cityName && e.countyName && e.detailInfo && (a = !0), 
                    t.setData({
                        username: e.userName,
                        phone: e.telNumber,
                        region: [ e.provinceName, e.cityName, e.countyName ],
                        textarea: e.detailInfo,
                        nameFlag: a,
                        phoneFlag: a,
                        areaFlag: a,
                        btnFlag: a
                    });
                }
            });
        }
        var t = this;
        wx.getSetting({
            success: function(t) {
                0 == t.authSetting["scope.address"] && wx.openSetting({
                    success: function(t) {
                        t.authSetting["scope.address"] && e();
                    }
                });
            }
        }), e();
    },
    userSubmit: function(e) {
        this.setData({
            formId: e.detail.formId
        });
    },
    submit: function(n) {
        var o = this, i = e.apiUrl.gift.giftLocation, s = this.data, r = s.sign, g = s.orderId, c = s.account, l = s.accountId, d = s.username, u = s.phone, h = s.region, m = s.textarea, p = s.skuId, f = s.skuName, v = {
            username: d,
            phone: u,
            region: h,
            textarea: m
        };
        wx.setStorageSync("giftUserInFo", v);
        var I = {
            sign: r,
            signParams: {
                orderId: g,
                accountId: l
            },
            orderId: g,
            account: c,
            accountId: l,
            tenantCode: t,
            address: m,
            city: h[1],
            province: h[0],
            district: h[2],
            mobile: u,
            name: d
        };
        e.loginWarranty().then(function(s) {
            e.POST(e.apiUrl.matemplate.getCurrentTime).then(function(s) {
                "100010" == s.statusCode && e.POST(i, I).then(function(i) {
                    function r() {
                        wx.showToast({
                            title: i.head.msg,
                            icon: "none"
                        });
                    }
                    if (0 == i.head.code) {
                        for (var l = [ c, a.store.openid ], d = 0; d < 2; d++) {
                            var u = {
                                openid: l[d],
                                tenantCode: t,
                                eventType: 9,
                                params: {
                                    orderId: g,
                                    skuId: p,
                                    productName: f,
                                    ext1: o.data.nickName,
                                    createTime: s.data
                                }
                            };
                            1 == d && (u.params.ext2 = "pages/index/index"), e.POST(e.apiUrl.matemplate.create, u).then(function(e) {
                                console.log("领取通知返回数据", e);
                            });
                        }
                        var h = {
                            openid: a.store.openid,
                            tenantCode: t,
                            formid: [ o.data.formId, n.detail.formId ]
                        };
                        e.POST(e.apiUrl.matemplate.postFormId, h).then(function(e) {
                            console.log("收集formId返回数据", e), wx.redirectTo({
                                url: "giftSuccess/giftSuccess"
                            });
                        });
                    } else 101302210 == i.head.code ? (console.log(i.head.msg), r()) : 400080 == i.head.code ? (console.log(i.head.msg), 
                    r()) : 101302209 == i.head.code && (console.log(i.head.msg), wx.redirectTo({
                        url: "giftFailed/giftFailed"
                    }));
                });
            });
        });
    }
});
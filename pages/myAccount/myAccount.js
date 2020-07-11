var e = getApp(), t = e.VICTSTORE;

Page({
    data: {
        pageStatus: {
            isIPX: e.globalData.isIPX,
            needRefresh: !0,
            loadStatus: "unloaded",
            error: {
                title: "",
                btn: "",
                method: ""
            }
        },
        telephone: null,
        stOpenid: t.store.openid,
        bgImgUrl: e.globalData.imgUrl.accountBg
    },
    store: {
        config: {
            needOnLoad: !1,
            pageLife: e.globalData.pageLife,
            pageLoadedTime: null
        }
    },
    showCouponView: function() {
        e.navigateTo(this, {
            url: "/subPages/pages/coupon/coupon"
        });
    },
    showUserInfoView: function() {
        e.navigateTo(this, {
            url: "/subPages/pages/userInfo/userInfo"
        });
    },
    showOrderListView: function(t) {
        var a = t.currentTarget.dataset.index;
        e.navigateTo(this, {
            url: "../../subPages/pages/order/orderList/orderList?nStatus=" + a
        });
    },
    page_init: function(t) {
        this.findUserInfo(), e.page_change_loaded(this);
    },
    onLoad: function(a) {
        e.mta.Page.init(), this.setData({
            "pageStatus.isIPX": e.globalData.isIPX
        }), this.memberModel = t.use("member"), this.cartModel = t.use("cart");
    },
    page_refresh: function() {
        this.page_init(this.options), this.setCartNum();
    },
    onShow: function() {
        e.page_load(this), this.setCartNum(), wx.hideTabBar({
            fail: function() {
                setTimeout(wx.hideTabBar, 100);
            }
        });
    },
    findUserInfo: function() {
        var t = this;
        e.POST(e.apiUrl.member.findUserInfo).then(function(a) {
            if (a.success) {
                var o = a.data, n = o.name, i = o.gender, s = o.telephone, r = o.birthday, u = o.email, l = o.nickname, g = !1;
                [ n, i, s, r, u ].forEach(function(e) {
                    e || (g = !0);
                }), t.setData({
                    telephone: s,
                    isNoAllFill: g
                }), e.globalData.userInfo ? e.globalData.userInfo.nickName = l : e.globalData.userInfo = {
                    nickName: l
                };
            }
        });
    },
    setCartNum: function() {
        var t = this;
        e.loginWarranty().then(function(a) {
            t.cartModel.getCartNum({
                cartLineFormat: e.cartLineFormat
            }).then(function(e) {
                t.setData({
                    cartNum: e.disableTotal + e.total
                });
            });
        });
    },
    getPhoneNumber: function(a) {
        console.log("getUserMobile-----------------------\x3e", a);
        var o = this, n = t.store.sessionKey, i = a.detail.encryptedData, s = a.detail.iv;
        "getPhoneNumber:ok" == a.detail.errMsg ? e.POST(e.apiUrl.member.getUserMobile, {
            sessionKey: n,
            encryptedData: i,
            iv: s
        }).then(function(e) {
            if ("100010" == e.statusCode) {
                var t = e.data.phoneNumber;
                e.data.purePhoneNumber, e.data.countryCode;
                o.submitUserInfo(t);
            }
            o.showUserInfoView();
        }) : o.showUserInfoView();
    },
    submitUserInfo: function(t) {
        var a = {
            telephone: t || ""
        };
        console.log("options--------------\x3e", a), e.POST(e.apiUrl.member.casabaUpdateUserInfo, a);
    }
});
var e = getApp();

Page({
    data: {
        isIPX: e.globalData.isIPX,
        successImg: e.globalData.imgUrl.success,
        shareImg: e.globalData.imgUrl.gift,
        amount: "",
        orderId: ""
    },
    store: {
        orderId: null,
        money: null,
        orderTime: null
    },
    onLoad: function(t) {
        var a = this, r = this;
        e.mta.Page.init(), this.store.orderId = t.orderId, this.store.money = t.money, this.store.orderTime = t.orderTime, 
        t.money && this.setData({
            amount: t.money,
            orderId: t.orderId
        }), this.setData({
            orderType: t.type
        }), "gift" == t.type && (wx.showLoading({
            mask: !0
        }), this.findBaseInfo().then(function(t) {
            e.POST(e.apiUrl.gift.sign, {
                orderId: a.store.orderId
            }).then(function(t) {
                wx.hideLoading(), t.data && r.setData({
                    sign: t.data,
                    nickName: e.globalData.userInfo.nickName
                });
            });
        })), console.log(t);
    },
    findBaseInfo: function() {
        return new Promise(function(t, a) {
            e.POST(e.apiUrl.member.findBaseInfo).then(function(r) {
                r.success ? (e.globalData.userCode = r.data.userCode, t(r)) : a(r);
            });
        }).catch(function(e) {
            return reject(e);
        });
    },
    goHome: function() {
        e.reLaunch(this, {
            url: "/pages/index/index"
        });
    },
    finished: function() {
        e.redirectTo(this, {
            url: "/subPages/pages/order/orderDetail/orderDetail?id=" + this.store.orderId
        });
    },
    onShareAppMessage: function() {
        if (this.data.sign && e.globalData.userCode && this.store.orderId) {
            var t = e.globalData.userCode, a = this.store.orderId, r = this.data.sign, o = this.data.nickName;
            return console.log("path:-------------\x3e", "/pages/gift/gift?orderId=" + a + "&sign=" + r + "&userCode=" + t), 
            {
                title: "好友" + o + "送你一份礼物，快拆开看看！",
                path: "/pages/gift/gift?orderId=" + a + "&sign=" + r + "&accountId=" + t,
                imageUrl: this.data.shareImg
            };
        }
    }
});
var e = getApp(), t = e.VICTSTORE;

Page({
    data: {
        isIPX: e.globalData.isIPX,
        amount: "",
        failedImg: e.globalData.imgUrl.failed
    },
    store: {
        orderId: null,
        money: null,
        orderTime: null
    },
    onLoad: function(o) {
        e.mta.Page.init(), this.wechatModel = t.use("wechat"), this.store.orderId = o.orderId, 
        this.store.money = o.money, this.store.orderTime = o.orderTime, o.money && this.setData({
            amount: o.money
        }), console.log(o), o.teamId && this.setData({
            teamId: o.teamId
        });
    },
    reBuy: function() {
        var t = this, o = this.store, a = o.money, r = o.orderId, i = o.orderTime, d = {
            totalAmount: a,
            orderId: r,
            orderTime: i
        };
        console.log("pay_params---------------------------------\x3e", d);
        e.myUtil.createQueryString(d);
        var n = function(e) {
            console.log("par_fail---------------------------\x3e");
        };
        this.wechatModel.pay(d).then(function(o) {
            t.updatePinTuanStatus(r), e.shopListAddOrder(r), e.redirectTo(t, {
                url: "/subPages/pages/order/orderDetail/orderDetail?id=" + t.store.orderId
            });
        }, n).catch(n);
    },
    updatePinTuanStatus: function(t) {
        var o = {
            teamId: this.data.teamId,
            orderCode: t
        };
        e.POST(e.apiUrl.team.updatePinTuanStatus, o).then(function(e) {
            console.log(e);
        });
    },
    goHome: function() {
        e.reLaunch(this, {
            url: "/pages/index/index"
        });
    }
});
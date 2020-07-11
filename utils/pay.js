function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

module.exports = {
    PayOrder: function t(o) {
        e(this, t), this.wxpay = function(e) {
            var t = {
                money: "",
                orderId: "",
                orderTime: "",
                failToUrl: ""
            };
            return Object.assign(t, e), o.myUtil.detectNetwork(), new Promise(function(r, n) {
                console.log("app.promise.openid", o.promise.openid);
                var a = o.globalData, i = a.openid, s = a.brandTittle, d = a.tenantCode, c = a.tenantUrl, l = t.orderId, p = t.money, u = t.orderTime;
                console.log("openid-----------------------------------\x3e", i), console.log("money-----------------------------------\x3e", p);
                var m = JSON.stringify({
                    openid: i,
                    spbill_create_ip: "127.0.0.1"
                }), y = {
                    channelType: "weixin",
                    currency: "cny",
                    memo: l,
                    orderDesc: e.orderDesc ? e.orderDesc : s,
                    payAmount: o.filters.formatePrice(p).replace(",", ""),
                    paymentType: "applet",
                    tenant_code: d,
                    tenantOrderNo: l,
                    tenantOrderTime: o.filters.transformTime(t.orderTime, "yyyy-mm-dd hh:mm:ss"),
                    tenantReturnUrl: c,
                    extendParams: m
                }, g = {
                    "invoke-source": c
                }, f = wx.getStorageSync("trackingCode");
                console.log("trackingCode-----------", f);
                var h = o.myUtil.createQueryString({
                    orderId: l,
                    money: p,
                    orderTime: u
                });
                o.POST(o.apiUrl.order.payOrder, y, {}, g).then(function(e) {
                    if (console.log("pay_res---------------------------------\x3e", e), 0 != e.code) wx.showToast({
                        title: "支付失败",
                        icon: "none",
                        duration: 2e3
                    }), setTimeout(function() {
                        n(e);
                    }, 2e3), o.mta.Event.stat("btnWechatPay", {
                        paystatus0: f
                    }); else {
                        var a = e.data, i = a.weixin_timestamp, s = a.weixin_nonce_str, d = a.weixin_wx_package, c = a.weixin_sign;
                        wx.requestPayment({
                            timeStamp: i,
                            nonceStr: s,
                            package: d,
                            signType: "MD5",
                            paySign: c,
                            fail: function(e) {
                                console.log("pay_fail------------------------------\x3e", e), o.mta.Event.stat("btnWechatPay", {
                                    paystatus0: f
                                }), e.errMsg && e.errMsg.split(" ").length >= 2 && "cancel" === e.errMsg.split(" ")[1] ? wx.showToast({
                                    title: "取消支付",
                                    icon: "none",
                                    duration: 2e3
                                }) : wx.showToast({
                                    title: "支付失败",
                                    icon: "none",
                                    duration: 2e3
                                }), setTimeout(function() {
                                    t.failToUrl && wx.redirectTo({
                                        url: t.failToUrl + h
                                    }), n(e);
                                }, 2e3);
                            },
                            success: function(e) {
                                o.mta.Event.stat("btnWechatPay", {
                                    paystatus1: f
                                }), wx.showToast({
                                    title: "支付成功",
                                    icon: "success",
                                    duration: 2e3
                                }), o.POST(o.apiUrl.shopList.addOrder, {
                                    orderId: l,
                                    orderDetailPath: "/subPages/pages/order/orderDetail/orderDetail?id=" + l,
                                    pdpPath: "/pages/pdp/pdp?spuCode=%s&skuCode=%s",
                                    expressPath: "/subPages/pages/order/orderDetail/orderDetail?id=" + l,
                                    invoicePath: "/subPages/pages/order/orderDetail/orderDetail?id=" + l,
                                    phone: "021-64281201",
                                    contactDetailPath: "/pages/index/index"
                                }).then(function(e) {
                                    console.log("shopList_addOrder-------------", e);
                                }), setTimeout(function() {
                                    r(e);
                                }, 2e3);
                            }
                        });
                    }
                });
            });
        };
    }
};
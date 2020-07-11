var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
    }
    return t;
}, e = getApp(), a = e.VICTSTORE, o = {
    formatAbleItems: function(t) {
        var e = t.ableItems;
        e && e.forEach(function(t) {
            t.salesProps.forEach(function(e) {
                "尺码" == e.groupName ? t.size = e.propName : "颜色分类" == e.groupName && (t.series = e.propName);
            });
        });
    }
};

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
        checkoutBtnLoading: !1,
        modalOpen: !1,
        stockShortNum: 3,
        pageShow: !1
    },
    store: {
        config: {
            needOnLoad: !1,
            pageLife: e.globalData.pageLife,
            pageLoadedTime: null
        },
        pageLoading: !1,
        checkoutData: {
            from: "cart",
            orderType: "normal"
        }
    },
    temp: {
        del: {}
    },
    page_init: function(a) {
        var n = this;
        this.cartModel.getCartData({
            cartLineFormat: e.cartLineFormat
        }).then(function(a) {
            console.log("cartData---------------\x3e", a), o.formatAbleItems(a), e.page_change_loaded(n, t({}, a));
        }).catch(function(t) {
            e.page_change_error(n);
        }), this.setCartNum();
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    onLoad: function() {
        e.mta.Page.init(), this.cartModel = a.use("cart");
        var t = e.globalData.systemInfo.statusBarHeight, o = e.globalData.isIPhone ? 44 : 48;
        this.setData({
            header_height: o,
            statusBarHeight: t,
            isIPX: e.globalData.isIPX
        }), this.trackingCode = wx.getStorageSync("trackingCode");
    },
    onShow: function() {
        wx.hideTabBar({
            fail: function() {
                setTimeout(wx.hideTabBar, 100);
            }
        }), e.page_load(this);
    },
    setCartNum: function() {
        var t = this;
        this.cartModel.getCartNum({
            cartLineFormat: e.cartLineFormat
        }).then(function(e) {
            t.setData({
                cartNum: e.disableTotal + e.total
            });
        });
    },
    toIndex: function() {
        e.switchTab(this, {
            url: "/pages/index/index"
        });
    },
    itemSelect: function(a) {
        var n = this;
        if (!this.store.pageLoading) {
            this.store.pageLoading = !0;
            var i = this.cartModel, s = a.currentTarget.dataset.sku;
            i.select({
                skuId: s,
                cartLineFormat: e.cartLineFormat
            }).then(function(e) {
                n.store.pageLoading = !1, o.formatAbleItems(e), n.setData(t({}, e));
            }).catch(function(t) {
                n.store.pageLoading = !1;
            });
        }
    },
    itemSelectAll: function() {
        var a = this;
        this.store.pageLoading || (this.store.pageLoading = !0, this.cartModel.selectAll({
            cartLineFormat: e.cartLineFormat
        }).then(function(e) {
            a.store.pageLoading = !1, o.formatAbleItems(e), a.setData(t({}, e));
        }).catch(function(t) {
            a.store.pageLoading = !1;
        }));
    },
    itemDelete: function(t) {
        this.setData({
            modalOpen: !0
        }), this.temp.del.sku = t.currentTarget.dataset.sku, this.temp.del.spu = t.currentTarget.dataset.spu, 
        this.temp.del.count = t.currentTarget.dataset.count;
    },
    ensureDel: function(t) {
        var a = this;
        t.detail(), e.mta.Event.stat("btnDelete", {
            spucode: this.temp.del.spu,
            tc: this.trackingCode
        }), this.cartModel.delete({
            skuId: this.temp.del.sku,
            cartLineFormat: e.cartLineFormat
        }).then(function(t) {
            a.animateDel(a.temp.del.sku, "ableItems"), a.animateDel(a.temp.del.sku, "disableItems"), 
            a.data.ableItems.length + a.data.disableItems.length == 0 ? setTimeout(function(t) {
                a.setData({
                    ableItems: a.data.ableItems,
                    disableItems: a.data.disableItems
                });
            }, 400) : setTimeout(function(t) {
                a.setData({
                    ableItems: a.data.ableItems,
                    disableItems: a.data.disableItems
                }), a.page_refresh();
            }, 400), e.globalData.cartNum = a.data.cartNum - a.temp.del.count, a.setData({
                cartNum: a.data.cartNum - a.temp.del.count
            }), e.POST(e.apiUrl.shopList.deleteList, [ {
                spuCode: a.temp.del.spu,
                skuCode: a.temp.del.sku
            } ]).then(function(t) {
                console.log("shopList_deleteList-------------", t);
            });
        }).catch(function(t) {});
    },
    cancelDel: function(t) {
        t.detail();
    },
    animateDel: function(t, e) {
        var a = this, o = this;
        this.data[e].forEach(function(n, i) {
            if (n.skuId == t) {
                var s;
                return o.setData((s = {}, s[e + "[" + i + "].del"] = !0, s)), void a.data[e].splice(i, 1);
            }
        });
    },
    changeBuyCount: function(a) {
        var n = this;
        if (!this.store.pageLoading) {
            this.store.pageLoading = !0;
            var i = this.cartModel, s = a.detail.extend.skuId, c = a.detail.num;
            i.changeCount({
                skuId: s,
                buyCount: c,
                cartLineFormat: e.cartLineFormat
            }).then(function(e) {
                n.store.pageLoading = !1, o.formatAbleItems(e), n.setData(t({}, e)), n.setCartNum();
            }).catch(function(t) {
                n.store.pageLoading = !1;
            });
        }
    },
    itemCheckout: function(t) {
        var a = this;
        console.log("itemCheckout------option", t);
        var o = t.detail.formId;
        e.catch.saveFormId(o), this.data.checkoutBtnLoading || (this.setData({
            checkoutBtnLoading: !0
        }), this.cartModel.checkout({
            cartLineFormat: e.cartLineFormat
        }).then(function(t) {
            a.setData({
                checkoutBtnLoading: !1
            }), console.log("before_checkoutData==============>", a.store.checkoutData), Object.assign(a.store.checkoutData, t), 
            console.log("after_checkoutData==============>", a.store.checkoutData), e.navigateTo(a, {
                url: "/pages/checkout/checkout?form=cart"
            }), t.cartData.ableItems.forEach(function(t) {
                e.mta.Event.stat("btnCheckout", {
                    spucode: t.spuCode,
                    tc: a.trackingCode
                });
            });
        }).catch(function(t) {
            if (t.code) switch (t.code) {
              case "00510402":
                wx.showToast({
                    title: "您还没有选择商品",
                    icon: "none",
                    duration: 2e3
                });
                break;

              default:
                wx.showToast({
                    title: "部分商品暂时无法购买，请查看后再试",
                    icon: "none",
                    duration: 2e3
                });
            } else wx.showToast({
                title: "部分商品暂时无法购买，请查看后再试",
                icon: "none",
                duration: 2e3
            });
            a.setData({
                checkoutBtnLoading: !1
            }), a.page_refresh();
        }));
    },
    toPdp: function(t) {
        var a = t.currentTarget.dataset.spucode;
        e.navigateTo(this, {
            url: "/pages/pdp/pdp?spuCode=" + a
        });
    }
});
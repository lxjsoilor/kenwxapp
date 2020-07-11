var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./Share_Card")), t = getApp(), a = t.VICTSTORE, o = (t.apiUrl, t.BEN);

Page({
    data: {
        pageStatus: {
            isIPX: t.globalData.isIPX,
            needRefresh: !0,
            loadStatus: "unloaded",
            error: {
                icon: "",
                title: "",
                btn: "",
                method: ""
            }
        },
        swiperIndex: 1,
        calcuNumber: 5,
        buyCount: 1,
        hasInventory: !0,
        teamStatus: 1,
        timeOver: !0,
        limitTrue: !0,
        isLeader: !1,
        timer: {},
        time_counter: {},
        overMember: !1,
        slideTrue: !0,
        group_buying: t.globalData.imgUrl.group_buying,
        couponMoney: t.globalData.couponMoney,
        ruleShow: !1,
        timeText: "00 ：00 ：00",
        ruleArr: [ "参与方式：", "一.如何开团", "在组团商品详情点击“闺蜜同享”进入支付页，完成支付后即开团成功，可将组团信息分享给好友，指定时间内邀请到成员所需人数即为组团成功。可在个人中心-点击“全部订单”查看已参与的组团订单。", "二.如何参团", "通过好友的分享进入组团页，点击参团按钮，进入组团商品详情，点击“我要参团”进入支付页后进行支付，支付成功后即可参团，可分享组团信息邀请更多好友参加。", "三.注意事项", "1.下单后需在30分钟内完成支付，否则订单自动取消；", "2.组团成功后，闺蜜同享券会陆续发放至您的账户，在您下次购物时可以使用；", "3.不论是否成团，您已购买成功的订单将照常发货；", "4.组团进行中不支持退款，敬请见谅。如需申请退款请在组团结束后联系客服操作取消订单。" ],
        cardShow: !1,
        maskShow: !1,
        canvas: {
            id: "pdpCard",
            width: 375,
            height: 619,
            ctxTop: 0
        },
        share_card: {},
        promise: {}
    },
    store: {
        config: {
            needOnLoad: !1,
            pageLife: t.globalData.pageLife,
            pageLoadedTime: null
        },
        loadSuccessOnce: !1,
        orderId: null,
        shareTitle: "有一种好闺蜜叫“闺蜜同享”",
        shareImg: ""
    },
    page_init: function(e) {
        this.enterSpelldetail();
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    onLoad: function(e) {
        t.mta.Page.init(), wx.hideShareMenu(), this.memberModel = a.use("member"), this.store.orderId = e.orderId ? e.orderId : "", 
        e.scene && (this.store.orderId = e.scene), this.setPageHeight();
    },
    setPageHeight: function() {
        var e = t.globalData.systemInfo.statusBarHeight + (t.globalData.isIPhone ? 44 : 48), a = t.globalData.systemInfo.screenHeight - e;
        this.setData({
            topHeight: e,
            maskHeight: a
        });
    },
    enterSpelldetail: function() {
        var e = this, a = this;
        this.getspellDetail().then(function(o) {
            var i = o.data, n = void 0;
            e.store.loadSuccessOnce = !0, t.page_change_loaded(e, {
                teamStatus: i.teamStatus,
                teamDetails: i.teamDetails,
                limitNum: i.limitNum,
                spellName: i.activityName,
                teamId: i.teamId
            });
            var s = i.beginTime.split(" ")[0].split("-").join("/") + " " + i.beginTime.split(" ")[1];
            console.log("beginTime=====>", s);
            var r = i.currentTime.split(" ")[0].split("-").join("/") + " " + i.currentTime.split(" ")[1];
            console.log("currentTime=====>", r);
            var l = i.endTime.split(" ")[0].split("-").join("/") + " " + i.endTime.split(" ")[1];
            console.log("endTime=====>", l), n = new Date(l).getTime() - new Date(r).getTime(), 
            console.log("countTime======>", n), n > 0 ? (e._set_time_counting(n), e.setData({
                countTime: n
            })) : (1 == i.teamStatus && e.setData({
                teamStatus: 3
            }), 2 == i.teamStatus && e.setData({
                teamStatus: 4
            })), i.teamDetails.length > 6 && e.setData({
                overMember: !0
            });
            var c = function() {
                i.teamDetails.forEach(function(e) {
                    e.userCode == t.globalData.userCode && (a.setData({
                        canInvite: !0,
                        isLeader: !0
                    }), a.store.orderId = e.orderCode);
                });
            };
            t.globalData.userCode ? c() : e.findBaseInfo().then(function(e) {
                c();
            }).catch(function(a) {
                t.page_change_error(e);
            });
        }).catch(function(a) {
            e.store.loadSuccessOnce || t.page_change_error(e);
        });
    },
    onShow: function() {
        t.page_load(this);
    },
    showRule: function() {
        this.setData({
            ruleShow: !0
        });
    },
    closeRule: function() {
        this.setData({
            ruleShow: !1
        });
    },
    findBaseInfo: function() {
        var e = this;
        return new Promise(function(a, o) {
            e.memberModel.findAccount().then(function(e) {
                t.globalData.userCode = e.userCode, a(e);
            });
        }).catch(function(e) {
            return reject(e);
        });
    },
    getspellDetail: function() {
        var e = this;
        return new Promise(function(a) {
            t.POST(t.apiUrl.team.detail, {
                orderCode: e.store.orderId
            }).then(function(e) {
                console.log("spellres========>", e), a(e);
            });
        });
    },
    go_to_orderdetail: function(e) {
        wx.redirectTo({
            url: "/subPages/pages/order/orderDetail/orderDetail?id=" + this.store.orderId
        });
    },
    join_to_plp: function() {
        t.globalData.spellteamId = this.data.teamId, wx.switchTab({
            url: "../../../pages/plp/plp?type=group"
        });
    },
    go_to_plp: function() {
        wx.switchTab({
            url: "../../../pages/plp/plp"
        });
    },
    _set_time_counting: function(e) {
        var t = this, a = this;
        this.data.timer.time_counter = o.time_counting({
            diff_time: e,
            type: "hours",
            onCount: function(e) {
                var a = "";
                e.h = (e.h || 0 == e.h) && e.h < 10 && e.h.toString().length < 2 ? "0" + e.h : e.h, 
                e.m = (e.m || 0 == e.m) && e.m < 10 && e.m.toString().length < 2 ? "0" + e.m : e.m, 
                e.s = (e.s || 0 == e.s) && e.s < 10 && e.s.toString().length < 2 ? "0" + e.s : e.s, 
                a = e.h + " ：" + e.m + " ：" + e.s, t.setData({
                    timeText: a
                });
            },
            onEnd: function(e) {
                wx.showLoading({
                    mask: !0
                }), setTimeout(function() {
                    wx.hideLoading(), a.page_refresh();
                }, 1e3);
            }
        });
    },
    onHide: function() {
        for (var e = Object.keys(this.data.timer), t = Array.isArray(e), a = 0, e = t ? e : e[Symbol.iterator](); ;) {
            var o;
            if (t) {
                if (a >= e.length) break;
                o = e[a++];
            } else {
                if ((a = e.next()).done) break;
                o = a.value;
            }
            var i = o;
            clearInterval(this.data.timer[i]);
        }
    },
    onUnload: function() {
        for (var e = Object.keys(this.data.timer), t = Array.isArray(e), a = 0, e = t ? e : e[Symbol.iterator](); ;) {
            var o;
            if (t) {
                if (a >= e.length) break;
                o = e[a++];
            } else {
                if ((a = e.next()).done) break;
                o = a.value;
            }
            var i = o;
            clearInterval(this.data.timer[i]);
        }
    },
    spellSlide: function() {
        this.data.slideTrue ? this.setData({
            slideTrue: !1
        }) : this.setData({
            slideTrue: !0
        });
    },
    getCmsShareImage: function() {
        var e = {
            tenantCode: t.globalData.tenantCode,
            modelCode: "xcx",
            smodelCode: "group-share",
            browseEnv: "PC"
        };
        return new Promise(function(a, o) {
            t.POST(t.apiUrl.cms.cmsUrl, e).then(function(e) {
                e.success ? a(e.data.dynamic[0].value) : o(e);
            }).catch(function(e) {
                o(e);
            });
        });
    },
    onShareAppMessage: function() {
        var e = this, a = "/subPages/pages/spellDetail/spellDetail?orderId=" + this.store.orderId;
        return {
            title: this.store.shareTitle,
            path: a,
            imageUrl: t.globalData.imgUrl.group_buying,
            success: function() {
                e.setData({
                    maskShow: !1
                });
            },
            fail: function() {
                e.setData({
                    maskShow: !1
                });
            }
        };
    },
    onInviteBtnClick: function() {
        var e = this.data.maskShow;
        e = !e, this.setData({
            maskShow: e
        });
    },
    shareSaveCancel: function() {
        this.setData({
            cardShow: !1
        });
    },
    getQrcode: function() {
        var e = t.apiUrl.QR + "?appCode=" + t.globalData.appCode + "&width=80&page=subPages/pages/spellDetail/spellDetail&scene=" + this.store.orderId;
        return console.warn("url---", e), new Promise(function(t) {
            wx.downloadFile({
                url: e,
                success: function(e) {
                    t(e);
                }
            });
        });
    },
    sharepdpCard: function(e) {
        var t = this;
        wx.showLoading(), this.store.shareImg ? this.drawShareImage() : this.getCmsShareImage().then(function(e) {
            var a = e.imgfile;
            t.store.shareImg = a, t.drawShareImage();
        }).catch(function(e) {});
    },
    drawShareImage: function() {
        var t = this;
        this.getQrcode().then(function(a) {
            console.warn("getQrcode====>", a);
            var o = a.tempFilePath, i = {
                itemCode: t.store.orderId,
                banner: t.store.shareImg,
                QR: o,
                detail: {
                    title: t.store.shareTitle
                }
            };
            console.log("conf=======>", i), t.data.promise.Share_Card = e.default.create(t.data.canvas, i), 
            console.log("this.promise.Share_Card=======>", t.data.promise.Share_Card), t.data.promise.Share_Card.then(function(e) {
                console.log("temp_path--------------------------------\x3e", e), wx.hideLoading(), 
                t.setData({
                    shareCardPath: e,
                    cardShow: !0,
                    maskShow: !1
                });
            }).catch(function(e) {
                console.log("-------", e);
            });
        });
    },
    getSetting: function() {
        var e = this, t = this.data, a = (t.promise, t.shareCardPath), o = function(t) {
            e.setData({
                cardShow: !1
            }), wx.showToast({
                title: "保存图片成功",
                icon: "none",
                duration: 2e3
            });
        }, i = function(t) {
            console.log("getSettingerror====>", t), e.setData({});
        }, n = this;
        wx.getSetting({
            success: function(e) {
                console.log("getSetting=====>>>>>111", e), 0 == e.authSetting["scope.writePhotosAlbum"] ? (console.log("getSetting=====>>>>>222", e), 
                n.setData({
                    noAuthor: !0
                })) : 1 == e.authSetting["scope.writePhotosAlbum"] && console.log("getSetting=====>>>>>333", e), 
                wx.saveImageToPhotosAlbum({
                    filePath: a,
                    success: o,
                    fail: i
                });
            }
        });
    },
    saveShareCard: function(e) {
        var t = this, a = this, o = this.data, i = (o.promise, o.shareCardPath);
        e.detail.authSetting["scope.writePhotosAlbum"] && (console.log("jhonyk======"), 
        a.setData({
            noAuthor: !1
        })), wx.saveImageToPhotosAlbum({
            filePath: i,
            success: function(e) {
                t.setData({
                    cardShow: !1
                }), wx.showToast({
                    title: "保存图片成功",
                    icon: "none",
                    duration: 2e3
                });
            },
            fail: function(e) {
                t.setData({
                    noAuthor: !0
                });
            }
        });
    },
    cancelShare: function() {
        this.setData({
            maskShow: !1
        });
    }
});
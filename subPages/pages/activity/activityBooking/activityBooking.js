var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (e[o] = a[o]);
    }
    return e;
}, t = getApp(), a = t.PDP_Share_Card, o = t.VICTSTORE, s = t.apiUrl, i = t.BEN;

a || (t.PDP_Share_Card = require("../../../../pages/pdp/PDP_Share_Card.js")), Page(e({
    data: {
        pageStatus: {
            isIPX: t.globalData.isIPX,
            needRefresh: !1,
            loadStatus: "unloaded",
            error: {
                title: "",
                btn: "",
                method: ""
            }
        },
        canvas: {
            id: "activityBooking",
            width: 375,
            height: 619,
            ctxTop: 0
        },
        share_card: {},
        promise: {},
        cardShow: !1,
        maskShow: !1,
        endImgUrl: t.globalData.imgUrl.bookEndBanner,
        activityDate: {
            id: "activityDate",
            name: "activityDate",
            type: "picker",
            rule: "required",
            mode: "selector",
            value: "",
            label: "*活动日期",
            placeholder: "",
            icon: "icon-arrow_down",
            bShowTips: !1,
            tipsTxt: "",
            list: [],
            data: {
                index: null
            },
            keyMap: {
                text: "name",
                value: "value"
            },
            state: {
                active: !1,
                onfocus: !1,
                collapse: !1
            },
            method: {
                onChange: "activityDate_on_change"
            }
        },
        userName: {
            id: "userName",
            name: "userName",
            value: "",
            rule: "required",
            label: "*您的姓名及闺蜜姓名",
            valid: "input",
            maxlength: 20,
            placeholder: "",
            state: {
                active: !1,
                onfocus: !1,
                collapse: !1
            }
        },
        weChatCodeType: "phone",
        userPhoneNumber: {
            id: "userPhoneNumber",
            name: "userPhoneNumber",
            value: "",
            rule: "required|mobile",
            valid: "input",
            type: "number",
            label: "*手机号",
            maxlength: 11,
            placeholder: "",
            state: {
                active: !1,
                onfocus: !1,
                collapse: !1
            }
        },
        userWeChat: {
            id: "userWeChat",
            name: "userWeChat",
            value: "",
            label: "",
            maxlength: 40,
            placeholder: "",
            state: {
                active: !1,
                onfocus: !1,
                collapse: !1
            }
        },
        activitySubmit: {
            text: "提交",
            state: {
                disabled: !1
            },
            method: {
                submit: "submitActivity"
            }
        }
    },
    store: {
        config: {
            needOnLoad: !0,
            pageLife: t.globalData.pageLife,
            pageLoadedTime: null
        },
        imgList: [],
        promoter: ""
    }
}, i.ben_form, {
    page_init: function(a) {
        var o = this, s = a.spuCode || a.scene;
        this.store.spuCode = s;
        var i = this.store.productModel;
        t.loginWarranty().then(function(a) {
            i.getItemBySpu({
                spuCode: s
            }).then(function(a) {
                var s;
                wx.hideLoading();
                var i = a.itemData, r = i.salesProps, n = r[0].groupId, c = [];
                r.forEach(function(e) {
                    (e.name = "活动时间") && (console.log("活动时间", e.values), c.push.apply(c, e.values));
                }), o.store.preImgList = i.images, i.images.forEach(function(e) {
                    o.store.imgList.push(e.src), o.store.shareImg = i.images[1].src || t.globalData.activeBookingImg, 
                    o.store.shareTitle = i.title, o.store.shareSubTitle = i.subTitle;
                }), console.log("store----\x3e", o.store), o.setData(e({}, i, (s = {}, s["activityDate.list"] = c, 
                s.groupId = n, s))), t.page_change_loaded(o);
            });
        }).catch(function(e) {
            wx.hideLoading(), t.page_change_error(o);
        });
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    onLoad: function(e) {
        wx.hideShareMenu(), wx.showLoading();
        var a = t.globalData.systemInfo.statusBarHeight, s = getCurrentPages(), i = a + (t.globalData.isIPhone ? 44 : 48), r = t.globalData.systemInfo.screenHeight - i;
        this.setData({
            "pageStatus.isIPX": t.globalData.isIPX,
            noBack: s.length < 2,
            maskHeight: r,
            topHeight: i
        }), this.store.productModel = o.use("product"), this.store.checkoutModel = o.use("checkout");
    },
    activityDate_on_change: function(e) {
        if (this.selectSku(e.propId), e.isDisabled) {
            var t;
            wx.showToast({
                title: "报名人数已满",
                icon: "none"
            }), this.setData((t = {}, t["activitySubmit.state.disabled"] = !0, t));
        } else {
            var a;
            this.setData((a = {}, a["activitySubmit.state.disabled"] = !1, a));
        }
    },
    selectSku: function(t) {
        var a = this.data.groupId, o = this.store.productModel.propTap({
            groupId: a,
            propId: t
        });
        this.setData(e({}, o));
    },
    weChatCodeChange: function(e) {
        var t = e.currentTarget.dataset.name;
        this.setData({
            weChatCodeType: t
        });
    },
    submitActivity: function(e, t) {
        var a = this, o = this.store.productModel, s = e.data;
        if (console.log("submitActivity------------------------------\x3e", t, e), !t) {
            var i = a.data.weChatCodeType, r = s.userWeChat;
            if (!i || !r && "other" == i) return void wx.showToast({
                title: "请填写微信号",
                icon: "none"
            });
            "phone" == i && (r = s.userPhoneNumber);
            var n = {
                buyCount: 1,
                skuId: this.data.skuSelected.skuId
            };
            o.buyNow(n).then(function(e) {
                console.log("buyNow---------------》", e);
                var t = {
                    provinceName: "上海市",
                    cityName: "上海市",
                    countyName: "静安区",
                    detailInfo: r,
                    region: "上海市,上海市,静安区",
                    userName: s.userName,
                    telNumber: s.userPhoneNumber
                };
                a.createOrder({
                    initData: Object.assign({}, e, {
                        orderType: "31"
                    }),
                    address: t
                });
            });
        }
    },
    createOrder: function(a) {
        var o = this, s = this, i = a.address, r = a.initData, n = this.store.checkoutModel;
        n.init(e({}, r)), n.setAddress({
            address: i
        }), n.recalc().then(function(e) {
            console.log(999999, e), n.createOrder({
                externalOrderId: "ACTIVITY"
            }).then(function(e) {
                console.log("createOrder=====================>", e);
                var a = s.data.descriptionText, i = s.data.activityDate.value + " " + s.data.subTitle, r = o.store, n = r.shareImg, c = r.shareTitle, h = r.spuCode;
                t.navigateTo(o, {
                    url: "../bookSuccess/bookSuccess?date=" + i + "&address=" + a + "&spuCode=" + h + "&shareTitle=" + c + "&shareImg=" + n
                });
            }).catch(function(e) {
                console.log("创单失败", e);
                var a = {
                    511201901: "提交失败，活动已结束",
                    511201902: "提交失败，活动已结束",
                    511201903: "提交失败，活动已结束",
                    511201904: "提交失败，报名人数已满",
                    x: "提交失败, 请稍后再试"
                };
                t.BEN.toastMsg(a[e.res.code] || a.x);
            });
        }).catch(function(e) {});
    },
    onShow: function() {
        t.page_load(this);
    },
    getQrcode: function() {
        var e = s.QR + "?appCode=" + t.globalData.appCode + "&width=80&page=subPages/pages/activity/activityBooking/activityBooking&scene=" + this.store.spuCode;
        return new Promise(function(t) {
            wx.downloadFile({
                url: e,
                success: function(e) {
                    t(e);
                }
            });
        });
    },
    sharepdpCard: function(e) {
        var a = this;
        wx.showLoading(), this.getQrcode().then(function(e) {
            console.log("qrres====>", e);
            var o = e.tempFilePath, s = {
                itemCode: "activityBooking",
                banner: a.store.shareImg,
                QR: o,
                detail: {
                    title: a.store.shareTitle,
                    subTitle: a.store.shareSubTitle
                }
            };
            console.log("conf=======>", s), console.log("this.promise.Share_Card=======>", a.promise), 
            a.data.promise.Share_Card = t.PDP_Share_Card.create(a.data.canvas, s), a.data.promise.Share_Card.then(function(e) {
                console.log("temp_path--------------------------------\x3e", e), wx.hideLoading(), 
                a.setData({
                    shareCardPath: e,
                    cardShow: !0,
                    maskShow: !1,
                    cpsShow: !1
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
        }, s = function(t) {
            console.log("getSettingerror====>", t), e.setData({});
        }, i = this;
        wx.getSetting({
            success: function(e) {
                console.log("getSetting=====>>>>>111", e), 0 == e.authSetting["scope.writePhotosAlbum"] ? (console.log("getSetting=====>>>>>222", e), 
                i.setData({
                    noAuthor: !0
                })) : 1 == e.authSetting["scope.writePhotosAlbum"] && console.log("getSetting=====>>>>>333", e), 
                wx.saveImageToPhotosAlbum({
                    filePath: a,
                    success: o,
                    fail: s
                });
            }
        });
    },
    saveShareCard: function(e) {
        var t = this, a = this, o = this.data, s = (o.promise, o.shareCardPath);
        e.detail.authSetting["scope.writePhotosAlbum"] && (console.log("jhonyk======"), 
        a.setData({
            noAuthor: !1
        })), wx.saveImageToPhotosAlbum({
            filePath: s,
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
    shareSaveCancel: function() {
        this.setData({
            cardShow: !1
        });
    },
    showShareMask: function() {
        var e = this.data.maskShow;
        e = !e, this.setData({
            maskShow: e
        });
    },
    cancelShare: function() {
        this.setData({
            maskShow: !1
        });
    },
    onShareAppMessage: function() {
        var e = this, t = "/subPages/pages/activity/activityBooking/activityBooking?spuCode=" + this.store.spuCode;
        return {
            title: this.store.shareTitle,
            path: t,
            imageUrl: this.store.shareImg,
            success: function() {
                e.setData({
                    maskShow: !1,
                    cpsShow: !1
                }), console.log("000000");
            },
            fail: function() {
                e.setData({
                    maskShow: !1,
                    cpsShow: !1
                }), console.log("000000");
            }
        };
    }
}));
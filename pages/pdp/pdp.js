var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
}, a = getApp(), e = a.PDP_Share_Card, o = a.VICTSTORE, s = a.apiUrl;

e || (a.PDP_Share_Card = require("/PDP_Share_Card.js"));

var i = {
    formatMainImages: function(t) {
        var a = null;
        return t.salesProps.filter(function(t) {
            return "颜色分类" == t.name;
        }).forEach(function(t) {
            t.valueSelected && t.valueSelected.imageList && (a = t.valueSelected.imageList);
        }), a;
    }
};

Page({
    data: {
        pageStatus: {
            isIPX: a.globalData.isIPX,
            needRefresh: !1,
            loadStatus: "unloaded",
            error: {
                title: "",
                btn: "",
                method: ""
            }
        },
        canSpell: !0,
        errorPro: !1,
        loadOver: !1,
        swiperIndex: 1,
        mainSwiperIndex: 1,
        mainSwiperIndexCur: 0,
        calcuNumber: a.globalData.calcuNumber,
        buyCount: 1,
        hasInventory: !0,
        canvas: {
            id: "pdpCard",
            width: 375,
            height: 619,
            ctxTop: 0
        },
        share_card: {},
        promise: {},
        cardShow: !1,
        descShow: !1,
        cartNum: 0,
        cpsShow: !1,
        share_cps: a.globalData.imgUrl.share_cps,
        isIPX: a.globalData.isIPX,
        noAuthor: !1,
        stopTab: !1,
        needAuth: !1
    },
    store: {
        config: {
            needOnLoad: !1,
            pageLife: a.globalData.pageLife,
            pageLoadedTime: null
        },
        checkoutData: {
            from: "pdp",
            orderType: "normal"
        },
        imgList: [],
        promoter: ""
    },
    page_init: function(t) {
        console.log("options====", t);
        var e = t.scene ? t.scene.split("$")[0] : t.spuCode;
        this.spuCode = e, this.store.trackingCode = t.scene ? t.scene.split("$")[1] : "", 
        this.store.trackingCode && wx.setStorageSync("trackingCode", this.store.trackingCode), 
        this.trackingCode = wx.getStorageSync("trackingCode"), console.log("this.trackingCode--------------", this.trackingCode), 
        this.store.promoter = t.promoterCode ? t.promoterCode : "", this.store.promoter && this.setData({
            isCps: !0
        }), a.mta.Event.stat("pagepdpSource", {
            spucode: e,
            tc: this.trackingCode
        });
        var o = a.globalData.spellteamId ? a.globalData.spellteamId : "";
        o && this.setData({
            joinSpell: !0,
            spellType: !0
        });
        var s = wx.getStorageSync("unionId");
        s ? (a.globalData.unionId = s, this.setData({
            needAuth: !1
        })) : this.setData({
            needAuth: !0
        }), this.getcmsData(), this.setCartNum();
        var i = a.globalData.systemInfo.statusBarHeight, n = a.globalData.isIPhone, r = i + (n ? 44 : 48), c = a.globalData.systemInfo.screenHeight - r, d = getCurrentPages(), h = !(d.length > 1);
        this.setData({
            topHeight: r,
            maskHeight: c,
            isIPhone: n,
            spuCode: e,
            teamId: o,
            noBack: h
        }), this.pdpDetailInit(e);
        var l = this;
        wx.getSetting({
            success: function(t) {
                console.log(t), 0 == t.authSetting["scope.writePhotosAlbum"] ? l.setData({
                    noAuthor: !0
                }) : l.setData({
                    noAuthor: !1
                });
            }
        }), console.log("pages===>", d);
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    onLoad: function(t) {
        a.mta.Page.init(), this.pdpModel = o.use("product"), this.cartModel = o.use("cart");
    },
    pdpDetailInit: function(e) {
        var o = this;
        this.pdpModel.getItemBySpu({
            initSelectFirstProp: !0,
            spuCode: e
        }).then(function(s) {
            var i = s.itemData.salesProps;
            i.forEach(function(t, a) {
                0 != a && i.unshift(i.splice(a, 1)[0]);
            }), s.itemData.salesProps = i, a.page_change_loaded(o, t({}, s.itemData));
            var n = o.data.attrList;
            console.log("this.data.attrList[0].value[0].code=====>", o.data.attrList[0].value[0].code), 
            o.data.attrList[0].value[0].code != a.apiUrl.groupBuyCode && o.setData({
                canSpell: !1
            }), console.log("this.data.attrList=====", o.data.attrList), o.data.attrList[1] && o.setData({
                tipsShow: !0,
                tips: o.data.attrList[1].value[0].name || ""
            }), n.forEach(function(t) {
                "预售提示" == t.name && o.setData({
                    advanceTipsShow: !0,
                    advanceTips: t.value[0].name || ""
                });
            }), o.data.stock || o.setData({
                hasInventory: !1
            }), o.store.preImgList = o.data.images, o.data.images.forEach(function(t) {
                o.store.imgList.push(t.src), o.store.shareImg = o.data.images[0].src, o.store.shareTitle = o.data.title;
            }), console.log("store----\x3e", o.store), o.giftInit(e, s.itemData.brand.code || "", s.itemData.category[0].code || "");
        }).catch(function(t) {
            a.page_change_error(o);
        });
    },
    giftInit: function(t, a, e) {
        var o = this;
        this.pdpModel.getPromotionBySpu({
            spuCode: t,
            brandCode: a,
            categoryCode: e
        }).then(function(t) {
            console.log("res============================"), console.log(t);
            var a = [];
            t.length > 0 && t.forEach(function(t) {
                t.activityGifts && t.activityGifts.length > 0 && (a = a.concat(t.activityGifts));
            }), o.setData({
                giftList: a
            });
        });
    },
    onShow: function() {
        a.page_load(this), a.mta.Event.stat("pdp", {
            spucode: this.data.spuCode
        }), console.log("0000====>", this.data.skuList, this.data.errorPro, this.data.spuCode), 
        this.setData({
            stopTab: !1
        });
    },
    go_to_bag: function() {
        a.switchTab(this, {
            url: "/pages/shoppingCart/shoppingCart"
        });
    },
    swiperChange: function(t) {
        this.setData({
            swiperIndex: t.detail.current + 1
        });
    },
    mainSwiperChange: function(t) {
        this.setData({
            mainSwiperIndex: t.detail.current + 1
        });
    },
    previewImg: function(t) {
        var a = t.target.dataset.current;
        wx.previewImage({
            urls: this.store.imgList,
            current: a,
            success: function() {}
        });
    },
    onShareAppMessage: function() {
        a.mta.Event.stat("btnShare", {
            sharefriend: this.spuCode
        });
        var t = this, e = "";
        return e = this.data.isCps ? "/pages/pdp/pdp?scene=" + this.data.spuCode + "$" + this.store.promoter : "/pages/pdp/pdp?scene=" + this.data.spuCode, 
        {
            title: this.store.shareTitle,
            path: e,
            imageUrl: this.store.shareImg,
            success: function() {
                t.setData({
                    maskShow: !1,
                    cpsShow: !1
                }), console.log("000000");
            },
            fail: function() {
                t.setData({
                    maskShow: !1,
                    cpsShow: !1
                }), console.log("000000");
            }
        };
    },
    showShareMask: function() {
        var t = this.data.maskShow;
        t = !t, this.setData({
            maskShow: t
        });
    },
    cancelShare: function() {
        this.setData({
            maskShow: !1
        });
    },
    cpsShareCancel: function() {
        this.setData({
            cpsShow: !1
        });
    },
    cpsShareShow: function() {
        this.setData({
            cpsShow: !0
        });
    },
    cancelSelectSku: function() {
        this.setData({
            skuShow: !1,
            sizeErrorTipShow: !1,
            spellType: !1
        });
    },
    showSkuMask: function(t) {
        t.currentTarget.dataset.type;
        this.setData({
            skuShow: !0,
            type: t.currentTarget.dataset.type
        }), console.log("salesProps======>", this.data.salesProps);
        var a = this.data.salesProps;
        a[0].values.length < 2 && this.showSelecteTxt(a);
    },
    showSelecteTxt: function(t) {
        if (this.data.skuSelected) {
            var a = this.data.skuSelected.properties[0].propId;
            t[0].values.forEach(function(e) {
                e.propId == a && (t[0].showdesc = e.name, console.log("showdesc=====>", e.name));
            }), console.log("salesProps=====>", t), this.setData({
                salesProps: t
            });
        }
    },
    selectSku: function(t) {
        var a = t.currentTarget.dataset, e = a.item, o = a.label, s = a.groupid, n = this.pdpModel.propToggle({
            groupId: s,
            propId: e.propId
        }), r = i.formatMainImages(n);
        this.setData(Object.assign({}, n, {
            mainImages: r
        })), "尺码" == o ? this.setData({
            sizeErrorTipShow: !1
        }) : "颜色分类" == o && this.setData({
            seriesErrorTipShow: !1,
            mainSwiperIndex: 1,
            mainSwiperIndexCur: 0
        }), this.showSelecteTxt(n.salesProps);
    },
    formSubmit: function(t) {
        console.log("e.detail.formId=====>", t.detail.formId), a.catch.saveFormId(t.detail.formId);
    },
    giveGift: function(t) {
        var e = this;
        console.log(t);
        var o = wx.getStorageSync("userInfo");
        if (t.detail.userInfo) {
            a.globalData.userInfo = t.detail.userInfo, console.log("app.globalData.userInfo======>", a.globalData.userInfo);
            var i = t.detail.userInfo, n = i.nickName, r = i.avatarUrl, c = o.nickName, d = o.avatarUrl;
            wx.setStorageSync("userInfo", {
                nickName: n,
                avatarUrl: r
            }), n != c || r != d ? (wx.showLoading(), a.POST(s.member.updateUserInfo, {
                nickname: n,
                portrait: r
            }).then(function(t) {
                wx.hideLoading(), console.log("updateUserInfo======>", t);
                var a = e;
                setTimeout(function() {
                    a.setData({
                        skuShow: !0
                    });
                }, 500);
            })) : this.setData({
                skuShow: !0
            });
            var h = this.data.salesProps;
            h[0].values.length < 2 && this.showSelecteTxt(h), "spell" == t.currentTarget.dataset.type ? a.mta.Event.stat("btnShareForCoupon", {
                spucode: this.spuCode,
                tc: this.trackingCode
            }) : "gift" == t.currentTarget.dataset.type && a.mta.Event.stat("btnGift", {
                spucode: this.spuCode,
                tc: this.trackingCode
            }), t.currentTarget.dataset.type, this.setData({
                spellType: !0
            }), this.setData({
                type: t.currentTarget.dataset.type
            }), this.updataUnionIdWithType(t, "gift");
        }
    },
    changeBuyCount: function(t) {
        this.setData({
            buyCount: t.detail.num
        });
    },
    showErrorToast: function(t, a) {
        var e = this, o = null;
        "vp001" == t.code || "511107108" == t.code || "511107107" == t.code ? o = "该尺码库存不足，马上回来" : "vp002" == t.code ? o = "超过限购数量" : "vp003" == t.code ? t.data.forEach(function(t) {
            "尺码" == t ? e.setData({
                sizeErrorTipShow: !0
            }) : "颜色分类" == t && e.setData({
                seriesErrorTipShow: !0
            });
        }) : o = a ? "加入购物袋失败" : "购买失败", o && wx.showToast({
            title: o,
            icon: "none",
            duration: 2e3
        });
    },
    confirmOrder: function() {
        var t = this;
        this.data.selectSku && this.setData({
            stopTab: !0
        }), this.pdpModel.buyNow({
            buyCount: this.data.buyCount,
            cartLineFormat: a.cartLineFormat
        }).then(function(e) {
            Object.assign(t.store.checkoutData, e), t.store.checkoutData.orderType = t.data.type, 
            t.setData({
                showMask: !1
            }), a.mta.Event.stat("btnBuySKU", {
                spucode: t.spuCode,
                tc: t.trackingCode
            }), a.navigateTo(t, {
                url: "/pages/checkout/checkout?teamId=" + t.data.teamId
            });
        }).catch(function(a) {
            console.log("异常处理"), t.showErrorToast(a), t.setData({
                stopTab: !1
            });
        });
    },
    joinCart: function() {
        var t = this, e = this.data.spuCode, o = this.data.skuSelected && this.data.skuSelected.skuId;
        this.pdpModel.joinCart({
            buyCount: this.data.buyCount,
            cartLineFormat: a.cartLineFormat
        }).then(function(s) {
            wx.showToast({
                title: "添加购物车成功",
                icon: "none",
                duration: 2e3
            }), t.setData({
                skuShow: !1
            }), a.mta.Event.stat("btnAddCart", {
                spucode: t.spuCode,
                tc: t.trackingCode
            }), a.globalData.cartNum += t.data.buyCount, t.setData({
                cartNum: a.globalData.cartNum
            });
            var i = "/pages/pdp/pdp?spuCode=" + e + "&skuCode=" + o;
            console.log("pdpPath======>1", i), a.POST(a.apiUrl.shopList.addList, {
                spuCode: e,
                skuCode: o,
                pdpPath: i
            }).then(function(t) {
                console.log("shopList_addList-------------", t);
            });
        }).catch(function(a) {
            t.showErrorToast(a, !0);
        });
    },
    shareSaveCancel: function() {
        this.setData({
            cardShow: !1
        });
    },
    bindGetUserInfo: function(t) {
        t.detail.userInfo && ("shoppingCart" == t.currentTarget.dataset.name ? this.go_to_bag() : this.showSkuMask(t), 
        this.updataUnionIdWithType(t, "singleBuy"));
    },
    updataUnionIdWithType: function(t, e) {
        a.globalData.unionId || a.authorize.updateUnionId(t, a, -1).then(function(t) {}).catch(function(t) {});
    },
    getQrcode: function() {
        var t = "";
        return t = this.data.isCps ? a.apiUrl.QR + "?appCode=" + a.globalData.appCode + "&width=80&page=pages/pdp/pdp&scene=" + this.data.spuCode + "$" + this.store.promoter : a.apiUrl.QR + "?appCode=" + a.globalData.appCode + "&width=80&page=pages/pdp/pdp&scene=" + this.data.spuCode, 
        new Promise(function(a) {
            wx.downloadFile({
                url: t,
                success: function(t) {
                    a(t);
                }
            });
        });
    },
    sharepdpCard: function(t) {
        var e = this;
        wx.showLoading(), a.mta.Event.stat("btnShare", {
            spucode: this.spuCode
        }), this.getQrcode().then(function(t) {
            console.log("qrres====>", t);
            var o = t.tempFilePath, s = {
                itemCode: e.data.spuCode,
                banner: e.store.shareImg,
                QR: o,
                detail: {
                    title: e.data.title,
                    subTitle: e.data.subTitle,
                    price: e.data.salePrice
                }
            };
            console.log("conf=======>", s), console.log("this.promise.Share_Card=======>", e.promise), 
            e.data.promise.Share_Card = a.PDP_Share_Card.create(e.data.canvas, s), e.data.promise.Share_Card.then(function(t) {
                console.log("temp_path--------------------------------\x3e", t), wx.hideLoading(), 
                e.setData({
                    shareCardPath: t,
                    cardShow: !0,
                    maskShow: !1,
                    cpsShow: !1
                });
            }).catch(function(t) {
                console.log("-------", t);
            });
        });
    },
    getSetting: function() {
        var t = this, a = this.data, e = (a.promise, a.shareCardPath), o = function(a) {
            t.setData({
                cardShow: !1
            }), wx.showToast({
                title: "保存图片成功",
                icon: "none",
                duration: 2e3
            });
        }, s = function(a) {
            console.log("getSettingerror====>", a), t.setData({});
        }, i = this;
        wx.getSetting({
            success: function(t) {
                console.log("getSetting=====>>>>>111", t), 0 == t.authSetting["scope.writePhotosAlbum"] ? (console.log("getSetting=====>>>>>222", t), 
                i.setData({
                    noAuthor: !0
                })) : 1 == t.authSetting["scope.writePhotosAlbum"] && console.log("getSetting=====>>>>>333", t), 
                wx.saveImageToPhotosAlbum({
                    filePath: e,
                    success: o,
                    fail: s
                });
            }
        });
    },
    saveShareCard: function(t) {
        var a = this, e = this, o = this.data, s = (o.promise, o.shareCardPath);
        t.detail.authSetting["scope.writePhotosAlbum"] && (console.log("jhonyk======"), 
        e.setData({
            noAuthor: !1
        })), wx.saveImageToPhotosAlbum({
            filePath: s,
            success: function(t) {
                a.setData({
                    cardShow: !1
                }), wx.showToast({
                    title: "保存图片成功",
                    icon: "none",
                    duration: 2e3
                });
            },
            fail: function(t) {
                a.setData({
                    noAuthor: !0
                });
            }
        });
    },
    getcmsData: function() {
        var t = this, e = {
            tenantCode: a.globalData.tenantCode,
            modelCode: a.globalData.modelCode,
            smodelCode: "pdp"
        }, o = [];
        a.POST(a.apiUrl.cms.cmsUrl, e).then(function(a) {
            a.data.dynamic ? o = a.data.dynamic[0].value : o.push(a.data), t.setData({
                tipArray: o
            }), console.log("tipArray=====", o);
        });
    },
    showProtip: function(t) {
        var a = t.currentTarget.dataset.position;
        this.setData({
            cmsImg: this.data.tipArray[a],
            descShow: !0
        });
    },
    descCancel: function() {
        this.setData({
            descShow: !1
        });
    },
    setCartNum: function() {
        var t = this;
        a.loginWarranty().then(function(e) {
            t.cartModel.getCartNum({
                cartLineFormat: a.cartLineFormat
            }).then(function(e) {
                a.globalData.cartNum = e.disableTotal + e.total, console.log("cartNum======>", a.globalData.cartNum), 
                t.setData({
                    cartNum: e.disableTotal + e.total
                });
            });
        });
    }
});
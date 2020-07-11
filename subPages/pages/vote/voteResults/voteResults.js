var t = getApp(), e = t.PDP_Share_Card, a = t.VICTSTORE, o = t.apiUrl;

e || (t.PDP_Share_Card = require("../../../../pages/pdp/PDP_Share_Card.js")), Page({
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
            id: "voteCard",
            width: 375,
            height: 619,
            ctxTop: 0
        },
        share_card: {},
        promise: {},
        cardShow: !1,
        maskShow: !1,
        bannerImgUrl: null,
        openid: null
    },
    store: {
        config: {
            needOnLoad: !0,
            pageLife: t.globalData.pageLife,
            pageLoadedTime: null
        },
        shareImg: t.globalData.voteShare
    },
    page_init: function(e) {
        var o = this;
        wx.hideShareMenu(), wx.showLoading(), a.promise.openid.then(function(t) {
            var e = t.openid;
            o.setData({
                openid: e
            }), o.getCmsData();
        }).catch(function(e) {
            wx.hiedLoading(), t.page_change_error(o);
        });
    },
    onLoad: function(e) {
        var a = t.globalData.systemInfo.statusBarHeight, o = getCurrentPages(), n = a + (t.globalData.isIPhone ? 44 : 48), s = t.globalData.systemInfo.screenHeight - n;
        this.setData({
            "pageStatus.isIPX": t.globalData.isIPX,
            noBack: o.length < 2,
            maskHeight: s,
            topHeight: n
        });
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    getCmsData: function() {
        var e = this, a = this, n = {
            tenantCode: t.globalData.tenantCode,
            modelCode: t.globalData.modelCode,
            smodelCode: "vote"
        }, s = [];
        t.POST(o.cms.cmsUrl, n).then(function(t) {
            if (t.data.dynamic) {
                console.log(t.data.dynamic);
                var o = [], n = "", i = "", r = !1, l = "";
                (s = t.data.dynamic).forEach(function(t, a) {
                    if (0 == a && "ADVIMG" == t.module && (l = t.value.imgdes, l = l.split(" "), e.store.shareTitle = l[0], 
                    e.store.shareSubTitle = l[1], n = t.value.imgfile), "PRECISE" == t.module) {
                        var s = t.value.goodssel;
                        o = s.split(",");
                    }
                    if (3 == a && "ADVIMG" == t.module && (i = t.value.imgfile), 4 == a && "TEXT" == t.module) {
                        var c = t.value.mtitle;
                        c && "结束" == c && (r = !0);
                    }
                }), e.setData({
                    bannerImgUrl: n,
                    ruleUrl: i,
                    isOver: r
                }), a.getVoteRankList(o);
            }
        });
    },
    getVoteRankList: function(e) {
        var a = this, n = this, s = this.data.openid;
        console.log("openid------------------\x3e", s);
        var i = {
            optType: 3,
            optName: s,
            codes: e,
            tenantCode: t.globalData.tenantCode
        };
        t.POST(o.vote.getVoteStatistics, i).then(function(o) {
            if (console.log("submitVote-------------------\x3e", o), "100010" == o.statusCode) {
                var i = o.data;
                n.getSpuListData(e).then(function(e) {
                    console.log("getSpuListData--------------\x3e", e);
                    var o = e, r = 0;
                    i.forEach(function(t) {
                        t.checked = !1, r += t.sum, s == t.optName && (t.checked = !0), o.forEach(function(e) {
                            t.content == e.code && (t.title = e.title, t.colorTxt = e.colorTxt, t.imgUrl = e.imgUrl);
                        });
                    }), wx.hideLoading(), n.setData({
                        voteItems: i,
                        allSum: r
                    }), t.page_change_loaded(a);
                }).catch(function(e) {
                    t.page_change_error(a);
                });
            }
        });
    },
    getSpuListData: function(e) {
        var a = {
            spuCodeList: e,
            page: {
                page: 1,
                size: 20
            },
            tenantCode: t.globalData.tenantCode
        };
        return new Promise(function(e, o) {
            t.POST(t.apiUrl.product.getItemBySpuList, a).then(function(t) {
                if (console.log("plp页------------spuList_res", t), t.data) {
                    var a = [];
                    a = t.data.map(function(t, e) {
                        var a = t.title;
                        return a = a.split(" "), {
                            code: t.code,
                            title: a[0],
                            colorTxt: a[1],
                            price: t.salePrice,
                            imgUrl: t.attrSaleList[0].attributeValueList[0].itemAttributeValueImageList ? t.attrSaleList[0].attributeValueList[0].itemAttributeValueImageList[0].picUrl : ""
                        };
                    }), e(a);
                } else o(t);
            });
        });
    },
    showRule: function() {
        this.setData({
            bOpenRule: !0
        });
    },
    onShow: function() {
        var e = this;
        t.loginWarranty().then(function(a) {
            t.page_load(e);
        }).catch(function(a) {
            t.page_change_error(e);
        });
    },
    getQrcode: function() {
        var e = t.apiUrl.QR + "?appCode=" + t.globalData.appCode + "&width=80&page=subPages/pages/vote/voteStart/voteStart&scene=vote";
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
            var o = e.tempFilePath, n = {
                itemCode: "vote",
                banner: a.data.bannerImgUrl || a.store.shareImg,
                QR: o,
                detail: {
                    title: a.store.shareTitle,
                    subTitle: a.store.shareSubTitle
                }
            };
            console.log("conf=======>", n), console.log("this.promise.Share_Card=======>", a.promise), 
            a.data.promise.Share_Card = t.PDP_Share_Card.create(a.data.canvas, n), a.data.promise.Share_Card.then(function(t) {
                console.log("temp_path--------------------------------\x3e", t), wx.hideLoading(), 
                a.setData({
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
        var t = this, e = this.data, a = (e.promise, e.shareCardPath), o = function(e) {
            t.setData({
                cardShow: !1
            }), wx.showToast({
                title: "保存图片成功",
                icon: "none",
                duration: 2e3
            });
        }, n = function(e) {
            console.log("getSettingerror====>", e), t.setData({});
        }, s = this;
        wx.getSetting({
            success: function(t) {
                console.log("getSetting=====>>>>>111", t), 0 == t.authSetting["scope.writePhotosAlbum"] ? (console.log("getSetting=====>>>>>222", t), 
                s.setData({
                    noAuthor: !0
                })) : 1 == t.authSetting["scope.writePhotosAlbum"] && console.log("getSetting=====>>>>>333", t), 
                wx.saveImageToPhotosAlbum({
                    filePath: a,
                    success: o,
                    fail: n
                });
            }
        });
    },
    saveShareCard: function(t) {
        var e = this, a = this, o = this.data, n = (o.promise, o.shareCardPath);
        t.detail.authSetting["scope.writePhotosAlbum"] && (console.log("jhonyk======"), 
        a.setData({
            noAuthor: !1
        })), wx.saveImageToPhotosAlbum({
            filePath: n,
            success: function(t) {
                e.setData({
                    cardShow: !1
                }), wx.showToast({
                    title: "保存图片成功",
                    icon: "none",
                    duration: 2e3
                });
            },
            fail: function(t) {
                e.setData({
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
    onShareAppMessage: function() {
        var t = this;
        return {
            title: this.store.shareTitle,
            path: "/subPages/pages/vote/voteStart/voteStart?scene=vote",
            imageUrl: this.data.bannerImgUrl,
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
    }
});
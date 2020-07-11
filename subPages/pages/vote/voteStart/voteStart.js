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
        checkedList: [],
        isMax: !1,
        isVoted: !1,
        canvas: {
            id: "voteStartCard",
            width: 375,
            height: 619,
            ctxTop: 0
        },
        share_card: {},
        promise: {},
        cardShow: !1,
        maskShow: !1
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
        var a = this;
        wx.hideShareMenu();
        var o = this;
        o.getCmsData().then(function(e) {
            var s = e.bannerImgUrl, i = e.shareTitle, n = e.title, r = e.surplusNum, l = e.maxNum, c = e.goodsSel, u = e.ruleUrl, h = e.isOver;
            o.setData({
                bannerImgUrl: s,
                shareTitle: i,
                title: n,
                surplusNum: r,
                maxNum: l,
                goodsSel: c,
                ruleUrl: u,
                isOver: h
            }), o.getSpuListData(c).then(function(t) {
                o.setData({
                    productList: t
                }), o.getVoteRankList(c);
            }).catch(function(e) {
                t.page_change_error(a);
            });
        });
    },
    onLoad: function(e) {
        var a = t.globalData.systemInfo.statusBarHeight, o = getCurrentPages(), s = a + (t.globalData.isIPhone ? 44 : 48), i = t.globalData.systemInfo.screenHeight - s;
        this.setData({
            "pageStatus.isIPX": t.globalData.isIPX,
            noBack: o.length < 2,
            maskHeight: i,
            topHeight: s
        });
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    onShow: function() {
        t.page_load(this);
    },
    getCmsData: function() {
        var e = {
            tenantCode: t.globalData.tenantCode,
            modelCode: t.globalData.modelCode,
            smodelCode: "vote"
        };
        return new Promise(function(a, s) {
            t.POST(o.cms.cmsUrl, e).then(function(t) {
                if (t.data.dynamic) {
                    console.log(t.data.dynamic);
                    var e = null, o = null, i = null, n = null, r = null, l = null, c = !1;
                    t.data.dynamic.forEach(function(t, a) {
                        if (0 == a && "ADVIMG" == t.module) o = t.value.imgdes, i = t.value.imgdes, i = i.split(" "), 
                        e = t.value.imgfile; else if ("PRECISE" == t.module) r = t.value.goodssel, r = r.split(","); else if ("TITLE" == t.module) n = t.value.textarea || 1, 
                        n = parseInt(n); else if (3 == a && "ADVIMG" == t.module) l = t.value.imgfile; else if (4 == a && "TEXT" == t.module) {
                            var s = t.value.mtitle;
                            s && "结束" == s && (c = !0);
                        }
                    }), a({
                        bannerImgUrl: e,
                        shareTitle: o,
                        title: i,
                        surplusNum: n,
                        maxNum: n,
                        goodsSel: r,
                        ruleUrl: l,
                        isOver: c
                    });
                } else s(t.data);
            });
        });
    },
    getVoteRankList: function(e) {
        var s = this, i = this, n = a.store.openid, r = this.data.surplusNum, l = this.data.isVoted, c = {
            optType: 3,
            optName: n,
            codes: e,
            tenantCode: t.globalData.tenantCode
        };
        t.POST(o.vote.getVoteStatistics, c).then(function(e) {
            console.log("getVoteStatistics-------------------\x3e", e), "100010" == e.statusCode && (e.data.forEach(function(t) {
                n == t.optName && (l = !0, r = 0);
            }), i.setData({
                isVoted: l,
                surplusNum: r
            }), l ? t.redirectTo(i, {
                url: "../voteResults/voteResults"
            }) : t.page_change_loaded(s));
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
                            imgUrl: t.attrSaleList[0].attributeValueList[0].itemAttributeValueImageList ? t.attrSaleList[0].attributeValueList[0].itemAttributeValueImageList[0].picUrl : "",
                            checked: !1
                        };
                    }), e(a);
                } else o(t);
            }).catch(function(t) {
                console.log("plp页------------spuList_rej", t), o(t);
            });
        });
    },
    checkProduct: function(t) {
        var e = t.currentTarget.dataset, a = (e.code, e.index), o = this.data, s = o.maxNum, i = o.productList, n = o.isMax, r = o.isVoted, l = s, c = i[a], u = [], h = c.checked;
        n && !h || r || (c.checked = !c.checked, i.forEach(function(t) {
            t.checked && (l--, u.push(t.code));
        }), console.log("maxNum---------", s), n = l <= 0, this.setData({
            isMax: n,
            surplusNum: l,
            productList: i,
            checkedList: u
        }));
    },
    submitVote: function() {
        var e = this, s = this.data.checkedList;
        if (0 != s.length) {
            var i = {
                optType: 3,
                optNum: "1",
                optName: a.store.openid,
                codes: s,
                tenantCode: t.globalData.tenantCode
            };
            t.POST(o.vote.submitVote, i).then(function(t) {
                "100010" == t.statusCode ? e.go_to_success() : "800010" == t.statusCode && wx.showToast({
                    title: "您已经投过票了",
                    icon: "none"
                });
            });
        } else wx.showToast({
            title: "请至少投一票",
            icon: "none"
        });
    },
    go_to_success: function() {
        t.redirectTo(this, {
            url: "../voteSuccess/voteSuccess"
        });
    },
    showRule: function() {
        this.setData({
            bOpenRule: !0
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
            var o = e.tempFilePath, s = {
                itemCode: "voteStart",
                banner: a.data.bannerImgUrl || a.store.shareImg,
                QR: o,
                detail: {
                    title: a.data.title[0],
                    subTitle: a.data.title[1]
                }
            };
            console.log("conf=======>", s), console.log("this.promise.Share_Card=======>", a.promise), 
            a.data.promise.Share_Card = t.PDP_Share_Card.create(a.data.canvas, s), a.data.promise.Share_Card.then(function(t) {
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
        }, s = function(e) {
            console.log("getSettingerror====>", e), t.setData({});
        }, i = this;
        wx.getSetting({
            success: function(t) {
                console.log("getSetting=====>>>>>111", t), 0 == t.authSetting["scope.writePhotosAlbum"] ? (console.log("getSetting=====>>>>>222", t), 
                i.setData({
                    noAuthor: !0
                })) : 1 == t.authSetting["scope.writePhotosAlbum"] && console.log("getSetting=====>>>>>333", t), 
                wx.saveImageToPhotosAlbum({
                    filePath: a,
                    success: o,
                    fail: s
                });
            }
        });
    },
    saveShareCard: function(t) {
        var e = this, a = this, o = this.data, s = (o.promise, o.shareCardPath);
        t.detail.authSetting["scope.writePhotosAlbum"] && (console.log("jhonyk======"), 
        a.setData({
            noAuthor: !1
        })), wx.saveImageToPhotosAlbum({
            filePath: s,
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
        t = !t, console.log("maskShow-------------------\x3e", t), this.setData({
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
            title: this.data.shareTitle,
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
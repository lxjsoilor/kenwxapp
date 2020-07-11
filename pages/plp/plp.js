var t = getApp();

Page({
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
        showAllPlp: !1,
        categoryNum: 0,
        viewData: [],
        category: [],
        currentIndex: 0,
        rotateIndex: 0
    },
    store: {
        config: {
            needOnLoad: !1,
            pageLife: t.globalData.pageLife,
            pageLoadedTime: null
        },
        navName: "plp",
        startX: 0,
        endX: 0,
        attrCodeList: {
            group: t.apiUrl.groupBuyCode,
            noGroup: "76321152a08f444cbc3ec836093a036b"
        },
        groupBuy: !1
    },
    page_init: function(t) {
        this.initView();
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    onLoad: function(e) {
        t.mta.Page.init(), this.setData({
            "pageStatus.isIPX": t.globalData.isIPX
        }), console.log("plp.onLoad------option", e.category), wx.hideTabBar({
            fail: function() {
                setTimeout(wx.hideTabBar, 100);
            }
        }), "group" == e.typ ? this.store.groupBuy = !0 : this.store.groupBuy = !1;
        var a = t.globalData.systemInfo.statusBarHeight, o = t.globalData.isIPhone ? 44 : 48;
        this.setData({
            header_height: o,
            statusBarHeight: a,
            isIPX: t.globalData.isIPX,
            isHuaweiMate: t.globalData.isHuaweiMate
        });
    },
    onShow: function() {
        wx.hideTabBar({
            fail: function() {
                setTimeout(wx.hideTabBar, 100);
            }
        }), t.page_load(this);
    },
    initView: function() {
        var e = this, a = 1;
        this.getPlpData().then(function(o) {
            e.setData({
                categoryNum: o.length
            });
            var i = o.map(function(t) {
                return {
                    imgUrl: t.menuIcon,
                    categoryCode: t.menuSelectCode
                };
            }), n = [], s = {
                ch: o[0].mapTitle.split("&"),
                en: o[0].mapSubTitle.split("&"),
                firstSpuInfo: !0
            }, r = o[0].menuSelectCode;
            e.getSpuListData(r).then(function(l) {
                s.spuList = l, n[0] = s, e.setData({
                    category: i,
                    viewData: n
                }), t.mta.Event.stat("plp", {
                    plp: r
                }), o.map(function(s, r) {
                    if (r > 0) {
                        var l = {
                            ch: s.mapTitle.split("&"),
                            en: s.mapSubTitle.split("&"),
                            firstSpuInfo: !0
                        }, u = s.menuSelectCode;
                        e.getSpuListData(u).then(function(s) {
                            r == o.length - 1 ? (l.spuList = s.reverse(), l.spuList.forEach(function(t, e) {
                                t.checked = 0 == e;
                            })) : l.spuList = s, a++, n[r] = l, a == o.length && (console.log("开始setDAta"), 
                            t.page_change_loaded(e, {
                                category: i,
                                viewData: n,
                                categoryNum: o.length
                            }));
                        }).catch(function(a) {
                            t.page_change_error(e);
                        });
                    }
                });
            }).catch(function(a) {
                t.page_change_error(e);
            });
        }).catch(function(a) {
            t.page_change_error(e);
        });
    },
    getPlpData: function() {
        var e = this, a = {
            menuParentCode: "root",
            tenantCode: t.globalData.tenantCode,
            menuType: "1"
        };
        return new Promise(function(o, i) {
            t.POST(t.apiUrl.cms.cmstree, a).then(function(t) {
                console.log("plp页tree----res----", t), t.success ? t.data.forEach(function(t) {
                    t.menuName == e.store.navName && (console.log("plp配置数据", t.children), t.children.length > 6 && e.setData({
                        showAllPlp: !0
                    }), o(t.children.filter(function(t, e) {
                        return e < 6;
                    })));
                }) : rej(t);
            }).catch(function(t) {
                console.log("plp页tree----catch----", t), i(t);
            });
        });
    },
    getSpuListData: function(e) {
        var a = this, o = {
            keyword: null,
            conditionList: [ {
                saleStatus: 1,
                type: 0,
                categoryCodeList: [ e ],
                attrbuteCodeList: [ {
                    attributeCodeSublist: [ this.store.groupBuy ? sthis.store.attrCodeList.group : "" ]
                } ]
            }, {
                saleStatus: 3,
                type: 0,
                categoryCodeList: [ e ],
                attrbuteCodeList: [ {
                    attributeCodeSublist: [ this.store.groupBuy ? sthis.store.attrCodeList.group : "" ]
                } ]
            } ],
            itemFilterList: [],
            itemSortList: null,
            page: {
                page: 1,
                size: 20
            },
            tenantCode: t.globalData.tenantCode
        };
        return new Promise(function(e, i) {
            t.POST(t.apiUrl.product.getItemListbyConditions, o).then(function(t) {
                if (console.log("plp页------------spuList_res", t), t.data) {
                    var o = [];
                    (o = t.data.map(function(t, e) {
                        return {
                            code: t.code,
                            title: t.title,
                            price: t.salePrice,
                            colorUrl: t.attrSaleList[0].attributeValueList[0].itemAttributeValueThumbnailList && t.attrSaleList[0].attributeValueList[0].itemAttributeValueThumbnailList[0] ? t.attrSaleList[0].attributeValueList[0].itemAttributeValueThumbnailList[0].url : "",
                            imgUrl: t.attrSaleList[0].attributeValueList[0].itemAttributeValueImageList ? t.attrSaleList[0].attributeValueList[0].itemAttributeValueImageList[0].picUrl : "",
                            checked: 0 == e
                        };
                    })).length > 6 && !a.data.showAllPlp && a.setData({
                        showAllPlp: !0
                    }), e(o.filter(function(t, e) {
                        return e < 6;
                    }));
                } else i(t);
            }).catch(function(t) {
                console.log("plp页------------spuList_rej", t), i(t);
            });
        });
    },
    movestart: function(t) {
        console.log("1ev", t), this.store.startX = t.changedTouches[0].pageX;
    },
    moveend: function(e) {
        if (console.log("2ev", e), this.store.endX = e.changedTouches[0].pageX, this.store.endX - this.store.startX > 20) {
            console.log("向右滑"), this.data.rotateIndex--;
            var a = this.getCurrentIndex(this.data.rotateIndex, this.data.viewData.length);
            if (console.log("向右滑currentIndex---------", a), this.data.viewData[a]) {
                var o;
                this.setData((o = {
                    rotateIndex: this.data.rotateIndex,
                    currentIndex: a
                }, o["viewData[" + a + "].firstSpuInfo"] = !0, o)), t.mta.Event.stat("plp", {
                    plp: this.data.category[a].categoryCode
                });
            }
        } else if (this.store.endX - this.store.startX < -20) {
            console.log("向左滑"), this.data.rotateIndex++;
            var i = this.getCurrentIndex(this.data.rotateIndex, this.data.viewData.length);
            if (console.log("向左滑currentIndex---------", i), this.data.viewData[i]) {
                var n;
                this.setData((n = {
                    rotateIndex: this.data.rotateIndex,
                    currentIndex: i
                }, n["viewData[" + i + "].firstSpuInfo"] = !0, n)), t.mta.Event.stat("plp", {
                    plp: this.data.category[i].categoryCode
                });
            }
        }
    },
    getCurrentIndex: function(t, e) {
        return console.log("index,length", t, e), t >= e ? (console.log("index>= length-----"), 
        t % e) : 0 <= t && t < e ? (console.log("0<=index<length"), t) : (console.log("(Math.abs(index)--------22222222", Math.abs(t)), 
        console.log("else--------22222222", Math.abs(t) % 6), Math.abs(t) % e ? e - Math.abs(t) % e : 0);
    },
    check: function(t) {
        var e, a = this;
        console.log("check-----------ev", t);
        var o = t.currentTarget.dataset, i = o.viewcode, n = o.spucode;
        console.log("viewcode--------", i), this.setData((e = {}, e["viewData[" + i + "].firstSpuInfo"] = !1, 
        e)), this.data.viewData[i].spuList.forEach(function(t, e) {
            if ((t.code != n || !t.checked) && (t.code == n ? t.checked = !0 : t.checked = !1, 
            e == a.data.viewData[i].spuList.length - 1)) {
                var o;
                a.setData((o = {}, o["viewData[" + i + "]"] = a.data.viewData[i], o));
            }
        });
    },
    buynow: function(e) {
        console.log("ev---buynow", e);
        var a = e.currentTarget.dataset.spucode, o = wx.getStorageSync("trackingCode");
        t.mta.Event.stat("btnBuy", {
            spucode: a,
            tc: o
        }), t.navigateTo(this, {
            url: "/pages/pdp/pdp?spuCode=" + a
        });
    },
    toAllProduct: function() {
        t.navigateTo(this, {
            url: "/pages/plp-all/plp-all"
        });
    }
});
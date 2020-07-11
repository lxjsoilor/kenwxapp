var t, e = getApp();

e.VICTSTORE;

Page((t = {
    data: {
        pageStatus: {
            isIPX: e.globalData.isIPX,
            needRefresh: !1,
            loadStatus: "unloaded",
            error: {
                title: "",
                btn: "",
                method: ""
            }
        },
        showAllPlp: !1,
        categoryNum: 4,
        viewData: [],
        category: [],
        currentIndex: 0,
        rotateIndex: 0,
        inited: !1,
        productAmount: 0
    },
    store: {
        config: {
            needOnLoad: !1,
            pageLife: e.globalData.pageLife,
            pageLoadedTime: null
        },
        navName: "plp",
        startX: 0,
        endX: 0,
        attrCodeList: {
            group: e.apiUrl.groupBuyCode,
            noGroup: "76321152a08f444cbc3ec836093a036b"
        },
        groupBuy: !1,
        initialCategory: ""
    },
    page_init: function(t) {
        this.setPageHeight(), this.initView();
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    onLoad: function(t) {
        e.mta.Page.init(), this.setData({
            "pageStatus.isIPX": e.globalData.isIPX
        }), "group" == t.typ ? this.store.groupBuy = !0 : this.store.groupBuy = !1, t.category && (this.store.initialCategory = t.category);
    },
    onShow: function(t) {
        e.page_load(this);
    }
}, t.page_refresh = function() {
    this.page_init(this.options);
}, t.setPageHeight = function() {
    var t = e.globalData.systemInfo.statusBarHeight, a = e.globalData.isIPhone ? 44 : 48;
    this.setData({
        header_height: a,
        statusBarHeight: t,
        isIPX: e.globalData.isIPX,
        isHuaweiMate: e.globalData.isHuaweiMate
    });
}, t.initView = function() {
    var t = this, a = 0;
    this.getPlpData().then(function(i) {
        t.setData({
            categoryNum: i.length
        });
        var o = i.map(function(t) {
            return {
                imgUrl: t.menuIcon,
                categoryCode: t.menuSelectCode
            };
        });
        o.length > 0 && t.setData({
            category: o
        });
        var n = [], s = 0;
        i.map(function(r, l) {
            if (r.menuSelectCode == t.store.initialCategory) {
                var u = {
                    categoryCode: r.menuSelectCode,
                    ch: r.mapTitle.split("&"),
                    en: r.mapSubTitle.split("&"),
                    firstSpuInfo: !0
                }, c = r.menuSelectCode;
                t.getSpuListData(c).then(function(r) {
                    l == i.length - 1 ? (u.spuList = r.reverse(), u.spuList.forEach(function(t, e) {
                        t.checked = 0 == e;
                    })) : u.spuList = r, a += r.length, console.log("if------------------j", s), s++, 
                    n[l] = u, t.data.rotateIndex = l, t.data.currentIndex = l, t.setData({
                        category: o,
                        viewData: n,
                        rotateIndex: t.data.rotateIndex,
                        currentIndex: t.data.currentIndex
                    }), e.mta.Event.stat("plp", {
                        plp: c
                    }), n.length === i.length && t.setData({
                        productAmount: a
                    }), s == i.length && e.page_change_loaded(t, {
                        viewData: n,
                        inited: !0
                    });
                });
            } else n[l] = 0;
        }), i.map(function(o, r) {
            if (o.menuSelectCode != t.store.initialCategory) {
                var l = {
                    categoryCode: o.menuSelectCode,
                    ch: o.mapTitle.split("&"),
                    en: o.mapSubTitle.split("&"),
                    firstSpuInfo: !0
                }, u = o.menuSelectCode;
                t.getSpuListData(u).then(function(o) {
                    r == i.length - 1 ? (l.spuList = o.reverse(), l.spuList.forEach(function(t, e) {
                        t.checked = 0 == e;
                    })) : l.spuList = o, s++, n[r] = l, a += o.length, n.length === i.length && t.setData({
                        productAmount: a
                    }), s == i.length && e.page_change_loaded(t, {
                        viewData: n,
                        inited: !0
                    });
                }).catch(function(a) {
                    s++, e.page_change_error(t);
                });
            }
        });
    }).catch(function(a) {
        e.page_change_error(t);
    });
}, t.getPlpData = function() {
    var t = this, a = {
        menuParentCode: "root",
        tenantCode: e.globalData.tenantCode,
        menuType: "1"
    };
    return new Promise(function(i, o) {
        e.POST(e.apiUrl.cms.cmstree, a).then(function(e) {
            console.log("分类plp页tree----res----", e), e.success ? e.data.forEach(function(e) {
                e.menuName == t.store.navName && (console.log("plp配置数据", e.children), e.children.length > 6 && t.setData({
                    showAllPlp: !0
                }), i(e.children.filter(function(t, e) {
                    return e < 6;
                })));
            }) : rej(e);
        }).catch(function(t) {
            console.log("分类plp页tree----catch----", t), o(t);
        });
    });
}, t.getSpuListData = function(t) {
    var a = this, i = {
        keyword: null,
        conditionList: [ {
            saleStatus: 1,
            type: 0,
            categoryCodeList: [ t ],
            attrbuteCodeList: [ {
                attributeCodeSublist: [ this.store.groupBuy ? sthis.store.attrCodeList.group : "" ]
            } ]
        }, {
            saleStatus: 3,
            type: 0,
            categoryCodeList: [ t ],
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
        tenantCode: e.globalData.tenantCode
    };
    return new Promise(function(t, o) {
        e.POST(e.apiUrl.product.getItemListbyConditions, i).then(function(e) {
            if (console.log("分类plp页------------spuList_res", e), e.data) {
                var i = [];
                (i = e.data.map(function(t, e) {
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
                }), t(i.filter(function(t, e) {
                    return e < 6;
                }));
            } else o(e);
        }).catch(function(t) {
            console.log("分类plp页------------spuList_rej", t), o(t);
        });
    });
}, t.movestart = function(t) {
    console.log("1ev", t), this.store.startX = t.changedTouches[0].pageX;
}, t.moveend = function(t) {
    if (console.log("2ev", t), this.store.endX = t.changedTouches[0].pageX, this.store.endX - this.store.startX > 20) {
        console.log("向右滑"), this.setData({
            slide: "right"
        }), this.data.rotateIndex--;
        var a = this.getCurrentIndex(this.data.rotateIndex, this.data.viewData.length);
        if (console.log("向右滑currentIndex---------", a), this.data.viewData[a]) {
            var i;
            this.setData((i = {
                rotateIndex: this.data.rotateIndex,
                currentIndex: a
            }, i["viewData[" + a + "].firstSpuInfo"] = !0, i)), e.mta.Event.stat("plp", {
                plp: this.data.category[a].categoryCode
            });
        }
    } else if (this.store.endX - this.store.startX < -20) {
        console.log("向左滑"), this.setData({
            slide: "left"
        }), this.data.rotateIndex++;
        var o = this.getCurrentIndex(this.data.rotateIndex, this.data.viewData.length);
        if (console.log("向左滑currentIndex---------", o), this.data.viewData[o]) {
            var n;
            this.setData((n = {
                rotateIndex: this.data.rotateIndex,
                currentIndex: o
            }, n["viewData[" + o + "].firstSpuInfo"] = !0, n)), e.mta.Event.stat("plp", {
                plp: this.data.category[o].categoryCode
            });
        }
    }
}, t.getCurrentIndex = function(t, e) {
    return console.log("index,length", t, e), t >= e ? (console.log("index>= length-----"), 
    t % e) : 0 <= t && t < e ? (console.log("0<=index<length"), t) : (console.log("(Math.abs(index)--------22222222", Math.abs(t)), 
    console.log("else--------22222222", Math.abs(t) % 6), Math.abs(t) % e ? e - Math.abs(t) % e : 0);
}, t.check = function(t) {
    var e, a = this;
    console.log("check-----------ev", t);
    var i = t.currentTarget.dataset, o = i.viewcode, n = i.spucode;
    console.log("viewcode--------", o), this.setData((e = {}, e["viewData[" + o + "].firstSpuInfo"] = !1, 
    e)), this.data.viewData[o].spuList.forEach(function(t, e) {
        if ((t.code != n || !t.checked) && (t.code == n ? t.checked = !0 : t.checked = !1, 
        e == a.data.viewData[o].spuList.length - 1)) {
            var i;
            a.setData((i = {}, i["viewData[" + o + "]"] = a.data.viewData[o], i));
        }
    });
}, t.buynow = function(t) {
    console.log("ev---buynow", t);
    var a = t.currentTarget.dataset.spucode, i = wx.getStorageSync("trackingCode");
    e.mta.Event.stat("btnBuy", {
        spucode: a,
        tc: i
    }), e.navigateTo(this, {
        url: "/pages/pdp/pdp?spuCode=" + a
    });
}, t.toAllProduct = function() {
    e.navigateTo(this, {
        url: "/pages/plp-all/plp-all"
    });
}, t));
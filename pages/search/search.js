var t = getApp(), e = t.VICTSTORE, a = t.apiUrl;

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
        navActiveIndex: 0,
        navs: [ {
            label: "销量",
            name: "sales",
            sort: 1,
            icon: ""
        }, {
            label: "新品",
            name: "list_time",
            sort: 1,
            icon: ""
        }, {
            label: "价格",
            name: "sale_price",
            sort: 0,
            icon: ""
        } ],
        itemList: [],
        showResult: !1,
        searchText: "",
        searchHotList: [],
        searchHistory: [],
        loading: !0,
        isNoMore: !1,
        noMoreConfig: {
            icon: "",
            none: "",
            noMore: "已无更多数据"
        },
        focus: !1
    },
    store: {
        config: {
            needOnLoad: !1,
            pageLife: t.globalData.pageLife,
            pageLoadedTime: null
        }
    },
    page_init: function(t) {
        this.setPageHeight();
        var e = t.keyWord || "";
        this.initViewWithKeyword(e), this.getCmsData();
        var a = wx.getStorageSync("searchHistory") || [];
        this.setData({
            searchHistory: a
        });
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    onLoad: function() {
        t.mta.Page.init(), this.setData({
            "pageStatus.isIPX": t.globalData.isIPX
        }), this.store.plpModel = e.use("productlist");
    },
    onShow: function(e) {
        t.page_load(this, e);
    },
    setPageHeight: function() {
        var e = t.globalData.systemInfo.statusBarHeight, a = t.globalData.isIPhone ? 44 : 48;
        this.setData({
            header_height: a,
            statusBarHeight: e
        });
    },
    initViewWithKeyword: function(t) {
        var e = this;
        if (t) {
            var a = this.store.plpModel;
            this.setData({
                loading: !0
            }), a.init({
                keyWord: t,
                topGoods: {
                    type: "preOrder"
                }
            }), a.getItemList({
                name: "sales",
                sort: 1
            }).then(function(t) {
                var a = t.itemList, s = t.hasNextPage;
                e.setData({
                    itemList: a,
                    loading: !1,
                    isNoMore: !s,
                    showResult: !0
                });
            }).catch(function(t) {
                e.setData({
                    loading: !1
                });
            });
        }
    },
    getItemListWithNavIndex: function(t) {
        var e = this, a = this.data.navs[t], s = a.name, i = a.sort;
        this.setData({
            loading: !0
        }), this.store.plpModel.sortSubmit({
            name: s,
            sort: i
        }).then(function(t) {
            var a = t.itemList, s = t.hasNextPage;
            e.setData({
                itemList: a,
                loading: !1,
                isNoMore: !s
            });
        }).catch(function(t) {
            e.setData({
                loading: !1
            });
        });
    },
    onNavItemClicked: function(t) {
        var e = t.currentTarget.dataset, a = e.index, s = e.name, i = this.data, o = i.navActiveIndex, n = i.navs;
        o == a ? "sale_price" == s && (n[a].sort = 0 == n[a].sort ? 1 : 0, this.setData({
            navs: n
        })) : this.setData({
            navActiveIndex: a
        }), this.getItemListWithNavIndex(a);
    },
    getCmsData: function() {
        var e = this, s = t.globalData, i = {
            tenantCode: s.tenantCode,
            modelCode: s.modelCode,
            smodelCode: "hot-search"
        };
        t.POST(a.cms.cmsUrl, i).then(function(a) {
            var s = a.data.dynamic[0].value || [];
            t.page_change_loaded(e, {
                searchHotList: s
            });
        }).catch(function(a) {
            t.page_change_error(e);
        });
    },
    onReachBottom: function() {
        var t = this;
        this.data.isNoMore || (this.setData({
            loading: !0
        }), this.store.plpModel.pageTurn().then(function(e) {
            var a = e.itemList, s = e.hasNextPage;
            t.setData({
                itemList: a,
                loading: !1,
                isNoMore: !s
            });
        }));
    },
    onHotItemClicked: function(t) {
        var e = t.currentTarget.dataset.text;
        this.setData({
            searchText: e
        }), this.setHistoryItem(e);
    },
    onFakeInputClick: function() {
        this.setData({
            focus: !0
        });
    },
    onSearchInput: function(t) {
        var e = t.detail.value;
        this.setData({
            searchText: e
        });
    },
    onSearchBlur: function() {
        this.setData({
            focus: !1
        });
    },
    onSearchFocus: function() {
        this.data.showResult && this.setData({
            showResult: !1
        });
    },
    onSearchSubmit: function(t) {
        var e = t.detail.value;
        this.setHistoryItem(e);
    },
    onSearchHistoryDelete: function() {
        wx.setStorageSync("searchHistory", []), this.setData({
            searchHistory: []
        });
    },
    setHistoryItem: function(t) {
        if (console.warn(1111, t), "" == t) {
            var e = this.data, a = e.searchHotList, s = e.searchHistory;
            t = a[0].hottext || s[0], this.setData({
                searchText: t
            });
        }
        if (t = t.trim()) {
            this.initViewWithKeyword(t);
            var i = wx.getStorageSync("searchHistory") || [], o = i.indexOf(t);
            o >= 0 && i.splice(o, 1), (i = [ t ].concat(i)).length > 8 && i.splice(8, 1), this.setData({
                searchHistory: i
            }), i && wx.setStorage({
                key: "searchHistory",
                data: i
            });
        }
    },
    toPdpPage: function(e) {
        var a = e.currentTarget.dataset.spucode;
        t.navigateTo(this, {
            url: "/pages/pdp/pdp?spuCode=" + a
        });
    }
});
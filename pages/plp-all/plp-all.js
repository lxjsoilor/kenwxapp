var t = getApp(), a = t.VICTSTORE;

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
        loading: !0,
        isNoMore: !1,
        noMoreConfig: {
            icon: "",
            none: "",
            noMore: "已无更多数据"
        }
    },
    store: {
        config: {
            needOnLoad: !1,
            pageLife: t.globalData.pageLife,
            pageLoadedTime: null
        }
    },
    page_init: function(t) {
        this.setPageHeight(), this.initView();
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    onLoad: function() {
        t.mta.Page.init(), this.setData({
            "pageStatus.isIPX": t.globalData.isIPX
        }), this.store.plpModel = a.use("productlist");
    },
    onShow: function(a) {
        t.page_load(this, a);
    },
    setPageHeight: function() {
        var a = t.globalData.systemInfo.statusBarHeight, e = t.globalData.isIPhone ? 44 : 48, i = !(getCurrentPages().length > 1);
        this.setData({
            header_height: e,
            statusBarHeight: a,
            isIPX: t.globalData.isIPX,
            isHuaweiMate: t.globalData.isHuaweiMate,
            noBack: i
        });
    },
    initView: function() {
        var a = this;
        this.setData({
            loading: !0
        });
        var e = this.store.plpModel;
        e.init({
            topGoods: {
                type: "preOrder"
            }
        }), e.getItemList().then(function(e) {
            var i = e.itemList, s = e.hasNextPage;
            t.page_change_loaded(a, {
                itemList: i,
                loading: !1,
                isNoMore: !s
            });
        }).catch(function(e) {
            t.page_change_error(a), a.setData({
                loading: !1
            });
        });
    },
    getItemListWithNavIndex: function(t) {
        var a = this;
        this.setData({
            loading: !0
        });
        var e = this.data.navs[t], i = e.name, s = e.sort;
        this.store.plpModel.sortSubmit({
            name: i,
            sort: s
        }).then(function(t) {
            var e = t.itemList, i = t.hasNextPage;
            a.setData({
                itemList: e,
                loading: !1,
                isNoMore: !i
            });
        }).catch(function(t) {
            a.setData({
                loading: !1
            });
        });
    },
    onNavItemClicked: function(t) {
        var a = t.currentTarget.dataset, e = a.index, i = a.name, s = this.data, n = s.navActiveIndex, o = s.navs;
        n == e ? "sale_price" == i && (o[e].sort = 0 == o[e].sort ? 1 : 0, this.setData({
            navs: o
        })) : this.setData({
            navActiveIndex: e
        }), this.getItemListWithNavIndex(e);
    },
    toPdpPage: function(a) {
        var e = a.currentTarget.dataset.spucode;
        t.navigateTo(this, {
            url: "/pages/pdp/pdp?spuCode=" + e
        });
    },
    onReachBottom: function() {
        var t = this;
        this.data.isNoMore || (this.setData({
            loading: !0
        }), this.store.plpModel.pageTurn().then(function(a) {
            var e = a.itemList, i = a.hasNextPage;
            t.setData({
                itemList: e,
                loading: !1,
                isNoMore: !i
            });
        }));
    }
});
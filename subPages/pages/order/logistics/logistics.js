var e = getApp();

Page({
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
        expressMap: [ {
            companyName: "顺丰快递",
            orderStatus: "61",
            expressCode: "44604",
            expressList: [ {
                createTime: "2018-01-16 13:08:52",
                remark: "正在派送途中,請您準備簽收(派件人:黄润平(天安组),电话:11111111111)111"
            }, {
                createTime: "2018-01-17 13:08:52",
                remark: "正在派送途中,到底上海"
            }, {
                createTime: "2018-01-16 13:08:52",
                remark: "已出库"
            }, {
                createTime: "2018-01-16 13:08:52",
                remark: "正在派送途中,請您準備簽收(派件人:黄润平(天安组),电话:11111111111)111"
            }, {
                createTime: "2018-01-17 13:08:52",
                remark: "正在派送途中,到底上海"
            }, {
                createTime: "2018-01-16 13:08:52",
                remark: "已出库"
            } ]
        }, {
            companyName: "顺丰快递",
            orderStatus: "61",
            expressCode: "44605",
            expressList: [ {
                createTime: "2018-01-16 13:08:52",
                remark: "正在派送途中,請您準備簽收(派件人:黄润平(天安组),电话:2222222222222)222"
            }, {
                createTime: "2018-01-17 13:08:52",
                remark: "正在派送途中,到底上海"
            }, {
                createTime: "2018-01-16 13:08:52",
                remark: "已出库"
            }, {
                createTime: "2018-01-16 13:08:52",
                remark: "正在派送途中,請您準備簽收(派件人:黄润平(天安组),电话:2222222222222)222"
            }, {
                createTime: "2018-01-17 13:08:52",
                remark: "正在派送途中,到底上海"
            }, {
                createTime: "2018-01-16 13:08:52",
                remark: "已出库"
            } ]
        } ],
        y_steps: {
            list: [],
            current: 1,
            decoration: "y"
        },
        bOpenSteps: !1
    },
    store: {
        config: {
            needOnLoad: !1,
            pageLife: e.globalData.pageLife,
            pageLoadedTime: null
        }
    },
    page_init: function(s) {
        var r = getCurrentPages(), t = (r[r.length - 1], r[r.length - 2]);
        if (t && t.store) {
            var a = t.store, o = a.goodsList, i = a.orderExpressProductList, p = a.iExpressMap;
            this.store.goodsList = o, this.store.orderExpressProductList = i, this.getExpressMap(p), 
            e.page_change_loaded(this);
        } else e.page_change_error(this);
    },
    onLoad: function() {
        this.setData({
            "pageStatus.isIPX": e.globalData.isIPX
        });
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    getExpressMap: function(s) {
        var r = this, t = this.store, a = t.goodsList, o = t.orderExpressProductList, i = [];
        e.myUtil.objToArr(s).forEach(function(s) {
            console.log("el------------", s);
            var t = {};
            t.expressList = [], s && s.length > 0 && (1 != s.length || s[0].createTime || (t.bShowExpressList = !1), 
            t.companyName = s[0].companyName, t.expressCode = s[0].expressCode, e.POST(e.apiUrl.order.logistics, {
                logisticsCode: "sf",
                transNo: s[0].expressCode
            }).then(function(e) {
                if (console.log("logisticsRes---------", e), "100010" == e.statusCode) {
                    if (e.data.details.length) t.bShowExpressList = !0, t.expressList = e.data.details; else for (var p = 0; p < s.length; ++p) {
                        var n = s[p];
                        t.companyName = n.companyName, t.expressCode = n.expressCode;
                        var c = {
                            createTime: n.createTime,
                            remark: n.remark
                        };
                        t.expressList.push(c);
                    }
                    console.log("iExpress----------------\x3e", t), i.push(t), r.setData({
                        expressMap: i
                    }), r.getExpressProduct(a, o, i);
                }
            }));
        });
    },
    getExpressProduct: function(e, s, r) {
        for (var t = [], a = {}, o = 0; o < s.length; o++) !function(r) {
            var o = s[r];
            e.forEach(function(e) {
                e.skuId == o.skuId && Object.assign(o, e);
            }), a[o.subOrderId] || (t.push(o.subOrderId), a[o.subOrderId] = []), a[o.subOrderId].push(o);
        }(o);
        var i = [];
        t.forEach(function(e) {
            var s = a[e];
            console.log("itemsubExpressMap---------------\x3e", s);
            var r = {
                expressCode: s[0].expressCode,
                dataList: s,
                subOrderStatus: s[0].subOrderStatus
            };
            i.push(r);
        }), i.forEach(function(e) {
            r.forEach(function(s) {
                e.expressCode == s.expressCode && Object.assign(e, s);
            });
        }), console.log(i), this.setData({
            subExpressList: i
        });
    },
    showStepsView: function(e) {
        var s, r = e.currentTarget.dataset.code;
        if (r) {
            var t = {};
            this.data.expressMap.forEach(function(e) {
                if (e.expressCode == r) {
                    (t = e).bShowExpressList = !0;
                    var s = t.expressList;
                    1 != s.length || s[0].createTime || (t.bShowExpressList = !1);
                }
            }), this.setData((s = {
                iExpress: t
            }, s["y_steps.list"] = t.expressList, s.bOpenSteps = !0, s));
        }
    },
    getStepsInfo: function(s) {
        var r = this, t = this.data.iExpressMap, a = {};
        a.bShowExpressList = !0, a.expressList = [];
        var o = e.myUtil.objToArr(t);
        console.log("_lists------------", o), o && o.length && (o.forEach(function(e) {
            e.expressCode == s && (o = e);
        }), o && o.length > 0 && (1 != o.length || o[0].createTime || (a.bShowExpressList = !1), 
        a.companyName = o[0].companyName, a.expressCode = o[0].expressCode, e.POST(e.apiUrl.order.logistics, {
            logisticsCode: "sf",
            transNo: o[0].expressCode
        }).then(function(e) {
            if (console.log("logisticsRes---------", e), "100010" == e.statusCode) {
                var s;
                if (e.data.details.length) a.bShowExpressList = !0, a.expressList = e.data.details; else for (var t = 0; t < o.length; ++t) {
                    var i = o[t];
                    a.companyName = i.companyName, a.expressCode = i.expressCode;
                    var p = {
                        createTime: i.createTime,
                        remark: i.remark
                    };
                    a.expressList.push(p);
                }
                r.setData((s = {
                    iExpress: a
                }, s["y_steps.list"] = a.expressList, s)), console.log("iExpress----------------\x3e", a);
            }
        })));
    },
    onShow: function(s) {
        e.page_load(this, s);
    }
});
function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function i(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" !== (void 0 === e ? "undefined" : n(e)) && "function" != typeof e ? t : e;
}

function o(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === e ? "undefined" : n(e)));
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

exports.__esModule = !0;

var s = t(require("../../../index")), a = t(require("../../product/service/product-service")), r = t(require("../../product/model/base/format")), c = t(require("../../product/model/base/errMsg")), u = t(require("./transition/transition")), l = {
    categoryTreeFilter: function(t, e) {
        var i = null;
        return function t(e, o) {
            e && (!i && e.forEach(function(t) {
                t.code == o && (i = t);
            }), i || e.forEach(function(e) {
                t(e.children, o);
            }));
        }(t, e), i;
    },
    formatConditionsReq: function(t) {
        var e = {}, i = t.channelCode, o = t.storeCode, n = t.withPromotionFlag, s = t.conditions, a = s.saleStatus, r = s.saleAttribute, c = s.category, u = s.categoryRoot, l = s.filter, d = s.brand, f = s.brandRoot, h = s.sort, p = s.salePriceStart, g = s.salePriceEnd, y = s.keyWord, m = s.spuFilter, v = s.spuList, L = s.rules;
        e.conditionList = [], e.conditionList.push({
            key: "type",
            value: [ "0" ],
            valueType: "basic"
        }), e.conditionList.push({
            key: "saleStatus",
            value: a,
            valueType: L.saleStatus
        }), p >= 0 && g > 0 && e.conditionList.push({
            key: "salePrice",
            value: [ p + "", g + "" ],
            valueType: L.price
        }), r && r.length && e.conditionList.push({
            key: "attributeValueCode",
            value: r,
            valueType: L.saleAttribute
        }), u && u.length && e.conditionList.push({
            key: "parentCategoryCode",
            value: u,
            valueType: L.category
        }), c && c.length && e.conditionList.push({
            key: "categoryCode",
            value: c,
            valueType: L.category
        }), v && v.length && e.conditionList.push({
            key: "spuCode",
            value: v,
            valueType: L.spuList
        });
        var b = new Set(f.concat(d)).size && [].concat(new Set(f.concat(d))) || [];
        return b && b.length && e.conditionList.push({
            key: "brandCode",
            value: b,
            valueType: L.brand
        }), l && l.length && e.conditionList.push({
            key: "saleAttributeValueCode",
            value: l,
            valueType: L.filter
        }), y && y.length && e.conditionList.push({
            key: "keyword",
            value: [ y ],
            valueType: L.keyWord
        }), h.name && (e.itemSortList = [], e.itemSortList.push({
            name: h.name,
            sort: h.sort
        })), m && (e.notIncludeSpuCodeList = m), e.withPromotionFlag = n ? "1" : "0", i && (e.channelCode = i), 
        o && (e.storeCode = o), e;
    },
    brandAssign: function(t, e) {
        t.brand = t.brand.concat(e);
    },
    brandRootAssign: function(t, e) {
        t.brandRoot = t.brandRoot.concat(e);
    },
    categoryRootAssign: function(t, e) {
        t.categoryRoot = t.categoryRoot.concat(e);
    },
    categoryAssign: function(t, e) {
        t.category = t.category.concat(e);
    },
    getItemListReq: function(t) {
        var e = this.formatConditionsReq(t), i = t.conditions;
        return {
            data: e,
            page: i.page + 1,
            size: i.size
        };
    },
    resetPage: function(t) {
        t.state.conditions.page = 0, t.state.hasNextPage = !0, t.state.itemList = [];
    },
    queryItemList: function(t, e) {
        var i = this, o = t.service, n = t.state.useOldInterface, s = t.transition;
        return new Promise(function(a, c) {
            if (n) s.getItemList(t.state, e).then(function(e) {
                var i = e.count, o = e.itemList;
                t.state.itemList = t.state.itemList.concat(o), t.state.conditions.page++;
                var n = i - t.state.conditions.page * t.state.conditions.size > 0;
                t.state.hasNextPage = n, a({
                    itemList: t.state.itemList,
                    hasNextPage: n
                });
            }).catch(function(t) {
                c(t);
            }); else {
                var u = i.getItemListReq(t.state);
                o.getItemList(u).then(function(i) {
                    var o = i.count, n = i.productList, s = r.default.formatItemList(n, e);
                    t.state.itemList = t.state.itemList.concat(s), t.state.conditions.page++;
                    var c = i.count - t.state.conditions.page * t.state.conditions.size > 0;
                    t.state.hasNextPage = c, a({
                        itemList: t.state.itemList,
                        hasNextPage: c,
                        count: o
                    });
                }).catch(function(t) {
                    c(t);
                });
            }
        });
    },
    queryPreOrderItemList: function(t, e) {
        var i = this, o = t.service;
        return new Promise(function(n, s) {
            var a = i.getItemListReq(t.state);
            a.data.conditionList.push({
                key: "preOrder",
                value: [ "0" ],
                valueType: "basic"
            }), a.data.notIncludeSpuCodeList = [], a.page = 1, a.size = 999, o.getItemList(a).then(function(t) {
                var i = t.productList, o = r.default.formatItemList(i, e);
                n(o);
            }).catch(function(t) {
                s(t);
            });
        });
    },
    conditionsRefine: function(t, e) {
        var i = e.categoryList, o = e.brandList, n = e.filterList, s = e.salePriceStart, a = e.salePriceEnd;
        n && n.length && (t.conditions.filter = n.filter(function(t) {
            return t.active;
        }).map(function(t) {
            return t.code;
        })), o && o.length && (t.conditions.brand = o.filter(function(t) {
            return t.active;
        }).map(function(t) {
            return t.code;
        })), i && i.length && (t.conditions.category = i.filter(function(t) {
            return t.active;
        }).map(function(t) {
            return t.code;
        })), s && (t.conditions.salePriceStart = s), a && (t.conditions.salePriceEnd = a);
    },
    conditionsReset: function(t) {
        t.conditions.filter = [], t.conditions.brand = [], t.conditions.category = [], t.conditions.salePriceStart = null, 
        t.conditions.salePriceEnd = null;
    }
}, d = function(t) {
    function n(o) {
        e(this, n);
        var s = i(this, t.call(this));
        s.opt = Object.assign({
            useStoreShop: !0,
            useStoreChannel: !0
        }, o), s.utils.initModelShop(s, s.opt);
        var r = s.GET, c = s.POST, l = s.api, d = s.store, f = l.cms, h = l.product;
        return s.service = new a.default({
            GET: r,
            POST: c,
            api: {
                cms: f,
                product: h
            },
            store: d
        }), s.stateInit(), s.transition = new u.default({
            GET: r,
            POST: c,
            api: {
                cms: f,
                product: h
            },
            store: d
        }), s;
    }
    return o(n, t), n.prototype.shopInit = function(t) {
        var e = Object.assign({}, t), i = e.storeCode, o = e.channelCode;
        this.utils.initModelShop(this, Object.assign({}, this.opt, {
            storeCode: i,
            channelCode: o
        }));
    }, n.prototype.stateInit = function() {
        this.originData = {}, this.state = {
            promise: {},
            itemList: [],
            hasNextPage: !0,
            withPromotionFlag: null,
            conditions: {
                saleStatus: [ "1", "3" ],
                saleAttribute: [],
                category: [],
                categoryRoot: [],
                brand: [],
                brandRoot: [],
                filter: [],
                sort: {
                    name: null,
                    sort: 0
                },
                salePriceStart: null,
                salePriceEnd: null,
                keyWord: null,
                spuList: [],
                spuFilter: [],
                page: 0,
                size: 10,
                rules: {
                    saleStatus: "list",
                    saleAttribute: "basic",
                    category: "list",
                    brand: "list",
                    filter: "list",
                    price: "basic",
                    keyWord: "list",
                    spuList: "list"
                }
            },
            topGoodsType: null,
            useOldInterface: !1
        };
    }, n.prototype.init = function(t) {
        var e = this;
        this.stateInit();
        var i = Object.assign({}, {
            defaultReq: {},
            smodelCode: null,
            keyWord: null,
            category: null,
            categoryRoot: null,
            brand: null,
            brandRoot: null,
            withPromotionFlag: !1,
            channelCode: null,
            storeCode: null,
            useStoreShop: !0,
            useStoreChannel: !0,
            topGoods: null,
            spuList: null,
            size: null,
            format: null,
            rules: null
        }, t);
        this.utils.initModelShop(this, i);
        var o = this.service, n = i.defaultReq, s = i.smodelCode, a = i.keyWord, r = i.brand, c = i.brandRoot, u = i.category, d = i.categoryRoot, f = i.withPromotionFlag, h = i.topGoods, p = i.spuList, g = i.size, y = i.useOldInterface, m = i.rules;
        this.state.conditions = Object.assign(this.state.conditions, n), this.state.channelCode = this.channelCode, 
        this.state.storeCode = this.storeCode, this.state.useOldInterface = y, r && l.brandAssign(this.state.conditions, r), 
        c && l.brandRootAssign(this.state.conditions, c), u && l.categoryAssign(this.state.conditions, u), 
        d && l.categoryRootAssign(this.state.conditions, d), this.state.withPromotionFlag = f, 
        h && (this.state.topGoodsType = h.type), p && (this.state.conditions.spuList = p), 
        g && (this.state.conditions.size = g), this.state.conditions.rules = Object.assign(this.state.conditions.rules, m);
        var v = this.state.promise;
        return v.init = new Promise(function(t) {
            var i = 0, n = 0, r = function() {
                ++n == i && t(e.state);
            };
            a && (e.state.conditions.keyWord = a), s ? (i++, o.queryPlpTemplateByCms({
                smodelCode: s
            }).then(function(t) {
                if (t && t.data) {
                    var i = t.data.dynamic ? t.data.dynamic.filter(function(t) {
                        return "SORTORDER" == t.module;
                    }) : [ t.data.first ];
                    if (i[0]) {
                        var o = i[0].value;
                        if (o.sort1 && (o.sort1.sortgoodspnt && e.state.conditions.category.push(o.sort1.sortgoodspnt), 
                        o.sort1.sortrule)) {
                            var n = o.sort1.sortrule.split(",");
                            e.state.conditions.sort = {
                                name: n[0],
                                sort: n[1]
                            };
                        }
                    }
                }
                r();
            }).catch(function() {
                r();
            })) : t(e.state);
        }), v.init;
    }, n.prototype.getConditions = function(t) {
        var e = Object.assign({
            needCategory: !0,
            categoryFormat: null,
            needBrand: !0,
            brandFormat: null,
            needFilter: !0,
            filterFormat: null,
            needPriceList: !1,
            priceListFormat: null
        }, t), i = this.service, o = this, n = l.formatConditionsReq(this.state);
        return new Promise(function(t, s) {
            i.getConditions(n).then(function(i) {
                var n = r.default.formatConditions(i, e), s = n.brandList, a = n.categoryList, c = n.filterList;
                s && (o.state.brandList = s), a && (o.state.categoryList = a), c && (o.state.filterList = c), 
                t(n);
            }).catch(function(t) {
                s(t);
            });
        });
    }, n.prototype.getCategoryTree = function(t) {
        var e = Object.assign({
            category: null,
            format: null,
            load: !0
        }, t), i = this.service, o = this;
        return new Promise(function(t, n) {
            i.getCategoryTree().then(function(i) {
                var n = r.default.formatCategoryTree(i, e);
                e.category && (n = l.categoryTreeFilter(n, e.category)), e.load && (o.state.categoryList = n), 
                t(n);
            }).catch(function(t) {
                n(t);
            });
        });
    }, n.prototype.getBrandList = function(t) {
        var e = Object.assign({
            format: null,
            load: !0
        }, t), i = this.service, o = this;
        return new Promise(function(t, n) {
            i.getBrandList().then(function(i) {
                var n = r.default.formatBrandList(i, e);
                e.load && (o.state.brandList = n), t(n);
            }).catch(function(t) {
                n(t);
            });
        });
    }, n.prototype.getItemList = function(t) {
        var e = this, i = this, o = Object.assign({
            format: null
        }, t), n = this.state, s = n.promise, a = n.topGoodsType;
        return new Promise(function(t, n) {
            s.init.then(function() {
                if (l.resetPage(e), a) {
                    var s = function() {
                        i.state.itemList.length >= i.state.conditions.size ? t({
                            itemList: i.state.itemList,
                            hasNextPage: !0
                        }) : l.queryItemList(i, o.format).then(function(e) {
                            t(e);
                        }).catch(function(t) {
                            n(t);
                        });
                    };
                    switch (a) {
                      case "preOrder":
                        l.queryPreOrderItemList(e, o.format).then(function(t) {
                            e.state.topGoods = t, e.state.conditions.spuFilter = t.map(function(t) {
                                return t.spuCode;
                            }), e.state.itemList = e.state.itemList.concat(t), s();
                        }).catch(function() {
                            s();
                        });
                        break;

                      case "spuCode":
                      default:
                        s();
                    }
                } else l.queryItemList(e, o.format).then(function(e) {
                    t(e);
                }).catch(function(t) {
                    n(t);
                });
            });
        });
    }, n.prototype.pageTurn = function(t) {
        var e = this, i = Object.assign({
            format: null
        }, t), o = this.state.hasNextPage;
        return new Promise(function(t, n) {
            o ? l.queryItemList(e, i.format).then(function(e) {
                t(e);
            }).catch(function(t) {
                n(t);
            }) : t();
        });
    }, n.prototype.sortSubmit = function(t) {
        var e = t.name, i = t.sort;
        return e && i >= 0 && (this.state.conditions.sort.name = e, this.state.conditions.sort.sort = i), 
        this.getItemList(t);
    }, n.prototype.priceSubmit = function(t) {
        var e = t.salePriceStart, i = t.salePriceEnd;
        return e && (this.state.conditions.salePriceStart = e), i && (this.state.conditions.salePriceEnd = i), 
        this.getItemList(t);
    }, n.prototype.categorySubmit = function(t) {
        var e = Object.assign({}, t), i = e.category, o = e.categoryRoot;
        return i && (this.state.conditions.category = i), o && (this.state.conditions.categoryRoot = o), 
        this.getItemList(e);
    }, n.prototype.brandSubmit = function(t) {
        var e = Object.assign({}, t), i = e.brand, o = e.brandRoot;
        return i && (this.state.conditions.brand = i), o && (this.state.conditions.brandRoot = o), 
        this.getItemList(e);
    }, n.prototype.conditionSave = function(t) {
        var e = this, i = Object.assign({}, t);
        Object.keys(i).forEach(function(t) {
            e.state.conditions[t] = i[t];
        });
    }, n.prototype.conditionLoad = function() {
        var t = this.state.conditions.filter, e = this.state.filterList;
        e && e.forEach(function(e) {
            e.hasActiveValue = !1, e.valueList.forEach(function(t) {
                t.active = !1;
            }), t.forEach(function(t) {
                e.hasActiveValue = !1, e.valueList.forEach(function(i) {
                    i.code == t && (i.active = !0, e.hasActiveValue = !0);
                });
            });
        });
        var i = this.state.conditions.salePriceStart, o = this.state.conditions.salePriceEnd, n = this.state.conditions.brand, s = this.state.brandList;
        s && s.forEach(function(t) {
            t.active = !1, n.forEach(function(e) {
                t.code == e && (t.active = !0);
            });
        });
        var a = this.state.conditions.category, r = this.state.categoryList;
        return r && function t(e) {
            e.forEach(function(e) {
                e.active = !1, a.forEach(function(t) {
                    e.code == t && (e.active = !0);
                }), e.children && t(e.children);
            });
        }(r), {
            filterList: e,
            categoryList: r,
            brandList: s,
            salePriceStart: i,
            salePriceEnd: o
        };
    }, n.prototype.conditionSubmit = function(t) {
        var e = Object.assign({}, t);
        return l.conditionsRefine(this.state, e), this.getItemList(e);
    }, n.prototype.conditionReset = function(t) {
        var e = Object.assign({}, t);
        return l.conditionsReset(this.state), this.getItemList(e);
    }, n.prototype.getItemListBySpu = function(t) {
        var e = Object.assign({
            spuList: [],
            channelCode: null,
            storeCode: null,
            inventoryFlag: !1,
            withPromotionFlag: !1,
            type: 0,
            saleStatus: 1
        }, t), i = this.service;
        return new Promise(function(t, o) {
            i.getItemListBySpu(e).then(function(e) {
                t(r.default.formatSpuList(e.itemDetailList));
            }).catch(function(t) {
                o(t);
            });
        });
    }, n.prototype.getErrorMessage = function(t) {
        var e = Object.assign({}, t).code;
        return e && c.default[e] ? c.default[e] : c.default.default;
    }, n;
}(s.default);

exports.default = d;
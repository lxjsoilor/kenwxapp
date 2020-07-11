exports.__esModule = !0, exports.default = {
    formatSkuItem: function(t) {
        var e = {};
        e.spuCode = t.code || "", e.title = t.title || "", e.subTitle = t.subTitle || "", 
        e.brand = t.brand && this.formatItemBrand(t.brand) || null, e.category = this.formatItemCategory(t.categoryList), 
        e.salePrice = t.salePrice, e.listPrice = t.listPrice;
        var i = this.formatItemSku(t), r = i.skuList, a = i.stock;
        return e.stock = a, e.salesProps = this.formatItemSalesPropsBySku(t.skuList), e.saleStatus = this.formatItemSaleStatus(t.saleStatus), 
        e.images = this.formatItemImage(t.itemImageList, e.salesProps), e.skuImages = this.formatItemImageByProps(e.salesProps), 
        e.description = this.formatItemDescription(t.description), e.descriptionText = t.description || "", 
        e.labelList = t.labelList || null, e.onSaleTime = null, e.onSaleTimeText = null, 
        t.fixedListTime && (e.onSaleTimeText = t.fixedListTime, e.onSaleTime = new Date(t.fixedListTime.replace(/-/g, "/")).getTime() || null), 
        e.isAdvanceSale = !!t.fixedListTime, e.attrList = this.formatAttrList(t.attrList), 
        e.superscript = this.getSuperscriptByAttrList(t.attrList), r[0] && Object.assign(e, r[0]), 
        e.preOrder = t.preOrder, e;
    },
    salesPropsFilterBySku: function(t, e) {
        if (t[0] && t[0].properties) {
            var i = [], r = t[0].properties;
            return e.forEach(function(t) {
                var e = r.filter(function(e) {
                    return e.groupId == t.groupId;
                });
                e && e.length && i.push(t);
            }), i;
        }
        return e;
    },
    formatItem: function(t) {
        var e = {};
        e.spuCode = t.code || "", e.title = t.title || "", e.subTitle = t.subTitle || "", 
        e.brand = t.brand && this.formatItemBrand(t.brand) || null, e.category = this.formatItemCategory(t.categoryList), 
        e.skuImages = null, e.salePrice = t.salePrice, e.listPrice = t.listPrice;
        var i = this.formatItemSku(t), r = i.skuList, a = i.stock, s = i.salePriceRange, n = i.listPriceRange;
        return e.salePriceRange = s, e.listPriceRange = n, e.stock = a, e.skuList = r, e.skuSelected = null, 
        e.salesProps = this.formatItemSalesProps(t.attrSaleList), e.saleStatus = this.formatItemSaleStatus(t.saleStatus), 
        e.images = this.formatItemImage(t.itemImageList, e.salesProps), e.description = this.formatItemDescription(t.description), 
        e.descriptionText = t.description || "", e.labelList = t.labelList || null, e.onSaleTime = null, 
        e.onSaleTimeText = null, t.fixedListTime && (e.onSaleTimeText = t.fixedListTime, 
        e.onSaleTime = new Date(t.fixedListTime.replace(/-/g, "/")).getTime() || null), 
        e.isAdvanceSale = !!t.fixedListTime, e.attrList = this.formatAttrList(t.attrList), 
        e.superscript = this.getSuperscriptByAttrList(t.attrList), e.preOrder = t.preOrder, 
        e;
    },
    formatItemList: function(t, e) {
        var i = this, r = [];
        return t && t.forEach(function(t) {
            var a = {};
            a.spuCode = t.spuCode || "", a.style = t.style || "", a.title = t.title || "", a.subTitle = t.subTitle || "", 
            a.salePrice = t.salePrice, a.listPrice = t.listPrice;
            var s = i.formatItemSku(t), n = s.skuList, o = s.salePriceRange, u = s.listPriceRange;
            a.salePriceRange = o, a.listPriceRange = u, a.skuList = n && n.map(function(t) {
                return delete t.stock, t;
            }), a.salesProps = i.formatItemSalesProps(t.attrSaleList), a.images = i.formatItemImage(t.itemImageList, a.salesProps), 
            a.saleStatus = i.formatItemSaleStatus(t.saleStatus), a.promotionData = t.promotionData || null, 
            a.attrList = i.formatAttrList(t.attrList), a.superscript = i.getSuperscriptByAttrList(t.attrList), 
            a.preOrder = t.preOrder, e && (a = e(a, t) || a), r.push(a);
        }), r;
    },
    formatSpuList: function(t, e) {
        var i = this, r = [];
        return t && t.forEach(function(t) {
            var a = {};
            a.spuCode = t.code || "", a.brand = t.brand && i.formatItemBrand(t.brand) || null, 
            a.category = t.categoryList && i.formatItemCategory(t.categoryList) || null, a.title = t.title || "", 
            a.subTitle = t.subTitle || "", a.salePrice = t.salePrice, a.listPrice = t.listPrice;
            var s = i.formatItemSku(t), n = s.skuList, o = s.stock, u = s.salePriceRange, l = s.listPriceRange;
            a.salePriceRange = u, a.listPriceRange = l, a.stock = o, a.skuList = n, a.salesProps = i.formatItemSalesProps(t.attrSaleList), 
            a.images = i.formatItemImage(t.itemImageList, a.salesProps), a.saleStatus = i.formatItemSaleStatus(t.saleStatus), 
            a.promotionData = t.promotionData || null, a.attrList = i.formatAttrList(t.attrList), 
            a.superscript = i.getSuperscriptByAttrList(t.attrList), a.preOrder = t.preOrder, 
            a.style = t.style, a.storeCodeList = t.storeCodeList, e && (a = e(a, t) || a), r.push(a);
        }), r;
    },
    formatItemImage: function(t, e) {
        var i = [];
        if (t) t.forEach(function(t) {
            return i.push({
                code: t.code,
                src: t.picUrl,
                attachList: t.imageAttachList
            });
        }); else if (e) {
            var r = !1;
            e.forEach(function(t) {
                r || t.values.forEach(function(t) {
                    t.imageList && !r && (r = !0, i = t.imageList);
                });
            });
        }
        return i;
    },
    formatItemImageByProps: function(t) {
        var e = [];
        if (t) {
            var i = !1;
            t.forEach(function(t) {
                i || t.values.forEach(function(t) {
                    t.imageList && !i && (i = !0, e = t.imageList);
                });
            });
        }
        return e;
    },
    formatItemDescription: function(t) {
        var e = [];
        return t && (t.split(",") || []).forEach(function(t) {
            return e.push({
                src: t.trim(),
                isLoaded: !1
            });
        }), e;
    },
    formatItemSaleStatus: function(t) {
        var e = 0;
        return 1 != t && 3 != t || (e = 1), e;
    },
    formatAttrList: function(t) {
        var e = [];
        return t && t.forEach(function(t) {
            var i = [];
            t.attributeValueList && t.attributeValueList.forEach(function(t) {
                i.push({
                    name: t.attributeValueFrontName,
                    code: t.code,
                    pic: t.attributeValuePicURL,
                    imgList: t.itemAttributeValueImageList,
                    thumbnailList: t.itemAttributeValueThumbnailList
                });
            }), e.push({
                name: t.attributeFrontName,
                code: t.code,
                value: i
            });
        }), e;
    },
    getSuperscriptByAttrList: function(t) {
        var e = "";
        return t && t.filter(function(t) {
            return "角标" == t.attributeFrontName;
        }).forEach(function(t) {
            t.attributeValueList && t.attributeValueList[0] && t.attributeValueList[0].attributeValueFrontName && (e = t.attributeValueList[0].attributeValueFrontName);
        }), e;
    },
    formatItemSku: function(t) {
        var e = 0, i = [], r = 0, a = 0, s = 0, n = 0;
        t.skuList && t.skuList.forEach(function(t) {
            if (0 == t.status) {
                t.salePrice > r && (r = t.salePrice), (t.salePrice > 0 && t.salePrice < a || 0 == a) && (a = t.salePrice), 
                t.listPrice > s && (s = t.listPrice), (t.listPrice > 0 && t.listPrice < n || 0 == n) && (n = t.listPrice);
                var o = t.netqty < 0 ? 0 : t.netqty;
                e += o;
                var u = [];
                t.attrSaleList.forEach(function(t) {
                    var e = [], i = [];
                    t.attributeValueList && t.attributeValueList.forEach(function(t) {
                        -1 == e.indexOf(t.code) && (e.push(t.code), i.push(t.attributeValueFrontName));
                    }), u.push({
                        groupId: t.code,
                        groupName: t.attributeFrontName,
                        propId: e.join("|"),
                        propName: i.join("|")
                    });
                }), i.push({
                    skuId: t.code,
                    omsCode: t.extentionCode,
                    listPrice: t.listPrice,
                    salePrice: t.salePrice,
                    properties: u,
                    stock: o
                });
            }
        });
        var o = [ a ];
        r > a && o.push(r);
        var u = [ n ];
        return s > n && u.push(s), {
            skuList: i,
            stock: e,
            salePriceRange: o,
            listPriceRange: u
        };
    },
    formatItemSalesPropsBySku: function(t) {
        var e = [];
        return t[0] && (e = this.formatItemSalesProps(t[0].attrSaleList)), e;
    },
    formatItemSalesProps: function(t) {
        var e = [];
        return t && t.forEach(function(t, i) {
            var r = !1, a = [];
            t.attributeValueList && t.attributeValueList.forEach(function(t, e) {
                var s = null;
                t.itemAttributeValueImageList && (s = [], t.itemAttributeValueImageList.forEach(function(t) {
                    s.push({
                        code: t.code,
                        src: t.picUrl
                    });
                }));
                var n = t.attributeValuePicURL || null, o = null;
                t.itemAttributeValueThumbnailList && t.itemAttributeValueThumbnailList[0] && t.itemAttributeValueThumbnailList[0].url && (o = t.itemAttributeValueThumbnailList[0].url), 
                n && (r = !0), a.push({
                    name: t.attributeValueFrontName || null,
                    value: t.attributeValueName || null,
                    propId: t.code,
                    pic: n,
                    isActive: !1,
                    isDisabled: !1,
                    rowIndex: i,
                    index: e,
                    imageList: s,
                    coverPic: o
                });
            }), e.push({
                name: t.attributeFrontName,
                groupId: t.code,
                hasError: !1,
                valueSelected: null,
                values: a,
                isPicGroup: r
            });
        }), e;
    },
    formatItemCategory: function(t) {
        var e = [];
        return t && t.forEach(function(t) {
            t.code && e.push({
                code: t.code || null,
                name: t.name || null,
                path: t.categoryPath || null,
                children: t.children || null,
                sort: t.sort
            });
        }), e;
    },
    formatItemBrand: function(t) {
        return {
            name: t.name || null,
            code: t.code || null,
            description: t.description || null,
            img: t.imageUrl || null
        };
    },
    formatFilterList: function(t, e) {
        var i = [];
        return t && t.length && t.forEach(function(t) {
            var r = [];
            if (t.attributeValueList && t.attributeValueList.length && t.attributeValueList.forEach(function(t) {
                "promotion.sku.activityCode" != t.key && t.count > 0 && r.push({
                    id: t.attributeId,
                    name: t.attributeValueFrontName,
                    value: t.value,
                    pic: t.attributeValuePicURL,
                    code: t.code,
                    count: t.count,
                    key: t.key,
                    active: !1,
                    disable: !1
                });
            }), t.attributeFrontName && t.code && t.attributeValueList) {
                var a = {
                    name: t.attributeFrontName,
                    code: t.code,
                    sign: t.filterSign,
                    valueList: r,
                    active: !1,
                    disable: !1,
                    hasActiveValue: !1
                };
                e && (a = e(a, t) || a), i.push(a);
            }
        }), i;
    },
    formatItemBrandList: function(t, e) {
        var i = [];
        return t && t.length && t.forEach(function(t) {
            var r = {
                name: t.name || null,
                code: t.code || null,
                description: t.description || null,
                img: t.imageUrl || null,
                active: !1,
                disable: !1
            };
            e && (r = e(r, t) || r), i.push(r);
        }), i;
    },
    formatItemCategoryList: function(t, e) {
        var i = [];
        return t && t.forEach(function(t) {
            if (t.code) {
                var r = {
                    code: t.code || null,
                    name: t.name || null,
                    path: t.categoryPath || null,
                    children: t.children || null,
                    sort: t.sort,
                    active: !1,
                    disable: !1
                };
                e && (r = e(r, t) || r), i.push(r);
            }
        }), i;
    },
    formatSalePriceList: function(t, e) {
        return e ? e(t) : t;
    },
    formatRecommendItems: function(t) {
        if (!t) return null;
        if (t && t.length) {
            var e = [];
            return t.forEach(function(t) {
                e.push(t.code);
            }), e;
        }
    },
    formatItemPromotion: function(t) {
        var e = [];
        return t && t.forEach(function(t) {
            e.push({
                activityLabel: t.activityLabel,
                activityName: t.activityName,
                activityDesc: t.activityDesc,
                activityRuleDesc: t.activityRuleDesc,
                activityType: t.activityType,
                activitySort: t.activitySort,
                activityGifts: t.activityGifts
            });
        }), e;
    },
    formatConditions: function(t, e) {
        var i = e.needCategory, r = e.categoryFormat, a = e.needBrand, s = e.brandFormat, n = e.needFilter, o = e.filterFormat, u = e.needPriceList, l = e.priceListFormat, c = {};
        return a && (c.brandList = t.brandList && this.formatItemBrandList(t.brandList, s) || null), 
        i && (c.categoryList = t.categoryList && this.formatItemCategoryList(t.categoryList, r) || null), 
        n && (c.filterList = t.filterAttributeList && this.formatFilterList(t.filterAttributeList, o) || null), 
        u && (c.salePriceList = t.salePriceList && this.formatSalePriceList(t.salePriceList, l) || null), 
        c;
    },
    formatBrandList: function(t, e) {
        var i = e.format, r = [];
        return t && t.length && t.filter(function(t) {
            return 0 == t.isDisplay;
        }).forEach(function(t) {
            var e = {
                name: t.name || null,
                code: t.code || null,
                description: t.description || null,
                img: t.imageUrl || null,
                sort: t.sort || null,
                active: !1,
                disable: !1
            };
            i && (e = i(e, t) || e), r.push(e);
        }), r;
    },
    formatCategoryTree: function(t, e) {
        var i = e.format, r = [];
        return function t(e, r) {
            r.forEach(function(a, s) {
                var n = a.children ? [] : null, o = {
                    code: a.code || null,
                    name: a.name || null,
                    path: a.categoryPath || null,
                    img: a.imageUrl || null,
                    children: n,
                    active: !1,
                    disable: !1
                };
                i && (o = i(o, a) || o), e.push(o), n && t(e[s].children, r[s].children.filter(function(t) {
                    return 0 == t.isDisplay;
                }));
            });
        }(r, t.filter(function(t) {
            return 0 == t.isDisplay;
        })), r;
    }
};
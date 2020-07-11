exports.__esModule = !0, exports.default = {
    getItemListReq: function(t) {
        var e = {}, i = t.channelCode, a = t.storeCode, r = t.withPromotionFlag, s = t.conditions, o = s.saleStatus, n = s.saleAttribute, u = s.category, l = s.categoryRoot, c = s.filter, m = s.brand, f = s.brandRoot, d = s.sort, p = s.salePriceStart, L = s.salePriceEnd, h = s.keyWord, g = s.spuFilter, b = s.page, v = s.size;
        return e.conditionList = [], o.forEach(function(t) {
            var i = {
                saleStatus: t,
                type: 0
            };
            p && (i.salePriceStart = p), L && (i.salePriceEnd = L), n && n.length && (i.attrbuteCodeList = [ {
                attributeCodeSublist: []
            } ], n.forEach(function(t) {
                var e = [];
                t.value.forEach(function(t) {
                    t.code && e.push(t.code);
                }), 0 == e.length && e.push(t.code), e.forEach(function(t) {
                    i.attrbuteCodeList[0].attributeCodeSublist.push(t);
                });
            })), u && u.length && (i.categoryCodeList = u), l && l.length && (i.parentCategoryCode = l.join(","));
            var a = [].concat(new Set(f.concat(m)));
            a && a.length && (i.brandCode = a), e.conditionList.push(i);
        }), d.name && (e.itemSortList = [], e.itemSortList.push({
            name: d.name,
            sort: d.sort
        })), c && c.length && (e.itemFilterList = [], c.forEach(function(t) {
            var i = [];
            t.valueList.forEach(function(t) {
                i.push({
                    key: t.key,
                    value: t.value
                });
            }), e.itemFilterList.push({
                code: t.code,
                data: i
            });
        })), h && (e.keyword = h), g && (e.notIncludeSpuCodeList = g), e.withPromotionFlag = r ? "1" : "0", 
        i && (e.channelCode = i), a && (e.storeCode = a), {
            data: e,
            page: b + 1,
            size: v
        };
    },
    formatSkuItem: function(t) {
        var e = {};
        e.spuCode = t.code || "", e.title = t.title || "", e.subTitle = t.subTitle || "", 
        e.brand = t.brand && this.formatItemBrand(t.brand) || null, e.category = this.formatItemCategory(t.categoryList), 
        e.salePrice = t.salePrice, e.listPrice = t.listPrice;
        var i = this.formatItemSku(t), a = i.skuList, r = i.stock;
        return e.stock = r, e.salesProps = this.formatItemSalesProps(t.attrSaleList), e.saleStatus = this.formatItemSaleStatus(t.saleStatus), 
        e.images = this.formatItemImage(t.itemImageList, e.salesProps), e.skuImages = this.formatItemImageByProps(e.salesProps), 
        e.description = this.formatItemDescription(t.description), e.descriptionText = t.description || "", 
        e.labelList = t.labelList || null, e.onSaleTime = null, e.onSaleTimeText = null, 
        t.fixedListTime && (e.onSaleTimeText = t.fixedListTime, e.onSaleTime = new Date(t.fixedListTime.replace(/-/g, "/")).getTime() || null), 
        e.isAdvanceSale = !!t.fixedListTime, e.attrList = this.formatAttrList(t.attrList), 
        e.superscript = this.getSuperscriptByAttrList(t.attrList), a[0] && Object.assign(e, a[0]), 
        e;
    },
    formatItem: function(t) {
        var e = {};
        e.spuCode = t.code || "", e.title = t.title || "", e.subTitle = t.subTitle || "", 
        e.brand = t.brand && this.formatItemBrand(t.brand) || null, e.category = this.formatItemCategory(t.categoryList), 
        e.skuImages = null, e.salePrice = t.salePrice, e.listPrice = t.listPrice;
        var i = this.formatItemSku(t), a = i.skuList, r = i.stock, s = i.salePriceRange, o = i.listPriceRange;
        return e.salePriceRange = s, e.listPriceRange = o, e.stock = r, e.skuList = a, e.skuSelected = null, 
        e.salesProps = this.formatItemSalesProps(t.attrSaleList), e.saleStatus = this.formatItemSaleStatus(t.saleStatus), 
        e.images = this.formatItemImage(t.itemImageList, e.salesProps), e.description = this.formatItemDescription(t.description), 
        e.descriptionText = t.description || "", e.labelList = t.labelList || null, e.onSaleTime = null, 
        e.onSaleTimeText = null, t.fixedListTime && (e.onSaleTimeText = t.fixedListTime, 
        e.onSaleTime = new Date(t.fixedListTime.replace(/-/g, "/")).getTime() || null), 
        e.isAdvanceSale = !!t.fixedListTime, e.attrList = this.formatAttrList(t.attrList), 
        e.superscript = this.getSuperscriptByAttrList(t.attrList), e;
    },
    formatItemList: function(t, e) {
        var i = this, a = [];
        return t && t.forEach(function(t) {
            var r = {};
            r.spuCode = t.code || "", r.title = t.title || "", r.subTitle = t.subTitle || "", 
            r.brand = t.brand && i.formatItemBrand(t.brand) || null, r.category = i.formatItemCategory(t.categoryList), 
            r.salePrice = t.salePrice, r.listPrice = t.listPrice;
            var s = i.formatItemSku(t), o = s.skuList, n = s.stock, u = s.salePriceRange, l = s.listPriceRange;
            r.salePriceRange = u, r.listPriceRange = l, r.stock = n, r.skuList = o, r.salesProps = i.formatItemSalesProps(t.attrSaleList), 
            r.images = i.formatItemImage(t.itemImageList, r.salesProps), r.saleStatus = i.formatItemSaleStatus(t.saleStatus), 
            r.descriptionText = t.description || "", r.description = i.formatItemDescription(t.description), 
            r.labelList = t.labelList || null, r.promotionData = t.promotionData || null, t.fixedListTime && (r.onSaleTimeText = t.fixedListTime, 
            r.onSaleTime = new Date(t.fixedListTime.replace(/-/g, "/")).getTime() || null), 
            r.isAdvanceSale = !!t.fixedListTime, r.attrList = i.formatAttrList(t.attrList), 
            r.superscript = i.getSuperscriptByAttrList(t.attrList), e && (r = e(r, t) || r), 
            a.push(r);
        }), a;
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
            var a = !1;
            e.forEach(function(t) {
                a || t.values.forEach(function(t) {
                    t.imageList && !a && (a = !0, i = t.imageList);
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
                src: t + "?" + new Date().getTime(),
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
        var e = 0, i = [], a = 0, r = 0, s = 0, o = 0;
        t.skuList && t.skuList.forEach(function(t) {
            if (0 == t.status) {
                t.salePrice > a && (a = t.salePrice), (t.salePrice > 0 && t.salePrice < r || 0 == r) && (r = t.salePrice), 
                t.listPrice > s && (s = t.listPrice), (t.listPrice > 0 && t.listPrice < o || 0 == o) && (o = t.listPrice);
                var n = t.netqty < 0 ? 0 : t.netqty;
                e += n;
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
                    stock: n
                });
            }
        });
        var n = [ r ];
        a > r && n.push(a);
        var u = [ o ];
        return s > o && u.push(s), {
            skuList: i,
            stock: e,
            salePriceRange: n,
            listPriceRange: u
        };
    },
    formatItemSalesProps: function(t) {
        var e = [];
        return t && t.forEach(function(t, i) {
            var a = !1, r = [];
            t.attributeValueList && t.attributeValueList.forEach(function(t, e) {
                var s = null;
                t.itemAttributeValueImageList && (s = [], t.itemAttributeValueImageList.forEach(function(t) {
                    s.push({
                        code: t.code,
                        src: t.picUrl
                    });
                }));
                var o = t.attributeValuePicURL || null;
                o && (a = !0), r.push({
                    name: t.attributeValueFrontName || null,
                    value: t.attributeValueName || null,
                    propId: t.code,
                    pic: o,
                    isActive: !1,
                    isDisabled: !1,
                    rowIndex: i,
                    index: e,
                    imageList: s
                });
            }), e.push({
                name: t.attributeFrontName,
                groupId: t.code,
                hasError: !1,
                valueSelected: null,
                values: r,
                isPicGroup: a
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
    formatItemCmsSetting: function(t, e) {
        var i = 0, a = [];
        return e && t.attrList && t.attrList.forEach(function(t) {
            switch (t.code) {
              case e.superscript:
                t.attributeValueList.forEach(function(t) {
                    t.attributeValueFrontName && a.push({
                        name: t.attributeValueFrontName
                    });
                });
                break;

              case e.saleStatus.code:
                t.attributeValueList.forEach(function(t) {
                    switch (t.code) {
                      case e.saleStatus.buyNow:
                        i = 2;
                        break;

                      case e.saleStatus.cartAndBuyNow:
                        i = 1;
                        break;

                      case e.saleStatus.notSale:
                        i = 0;
                    }
                });
            }
        }), {
            saleChannel: i,
            superscript: a
        };
    },
    formatFilterList: function(t) {
        var e = [];
        return t && t.length && t.forEach(function(t) {
            var i = [];
            t.attributeValueList && t.attributeValueList.length && t.attributeValueList.forEach(function(t) {
                "promotion.sku.activityCode" != t.key && t.count > 0 && i.push({
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
            }), t.attributeFrontName && t.code && t.attributeValueList && e.push({
                name: t.attributeFrontName,
                code: t.code,
                sign: t.filterSign,
                valueList: i,
                active: !1,
                disable: !1,
                hasActiveValue: !1
            });
        }), e;
    },
    formatItemBrandList: function(t) {
        var e = [];
        return t && t.length && t.forEach(function(t) {
            e.push({
                name: t.name || null,
                code: t.code || null,
                description: t.description || null,
                img: t.imageUrl || null,
                active: !1,
                disable: !1
            });
        }), e;
    },
    formatItemCategoryList: function(t) {
        var e = [];
        return t && t.forEach(function(t) {
            t.code && e.push({
                code: t.code || null,
                name: t.name || null,
                path: t.categoryPath || null,
                children: t.children || null,
                sort: t.sort,
                active: !1,
                disable: !1
            });
        }), e;
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
                activityRuleDesc: t.activityRuleDesc,
                activityType: t.activityType,
                activitySort: t.activitySort
            });
        }), e;
    },
    formatConditions: function(t) {
        if (!t) return {};
        var e = {};
        return e.brandList = t.brandList && this.formatItemBrandList(t.brandList) || null, 
        e.categoryList = t.categoryList && this.formatItemCategoryList(t.categoryList) || null, 
        e.filterList = t.filterAttributeList && this.formatFilterList(t.filterAttributeList) || null, 
        e;
    }
};
exports.__esModule = !0;

var t = {
    formatCartList: function(t, o) {
        var e = this;
        if (!t) return [];
        var r = [];
        return t.forEach(function(t) {
            r.push(e.formatCartItem(t, o));
        }), r;
    },
    formatCartItem: function(t, o) {
        if (!t) return null;
        var e = o && o.cartLineFormat, r = {};
        return r.cartLineType = "normal", r.saleStatus = 1 != t.spuSaleStatus && 3 != t.spuSaleStatus || 0 != t.skuStatus ? 0 : 1, 
        r.selectStatus = t.selectStatus, r.spuCode = t.spuCode, r.omsCode = t.extentionCode, 
        r.skuId = t.skuCode, r.brand = {
            name: t.brandName,
            code: t.brandCode
        }, r.category = this.formatItemCategory(t.skuCategoryList), r.images = t.skuPicURL, 
        r.title = t.spuTitle || "", r.subTitle = t.spuSubTitle || "", r.salePrice = t.skuSalePrice || 0, 
        r.listPrice = t.skuListPrice || 0, r.promoPrice = t.skuPromoPrice || 0, r.salesProps = this.formatItemSalesProps(t.skuAttrSaleList), 
        r.attrList = t.skuAttrList, r.buyCount = t.quantity || 0, r.stock = t.netQty || 0, 
        r.labelList = t.labelList || null, r.preOrder = t.preOrder, r.promotion = [], r.channelCode = t.channelCode, 
        r.storeCode = t.storeCode, e && (r = e(r, t) || r), r;
    },
    formatItemCategory: function(t) {
        var o = [];
        return t && t.forEach(function(t) {
            o.push({
                code: t.categoryCode,
                name: t.categoryName,
                path: t.categoryPath
            });
        }), o;
    },
    formatItemSalesProps: function(t) {
        var o = [];
        return t && t.forEach(function(t) {
            o.push({
                groupId: t.attributeCode,
                groupName: t.attributeFrontName,
                propId: t.attributeValueCode,
                propName: t.attributeValueFrontName,
                propPic: t.attributeValuePicURL,
                propImageList: t.attributeValueThumbnailURL
            });
        }), o;
    },
    formatGiftData: function(t) {
        var o = this, e = [];
        return t.forEach(function(t) {
            t.cartProductItem && e.push(Object.assign(o.formatCartItem(t.cartProductItem), {
                count: t.skuNum
            }));
        }), e;
    },
    formatPromotionData: function(t, o, e) {
        var r = this, a = e.activityFilter || [], i = [], u = [], n = [];
        return t && t.filter(function(t) {
            return !t.gifts || t.gifts.filter(function(t) {
                return t.cartProductItem;
            }).length;
        }).forEach(function(t) {
            var e = {
                activityLabel: t.activityLabel,
                activityName: t.activityName,
                activityRuleDesc: t.activityRuleDesc,
                activityType: t.activityType,
                rewardType: t.rewardType,
                effectiveFlag: t.effectiveFlag,
                promoRewardAmount: t.promoRewardAmount,
                userLimitation: t.userLimitation,
                giftLimitMax: t.giftLimitMax,
                gifts: t.gifts && t.gifts && r.formatGiftData(t.gifts) || null
            };
            t.shoppingCartItemOutDTOs && t.shoppingCartItemOutDTOs.forEach(function(t) {
                var r = o && o.filter(function(o) {
                    return o.skuId == t.skuCode;
                });
                r && r[0] && r[0].promotion.push(Object.assign({}, e, {
                    promoQuantity: t.promoQuantity
                }));
            }), i.push(e), t.effectiveFlag && -1 == a.indexOf(t.activityCode) ? u.push(e) : n.push(e);
        }), {
            promotion: i,
            ablePromotion: u,
            disablePromotion: n
        };
    }
};

exports.default = {
    formatCartData: function(o, e) {
        if (!o) return null;
        var r = {};
        r.productAmount = o.productAmount || 0, r.couponAmount = o.coupon || 0, r.discountAmount = o.discount || 0, 
        r.totalAmount = o.amount || 0, r.ableItems = t.formatCartList(o.ableCartItems || [], e), 
        r.disableItems = t.formatCartList(o.disableCartItems || [], e), r.selectedCount = r.ableItems.filter(function(t) {
            return "1" == t.selectStatus;
        }).length, r.promotion = null, r.ablePromotion = null, r.disablePromotion = null;
        var a = t.formatPromotionData(o.shoppingCartOuts, r.ableItems, e);
        return a && (r.promotion = a.promotion, r.ablePromotion = a.ablePromotion, r.disablePromotion = a.disablePromotion), 
        r;
    },
    formatProductPromotion: function(o) {
        return t.formatPromotionData(o) || null;
    }
};
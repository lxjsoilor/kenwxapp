exports.__esModule = !0;

var e = {
    format_gift_items: function(e, t, r) {
        var o = this, n = [], a = t;
        return e.forEach(function(e) {
            e.gifts.forEach(function(t) {
                a++;
                var i = t.channelCode, u = t.storeCode, c = t.skuNum, l = t.cartProductItem, s = o.formatCartLine(l, a, c, Object.assign(r, {
                    channelCode: i,
                    storeCode: u
                }), e.activityCode);
                n.push(s);
            });
        }), n;
    },
    formatItemLinesReq: function(e, t) {
        var r = this, o = [], n = 0;
        return e.forEach(function(e) {
            n++;
            var a = r.formatCartLine(e, n, e.quantity, t);
            o.push(a);
        }), o;
    },
    formatCartLine: function(e, t, r, o, n) {
        var a = o.channelCode, i = o.storeCode, u = o.customReqDescFormat, c = o.cartLineFormat, l = o.giftNumChange, s = null, d = [], m = [], f = [];
        e.skuAttrSaleList.forEach(function(e) {
            d.push(e.attributeValueFrontName);
        }), e.skuCategoryList.length > 0 && e.skuCategoryList.forEach(function(e) {
            m.push(e.categoryPath), f.push(e.categoryName);
        }), e.labelList && e.labelList.length && (s = e.labelList.map(function(e) {
            return {
                tagCode: e.labelCode,
                tagValue: e.labelName
            };
        }));
        var p = {
            channelCode: a,
            storeCode: i,
            activityCode: n || null,
            attribute: d.join(","),
            brandCode: e.brandCode,
            brandName: e.brandName,
            categoryCode: m.join(","),
            categoryName: f.join(","),
            count: r,
            groupId: null,
            image: e.skuPicURL ? e.skuPicURL : null,
            isGift: n ? "1" : "0",
            lineCode: t,
            mainSkuId: e.skuCode,
            marketPrcie: e.skuListPrice || 0,
            omsCode: e.extentionCode,
            returnType: "11",
            sellPrice: e.skuSalePrice || 0,
            promoPrice: e.skuPromoPrice || 0,
            skuId: e.skuCode,
            skuName: e.spuTitle,
            spuCode: e.spuCode,
            productTags: s,
            tax: 0,
            model: null
        };
        return l && l.forEach(function(e) {
            e.skuId && e.count && p.skuId == e.skuId && (p.count = e.count);
        }), u && (p.customReqDesc = u(p, e) || ""), c && (p = c(p, e) || p), p;
    }
};

exports.default = {
    formatRecalcRes: function(e, t, r, o) {
        var n = e.data, a = n.amount, i = n.coupon, u = n.discount, c = n.productAmount, l = n.shoppingCartOuts, s = t, d = null, m = [], f = [], p = 0;
        !!l && !!l.length && l.filter(function(e) {
            return (!e.gifts || e.gifts.filter(function(e) {
                return e.cartProductItem;
            }).length) && e.effectiveFlag && -1 == o.indexOf(e.activityCode);
        }).forEach(function(e) {
            switch (e.activityType) {
              case "01":
                var t = e.activityCode, r = e.activityName, o = e.activityType;
                m.push({
                    activityCode: t,
                    activityName: r,
                    activityType: o,
                    activityTypeId: e.rewardType,
                    price: e.promoRewardAmount
                }), "06" == e.rewardType && e.gifts && (d || (d = []), d.push(e));
                break;

              case "02":
                var n = e.couponCode;
                f.push({
                    deductionId: n,
                    deductionType: "11",
                    deductionAmount: e.promoRewardAmount
                }), "06" == e.rewardType && e.gifts && (d || (d = []), d.push(e));
            }
            "05" == e.rewardType && (s = 0, p = 1);
        });
        var y = {
            orderActivityinfoInList: m,
            orderDeductioninfoInList: f,
            coupon: i,
            discount: u,
            amount: a,
            productAmount: c
        }, g = {
            freight: s,
            freePostage: p,
            amount: c,
            payment: a + s,
            promoRewardAmount: i + u,
            coupon: i,
            discount: u,
            giftActivityList: d
        };
        return r && r(y, g, {
            recalc_res: e,
            _freight: t,
            freight: s
        }), {
            orderReq: y,
            orderInfo: g
        };
    },
    format_create_order_req: function(t, r, o) {
        var n = o.channelCode, a = o.storeCode, i = o.externalOrderId, u = o.exchangeRate, c = t.state, l = c.freight, s = c.freePostage, d = c.invoice, m = c.address, f = c.req, p = c.giftActivityList, y = c.gift, g = c.needInvoice;
        f.order_create.orderProductInList = e.formatItemLinesReq(t.state.orderSettle.ableCartItems, o);
        var C = null;
        "71" != f.orderType && (C = {
            name: m.userName || null,
            familyName: m.familyName || null,
            givenName: m.givenName || null,
            mobile: m.telNumber || null,
            province: m.provinceName || null,
            provinceName: m.provinceNameText || null,
            city: m.cityName || null,
            cityName: m.cityNameText || null,
            district: m.countyName || null,
            districtName: m.countyNameText || null,
            address: m.detailInfo || null,
            country: m.country || null,
            countryName: m.countryName || null,
            logisticsCompanyCode: m.logisticsCompanyCode || null,
            mail: m.mail || null,
            telephone: m.telephone || null,
            transportMethod: m.transportMethod || null,
            zipCode: m.zipCode || null
        }), console.log("地址信息------------------------\x3e", C);
        var h = null;
        d && delete (h = Object.assign({}, d)).type, console.log("发票信息------------------------\x3e", d);
        var v = null;
        p && (v = e.format_gift_items(p, f.order_create.orderProductInList.length, o)), 
        console.log("赠品数据------------------------\x3e", v), v && (f.order_create.orderProductInList = f.order_create.orderProductInList.concat(v));
        var I = t.store.pay, N = I.payment, L = I.terminal, b = {
            account: r,
            channelCode: n || t.store.pay.channelCode,
            storeCode: a || null,
            giftCard: 0,
            orderType: f.orderType,
            payment: N,
            tax: 0,
            terminal: L,
            user: null,
            userId: null,
            wishCard: y.wishCard,
            freePostage: s,
            freight: l,
            isInvoice: g ? 1 : 0,
            orderInvoiceIn: h,
            orderReceiptInfoIn: C
        };
        return i && Object.assign(b, {
            externalOrderId: i
        }), u && Object.assign(b, {
            exchangeRate: u
        }), Object.assign({}, f.order_create, b);
    }
};
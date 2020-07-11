exports.__esModule = !0;

var e = {
    21: {
        hasPayBtn: !0,
        hasCancelBtn: !0,
        hasLogInfo: !1
    },
    31: {
        hasPayBtn: !1,
        hasCancelBtn: !1,
        hasLogInfo: !1
    },
    41: {
        hasPayBtn: !1,
        hasCancelBtn: !1,
        hasLogInfo: !0
    },
    51: {
        hasPayBtn: !1,
        hasCancelBtn: !1,
        hasLogInfo: !0
    },
    61: {
        hasPayBtn: !1,
        hasCancelBtn: !1,
        hasLogInfo: !0
    },
    71: {
        hasPayBtn: !1,
        hasCancelBtn: !1,
        hasLogInfo: !1
    },
    72: {
        hasPayBtn: !1,
        hasCancelBtn: !1,
        hasLogInfo: !1
    }
}, t = {
    format_D_H_M_S: function(e, t) {
        var a = "day" === (t = t || "day") ? parseInt(e / 86400) : void 0, o = e - 86400 * (a || 0), r = "day" === t ? parseInt(o / 3600) : parseInt(e / 3600), n = parseInt(o % 3600 / 60), i = parseInt(o % 60);
        return "day" === t ? {
            d: a,
            h: r,
            m: n,
            s: i
        } : {
            h: r,
            m: n,
            s: i
        };
    },
    formatProduct: function(e) {
        return {
            activityId: e.activityId,
            id: e.id,
            groupId: e.groupId,
            image: e.image,
            amount: e.amount,
            brandName: e.brandName,
            listPrice: e.tagPrice,
            salePrice: e.sellPrice,
            marketPrice: e.marketPrice,
            count: e.count,
            attribute: e.attribute,
            skuId: e.skuId,
            skuName: e.skuName,
            spuCode: e.spuCode,
            customReqImage: e.customReqImage,
            isGift: e.isGift,
            returnableCount: e.returnableCount,
            model: e.model || "",
            customReqDesc: e.customReqDesc || ""
        };
    },
    formatAddress: function(e) {
        var t = {};
        return t.province = e.province, t.provinceName = e.provinceName, t.city = e.city, 
        t.cityName = e.cityName, t.district = e.district, t.districtName = e.districtName, 
        t.country = e.country, t.countryName = e.countryName, t.address = e.address, t.name = e.name, 
        t.mobile = e.mobile, t.telephone = e.telephone, t.mail = e.mail, t.familyName = e.familyName, 
        t.givenName = e.givenName, t.logisticsCompanyCode = e.logisticsCompanyCode, t.zipCode = e.zipCode, 
        t;
    },
    formatInvoice: function(e) {
        var t = {};
        return t.address = e.address, t.bank = e.bank, t.bankAccount = e.bankAccount, t.company = e.company, 
        t.companyAddress = e.companyAddress, t.content = e.content, t.invoiceDate = e.invoiceDate, 
        t.invoiceId = e.invoiceId, t.invoiceType = e.invoiceType, t.invoiceUrl = e.invoiceUrl, 
        t.isPersonInVoice = e.isPersonInVoice, t.mail = e.mail, t.mobile = e.mobile, t.mode = e.mode, 
        t.name = e.name, t.taxCode = e.taxCode, t.telephone = e.telephone, t.tenantCode = e.tenantCode, 
        t.title = e.tittle, t;
    },
    formatPromotion: function(e) {
        var t = [];
        return e && e.forEach(function(e) {
            t.push({
                activityId: e.activityId,
                activityName: e.activityName,
                activityType: e.activityType,
                activityTypeId: e.activityTypeId,
                price: e.price
            });
        }), t;
    }
};

exports.default = {
    formatOrderLine: function(a) {
        return a.map(function(a) {
            var o = {};
            o.cancelCode = a.cancelCode, o.storeCode = a.storeCode, o.id = a.orderId, o.amount = a.amount, 
            o.status = a.orderStatus, o.productNum = a.porductNum, o.createTime = a.orderDate, 
            o.scheduleCancelTime = a.scheduleCancelTime, o.ordertype = a.orderType, o.isGift = 71 == a.orderType, 
            o.payDate = a.payDate, o.hasReceiptInfo = a.hasReceiptInfo || null, o.hasReturnOrder = a.hasReturnOrder || null, 
            o.sign = a.sign, o.orderStatusChangeOut = a.orderStatusChangeOut;
            var r = [];
            a.orderPorductOutList && a.orderPorductOutList.forEach(function(e) {
                r.push(t.formatProduct(e));
            });
            var n = {};
            return n.giftList = r.filter(function(e) {
                return 1 == e.isGift;
            }), o.giftInfo = {}, o.giftInfo.giftData = n, o.productList = r, Object.assign(o, e[a.orderStatus]), 
            o;
        });
    },
    formatOrderDetail: function(a) {
        var o = {};
        o.cancelCode = a.cancelCode, o.storeCode = a.storeCode, o.id = a.orderId, o.amount = a.amount, 
        o.discount = a.discount, o.receivedAmount = a.receivedAmount, o.status = a.orderStatus, 
        o.cancelRemark = a.cancelRemark, o.createTime = a.orderDate, o.scheduleCancelTime = a.scheduleCancelTime;
        var r = (new Date(o.scheduleCancelTime.replace(/-/g, "/")).getTime() - Date.now()) / 1e3, n = t.format_D_H_M_S(r), i = n.day, c = n.h, d = n.m;
        o.countDownStr = (i > 0 ? i + "天" : "") + (i > 0 || c > 0 ? c + "时" : "") + (i > 0 || c > 0 || d > 0 ? d + "分" : "1分");
        var s = [];
        a.orderPorductOutList.forEach(function(e) {
            s.push(t.formatProduct(e));
        }), o.productList = s, o.freightPrice = a.freight, o.productAmount = a.productAmount, 
        o.ordertype = a.ordertype, o.isGift = 71 == a.ordertype, o.address = t.formatAddress(a.orderReceiptInfoOut), 
        o.invoice = t.formatInvoice(a.orderOpenInvoiceOut), o.promotion = a.orderActivityinfoOutList, 
        o.payDate = a.payDate;
        var u = 0;
        return a.orderDeductioninfoOutList && a.orderDeductioninfoOutList.length > 0 && a.orderDeductioninfoOutList.forEach(function(e) {
            u += e.deductionAmount;
        }), o.deductionAmount = u, o.deductionList = a.orderDeductioninfoOutList, o.accountId = a.accountId, 
        o.wishCard = a.wishCard, o.expressMap = a.expressMap, Object.assign(o, e[a.orderStatus]), 
        o;
    }
};
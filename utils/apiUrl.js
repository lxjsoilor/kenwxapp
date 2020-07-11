function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t, a = {
    NODE_ENV: '"Pro development"',
    BASEURL: "https://we.baozun.com",
    CasabaHeader: "http://rothy.Casaba.com",
    tenantCode: "88000057",
    appcode: "f3b5c919eedd11e89de9005056a086ec",
    activityCode: "2018113012525655",
    groupBuyCode: "69187436db8f42f08a8b28ba79206214",
    cmsModel: ""
};

module.exports = (t = {
    BASEURL: a.BASEURL,
    GQLUEL: a.GQLUEL,
    poxUrl: a.poxUrl,
    CasabaHeader: a.CasabaHeader,
    tenantCode: a.tenantCode,
    appcode: a.appcode,
    cmsModel: a.cmsModel
}, e(t, "cmsModel", a.cmsModel), e(t, "activityCode", a.activityCode), e(t, "groupBuyCode", a.groupBuyCode), 
e(t, "getToken", a.BASEURL + "/casaba-plus/member/account/third/validate.do"), e(t, "getFreight", a.BASEURL + "/unex-basic/postage/queryFullPostage"), 
e(t, "basic", {
    queryStoreList: a.BASEURL + "/casaba-plus/basic/store/query.do"
}), e(t, "member", {
    getOpenId: a.BASEURL + "/service-wechat/wechat/user/login",
    getUserInfo: a.BASEURL + "/service-wechat/wechat/user/info",
    getUserMobile: a.BASEURL + "/service-wechat/wechat/user/getPhone",
    findUserInfo: a.BASEURL + "/casaba-plus/member/account/info/find.do",
    findUserInfore: a.BASEURL + "/member/account/by/user/code/find",
    findBaseInfo: a.BASEURL + "/casaba-plus/member/account/find.do",
    casabaUpdateUserInfo: a.BASEURL + "/casaba-plus/member/account/info/update.do",
    updateThirdUserInfo: a.BASEURL + "/casaba-plus/member/account/third/code/update.do",
    updateUserInfo: a.BASEURL + "/member/mall/account/info/update",
    create: a.BASEURL + "/member/account/create",
    find: a.BASEURL + "/member/mall/account/find"
}), e(t, "testQR", a.BASEURL + "/wechat/ma/getwxacode"), e(t, "QR", "https://we.baozun.com/wechat/ma/getwxacodeunlimit"), 
e(t, "cms", {
    cmsUrl: a.BASEURL + "/cms/web/engine/loadViewData",
    cmstree: a.BASEURL + "/cms/web/cms/menu/queryTrees",
    cmsMenuTree: a.BASEURL + "/casaba-plus/cms/web/menu/queryMenuTrees.do",
    queryDocListByMenu: a.BASEURL + "/casaba-plus/web/menu/queryDocListByMenu.do",
    queryDocList: a.BASEURL + "/casaba-plus/cms/web/menu/queryDoclistByMenuCode.do"
}), e(t, "search", {}), e(t, "product", {
    getItemBySpucode: a.BASEURL + "/pim/solr/item/getItemDetailV1",
    getItemBySpuList: a.BASEURL + "/pim/solr/item/getItemListbySpuCodeListV1",
    getItemListbyConditions: a.BASEURL + "/pim/solr/item/getItemListbyConditionsV1",
    getItemListbyConditions1: a.BASEURL + "/casaba-plus/product/get/item/list/by/conditions.do",
    getAttrList: a.BASEURL + "/pim/solr/attribute/getList",
    inventoryBySku: a.BASEURL + "/pim/inventory/query/list/sku-info",
    getConditions: a.BASEURL + "/casaba-plus/product/item/attribute/listByConditions.do"
}), e(t, "shopCart", {
    shopCarQuery: a.BASEURL + "/casaba-plus/order/check/promotion",
    shopCartList: a.BASEURL + "/casaba-plus/shoppingCart/queryShoppingCart",
    addGoods: a.BASEURL + "/casaba-plus/shoppingCart/addProduct",
    changeAmount: a.BASEURL + "/casaba-plus/shoppingCart/updateProductCount",
    changeSelect: a.BASEURL + "/casaba-plus/shoppingCart/updateSelect",
    delGoods: a.BASEURL + "/casaba-plus/shoppingCart/deleteProduct",
    settle: a.BASEURL + "/casaba-plus/shoppingCart/settle"
}), e(t, "shopList", {
    addList: a.BASEURL + "/add/shopping/list",
    deleteList: a.BASEURL + "/delete/shopping/list",
    addOrder: a.BASEURL + "/add/order/shopping/list"
}), e(t, "order", {
    orderSettle: a.BASEURL + "/casaba-plus/shoppingCart/orderSettle",
    queryReturnGift: a.BASEURL + "/casaba-plus/return-order/query/list/byOrderId.do",
    cancelGiftOrder: a.BASEURL + "/businesslayer/orderIntegration/cancelGiftOrder",
    createOrder: a.BASEURL + "/casaba-plus/trade/createOrder",
    orderList: a.BASEURL + "/unex-order/orderopen/we-extend/queryOrder",
    orderDetail: a.BASEURL + "/unex-order/orderopen/queryOrderOpenDetail",
    getAutoCancelSet: a.BASEURL + "/unex-order/orderAutoSet/getAutoCancelSet",
    cancelOrder: a.BASEURL + "/casaba-plus/trade/cancelOrder",
    payOrder: a.BASEURL + "/casaba-plus/trade/payOrder",
    checkIsTeam: a.BASEURL + "/service-wechat/wechat/pintuan/team/order/queryByOrderCodes",
    groupDetail: a.BASEURL + "/service-wechat/wechat/pintuan/team/detail",
    loadInvoice: a.BASEURL + "/invoice/url",
    logistics: a.BASEURL + "/hub/logistics"
}), e(t, "coupons", {
    activityDetail: a.BASEURL + "/casaba-plus/coupon/v1/query/coupon/activity/detail.do",
    create: a.BASEURL + "/casaba-plus/coupon/v1/send/coupon/to/user.do",
    query: a.BASEURL + "/casaba-plus/coupon/v1/query/coupons/by/user.do",
    filter: a.BASEURL + "/casaba-plus/coupon/v1/filter/useable/coupons.do"
}), e(t, "matemplate", {
    getStatus: a.BASEURL + "/service-wechat/wechat/matemplate/subscribe/getStatus",
    create: a.BASEURL + "/service-wechat/wechat/matemplate/msg/create",
    postFormId: a.BASEURL + "/service-wechat/wechat/matemplate/formid/create",
    getCurrentTime: a.BASEURL + "/common/system/getCurrentTime",
    subscribe: a.BASEURL + "/service-wechat/wechat/matemplate/subscribe/saveRecord"
}), e(t, "invoice", {
    getInvoice: a.BASEURL + "/invoice/url",
    newInvoice: a.BASEURL + "/invoice/reapply"
}), e(t, "cpsTrack", a.BASEURL + "/cps/tracking/order"), e(t, "gql", {
    server: "" + a.pinServer
}), e(t, "team", {
    add: a.BASEURL + "/service-wechat/wechat/pintuan/team/add",
    updatePinTuanStatus: a.BASEURL + "/service-wechat/wechat/pintuan/team/updatePinTuanStatus",
    detail: a.BASEURL + "/service-wechat/wechat/pintuan/team/detail"
}), e(t, "gift", {
    giftLocation: a.BASEURL + "/unex-order/orderopen/fillInReceipt",
    sign: a.BASEURL + "/common/getSign"
}), e(t, "like", {
    doActivity: a.BASEURL + "/service-wechat/we/log/doActivity",
    cancel: a.BASEURL + "/service-wechat/we/log/doCancel",
    query: a.BASEURL + "/service-wechat/we/log/batchQuery"
}), e(t, "questionnaire", {
    query: a.BASEURL + "/questionnaire/memberAnswerRecord",
    submit: a.BASEURL + "/questionnaire/answer"
}), e(t, "vote", {
    submitVote: a.BASEURL + "/service-wechat/we/log/batchVote",
    getVoteStatistics: a.BASEURL + "/service-wechat/we/log/batchQuery"
}), t);
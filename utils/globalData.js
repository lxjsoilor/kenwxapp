var e = require("./apiUrl"), o = wx.getSystemInfoSync();

console.log("系统信息------", o);

var t = !(!o || -1 === o.model.indexOf("iPhone X") && -1 === o.model.indexOf("iPhone11")), a = !(!o || -1 === o.model.indexOf("iPhone") && -1 === o.model.indexOf("iPhone11")), n = !(!o || -1 === o.model.indexOf("HUAWEI NXT") && -1 === o.model.indexOf("HUAWEI MHA"));

module.exports = {
    modelCode: "XCX",
    userInfo: null,
    appCode: e.appcode,
    tenantCode: e.tenantCode,
    cmsModel: e.cmsModel,
    mobile: "",
    tenantUrl: e.CasabaHeader,
    activityCode: e.activityCode,
    accountId: null,
    account: null,
    proxIsUse: !0,
    searchValue: "",
    searchHotWords: [],
    brandTittle: "Rothy's",
    invoice: {
        content: "Rothy's 商品",
        invoiceType: "31"
    },
    address: {
        countryName: "中国",
        nationalCode: null
    },
    couponMoney: 100,
    tabBar: {
        list: [ {
            icon: [ "icon-tabBar_home", "icon-tabBar_home" ],
            text: "首页",
            link_type: "switchTab",
            path: "pages/index/index"
        }, {
            icon: [ "icon-tabBar_allproducts", "icon-tabBar_allproducts" ],
            text: "商品",
            link_type: "switchTab",
            path: "pages/plp/plp"
        }, {
            icon: [ "icon-tabBar_liked", "icon-tabBar_liked" ],
            text: "晒单",
            link_type: "switchTab",
            path: "pages/orderShare/orderShare"
        }, {
            icon: [ "icon-tabBar_cart", "icon-tabBar_cart" ],
            subIcon: [ "icon-tabBar_cart1", "icon-tabBar_cart1" ],
            text: "购物袋",
            link_type: "switchTab",
            path: "pages/shoppingCart/shoppingCart"
        }, {
            icon: [ "icon-tabBar_myaccount", "icon-tabBar_myaccount" ],
            text: "个人中心",
            link_type: "switchTab",
            path: "pages/myAccount/myAccount"
        } ],
        position: "bottom"
    },
    calcuNumber: 5,
    pageLife: 3e5,
    authToken: null,
    CASABA_TOKEN: null,
    bundleConfig: null,
    authorization: !1,
    state: {
        binding: {
            getSmsCode: !1
        }
    },
    isIPX: t,
    isIPhone: a,
    isHuaweiMate: n,
    bOrderStatusChange: !1,
    systemInfo: o,
    cartNum: 0,
    networkConnected: !0,
    errorPageShow: !1,
    imgUrl: {
        accountBg: "https://uxresources.baozun.com/uat/88000633/20190515/7D7124EE9DD8F7C973BC48C07B9EE802.jpg",
        failed: "https://uxresources.baozun.com/prod/88000057/png/20181127/5db84d87bc6b408fa54d965acef55b61.png",
        success: "https://uxresources.baozun.com/prod/88000057/jpg/20181227/459f78e95e7540fda2401916dcca8771.jpg",
        gift: "https://uxresources.baozun.com/prod/88000057/png/20181127/a73242b2cfdb447796fafa708dad3da4.png",
        getGiftBg: "https://uxresources.baozun.com/prod/88000057/png/20181127/efbfa1bb381b4908bfab1840e62f91c1.png?x-oss-process=image/resize,w_124,h_124&t=1544771146741",
        getGiftBgTwo: "https://uxresources.baozun.com/prod/88000057/png/20181127/571b1c7b583d449fb79f76ca52ed8e60.png",
        giftFailed: "https://uxresources.baozun.com/prod/88000057/png/20181127/e7d3836763854fdd93b9bbb8b605609e.png",
        giftSuccess: "https://uxresources.baozun.com/prod/88000057/png/20181127/a34b58a386ef44a2889fc02b4ac03136.png",
        "gift_check-out": "https://uxresources.baozun.com/prod/88000057/png/20181127/368cd08cfef243a6b554526314546a97.png",
        group_buying: "https://uxresources.baozun.com/prod/88000057/20190719/51324250F82BCA11B4C34A2FC573367A.png",
        share_cps: "https://uxresources.baozun.com/prod/88000057/png/20181203/bb557c168cd54dfcbdb11c60915a01fe.png",
        voteSuccessBanner: "https://uxresources.baozun.com/uat/88000633/20190517/E0759AFCE012DBAC19502022C371CE3D.jpg",
        voteShare: "https://uxresources.baozun.com/uat/88000633/20190517/CF1DB8E0B5FE3D82E937B171C01EA7EB.jpg",
        bookSuccessBanner: "https://uxresources.baozun.com/uat/88000633/20190517/347797BDF873073A230ECD474267F081.jpg",
        bookEndBanner: "https://uxresources.baozun.com/uat/88000633/20190517/99CD27EB0E14DD69663245015C2BF7F5.jpg",
        activeBookingImg: "https://uxresources.baozun.com/uat/88000633/20190517/130E61C3A22DE5FEAAA2136C0A21945B.jpg"
    }
};
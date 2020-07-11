exports.__esModule = !0, exports.default = {
    getApi: function(e) {
        var t = e.BASEURL;
        return {
            wechat: {
                loginByOpenId: t + "/we/v4/wxapp/code/login",
                loginByUnionId: t + "/we/v4/wxapp/union/login",
                getOpenId: t + "/service-wechat/wechat/user/login",
                getEncryptedOpenId: t + "/we/v3/wechat/user/login",
                getUserInfo: t + "/service-wechat/wechat/user/info",
                getUserMobile: t + "/service-wechat/wechat/user/getPhone",
                QR: t + "/wechat/ma/getwxacodeunlimit"
            },
            matemplate: {
                getStatus: t + "/service-wechat/wechat/matemplate/subscribe/getStatus",
                create: t + "/service-wechat/wechat/matemplate/msg/create",
                postFormId: t + "/service-wechat/wechat/matemplate/formid/create",
                getCurrentTime: t + "/common/system/getCurrentTime"
            },
            cps: {
                cpsTrack: t + "/cps/tracking/order"
            }
        };
    }
};
var a = getApp();

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        noBack: {
            type: Boolean,
            value: !1
        },
        isHome: {
            type: Boolean,
            value: !1
        },
        title: {
            type: String,
            value: ""
        },
        isSearch: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    created: function() {},
    attached: function() {
        getCurrentPages();
        var e = a.globalData.systemInfo.statusBarHeight, t = a.globalData.isIPhone;
        console.log("isIPhone-----------------------\x3e", t);
        var o = t ? 44 : 48;
        this.setData({
            header_height: o,
            statusBarHeight: e
        });
    },
    methods: {
        _page_go_back: function() {
            a.globalData.errorPageShow && (a.globalData.errorPageShow = !1), wx.navigateBack();
        },
        _page_go_home: function() {
            a.switchTab(this, {
                url: "/pages/index/index"
            }), a.globalData.spellteamId = "";
        },
        _page_go_search: function() {
            a.navigateTo(this, {
                url: "/pages/search/search"
            });
        }
    }
});
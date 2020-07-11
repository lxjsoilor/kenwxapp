var t = getApp();

Component({
    properties: {
        tab: {
            type: String,
            value: "0"
        },
        needAuth: {
            type: Boolean,
            value: !1
        },
        authArr: {
            type: Array,
            value: [ 3, 4 ]
        },
        cartNum: {
            type: Number,
            value: 0
        },
        needCartNum: {
            type: Boolean,
            value: !0
        },
        cartIndex: {
            type: Number,
            value: 3
        }
    },
    data: {},
    created: function() {
        console.log("created---------------------------\x3e");
    },
    ready: function() {},
    attached: function() {
        var e = t.globalData, a = e.tabBar, n = e.isIPX;
        this.setData({
            tabBar: a,
            isIPX: n
        }), this.data.needAuth && this.set_auth_by_local();
    },
    methods: {
        _on_getUserInfo: function(e) {
            if (console.log("_on_getuserinfo---------------------------------\x3e", e), e.detail.errMsg.indexOf("fail") > -1) return !1;
            t.globalData.isMember = !0, this.setData({
                auth: !0
            }), t.authorize.updateUnionId(e, t, e.currentTarget.dataset.index), this._on_tab(e);
        },
        _on_tab: function(e) {
            var a = e.currentTarget.dataset, n = a.index, o = a.link_type, r = t.globalData.tabBar.list, i = this.data.tab;
            console.log("index--------------------------\x3e", n, i), n != i && this.page_go(o, r[n].path);
        },
        page_go: function(e, a) {
            t[e](this, {
                url: "/" + a
            });
        },
        set_auth_by_local: function() {
            var t = this;
            wx.getSetting({
                success: function(e) {
                    t.setData({
                        auth: !!e.authSetting["scope.userInfo"]
                    });
                }
            });
        },
        set_auth_by_server: function() {
            var e = this;
            t.promise.login.then(function(a) {
                e.setData({
                    auth: !!t.globalData.isMember
                });
            });
        }
    }
});
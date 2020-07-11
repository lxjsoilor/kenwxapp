Component({
    externalClasses: !0,
    properties: {
        title: {
            type: String,
            value: ""
        },
        btn: {
            type: String,
            value: ""
        },
        icon: {
            type: String,
            value: ""
        }
    },
    data: {},
    attached: function() {},
    methods: {
        go_to_home_page: function(t) {
            wx.switchTab({
                url: "/pages/index/index"
            });
        },
        btn_on_tap: function(t) {
            this.triggerEvent("refresh", {});
        }
    }
});
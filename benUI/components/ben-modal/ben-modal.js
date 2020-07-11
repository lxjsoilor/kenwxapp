Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        open: {
            type: Boolean,
            value: !1,
            observer: function(t, a) {
                t && this.data.toast && this._showToast();
            }
        },
        custom: {
            type: Boolean,
            value: !1
        },
        toast: {
            type: Boolean,
            value: !1
        },
        maskClose: {
            type: Boolean,
            value: !1
        },
        closeBtn: {
            type: Boolean,
            value: !0
        },
        mask: {
            type: Boolean,
            value: !0
        },
        title: {
            type: String,
            value: ""
        },
        width: {
            type: Number,
            value: 538
        },
        top: {
            type: String,
            value: "44%"
        },
        duration: {
            type: Number,
            value: 3
        },
        btnText: {
            type: Array,
            value: []
        }
    },
    data: {
        animation: "display: none;"
    },
    ready: function() {},
    methods: {
        _closeModal: function(t) {
            this.setData({
                open: !1
            });
        },
        _touchDialog: function(t) {},
        _showToast: function() {
            var t = this, a = "animation: ben-toasting linear " + this.data.duration + "s; animation-fill-mode:forwards;";
            this.setData({
                animation: a
            });
            var e = setTimeout(function(a) {
                t.setData({
                    animation: "display: none;",
                    open: !1
                }), clearTimeout(e);
            }, 1e3 * this.data.duration);
        },
        _onTapCancel: function(t) {
            var a = this;
            console.log("_onTapCancel--------------\x3e"), this.data.custom || this.setData({
                open: !1
            }), this.triggerEvent("onCancel", function(t) {
                a._closeModal();
            });
        },
        _onTapEnsure: function(t) {
            var a = this;
            console.log("_onTapEnsure--------------\x3e"), this.data.custom || this.setData({
                open: !1
            }), this.triggerEvent("onEnsure", function(t) {
                a.setData({
                    open: !1
                });
            });
        }
    }
});
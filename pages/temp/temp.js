var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
    }
    return e;
}, t = getApp();

Page(e({
    data: {
        mobile: {
            name: "mobile",
            value: "",
            rule: "required|mobile",
            maxlength: 11,
            placeholder: "手机号码",
            state: {
                active: !1,
                onfocus: !1,
                collapse: !1
            },
            valid: "blur",
            validDec: {
                required: "*请输入手机号码",
                mobile: "*手机号码格式错误"
            }
        },
        need_voice: {
            name: "need_voice",
            type: "switch",
            checked: !1,
            text: "是否使用发票"
        },
        region: {
            name: "region",
            type: "picker",
            mode: "region",
            value: "",
            required: !0,
            placeholder: "省份/城市/地区",
            text: ""
        },
        address: {
            name: "address",
            value: "",
            rule: "required|min:4",
            maxlength: -1,
            placeholder: "详细地址",
            state: {
                active: !1,
                onfocus: !1,
                collapse: !1
            },
            valid: "blur",
            validDec: {
                required: "*请输入地址信息",
                min: "*地址信息至少4字节"
            }
        },
        temp_submit: {
            text: "提交",
            state: {
                disabled: !1
            },
            method: {
                submit: "temp_form_submit"
            }
        },
        turntableList: [ {
            name: "1",
            ch: "yi",
            en: "one"
        }, {
            name: "2",
            ch: "yi",
            en: "one"
        }, {
            name: "3",
            ch: "yi",
            en: "one"
        }, {
            name: "4",
            ch: "yi",
            en: "one"
        }, {
            name: "5",
            ch: "yi",
            en: "one"
        }, {
            name: "6",
            ch: "yi",
            en: "one"
        }, {
            name: "7",
            ch: "yi",
            en: "one"
        }, {
            name: "8",
            ch: "yi",
            en: "one"
        }, {
            name: "9",
            ch: "yi",
            en: "one"
        } ]
    }
}, t.BEN.ben_form, {
    region_on_change: function(e) {
        var t, a = this, n = e.detail.value, i = this.data.region, o = (t = {}, t["region.value"] = n, 
        t["region.text"] = n.join(" "), t);
        this.setData(o), i.required && setTimeout(function(e) {
            a._validate(i);
        }, 100);
    },
    temp_form_submit: function(e, t) {
        var a = e.data;
        e.formId;
        console.log("temp_form_submit-------------------------\x3e", t, e), a.region = a.region.split(","), 
        a.province = a.region[0], a.city = a.region[1], a.area = a.region[2], delete a.region, 
        console.log("req-------------------------\x3e", a);
    },
    onLoad: function() {},
    onShow: function() {},
    store: {
        startX: 0,
        endX: 0
    },
    movestart: function(e) {
        this.store.startX = e.changedTouches[0].pageX;
    },
    moveend: function(e) {
        if (this.store.endX = e.changedTouches[0].pageX, this.store.endX - this.store.startX > 20) {
            console.log("向右滑");
            var t = this.data.turntableList.pop();
            console.log("dele_value-------left"), this.data.turntableList.unshift(t), console.log("this.data.turntableList", this.data.turntableList), 
            this.setData({
                turntableList: this.data.turntableList
            });
        } else if (this.store.endX - this.store.startX < -20) {
            console.log("向右滑");
            var a = this.data.turntableList.shift();
            this.data.turntableList.push(a), console.log("this.data.turntableList", this.data.turntableList), 
            this.setData({
                turntableList: this.data.turntableList
            });
        }
    }
}));
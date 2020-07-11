var e = Object.assign || function(e) {
    for (var a = 1; a < arguments.length; a++) {
        var t = arguments[a];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
}, a = getApp();

Page(e({
    data: {
        pageStatus: {
            isIPX: a.globalData.isIPX,
            needRefresh: !0,
            loadStatus: "unloaded",
            error: {
                title: "",
                btn: "",
                method: ""
            }
        },
        userName: {
            id: "userName",
            name: "userName",
            value: "",
            label: "姓名",
            maxlength: 20,
            placeholder: "",
            state: {
                active: !1,
                onfocus: !1,
                collapse: !1
            }
        },
        gender: null,
        birthday: {
            id: "birthday",
            name: "birthday",
            type: "picker",
            mode: "date",
            value: "",
            label: "生日",
            placeholder: "",
            icon: "icon-arrow_down",
            bShowTips: !1,
            tipsTxt: "",
            state: {
                active: !1,
                onfocus: !1,
                collapse: !1
            },
            method: {
                onChange: "_date_picker_on_change"
            }
        },
        userPhoneNumber: {
            id: "userPhoneNumber",
            name: "userPhoneNumber",
            value: "",
            type: "number",
            label: "手机号",
            maxlength: 11,
            placeholder: "",
            state: {
                active: !1,
                onfocus: !1,
                collapse: !1
            },
            method: {
                onInput: "check_phone"
            }
        },
        userEmail: {
            id: "userEmail",
            name: "userEmail",
            value: "",
            label: "邮箱",
            maxlength: 40,
            placeholder: "",
            state: {
                active: !1,
                onfocus: !1,
                collapse: !1
            },
            method: {
                onInput: "check_email"
            }
        },
        phoneFlag: !0,
        emailFlag: !0,
        userInfoSubmit: {
            text: "保存",
            state: {
                disabled: !1
            },
            method: {
                submit: "submitUserInfo"
            }
        }
    },
    store: {
        config: {
            needOnLoad: !0,
            pageLife: a.globalData.pageLife,
            pageLoadedTime: null
        }
    }
}, a.BEN.ben_form, {
    promise: {},
    _date_picker_on_change: function(e) {
        var a, t = e.detail.value;
        this.setData((a = {}, a["birthday.value"] = t, a));
    },
    check_phone: function(e) {
        var a = e.value, t = a.length, n = /^1[345678]\d{9}$/, o = !1;
        if (0 == t) {
            var r;
            this.setData((r = {
                phoneFlag: !0
            }, r["userPhoneNumber.error"] = !1, r));
        } else if (t > 0) if (n.test(a)) {
            var s;
            o = !0, this.setData((s = {
                phoneFlag: o
            }, s["userPhoneNumber.error"] = !1, s));
        } else {
            var i;
            this.setData((i = {
                phoneFlag: o
            }, i["userPhoneNumber.error"] = "手机号输入不正确", i));
        }
    },
    check_email: function(e) {
        var a = e.value, t = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, n = !1;
        if (0 == a.length) {
            var o;
            this.setData((o = {
                emailFlag: !0
            }, o["userEmail.error"] = !1, o));
        }
        if (a.length > 0) if (t.test(a)) {
            var r;
            n = !0, this.setData((r = {
                emailFlag: n
            }, r["userEmail.error"] = !1, r));
        } else {
            var s;
            this.setData((s = {
                emailFlag: n
            }, s["userEmail.error"] = "邮箱输入不正确", s));
        }
    },
    genderChange: function(e) {
        var a = e.currentTarget.dataset.name;
        "Man" === a ? this.setData({
            gender: "01"
        }) : "lady" === a && this.setData({
            gender: "02"
        });
    },
    page_init: function(e) {
        var t = this, n = this, o = wx.getStorageSync("telephone");
        n.findUserInfo().then(function(e) {
            var r;
            console.log("findUserInfo=============>", e);
            var s = e.data, i = s.name, l = s.gender, u = s.telephone, h = s.birthday, c = s.email, d = {
                name: i,
                gender: l,
                telephone: u,
                birthday: h,
                email: c
            };
            a.globalData.centerUserInfo = d;
            var m = new Date();
            m = a.BEN.ben_filter.formatTime(m, "yyyy-mm-dd", "-"), console.log("startDate--------------\x3e", m), 
            n.setData((r = {}, r["userName.value"] = i || "", r.gender = l || "", r["birthday.value"] = h || "", 
            r["birthday.endDate"] = m, r["userPhoneNumber.value"] = u || o, r["userEmail.value"] = c || "", 
            r)), a.page_change_loaded(t);
        }).catch(function(e) {
            a.page_change_error(t);
        });
    },
    onLoad: function(e) {
        this.setData({
            "pageStatus.isIPX": a.globalData.isIPX
        });
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    submitUserInfo: function(e, t, n) {
        console.log(99, e);
        var o = this, r = e.data, s = r.userName, i = r.birthday, l = r.userPhoneNumber, u = r.userEmail, h = o.data, c = h.phoneFlag, d = h.emailFlag, m = this.data.gender;
        if (c) if (d) {
            var g = {
                name: s || "",
                birthday: i,
                telephone: l || "",
                email: u || "",
                gender: m
            };
            a.globalData.centerUserInfo = g, console.log("options--------------\x3e", g), a.POST(a.apiUrl.member.casabaUpdateUserInfo, g).then(function(e) {
                console.log("casabaUpdateUserInfo==================>", e), e.success && wx.showToast({
                    title: "保存成功",
                    icon: "success"
                });
            });
        } else wx.showToast({
            title: "邮箱输入不正确",
            icon: "none"
        }); else wx.showToast({
            title: "手机号输入不正确",
            icon: "none"
        });
    },
    onShow: function() {
        a.page_load(this);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function(e) {},
    findUserInfo: function() {
        return new Promise(function(e, t) {
            a.POST(a.apiUrl.member.findUserInfo).then(function(a) {
                a.success ? e(a) : t(a);
            });
        }).catch(function(e) {
            return reject(e);
        });
    }
}));
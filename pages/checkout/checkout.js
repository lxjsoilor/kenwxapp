var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (e[o] = a[o]);
    }
    return e;
}, t = getApp(), a = t.VICTSTORE, o = {
    couponCheck: function(e, t, a) {
        var o = e.data && e.data.ableCartItems, n = e.data && e.data.shoppingCartOuts;
        if (n && n.length) {
            var c = 0;
            o && o.forEach(function(e) {
                c += e.quantity;
            });
            var r = n.filter(function(e) {
                return "02" == e.activityType && "PR" == e.activityLabel;
            }).length;
            r && c > 1 ? (t = !1, console.log("该优惠券仅限单件商品使用")) : r && "71" == a.state.req.orderType && (t = !1, 
            console.log("该优惠券不支持赠予好友时使用"));
        }
        return t;
    },
    checkCouponError: function(e, a) {
        if (e && e.orderSettle) {
            var o = e.orderSettle, n = o.data && o.data.ableCartItems, c = o.data && o.data.shoppingCartOuts;
            if (c && c.length) {
                var r = 0;
                n && n.forEach(function(e) {
                    r += e.quantity;
                });
                var s = c.filter(function(e) {
                    return "02" == e.activityType && "PR" == e.activityLabel;
                }).length;
                s && r > 1 ? t.BEN.toastMsg("该优惠券仅限单件商品使用") : s && a.store.checkoutData && "gift" == a.store.checkoutData.orderType && t.BEN.toastMsg("该优惠券不支持赠予好友时使用");
            }
        }
    },
    customRecalc: function(e, t, a) {
        var o = a.recalc_res, n = a._freight, c = o.data.shoppingCartOuts;
        c && c.length && c.filter(function(e) {
            return "02" == e.activityType && "PR" == e.activityLabel;
        }).length && (t.freight = n, t.payment = n + e.amount);
        try {
            var r = o.data.ableCartItems;
            r && r.length && r.forEach(function(e) {
                if (e.skuAttrSaleList && e.skuAttrSaleList.filter(function(e) {
                    return "颜色分类" == e.attributeFrontName;
                }).length) {
                    var a = e.skuAttrSaleList.filter(function(e) {
                        return "颜色分类" == e.attributeFrontName;
                    })[0].attributeValueThumbnailURL;
                    a && (console.log(88877, t), t.ableItems.forEach(function(t) {
                        t.skuId == e.skuCode && (t.images = a);
                    }));
                }
            });
        } catch (e) {
            console.log(777, e);
        }
    }
}, n = {
    create: "BgySj2hxVecgMV2sQYajDFY-YwsfCI5H5_Ihyc7WXdQ",
    send: "gD8YuuPNnXtbL6KKpdbRa-wzOFE8i3rFGbUl9QReKGM",
    cancel: "JH98UGMTrD-TRemybnVK38OnaOVRPWIVCclOA1DXJPk",
    spellSuccess: "n-9xXNk9cVM0gO9x7qqTu9sFEvvZFAlgRbdtA8A_wfg",
    spellFailed: "WNo0XuwuFozO6UnQuCmg_HElltaSPBlm9Q5Fuf3UzCk",
    giftSend: "gD8YuuPNnXtbL6KKpdbRa26YNYaW0LIDLYvrrXjhzQY",
    giftCancel: "JH98UGMTrD-TRemybnVK36LOmjeBTrPnrF1BW1keyTs"
};

Page(e({
    data: {
        pageStatus: {
            isIPX: t.globalData.isIPX,
            needRefresh: !0,
            loadStatus: "unloaded",
            error: {
                title: "",
                btn: "",
                method: ""
            }
        },
        invoice: {
            isNeed: !1,
            content: null
        },
        coupon: {
            isNeed: !1,
            content: null
        },
        orderType: "normal",
        checkoutBtnLoading: !1,
        couponMoney: t.globalData.couponMoney,
        giftBg: t.globalData.imgUrl["gift_check-out"],
        noAddress: !0,
        needInvoice: !1,
        couponTypeIndex: 0,
        isAcceptTerm: !0,
        usePersonalInvoice: !0,
        needCoupon: !1,
        couponTitle: "",
        couponCodeError: !1,
        wishCardGroup: [ "愿你成为世界上最幸福的女人，生日快乐，永远美丽。", "我愿陪伴着你一起走过未来的每一段时光。", "愿我真挚的祝福随着我的这份心意来到你的身边，天天快乐！", "祝你新的一年与幸福为伴，与欢笑为友。", "送你一双平安鞋，祝幸福安康。", "祝事业发达再进一步，步步高升。" ],
        wishCardIndex: 0,
        couponTypeTab: [ {
            name: "使用优惠券",
            active: !0
        }, {
            name: "输入优惠码",
            active: !1
        } ],
        consigneeName: {
            id: "consigneeName",
            name: "consigneeName",
            value: "",
            rule: "required",
            label: "",
            valid: "input",
            maxlength: 20,
            placeholder: "收货人姓名",
            state: {
                active: !1,
                onfocus: !1,
                collapse: !1
            }
        },
        consigneePhoneNumber: {
            id: "consigneePhoneNumber",
            name: "consigneePhoneNumber",
            value: "",
            rule: "required|mobile",
            label: "",
            valid: "input",
            maxlength: 11,
            placeholder: "手机号码",
            state: {
                active: !1,
                onfocus: !1,
                collapse: !1
            }
        },
        region: {
            name: "region",
            type: "picker",
            mode: "region",
            value: "",
            required: !0,
            placeholder: "省份/城市/地区",
            text: "",
            icon: "icon-arrow_down"
        },
        detailInfo: {
            id: "detailInfo",
            name: "detailInfo",
            value: "",
            rule: "required",
            label: "",
            valid: "input",
            maxlength: 100,
            placeholder: "详细地址",
            state: {
                active: !1,
                onfocus: !1,
                collapse: !1
            }
        },
        provinceName: {
            value: ""
        },
        cityName: {
            value: ""
        },
        districtName: {
            value: ""
        },
        need_voice: {
            name: "need_voice",
            type: "switch",
            checked: !1,
            text: "",
            method: {
                onChange: "isAgree_on_change"
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
        personal_title: {
            id: "personal_title",
            name: "personal_title",
            value: "个人",
            rule: "required",
            label: "",
            star: "*",
            valid: "input",
            maxlength: 20,
            placeholder: "* 发票抬头",
            state: {
                active: !1,
                onfocus: !1
            },
            method: {
                input: "personal_title_onInput",
                focus: "",
                blur: ""
            }
        },
        company_title: {
            id: "company_title",
            name: "company_title",
            value: "",
            rule: "required",
            label: "",
            star: "*",
            valid: "input",
            maxlength: 50,
            placeholder: "* 发票抬头",
            state: {
                active: !1,
                onfocus: !1
            },
            method: {
                input: "company_title_onInput",
                focus: "",
                blur: ""
            }
        },
        taxCode: {
            id: "taxCode",
            name: "taxCode",
            value: "",
            rule: "required|tax",
            label: "",
            star: "*",
            valid: "input",
            maxlength: 20,
            placeholder: "* 纳税人识别号",
            state: {
                active: !1,
                onfocus: !1
            },
            method: {
                input: "invoice_taxCode_onInput",
                focus: "",
                blur: ""
            }
        },
        wxSaveAddress: {
            text: "保存",
            state: {
                disabled: !1
            },
            method: {
                submit: "addressSave"
            }
        },
        wxCheckout: {
            text: "微信支付",
            state: {
                disabled: !1
            },
            method: {
                submit: "checkoutaByWx"
            }
        }
    },
    store: {
        config: {
            needOnLoad: !1,
            pageLife: t.globalData.pageLife,
            pageLoadedTime: null
        },
        docs: require("./docs.js"),
        promise: {},
        wishCard: null,
        checkedCoupon: {
            code: null
        },
        couponList: {
            list: [],
            checked: null
        },
        codeInput: "",
        form: null
    },
    promise: {}
}, t.BEN.ben_form, {
    temp_form_submit: function(e, t) {
        e.data, e.formId;
        console.log("temp_form_submit-------------------------\x3e", t, e);
    },
    page_init: function(e) {
        var a = this;
        this.getCheckoutNoteWithCMS(), this.go_to_my_coupon(!0, !0).then(function(e) {
            a.checkoutModel.recalc({
                customRecalc: o.customRecalc,
                cartLineFormat: t.cartLineFormat
            }).then(function(e) {
                console.log(7878787, e), e && a.recalcSetData(e, "changeLoaded");
            }).catch(function(e) {
                t.page_change_error(a);
            });
        }).catch(function(e) {
            console.log(e), a.checkoutModel.recalc({
                customRecalc: o.customRecalc,
                cartLineFormat: t.cartLineFormat
            }).then(function(e) {
                e && a.recalcSetData(e, "changeLoaded");
            }).catch(function(e) {
                t.page_change_error(a);
            });
        });
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    onLoad: function(o) {
        (o = o || "") && (this.store.form = o.form || null), t.mta.Page.init();
        var n = t.globalData.systemInfo.statusBarHeight, c = t.globalData.isIPhone ? 44 : 48;
        this.setData({
            "pageStatus.isIPX": t.globalData.isIPX,
            header_height: c,
            statusBarHeight: n
        }), this.checkoutModel = a.use("checkout"), this.wechatModel = a.use("wechat");
        var r = getCurrentPages(), s = r[r.length - 2];
        if (s && s.store.checkoutData) {
            this.data.orderType = s.store.checkoutData.orderType, this.store.from = s.store.checkoutData.from, 
            this.store.checkoutData = Object.assign({}, s.store.checkoutData);
            var i = this.store.checkoutData;
            "spell" == i.orderType && (i.orderType = "11");
            var u = i.cartData.ableItems;
            u && u.forEach(function(e) {
                e.salesProps.forEach(function(t) {
                    "尺码" == t.groupName ? e.size = t.propName : "颜色分类" == t.groupName && (e.series = t.propName);
                });
            }), this.checkoutModel.init(e({}, i)), "gift" == this.data.orderType && (this.store.wishCard = this.data.wishCardGroup[this.data.wishCardIndex]);
        }
        this.store.trackingCode = wx.getStorageSync("trackingCode");
    },
    onShow: function() {
        if (t.page_load(this), wx.getStorageSync("address")) {
            var e = wx.getStorageSync("address");
            this.setData({
                "consigneeName.value": e.userName,
                "consigneePhoneNumber.value": e.telNumber,
                "region.value": [ e.provinceName, e.cityName, e.countyName ],
                "region.text": e.provinceName + " " + e.cityName + " " + e.countyName,
                "provinceName.value": e.provinceName,
                "cityName.value": e.cityName,
                "districtName.value": e.countyName,
                "detailInfo.value": e.detailInfo,
                noAddress: !1,
                showForm: !1,
                showAddress: !0
            }), this.checkoutModel.setAddress({
                address: e
            });
        }
    },
    getCheckoutNoteWithCMS: function() {
        var e = this, a = {
            tenantCode: t.globalData.tenantCode,
            modelCode: "xcx",
            smodelCode: "checkoutNote",
            browseEnv: "PC"
        };
        t.POST(t.apiUrl.cms.cmsUrl, a).then(function(t) {
            if (t && t.data && t.data.dynamic) {
                var a = (t.data.dynamic[0].value || {}).textarea || "";
                e.setData({
                    checkoutNote: a
                });
            }
        }).catch(function(e) {
            console.log("getCheckoutNoteWithCMS-----catch-----", e);
        });
    },
    recalcSetData: function(e, a) {
        console.log("recalc------------------------------\x3e", e);
        var o = e.ableItems, n = e.ablePromotion, c = e.amount, r = e.coupon, s = e.discount, i = e.freight, u = e.payment, d = e.promoRewardAmount, l = 0;
        o.forEach(function(e) {
            return l += e.buyCount;
        });
        var h = this.store.docs, p = {
            ableItems: o,
            ablePromotion: n,
            goodsCount: l,
            amount: c,
            coupon: r,
            discount: s,
            freight: i,
            payment: u,
            promoRewardAmount: d,
            privacy_policy: h.privacy_policy,
            sales_conditions: h.sales_conditions,
            orderType: this.data.orderType
        };
        "changeLoaded" == a ? t.page_change_loaded(this, p) : this.setData(p);
    },
    toggleTermStatus: function() {
        this.setData({
            isAcceptTerm: !this.data.isAcceptTerm
        });
    },
    changeWords: function() {
        var e = this.data.wishCardGroup;
        this.data.wishCardIndex < e.length - 1 ? this.setData({
            wishCardIndex: this.data.wishCardIndex + 1
        }) : this.setData({
            wishCardIndex: 0
        }), this.store.wishCard = this.data.wishCardGroup[this.data.wishCardIndex];
    },
    changeCouponTypeTab: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.couponTypeTab;
        a[t].active || (a.forEach(function(e) {
            e.active = !1;
        }), a[t].active = !0, this.setData({
            couponTypeTab: a,
            couponTypeIndex: t
        }));
    },
    swiperCouponType: function(e) {
        console.log(e);
        var t = e.detail.current, a = this.data.couponTypeTab;
        a.forEach(function(e) {
            e.active = !1;
        }), a[t].active = !0, this.setData({
            couponTypeTab: a
        });
    },
    addAddress: function() {
        this.setData({
            showForm: !0
        });
    },
    addressCancel: function() {
        this.data.noAddress ? this.setData({
            showForm: !1
        }) : this.setData({
            showForm: !1,
            showAddress: !0
        });
    },
    addressSave: function(e, t, a) {
        if (console.log(e), !t) {
            var o = e.data, n = o.cityName, c = o.consigneeName, r = o.consigneePhoneNumber, s = o.detailInfo, i = o.districtName, u = o.provinceName, d = o.region, l = c, h = r, p = i;
            this.set_address_storage({
                cityName: n,
                userName: l,
                telNumber: h,
                detailInfo: s,
                countyName: p,
                provinceName: u,
                region: d
            }), this.setData({
                noAddress: !1,
                showForm: !1,
                showAddress: !0,
                "consigneeName.value": c,
                "consigneePhoneNumber.value": r,
                "detailInfo.value": s
            });
        }
    },
    addressEdit: function() {
        this.setData({
            showForm: !0,
            showAddress: !1
        });
    },
    region_on_change: function(e) {
        var t, a = this, o = e.detail.value, n = this.data.region, c = (t = {}, t["region.value"] = o, 
        t["region.text"] = o.join(" "), t["provinceName.value"] = o[0], t["cityName.value"] = o[1], 
        t["districtName.value"] = o[2], t);
        this.setData(c), n.required && setTimeout(function(e) {
            a._validate(n);
        }, 100);
    },
    get_wx_address: function() {
        var e = this;
        t.authorize.getSetting("address", {
            success: function(t) {
                wx.chooseAddress({
                    success: function(t) {
                        var a = t.provinceName, o = t.cityName, n = t.countyName, c = t.detailInfo, r = t.userName, s = t.telNumber;
                        console.log("addressInfo", t), e.setData({
                            noAddress: !1,
                            showAddress: !0,
                            "consigneeName.value": r,
                            "consigneePhoneNumber.value": s,
                            "region.value": [ a, o, n ],
                            "region.text": a + " " + o + " " + n,
                            "provinceName.value": a,
                            "cityName.value": o,
                            "districtName.value": n,
                            "detailInfo.value": c
                        });
                        var i = a + "," + o + "," + n;
                        e.set_address_storage({
                            cityName: o,
                            userName: r,
                            telNumber: s,
                            detailInfo: c,
                            countyName: n,
                            provinceName: a,
                            region: i
                        });
                    }
                });
            }
        });
    },
    set_address_storage: function(e) {
        console.log(e), Object.assign(e, {
            countryName: "中国",
            nationalCode: null
        }), this.checkoutModel.setAddress({
            address: e
        }), wx.setStorageSync("address", e);
    },
    isAgree_on_change: function(e) {
        console.log(e), this.setData({
            needInvoice: e.checked
        });
    },
    _doc_dialog_show: function(e) {
        var t, a = e.currentTarget.dataset.name;
        this.setData((t = {}, t[a + ".open"] = !0, t));
    },
    _doc_dialog_close: function(e) {
        var t, a = e.currentTarget.dataset.name;
        this.setData((t = {}, t[a + ".open"] = !1, t));
    },
    invoiceChange: function(e) {
        var t = e.currentTarget.dataset.label;
        this.setData({
            usePersonalInvoice: "personal" == t
        });
    },
    get_wx_invoice: function(e) {
        var a = this;
        t.authorize.getSetting("invoiceTitle", {
            success: function(e) {
                wx.chooseInvoiceTitle({
                    success: function(e) {
                        console.log("invoiceInfo--------------\x3e", e);
                        var t = e.title, o = e.taxNumber;
                        "0" == e.type ? a.setData({
                            usePersonalInvoice: !1,
                            "company_title.value": t,
                            "taxCode.value": o
                        }) : a.setData({
                            usePersonalInvoice: !0,
                            "personal_title.value": t
                        });
                    }
                });
            }
        });
    },
    set_invoice_storage: function(a, o, n, c, r, s) {
        var i = e({
            title: a,
            taxCode: o,
            company_address: n,
            company_tel: c,
            bank_name: r,
            bank_account: s
        }, t.globalData.invoice);
        this.store.invoice = i, this.checkoutModel.setInvoice({
            invoice: i
        }), wx.setStorageSync("invoice", i);
    },
    chooseCoupn: function() {
        this.setData({
            isCouponShow: !0
        });
    },
    hideCoupon: function() {
        this.store.codeInput = null, this.setData({
            isCouponShow: !1
        });
    },
    chooseCoupon: function(e) {
        var a = this, n = e.currentTarget.dataset.index, c = e.currentTarget.dataset.couponcode, r = this.data.couponList;
        r[n].selected || this.checkoutModel.useCoupon({
            code: c,
            check: o.couponCheck,
            customRecalc: o.customRecalc,
            cartLineFormat: t.cartLineFormat
        }).then(function(e) {
            var t = e.activity, o = e.recalc;
            r.forEach(function(e) {
                e.selected = !1;
            }), r[n].selected = !0, a.store.checkedCoupon.code = null, a.store.codeInput = null, 
            a.store.couponList.checked = c, a.setData({
                couponList: r,
                couponCodeError: !1,
                needCoupon: !0,
                couponTitle: t.activityName
            }), o && a.recalcSetData(o);
        }).catch(function(e) {
            a.store.couponList.checked = null, a.setData({
                needCoupon: !1,
                couponTitle: ""
            });
        });
    },
    codeInput: function(e) {
        this.store.codeInput = e.detail.value;
    },
    useCouponCode: function() {
        var e = this, a = this.store.codeInput;
        a && this.checkoutModel.useCoupon({
            code: a,
            check: o.couponCheck,
            customRecalc: o.customRecalc,
            cartLineFormat: t.cartLineFormat
        }).then(function(o) {
            var n = o.activity, c = o.recalc;
            if ("PR" == n.activityLabel) {
                if (e.data.goodsCount > 1) return void t.BEN.toastMsg("该优惠券仅限单件商品使用");
                if ("gift" == e.data.orderType) return void t.BEN.toastMsg("该优惠券不支持赠予好友时使用");
            }
            if (e.store.checkedCoupon.code = a, e.setData({
                couponCodeError: !1,
                needCoupon: !0,
                couponTitle: n.activityName,
                isCouponShow: !1
            }), e.data.couponList && e.data.couponList.length > 0) {
                var r = e.data.couponList;
                r.forEach(function(e) {
                    e.selected = !1;
                }), e.store.couponList.checked = null, e.setData({
                    couponList: r
                });
            }
            c && e.recalcSetData(c);
        }).catch(function(t) {
            e.store.checkedCoupon.code = null, e.store.couponList.checked ? e.setData({
                couponCodeError: !0
            }) : e.setData({
                couponCodeError: !0,
                needCoupon: !1,
                couponTitle: ""
            }), o.checkCouponError(t, e);
        });
    },
    cancelCouponCode: function() {
        var e = this;
        this.checkoutModel.cancelCoupon({
            cartLineFormat: t.cartLineFormat
        }).then(function(t) {
            if (t) {
                if (e.data.couponList && e.data.couponList.length > 0) {
                    var a = e.data.couponList;
                    a.forEach(function(e) {
                        e.selected = !1;
                    }), e.setData({
                        couponList: a
                    });
                }
                e.store.codeInput = null, e.store.checkedCoupon.code = null, e.store.couponList.checked = null, 
                e.setData({
                    couponCodeError: !1,
                    needCoupon: !1,
                    couponTitle: ""
                }), e.recalcSetData(t);
            }
        });
    },
    subscribeTheMessage: function() {
        var e = this.data.orderType;
        console.log(123, "subscribeTheMessage.orderType", e);
        var t = {
            spell: [ n.spellSuccess, n.spellFailed ],
            gift: [ n.giftSend, n.giftCancel ],
            normal: [ n.create, n.send, n.cancel ]
        }, a = t[e] || t.normal;
        this.promise.subscribe = new Promise(function(e) {
            wx.requestSubscribeMessage ? wx.requestSubscribeMessage({
                tmplIds: a,
                success: function(t) {
                    console.log(111, "success_res----------------\x3e", t);
                    var o = a.filter(function(e) {
                        return "accept" === t[e];
                    });
                    e(o);
                },
                fail: function(t) {
                    console.log(222, "fail_res----------------\x3e", t), e([]);
                }
            }) : e([]);
        });
    },
    checkoutaByWx: function(e, a, o) {
        var n = this;
        setTimeout(function() {
            n.promise.subscribe.then(function(o) {
                var c = e.formId;
                if (t.catch.saveFormId(c), !n.data.checkoutBtnLoading) {
                    if (n.setData({
                        checkoutBtnLoading: !0
                    }), "gift" != n.data.orderType && n.data.noAddress) return wx.showToast({
                        title: "请添加配送地址",
                        icon: "none",
                        duration: 2e3
                    }), void n.setData({
                        checkoutBtnLoading: !1
                    });
                    if (a) n.setData({
                        checkoutBtnLoading: !1
                    }); else {
                        if (n.data.needInvoice && (n.data.usePersonalInvoice ? n.set_invoice_storage(n.data.personal_title.value) : n.set_invoice_storage(n.data.company_title.value, n.data.taxCode.value, n.data.company_address, n.data.company_tel, n.data.bank_name, n.data.bank_account)), 
                        !n.data.isAcceptTerm) return wx.showToast({
                            title: "请先接受条款政策",
                            icon: "none",
                            duration: 2e3
                        }), void n.setData({
                            checkoutBtnLoading: !1
                        });
                        n.options.teamId && "" != n.options.teamId ? (n.checkTeamStatus().then(function(e) {
                            n.create_order(o);
                        }).catch(function(e) {
                            wx.showToast({
                                title: "团购不存在",
                                icon: "none",
                                duration: 2e3
                            });
                        }), n.setData({
                            checkoutBtnLoading: !1
                        })) : n.create_order(o);
                    }
                }
            });
        }, 200);
    },
    create_order: function(e) {
        var o = this, n = null;
        ("spell" == this.data.orderType || this.options.teamId && "" != this.options.teamId) && (n = "GROUP_BUYING");
        var c = function(e) {
            o.setData({
                checkoutBtnLoading: !1
            });
        }, r = this, s = function(e) {
            var a = e.orderId, o = e.orderTime, n = e.totalAmount, c = t.myUtil.createQueryString({
                orderId: a,
                orderTime: o,
                money: n
            });
            r.wechatModel.pay(e).then(function(e) {
                r.setData({
                    checkoutBtnLoading: !1,
                    showToast: !0,
                    toastText: "支付成功"
                }), r.updatePinTuanStatus(a), t.shopListAddOrder(a), "spell" == r.data.orderType || r.options.teamId && "" != r.options.teamId ? setTimeout(function(e) {
                    t.redirectTo(r, {
                        url: "/subPages/pages/spellDetail/spellDetail?orderId=" + a
                    });
                }, 1500) : setTimeout(function(e) {
                    t.redirectTo(r, {
                        url: "/subPages/pages/paymentResult/paysuccess/paysuccess" + c + "&type=" + r.data.orderType
                    });
                }, 1500);
            }).catch(function(e) {
                r.setData({
                    checkoutBtnLoading: !1,
                    showToast: !0,
                    toastText: "支付失败"
                }), "spell" == r.data.orderType || r.options.teamId && "" != r.options.teamId ? setTimeout(function(e) {
                    t.redirectTo(r, {
                        url: "/subPages/pages/paymentResult/payfailed/payfailed" + c + "&type=spell&teamId=" + r.data.newTeamId
                    });
                }, 1500) : setTimeout(function(e) {
                    t.redirectTo(r, {
                        url: "/subPages/pages/paymentResult/payfailed/payfailed" + c + "&type=normal"
                    });
                }, 1500);
            });
        };
        this.checkoutModel.createOrder({
            externalOrderId: n,
            customReqImageFormat: function() {
                return o.store.wishCard;
            },
            customReqDescFormat: function(e, t) {
                return console.log("customReqFormat----------\x3e", e, t), t.preOrder.toString();
            },
            cartLineFormat: function(e, t) {
                if (t.skuAttrSaleList && t.skuAttrSaleList.filter(function(e) {
                    return "颜色分类" == e.attributeFrontName;
                }).length) {
                    var a = t.skuAttrSaleList.filter(function(e) {
                        return "颜色分类" == e.attributeFrontName;
                    })[0].attributeValueThumbnailURL;
                    a && (e.image = a);
                }
                return e;
            }
        }).then(function(n) {
            console.log("order_res--------------------\x3e", n);
            var c = n.orderId, i = n.orderTime;
            n.totalAmount, n.autoCancelSet;
            if ("cart" === o.store.form) {
                var u = function() {
                    var e = [];
                    return r.store.checkoutData.cartData.ableItems.forEach(function(t) {
                        var a = {
                            spuCode: t.spuCode,
                            skuCode: t.skuId
                        };
                        e.push(a);
                    }), e;
                }();
                t.POST(t.apiUrl.shopList.deleteList, u).then(function(e) {
                    console.log("shopList_deleteList-------------", e);
                });
            }
            "spell" == o.data.orderType || o.options.teamId && "" != o.options.teamId ? o.findBaseInfo().then(function(e) {
                o.addTeamStatus(c).then(function(e) {
                    s(n);
                });
            }) : s(n), e && e.length && a.promise.openid.then(function(a) {
                var o = {
                    openid: a.openid,
                    templateIds: e.join(","),
                    targetCode: c
                };
                t.POST(t.apiUrl.matemplate.subscribe, o).then(function(e) {
                    console.log("订阅返回------------\x3e", e), "100010" != e.statusCode && console.log(a);
                });
            });
            var d = [], l = o.store.trackingCode || "S11_OTHER";
            switch (o.data.ableItems.forEach(function(e) {
                d.push({
                    skuId: e.skuId,
                    trackingCode: l
                });
            }), o.post_cps({
                orderId: c,
                orderTime: i,
                trackOrderLines: d
            }), o.data.ableItems.forEach(function(e) {
                t.mta.Event.stat("btnWechatPay", {
                    spucode: e.spuCode,
                    tc: o.store.trackingCode
                });
            }), o.data.orderType) {
              case "spell":
              case "gift":
                t.mta.Event.stat("btnWechatPay", {
                    innersource: 3
                });
                break;

              default:
                "cart" == o.store.from ? t.mta.Event.stat("btnWechatPay", {
                    innersource: 2
                }) : t.mta.Event.stat("btnWechatPay", {
                    innersource: 1
                });
            }
        }).catch(function(e) {
            var a = {
                102204990: "下单失败，商品不能购买",
                102204991: "下单失败，商品不能购买",
                102204992: "下单失败，商品不能购买",
                10120106: "下单失败，商品库存不足",
                101416120: "下单失败，优惠已失效",
                511201903: "下单失败，商品不能购买",
                x: "下单失败, 请稍后再试"
            };
            console.log("order_res-----------", e), t.BEN.toastMsg(a[e.code] || a.x), c(), console.log("创单失败");
        });
    },
    post_cps: function(e) {
        var a = e.orderId, o = e.orderTime, n = e.trackOrderLines;
        t.POST(t.apiUrl.cpsTrack, {
            orderId: a,
            orderTime: o,
            trackOrderLines: n
        }).then(function(e) {
            console.log("cps----------------\x3e", e);
        });
    },
    checkTeamStatus: function() {
        var e = this;
        return new Promise(function(a, o) {
            var n = {
                teamId: e.options.teamId
            };
            t.POST(t.apiUrl.team.detail, n).then(function(e) {
                console.log("检查团状态-----------\x3e", e), 1 == e.data.teamStatus || 2 == e.data.teamStatus ? a(e) : o(e);
            }).catch(function(e) {
                return o(e);
            });
        });
    },
    addTeamStatus: function(e) {
        var o = this;
        return new Promise(function(n, c) {
            var r = {
                teamId: o.options.teamId || "",
                openid: a.store.openid,
                activityCode: t.globalData.activityCode,
                orderCode: e,
                nickname: t.globalData.userInfo.nickName,
                avatarUrl: t.globalData.userInfo.avatarUrl,
                userCode: t.globalData.userCode
            };
            t.POST(t.apiUrl.team.add, r).then(function(e) {
                console.log("调用开团接口成功-----------\x3e", e), t.globalData.teamId = e.data.teamId, 
                o.setData({
                    newTeamId: e.data.teamId
                }), n(e);
            });
        }).catch(function(e) {
            return resolve(e);
        });
    },
    findBaseInfo: function() {
        return new Promise(function(e, a) {
            t.POST(t.apiUrl.member.findBaseInfo).then(function(a) {
                a.success ? (t.globalData.userCode = a.data.userCode, e(a)) : e(a);
            });
        }).catch(function(e) {
            return resolve(e);
        });
    },
    updatePinTuanStatus: function(e) {
        return new Promise(function(a, o) {
            var n = {
                teamId: t.globalData.teamId,
                orderCode: e
            };
            t.POST(t.apiUrl.team.updatePinTuanStatus, n).then(function(e) {
                console.log("更新团购状态-----------\x3e", e), a(e);
            });
        }).catch(function(e) {
            return reject(e);
        });
    },
    go_to_my_coupon: function(e, a) {
        var o = this;
        return new Promise(function(e, a) {
            console.log("_this.store.checkoutData--------", o.store.checkoutData.cartData.ableItems);
            var n = o.store.checkoutData.cartData.ableItems.map(function(e) {
                var t = [];
                return e.salesProps.forEach(function(e) {
                    t.push({
                        attributeCode: e.groupId,
                        attributeValue: e.propId
                    });
                }), {
                    attributes: t,
                    brandCode: e.brand.code,
                    categoryCode: e.category[0] && e.category[0].code,
                    productPrice: e.salePrice,
                    quantity: e.buyCount,
                    selectionFlag: "01",
                    skuCode: e.skuId,
                    spuCode: e.spuCode,
                    listPrice: e.listPrice
                };
            });
            o.store.promise.couponList = t.POST(t.apiUrl.coupons.filter, {
                promoProducts: n
            }), o.store.promise.couponList.then(function(t) {
                var a = [];
                t.data.forEach(function(e) {
                    e.isReward && a.push(e);
                }), console.log("activity----\x3e", t), o.store.couponList.list = a, o.setData({
                    couponList: a
                }), e();
            });
        });
    },
    creatMatemplate: function(e) {
        console.log("创建通知模板入参", e);
        var a = e.openid, o = e.orderId, n = e.amount, c = e.productName, r = e.orderTime, s = e.autoCancelSet, i = t.filters.transformTime(r, "yyyy-mm-dd hh:mm:ss"), u = t.globalData.tenantCode;
        console.log("getAutoCancelSet.res---------------------------------------\x3e", s);
        var d = [];
        if (s && s.body) {
            var l = s.body, h = l.cancelD, p = l.cancelH, m = l.cancelM;
            h > 0 && d.push(h + "天"), p > 0 && d.push(p + "小时"), m > 0 && d.push(m + "分钟"), 
            d = d.join("");
        }
        var f = {
            openid: a,
            tenantCode: u,
            eventType: 2,
            params: {
                orderId: o,
                cancelHours: d,
                amount: n,
                productName: c,
                createTime: i
            }
        };
        console.log("matemplate_req------------------------------------------------\x3e", f), 
        t.POST(t.apiUrl.matemplate.create, f).then(function(e) {
            console.log("matemplate_res------------------------------------------------\x3e", e), 
            "100010" != e.statusCode && console.log(res);
        });
    }
}));
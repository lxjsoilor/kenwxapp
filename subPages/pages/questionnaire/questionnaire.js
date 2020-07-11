var t = getApp(), e = t.VICTSTORE, a = t.apiUrl;

Page({
    data: {
        pageStatus: {
            isIPX: t.globalData.isIPX,
            needRefresh: !1,
            loadStatus: "unloaded",
            error: {
                title: "",
                btn: "",
                method: ""
            }
        },
        imgs: {
            bg: "https://uxresources.baozun.com/uat/88000633/20190416/5946C09BF85F95C33ACDD50009480F15.png",
            result: "https://uxresources.baozun.com/uat/88000633/20190416/FFE4B6D3ED43C7255BBEA78566642119.png"
        },
        step: 0,
        dataSource: [ {
            id: 0,
            title: "为了让您获得更好的服务体验，请协助我们完成一份简短的调查问卷。",
            type: "start",
            btns: [ {
                text: "去填写",
                class: "enter-btn",
                tap: "onFillBtnClick"
            } ]
        }, {
            id: 1,
            title: "您在购买中是否感到哪里不便？",
            type: "single",
            list: [ {
                text: "信息结构复杂",
                choosed: !1,
                option: "A"
            }, {
                text: "搜索不方便",
                choosed: !1,
                option: "B"
            }, {
                text: "购买流程过于复杂",
                choosed: !1,
                option: "C"
            } ],
            btns: [ {
                text: "回到上一个问题",
                class: "last-btn",
                tap: "onLastBtnClick"
            } ]
        }, {
            id: 2,
            title: "您在购买中是否感到哪里不便？",
            type: "multiple",
            list: [ {
                text: "信息结构复杂",
                choosed: !1,
                option: "A"
            }, {
                text: "搜索不方便",
                choosed: !1,
                option: "B"
            }, {
                text: "购买流程过于复杂",
                choosed: !1,
                option: "C"
            } ],
            btns: [ {
                text: "回到上一个问题",
                class: "last-btn",
                tap: "onLastBtnClick"
            } ]
        }, {
            id: 3,
            title: "请问您还有什么要告诉我们的？",
            type: "textarea",
            text: "",
            max: 30,
            size: 0,
            btns: [ {
                text: "提交",
                class: "enter-btn submi-btn",
                tap: "onSubmitClick"
            }, {
                text: "回到上一个问题",
                class: "last-btn",
                tap: "onLastBtnClick"
            } ]
        } ],
        finish: !1,
        showMask: !1,
        faceValue: 0,
        animationMaskData: null,
        animationDialogData: null,
        noBack: !1,
        activityStatus: 0
    },
    store: {
        config: {
            needOnLoad: !1,
            pageLife: t.globalData.pageLife,
            pageLoadedTime: null
        },
        questionnaireId: 2,
        activityCode: "20200759165535112401"
    },
    page_init: function(i) {
        var n = this;
        this.setPageHeight(), i.scene && this.setData({
            noBack: !0
        }), e.promise.login_CASABA.then(function(e) {
            var i = {
                questionnaireId: n.store.questionnaireId,
                needAnswerDetail: !1
            };
            t.POST(a.questionnaire.query, i).then(function(t) {
                var e = t.data.answered;
                n.data.finish = e, n.getCouponDetail();
            }).catch(function(t) {});
        }).catch(function(e) {
            t.page_change_error(n);
        });
    },
    page_refresh: function() {
        this.page_init(this.options);
    },
    onLoad: function() {
        t.mta.Page.init(), this.setData({
            "pageStatus.isIPX": t.globalData.isIPX
        }), this.store.couponModel = e.use("coupon");
    },
    onShow: function(e) {
        t.page_load(this, e);
    },
    setPageHeight: function() {
        var e = t.globalData.systemInfo.statusBarHeight, a = t.globalData.isIPhone ? 44 : 48;
        this.setData({
            header_height: a,
            statusBarHeight: e
        });
    },
    onFillBtnClick: function(t) {
        this.setData({
            step: 1
        }), this.store.startTime = new Date().getTime();
    },
    onNextBtnClick: function(t) {
        var e = t.currentTarget.dataset, a = e.index, i = (e.type, this.data), n = i.step;
        0 !== i.dataSource[a].list.filter(function(t) {
            return 1 == t.choosed;
        }).length && (n += 1, this.setData({
            step: n
        }));
    },
    onLastBtnClick: function(t) {
        var e = this.data.step;
        e -= 1, this.setData({
            step: e
        });
    },
    onSelectionClick: function(t) {
        var e = t.currentTarget.dataset, a = e.type, i = e.listindex, n = e.index, o = this.data.dataSource, s = o[n].list[i].choosed;
        if ("single" == a) {
            if (s) return;
            o[n].list.map(function(t, e) {
                t.choosed = e == i;
            });
        } else o[n].list[i].choosed = !s;
        this.setData({
            dataSource: o
        });
    },
    onTextareaInput: function(t) {
        var e = t.detail.value, a = t.currentTarget.dataset.index, i = this.data.dataSource, n = e.length || 0;
        i[a].size != n && (i[a].size = n, i[a].text = e, this.setData({
            dataSource: i
        }));
    },
    onSubmitClick: function(t) {
        this.submitQuestionnaireWithRequest(t);
    },
    submitQuestionnaireWithRequest: function() {
        var e = this, a = this.data.dataSource;
        this.store.endTime = new Date().getTime();
        var i = this.store, n = i.questionnaireId, o = i.endTime - i.startTime, s = [];
        (a = a.filter(function(t) {
            return "start" != t.type;
        })).map(function(t) {
            var e = {};
            if (e.questionId = e.questionSort = t.id, "single" == t.type || "multiple" == t.type) {
                var a = t.list.filter(function(t) {
                    return 1 == t.choosed;
                });
                e.answerOption = "", a.map(function(t) {
                    e.answerOption += t.option;
                });
            } else "textarea" == t.type && (e.answerValue = t.text);
            s.push(e);
        });
        var c = {
            questionnaireId: n,
            answerTimes: o,
            answerList: s
        };
        t.POST(t.apiUrl.questionnaire.submit, c).then(function(t) {
            e.setData({
                finish: !0
            });
        }).catch(function(t) {});
    },
    getCouponDetail: function() {
        var e = this, a = this.store, i = a.couponModel, n = a.activityCode;
        i.getActivityDetail({
            activityCode: n
        }).then(function(a) {
            var i = a.faceValue, n = a.receiveStatus, o = a.faceUnit, s = e.data, c = s.step, r = s.dataSource, u = s.finish;
            5 == n && (c = r.length, u = !0), t.page_change_loaded(e, {
                faceUnit: o,
                faceValue: i,
                receiveStatus: n,
                step: c,
                finish: u,
                activityStatus: 0
            });
        }).catch(function(a) {
            console.warn(a), "10142919" == a.code ? t.page_change_loaded(e, {
                activityStatus: -1
            }) : t.page_change_error(e);
        });
    },
    toHomePage: function() {
        t.switchTab(this, {
            url: "/pages/index/index"
        });
    },
    onGetCouponClick: function() {
        var t = this, e = this.store, a = e.couponModel, i = e.activityCode;
        a.getCoupon({
            activityCode: i
        }).then(function(e) {
            t.maskAnimation(!0), t.setData({
                receiveStatus: 5
            });
        }).catch(function(t) {});
    },
    onUseCouponClick: function() {
        this.toHomePage();
    },
    onMaskCloseClick: function() {
        this.maskAnimation(!1);
    },
    maskAnimation: function(t) {
        var e = this, a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        }), i = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 50
        });
        a.opacity(0).step(), i.opacity(0).step(), this.setData({
            animationMaskData: a.export(),
            animationDialogData: i.export()
        }), setTimeout(function() {
            a.opacity(1).step(), i.opacity(1).step(), e.setData({
                animationMaskData: a.export(),
                animationDialogData: i.export()
            }), t || e.setData({
                showMask: t
            });
        }, 200), t && this.setData({
            showMask: t
        });
    }
});
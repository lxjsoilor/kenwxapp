function e(e, o) {
    if (!(e instanceof o)) throw new TypeError("Cannot call a class as a function");
}

exports.__esModule = !0;

var o = {
    formatUrl: function(e) {
        return /^\//.test(e) ? e : "/" + e;
    },
    formatPromise: function(e, o) {
        return new Promise(function(n, t) {
            e ? e.then(function(e) {
                o().then(function(e) {
                    return n(e);
                }).catch(function(e) {
                    return t(e);
                });
            }).catch(function(e) {
                return t(e);
            }) : t();
        });
    },
    loginRemedySuccess: function(e) {
        e.loginRemedyTag = null;
        var o = e.actionCache;
        switch (o.key) {
          case "navigateTo":
            wx[o.data.method](o.data.options);
            break;

          case "page_load":
            o.data.page_init(o.data.options);
            break;

          case "resolve":
            o.data.fn();
        }
    },
    findPromiseCreate: function(e) {
        var o = e.promiseTag, n = e.key, t = null;
        switch (e.tag) {
          case "getOpenId":
            t = o.getOpenId.promise_create;
            break;

          case "doLogin":
            t = o.doLogin.promise_create;
            break;

          case "needLogin":
            o.needLogin && o.needLogin.filter(function(e) {
                return e.key == n;
            }).forEach(function(e) {
                t = e.promise_create;
            });
        }
        return t;
    },
    setPageLoadedTime: function(e) {
        e.store.config.needOnLoad && (e.store.config.pageLoadedTime = new Date().getTime());
    }
}, n = function() {
    function n(t) {
        e(this, n), this.opt = Object.assign({
            useShowLoading: !0,
            loadingDelay: 0,
            errorPanel: {},
            errorPanelNetWork: {},
            loginRemedyCountMax: 1,
            loginRemedyInterval: 1e3
        }, t), this.VICTSTORE = this.opt.VICTSTORE, this.loadingDelayTimer = null, this.loginFail = this.opt.loginFail, 
        this.needLoginList = this.opt.needLoginList.map(function(e) {
            return o.formatUrl(e);
        }), this.renderTime = 1e3, this.promiseTag = {
            getOpenId: null,
            doLogin: null,
            needLogin: []
        }, this.openId = null, this.loginRemedyTag = null, this.loginRemedyCount = 0, this.loginRemedyTimer = null, 
        this.appHide = !1, this.actionCache = {
            data: null,
            key: ""
        };
    }
    return n.prototype.activate = function(e) {
        var n = this, t = Object.assign({}, e);
        if (this.loginRemedyCount > 0) this.loginRemedyCount = 0, this.loginRemedyTimer && clearTimeout(this.loginRemedyTimer), 
        this.loginRefresh({
            loop: !0,
            success: !1
        }); else {
            var i = this.promiseTag, a = this.needLoginList, s = this.VICTSTORE.promise;
            0 == a.filter(function(e) {
                return e == o.formatUrl(t.path);
            }).length && (s[i.getOpenId.key].then(function(e) {
                n.loginRemedyTag = null;
            }).catch(function(e) {
                n.loginRemedyTag || (n.loginRemedyTag = "getOpenId"), "getOpenId" == n.loginRemedyTag && n.loginRemedy();
            }), s[i.doLogin.key].catch(function(e) {
                n.loginRemedyTag || (n.loginRemedyTag = "doLogin"), "doLogin" == n.loginRemedyTag && n.loginRemedy();
            }));
        }
        this.appHide = !1;
    }, n.prototype.frozen = function() {
        this.appHide = !0;
    }, n.prototype.setGlobalPromise = function(e) {
        var n = this, t = Object.assign({
            name: null,
            creator: null,
            tag: null
        }, e), i = t.name, a = t.creator, s = t.tag || null, g = this.VICTSTORE.promise, r = this.promiseTag;
        if (i && a && !g[i]) switch (s) {
          case "getOpenId":
            r.getOpenId = {
                key: i,
                promise_create: a
            }, g[i] = a(), g[i].then(function(e) {
                n.openId = e.openid;
            });
            break;

          case "doLogin":
            r.doLogin = {
                key: i,
                promise_create: a
            }, g[i] = o.formatPromise(g[r.getOpenId && r.getOpenId.key], a);
            break;

          case "needLogin":
            r.needLogin.push({
                key: i,
                promise_create: a
            }), g[i] = o.formatPromise(g[r.doLogin && r.doLogin.key], a);
        }
    }, n.prototype.getGlobalPromise = function(e) {
        var o = Object.assign({
            name: null
        }, e);
        return this.VICTSTORE.promise[o.name] || null;
    }, n.prototype.refreshGlobalPromise = function(e) {
        var n = this, t = Object.assign({
            name: null,
            tag: null
        }, e), i = t.name, a = t.tag || null, s = this.VICTSTORE.promise, g = this.promiseTag;
        if (s[i]) {
            var r = null;
            switch (a) {
              case "getOpenId":
                r = g.getOpenId.promise_create, s[i] = r(), s[i].then(function(e) {
                    n.openId = e.openid;
                });
                break;

              case "doLogin":
                r = g.doLogin.promise_create, s[i] = o.formatPromise(s[g.getOpenId && g.getOpenId.key], r);
                break;

              case "needLogin":
                g.needLogin && g.needLogin.filter(function(e) {
                    return e.key == i;
                }).forEach(function(e) {
                    r = e.promise_create;
                }), s[i] = o.formatPromise(s[g.doLogin && g.doLogin.key], r);
            }
        }
    }, n.prototype.removeGlobalPromise = function(e) {
        var o = Object.assign({
            name: null,
            tag: null
        }, e), n = o.name, t = o.tag || null, i = this.VICTSTORE.promise;
        if (i[n]) switch (delete i[n], t) {
          case "getOpenId":
            this.promiseTag.getOpenId = null;
            break;

          case "doLogin":
            this.promiseTag.doLogin = null;
            break;

          case "needLogin":
            this.promiseTag.needLogin = this.promiseTag.needLogin.filter(function(e) {
                return e.key != n;
            });
        }
    }, n.prototype.page_load = function(e) {
        var n = this, t = this.VICTSTORE.promise, i = this.needLoginList, a = this.promiseTag, s = this.loginFail, g = this.opt, r = g.useShowLoading, l = g.loadingDelay, d = e.data.pageStatus, c = d.loadStatus, p = d.needRefresh, u = e.store.config, m = u.needOnLoad, h = u.pageLoadedTime, f = u.pageLife;
        m && h && !p && (p = new Date().getTime() - h > f), ("unloaded" == c || "error" == c || p) && ("unloaded" == c && (l > 0 ? (e.setData({
            "pageStatus.loadStatus": "_loading"
        }), this.loadingDelayTimer = setTimeout(function() {
            r && wx.showLoading(), e.setData({
                "pageStatus.loadStatus": "loading"
            });
        }, l)) : (r && wx.showLoading(), e.setData({
            "pageStatus.loadStatus": "loading"
        }))), i.filter(function(n) {
            return n == o.formatUrl(e.route);
        }).length ? t[a.doLogin.key] ? (this.loginRemedyCount = 0, t[a.doLogin.key].then(function(n) {
            e.page_init(e.options), o.setPageLoadedTime(e);
        }).catch(function(o) {
            n.actionCache = {
                data: e,
                key: "page_load"
            }, n.loginRemedy({
                page: e
            });
        })) : s(e, this) : (e.page_init(e.options), o.setPageLoadedTime(e)));
    }, n.prototype.page_change_loaded = function(e, o) {
        this.opt.useShowLoading && wx.hideLoading(), this.loadingDelayTimer && (clearTimeout(this.loadingDelayTimer), 
        this.loadingDelayTimer = null), e.setData(Object.assign({
            "pageStatus.loadStatus": "loaded"
        }, o || {}));
    }, n.prototype.page_change_error = function(e, o) {
        var n = this.opt, t = n.useShowLoading, i = n.errorPanel, a = n.errorPanelNetWork, s = Object.assign({
            error: {},
            netWorkError: {},
            data: {}
        }, o), g = Object.assign({}, i, s.error), r = Object.assign({}, a, r), l = s.data;
        t && wx.hideLoading(), this.loadingDelayTimer && (clearTimeout(this.loadingDelayTimer), 
        this.loadingDelayTimer = null);
        var d = function() {
            e.setData(Object.assign({
                "pageStatus.loadStatus": "error",
                "pageStatus.error": g
            }, l));
        }, c = function() {
            e.setData(Object.assign({
                "pageStatus.loadStatus": "error",
                "pageStatus.error": r
            }, l));
        };
        wx.getNetworkType({
            success: function(e) {
                "none" == e.networkType ? c() : d();
            },
            fail: function(e) {
                d();
            }
        });
    }, n.prototype.navigateTo = function(e, o, n) {
        var t = this, i = this.VICTSTORE.promise, a = e.url, s = e.success, g = e.fail, r = e.complete, l = this.needLoginList, d = this.promiseTag, c = this.loginFail, p = function() {
            wx[o]({
                url: a,
                success: s,
                fail: g,
                complete: r
            });
        };
        this.loginRemedyCount = 0, l.filter(function(e) {
            return e == a;
        }).length ? i[d.doLogin.key] ? i[d.doLogin.key].then(function(e) {
            p();
        }).catch(function(i) {
            t.actionCache = {
                data: {
                    options: e,
                    method: o
                },
                key: "navigateTo"
            }, t.loginRemedy({
                page: n
            });
        }) : c(n, this) : p();
    }, n.prototype.loginRemedy = function(e) {
        var o = this, n = Object.assign({}, e), t = n.page, i = n.failFn, a = this.opt.loginRemedyCountMax, s = this.opt.loginRemedyInterval;
        console.log(676767, o.loginRemedyCount), this.loginRemedyTimer = setTimeout(function() {
            o.loginRemedyCount++, o.loginRemedyCount > a || o.appHide ? (t && o.loginFail(t, o), 
            i && i()) : o.loginRefresh({
                page: t,
                loop: !0
            });
        }, s);
    }, n.prototype.loginRefresh = function(e) {
        var n = this, t = Object.assign({
            loop: !1,
            success: o.loginRemedySuccess,
            page: null
        }, e), i = t.loop, a = t.success, s = t.page, g = this.VICTSTORE, r = this.promiseTag, l = g.promise;
        this.openId ? (l[r.doLogin.key] = o.formatPromise(l[r.getOpenId.key], r.doLogin.promise_create), 
        r.needLogin.forEach(function(e) {
            l[e.key] = o.formatPromise(l[r.doLogin.key], e.promise_create);
        }), i && l[r.doLogin.key].catch(function(e) {
            n.loginRemedyTag || (n.loginRemedyTag = "doLogin"), "doLogin" == n.loginRemedyTag && n.loginRemedy({
                page: s
            });
        }), a && l[r.doLogin.key].then(function(e) {
            return a(n);
        })) : (l[r.getOpenId.key] = r.getOpenId.promise_create(), l[r.doLogin.key] = o.formatPromise(l[r.getOpenId.key], r.doLogin.promise_create), 
        r.needLogin.forEach(function(e) {
            l[e.key] = o.formatPromise(l[r.doLogin.key], e.promise_create);
        }), i && l[r.getOpenId.key].then(function(e) {
            n.loginRemedyTag = null;
        }).catch(function(e) {
            n.loginRemedyTag || (n.loginRemedyTag = "getOpenId"), "getOpenId" == n.loginRemedyTag && n.loginRemedy({
                page: s
            });
        }), i && l[r.doLogin.key].catch(function(e) {
            n.loginRemedyTag || (n.loginRemedyTag = "doLogin"), "doLogin" == n.loginRemedyTag && n.loginRemedy({
                page: s
            });
        }), a && l[r.doLogin.key].then(function(e) {
            return a(n);
        }));
    }, n.prototype.loginWarranty = function() {
        var e = this, o = this.VICTSTORE.promise, n = this.promiseTag;
        return new Promise(function(t, i) {
            n.doLogin.key && o[n.doLogin.key] ? (e.loginRemedyCount = 0, o[n.doLogin.key].then(function(e) {
                t();
            }).catch(function(o) {
                e.actionCache = {
                    data: {
                        fn: function() {
                            t();
                        }
                    },
                    key: "promise"
                }, e.loginRemedy({
                    failFn: function() {
                        i();
                    }
                });
            })) : i();
        });
    }, n.prototype.getDataList = function(e, o) {
        function n(o) {
            e.setData(o), i && wx.stopPullDownRefresh();
        }
        var t = o.name, i = o.loadingType, a = o.transformList, s = o.setList, g = o.setSetting, r = o.end, l = o.isRender, d = o.method;
        console.log("name----------------------------\x3e", t), d = d || "POST", l = void 0 === l || !0 == !!l;
        var c = this.renderTime, p = this.VICTSTORE, u = t.split("."), m = i ? "." + i : ".loading", h = u.length > 1 ? e.data[u[0]][u[1]] : e.data[t], f = h.req, y = h.url, T = h.list, L = h.loading, R = h.isNoMore, k = f.pageCount || f.size || f.pageSize;
        if (!R && !L) {
            var O, I = function(o) {
                var n;
                console.log("getDataListErr======================>", o), e.setData((n = {}, n[t + ".isNoMore"] = !0, 
                n[t + ".list"] = [], n[t + ".loading"] = !1, n));
            };
            e.setData((O = {}, O[t + m] = !0, O[t + ".isNoMore"] = !1, O));
            var S = new Date().getTime();
            p[d](y, f, {
                allRes: !0
            }).then(function(e) {
                console.log("name------------------------------\x3e", t);
                var o = e.data, i = a ? a(e.data, t) : o.content;
                100011 != o.statusCode ? i.then(function(e) {
                    var i;
                    R = o.body && o.body.pages ? !o.body.pages || o.body.pages <= f.pageIndex : !e.length || e.length < k;
                    var a = (i = {}, i[t + m] = !1, i);
                    e.length && ("function" == typeof s && s(e, h), T.push.apply(T, e), f.pageNo && (f.pageNo = R ? f.pageNo : f.pageNo + 1), 
                    f.page && (f.page = R ? f.page : f.page + 1), f.pageIndex && (f.pageIndex = R ? f.pageIndex : f.pageIndex + 1), 
                    l && (a[t + ".list"] = T)), a[t + ".isNoMore"] = R, "function" == typeof g && g(a, o, t), 
                    console.log("settings-----------------------\x3e", a);
                    var d = new Date().getTime() - S;
                    if (d < c) var p = setTimeout(function(e) {
                        clearTimeout(p), n(a), "function" == typeof r && r(o);
                    }, c - d); else n(a), "function" == typeof r && r();
                }) : I();
            }, I);
        }
    }, n;
}();

exports.default = n;
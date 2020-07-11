var e = require("./ben_validate.js"), t = require("./valid_dec.js");

module.exports = {
    _bindPicker: function(e) {
        var t, a = e.currentTarget.dataset.name;
        this.setData((t = {}, t[a + ".state.collapse"] = !1, t));
    },
    _focusHandler: function(e) {
        var t, a = e.currentTarget.dataset.name;
        this.setData((t = {}, t[a + ".state.onfocus"] = !0, t[a + ".state.active"] = !0, 
        t[a + ".state.collapse"] = !1, t));
    },
    _inputHandler: function(e) {
        var t, a = this, i = e.currentTarget.dataset, n = (i.rule, i.name), o = (i.valid, 
        e.detail.value), r = this.data[n], s = (t = {}, t[n + ".active"] = !!e.detail.value, 
        t), d = !!r.method && r.method.onInput;
        r.value = o, "input" === r.valid ? this._validate(r, s, function(e, t) {
            !!d && a[d](r, t);
        }) : d && "function" == typeof this[d] && this[d](r);
    },
    _blurHandler: function(e) {
        var t, a = e.currentTarget.dataset, i = a.rule, n = a.name, o = (e.detail.value, 
        this.data[n]), r = !!o.method && o.method.onBlur, s = (t = {}, t[n + ".state.active"] = !!e.detail.value, 
        t[n + ".state.onfocus"] = !1, t);
        i && this._validate(o, s), "function" == typeof this[r] && this[r](o);
    },
    _wx_switch_on_tap: function(e) {
        var t = e.currentTarget.dataset.name, a = this.data[t];
        a.required && (a.value = e.detail.value, this._validate(a)), a.method && "function" == typeof this[a.method.onChange] && this[a.method.onChange]({
            checked: e.detail.value
        }, a);
    },
    _custom_switch_on_tap: function(e) {
        var t, a = e.currentTarget.dataset.name, i = this.data[a], n = i.checked ? "" : "1";
        i && this.setData((t = {}, t[a + ".checked"] = n, t)), i.required && (i.value = !!n, 
        this._validate(i)), i.method && "function" == typeof this[i.method.onChange] && this[i.method.onChange]({
            checked: !!n
        }, i);
    },
    _onChosenItem: function(e) {
        var t = e.currentTarget.dataset, a = t.name, i = t.index, n = t.disabled, o = this.data[a], r = o.data, s = o.keyMap, d = {
            value: "",
            index: ""
        };
        if ("radio" === o.type) if (o.mutex) {
            if (d.value = o.list[i][s.value], d.index = i, r.index !== i) {
                var l;
                this.setData((l = {}, l[a + ".data.index"] = i, l[a + ".value"] = d.value, l));
            }
        } else {
            var u;
            d.value = r.index === i ? null : o.list[i][s.value], d.index = r.index === i ? null : i, 
            this.setData((u = {}, u[a + ".data.index"] = d.index, u[a + ".value"] = d.value, 
            u));
        }
        if ("checkbox" === o.type) {
            var c;
            d.value = [], d.index = [];
            var h = r.index.indexOf(i);
            h > -1 ? r.index.splice(h, 1) : r.index.push(i), console.log("data.index------\x3e", r.index), 
            d.index = r.index, o.list.forEach(function(e, t) {
                var a = r.index.indexOf(t) > -1;
                e.checked = a, a && d.value.push(e[s.value]);
            }), this.setData((c = {}, c[a + ".list"] = o.list, c[a + ".value"] = d.value.join(","), 
            c));
        }
        o.method && "function" == typeof this[o.method.onChange] && this[o.method.onChange](d, {
            name: a,
            index: i,
            disabled: n
        }, o), o.required && this._validate(o);
    },
    _onPickerChange: function(e) {
        var t, a = e.currentTarget.dataset.name, i = e.detail.value, n = this.data[a], o = n.list, r = n.method, s = n.keyMap;
        this.setData((t = {}, t[a + ".data.index"] = i, t)), n.value = o[i][s.value], console.log("model----------------------------\x3e", i, a, n), 
        n.required && this._validate(n), !!r && "function" == typeof this[r.onChange] && this[r.onChange](o[i], n);
    },
    _onMutiPickerChange: function(e) {
        var t;
        console.log("ev-------------------------------\x3e", e);
        var a = e.currentTarget.dataset.name, i = e.detail.value, n = this.data[a], o = n.list, r = n.keyMap, s = {
            data: [],
            text: [],
            value: []
        };
        o.forEach(function(e, t) {
            var a = e[i[t]];
            s.data.push(a), s.text.push(a[r.text]), s.value.push(a[r.value]);
        });
        var d = (t = {}, t[a + ".state.collapse"] = !1, t[a + ".data.index"] = i, t[a + ".data.value"] = s.value, 
        t[a + ".text"] = s.text, t);
        console.log("setting------------------------------\x3e", d), this.setData(d), n.method && "function" == typeof this[n.method.onChange] && this[n.method.onChange](s, n), 
        n.required && this._validate(n);
    },
    _onMutiPickerColumnChange: function(e) {
        var t = e.currentTarget.dataset.name, a = this.data[t], i = {}, n = e.detail, o = n.column, r = n.value, s = a.list, d = a.data, l = a.keyMap, u = a.source;
        d.index.splice(o, 1, r);
        for (var c = o + 1; c < s.length; c++) {
            var h = a.list[c - 1][c === o + 1 ? r : 0][l.value];
            a.list.splice(c, 1, u[c][h]), d.index.splice(c, 1, 0), i[t + ".list[" + c + "]"] = a.list[c];
        }
        i[t + ".data"] = d, this.setData(i), a.method && "function" == typeof this[a.method.onColumnChange] && this[a.method.onColumnChange](d, a);
    },
    _sim_picker_on_change: function(e) {
        var t, a = e.currentTarget.dataset.name, i = e.detail.value, n = this.data[a], o = n.list, r = n.method;
        n.keyMap;
        this.setData((t = {}, t[a + ".data.index"] = i, t)), n.value = o[i], n.required && this._validate(n), 
        !!r && "function" == typeof this[r.onChange] && this[r.onChange](o[i], n);
    },
    _resetMutiPicker: function(e) {},
    _validate: function(a, i, n) {
        var o = a.name, r = a.value, s = a.rule, d = a.required;
        i = i || {}, s = d ? "required" : s, "switch" === a.type && (r = r ? "abc" : "");
        var l = this.data.language || "ZH_CN", u = s.split("|");
        r = r instanceof Array ? r.join(",") : r;
        for (var c = 0; c < u.length; c++) {
            var h = u[c].split(":"), v = h[0], f = h[1];
            if (!e[v](r, f)) {
                var m = a.validDec ? a.validDec[v] : t[l][v];
                i[o + ".error"] = "function" == typeof m ? m(f, a) : m;
                break;
            }
            i[o + ".error"] = "";
        }
        return this.setData(i), "function" == typeof n && n(r, !!i[o + ".error"]), !!i[o + ".error"];
    },
    _validateAll: function(e) {
        var t = [];
        for (var a in e) {
            var i = e[a];
            i.required, this._validate(i, {}, function(e, a) {
                t.push(a);
            });
        }
        return t.indexOf(!0) > -1;
    },
    _formSubmit: function(e) {
        this.setData({
            components_valid: Date.now()
        });
        var t = e.currentTarget.dataset, a = t.submit, i = t.marker, n = e.detail.value, o = e.detail.formId, r = this.data[a], s = this[r.method.submit], d = {}, l = void 0;
        for (var u in n) {
            var c = this.data[u] || {};
            (c.rule || c.required) && (c.value = n[u], d[u] = c, l || (l = !0)), "switch" === c.type && (n[u] = !!n[u]);
        }
        r.state.hasErr = !!l && this._validateAll(d), "function" == typeof s && s({
            data: n,
            formId: o
        }, r.state.hasErr, i);
    },
    _resetForm: function(e) {
        var t = e.currentTarget.dataset, a = t.name, i = t.keys, n = this[this.data[a].method.reset];
        this._resetMyForm(i), "function" == typeof n && n(a);
    },
    _resetMyForm: function(e) {
        var t = this, a = {}, i = this;
        e.forEach(function(e, n) {
            var o = t.data["" + e];
            "checkbox" === o.type && (a[e + ".data"] = {
                index: []
            }, o.list.forEach(function(e) {
                delete e.checked;
            }), a[e + ".list"] = o.list), "radio" === o.type && (a[e + ".data"] = {
                index: null
            }), "picker" === o.type && (a[e + ".data"] = {
                index: 0
            }), "multiPicker" === o.type && i._resetMutiPicker(o), a[e + ".value"] = "", a[e + ".error"] = "", 
            t.setData(a);
        });
    },
    _init_form: function(e) {
        var t = this, a = {};
        for (var i in e) !function(i) {
            var n = e[i], o = t.data[i];
            if (o) if ("radio" === o.type) a[i + ".value"] = n, o.keyMap && o.list.some(function(e, t) {
                if (String(e[o.keyMap.value]) == n) return a[i + ".data.index"] = t, !0;
            }); else if ("checkbox" === o.type) {
                console.log("ev_data----------\x3e", n), a[i + ".value"] = n;
                var r = n.split(","), s = JSON.parse(JSON.stringify(o.list));
                o.keyMap && (s.forEach(function(e, t) {
                    var a = e[o.keyMap.value];
                    a = String(a), e.checked = r.indexOf(a) > -1, e.checked && o.data.index.push(t);
                }), a[i + ".list"] = s);
            } else if ("picker" === o.type) if (o.keyMap) if ("multiSelector" === o.mode) n = "string" == typeof n ? n.split(",") : n, 
            a[i + ".value"] = n, a[i + ".text"] = n.join(o.symbol || "/"), n.forEach(function(e, t) {
                if (t > 0) {
                    var n = o.list[t - 1][o.data.index[t - 1]][o.keyMap.value], r = o.source[t][n];
                    o.list[t] = r, a[i + ".list[" + t + "]"] = r;
                }
                console.log("model.list[p_idx]------------------\x3e", o.list), o.list[t].some(function(a, i) {
                    var n = a[o.keyMap.text] == e;
                    return n && (o.data.index[t] = i), n;
                });
            }), a[i + ".data.index"] = o.data.index; else {
                var d = void 0;
                o.list.some(function(e, t) {
                    var a = e[o.keyMap.value] == n;
                    return a && (d = t), a;
                }), console.log("picker.init_form.index------------------------------\x3e", d), 
                a[i + ".data.index"] = void 0 !== d ? d : null;
            } else "date" === o.mode ? a[i + ".value"] = n : "region" === o.mode ? (console.log("mode-----------------\x3e", o.mode), 
            n = "string" == typeof n ? n.split(",") : n, a[i + ".value"] = n, a[i + ".text"] = n.join(" "), 
            console.log("setting----------------------------\x3e", a)) : a[i + ".data.index"] = o.list.indexOf(n) || null; else "switch" === o.type ? a[i + ".checked"] = n ? "1" : "" : (a[i + ".value"] = n, 
            n && (a[i + ".state.active"] = !!n));
        }(i);
        return console.log("setting----------------------------------\x3e", a), a;
    }
};
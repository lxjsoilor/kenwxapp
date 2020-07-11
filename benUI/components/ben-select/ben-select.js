Component({
    behaviors: [ "wx://form-field" ],
    properties: {
        name: {
            type: String,
            value: ""
        },
        value: {
            type: null,
            value: ""
        },
        source: {
            type: Array,
            value: []
        },
        height: {
            type: String,
            value: "600rpx"
        },
        placeholder: {
            type: String,
            value: ""
        },
        label: {
            type: String,
            value: ""
        },
        rule: {
            type: String,
            value: ""
        },
        mode: {
            type: Number,
            value: 1
        },
        col: {
            type: Number,
            value: 1
        },
        icon: {
            type: Array,
            value: []
        },
        keyMap: {
            type: Object,
            value: {
                value: "value",
                text: "text"
            }
        },
        json: {
            type: Boolean,
            value: !1
        },
        symboled: {
            type: String,
            value: ","
        },
        valid: {
            type: Number,
            value: 0,
            observer: function(e, t) {
                console.log("valid---------------------------\x3e", e), this._validate();
            }
        },
        validDec: {
            type: Object,
            value: {
                required: "",
                full: ""
            }
        },
        by: {
            type: String,
            value: "value"
        }
    },
    data: {
        list: [],
        temp: [],
        open: !1
    },
    attached: function() {
        this.init_list(this.data.value);
    },
    methods: {
        _ben_select_on_cancel: function(e) {
            var t = this.data, a = t.value, l = t.source;
            a ? (this.data.temp = [], this.init_list(this.data.value)) : this.setData({
                list: [ l[0], [], [] ],
                temp: [ null, null, null ],
                open: !1
            });
        },
        get_temp_text: function(e) {
            var t = this.data, a = t.keyMap, l = t.symboled, i = [];
            return e.forEach(function(e) {
                e && i.push(e[a.text]);
            }), i.length ? i.join(l) : [];
        },
        _ben_select_on_ensure: function() {
            var e = this.data, t = e.temp, a = e.keyMap, l = e.by, i = e.json, n = e.symboled, s = e.value, u = {
                value: [],
                text: []
            };
            t.forEach(function(e) {
                e && (u.value.push(i ? e : e[a[l]]), u.text.push(e[a.text]));
            }), console.log("this.temp------------------------\x3e", JSON.stringify(t)), console.log("this.out_put------------------------\x3e", JSON.stringify(u)), 
            u.value.length && this.setData({
                value: "string" == typeof s ? u.value.join(n) : u.value,
                text: u.text.join(n),
                open: !1
            }), this._validate(), this.triggerEvent("ensure", u);
        },
        _open_the_select_mask: function(e) {
            this.setData({
                open: !0
            });
        },
        _close_the_select_mask: function(e) {
            this.setData({
                open: !1
            });
        },
        init_list: function(e) {
            var t = this.data, a = t.source, l = t.list, i = t.temp, n = t.keyMap, s = t.symboled, u = t.by, o = t.json;
            if (l[0] = a[0], e) {
                e = "string" == typeof e ? e.split(s) : e;
                var r = l[0].findIndex(function(t) {
                    return t[n[u]] === (o ? e[0][n[u]] : e[0]);
                });
                i.push(l[0][r]), a.forEach(function(t, s) {
                    if (s > 0 && e[s - 1]) {
                        l[s] = a[s][i[s - 1][n.value]];
                        var r = l[s].findIndex(function(t) {
                            return t[n[u]] === (o ? e[s][n[u]] : e[s]);
                        });
                        i.push(l[s][r]);
                    }
                });
            } else a.forEach(function(e, t) {
                t > 0 && l.push([]), i.push(null);
            });
            var p = {
                list: l,
                temp: i,
                open: !1
            };
            e && (p.text = this.get_temp_text(i)), this.setData(p);
        },
        _ben_select_item_on_tap: function(e) {
            var t = e.currentTarget.dataset, a = t.colume, l = t.num, i = this.data, n = i.source, s = i.list, u = i.col, o = i.keyMap, r = i.mode, p = s[a][l];
            if (console.log("data_self[keyMap.value]--------------\x3e", p[o.value]), 1 == r) {
                var v, c = (v = {}, v["temp[" + a + "]"] = p, v);
                a < u - 1 && (c["list[" + (a + 1) + "]"] = n[a + 1][p[o.value]], c["temp[" + (a + 1) + "]"] = null, 
                a < u - 2 && this._reset_next_colume(c, a + 1, u)), console.log("setting----------------------\x3e", c), 
                this.setData(c);
            }
        },
        _reset_next_colume: function(e, t, a) {
            for (var l = t + 1; l < a; l++) e["list[" + l + "]"] = [], e["temp[" + l + "]"] = null;
        },
        _validate: function() {
            var e = this.data, t = e.rule, a = e.validDec, l = e.col, i = e.value, n = e.symboled, s = e.error, u = (i = "string" == typeof i ? i.split(n) : i).length;
            "required" === t && (u ? s && this.setData({
                error: ""
            }) : this.setData({
                error: a.required || "必选"
            })), "full" === t && (u < l ? this.setData({
                error: a.full || "请完善选项"
            }) : s && this.setData({
                error: ""
            })), this.triggerEvent("validate", !!this.data.error);
        }
    }
});
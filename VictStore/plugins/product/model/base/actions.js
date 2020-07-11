function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

exports.__esModule = !0;

var t = function() {
    function t(o, r) {
        e(this, t), this.model = o, this.originData = r;
    }
    return t.prototype.activeProps = function(e, t, o) {
        var r = this.model;
        r.salesProps.forEach(function(i) {
            if (i.groupId == e) {
                var s = !0;
                i.values.filter(function(e) {
                    return e.propId == t;
                }).forEach(function(e) {
                    e.isDisabled ? s = !1 : o ? (e.isActive = !1, i.valueSelected = null, r.skuSelected = null) : (i.valueSelected = e, 
                    i.hasError = !1, e.isActive = !0);
                }), s && i.values.filter(function(e) {
                    return e.propId != t;
                }).forEach(function(e) {
                    e.isActive = !1;
                });
            }
        });
    }, t.prototype.checkProps = function(e) {
        var t = this.model, o = e || "", r = function(e) {
            var o = [];
            return t.salesProps.filter(function(t) {
                return t.groupId != e && t.valueSelected;
            }).forEach(function(e) {
                o.push({
                    groupId: e.groupId,
                    propId: e.valueSelected.propId
                });
            }), o;
        };
        t.salesProps.forEach(function(e) {
            if (e.groupId != o) {
                var i = r(e.groupId);
                e.values.forEach(function(o) {
                    var r = [];
                    r.push({
                        groupId: e.groupId,
                        propId: o.propId
                    });
                    var s = i.concat(r), u = !1;
                    t.skuList.filter(function(e) {
                        return e.stock > 0;
                    }).forEach(function(e) {
                        var t = 0;
                        s.forEach(function(o) {
                            e.properties.forEach(function(e) {
                                o.groupId == e.groupId && o.propId == e.propId && t++;
                            });
                        }), t == s.length && (u = !0);
                    }), u ? o.isDisabled = !1 : (o.isDisabled = !0, o.isActive = !1);
                });
            }
        }), this.getSelectedSku();
    }, t.prototype.initProps = function(e) {
        var t = this.model, o = e || {}, r = o.type, i = o.skuId;
        if ("init" == r) {
            var s = null;
            i && (s = t.skuList.filter(function(e) {
                return e.skuId == i && e.stock > 0;
            })[0]), s || (s = t.skuList.filter(function(e) {
                return e.stock > 0;
            })[0]), s && s.properties && t.salesProps.forEach(function(e) {
                e.valueSelected = null, e.hasError = !1;
                var t = s.properties.filter(function(t) {
                    return t.groupId == e.groupId;
                }), o = t[0] && t[0].propId;
                o && e.values.forEach(function(t) {
                    t.propId != o || t.isDisabled ? t.isActive = !1 : (e.valueSelected = t, t.isActive = !0);
                });
            });
        } else t.salesProps.forEach(function(e) {
            e.valueSelected = null, e.hasError = !1, e.values.forEach(function(e) {
                e.isActive = !1, e.isDisabled = !1;
            });
        });
    }, t.prototype.initBySkuWithoutStock = function(e) {
        var t = this.model, o = this.originData, r = (e || {}).skuId;
        if (r) {
            var i = o.skuList.filter(function(e) {
                return e.code == r;
            })[0], s = [];
            i.attrSaleList.forEach(function(e) {
                var t = [], o = [];
                e.attributeValueList && e.attributeValueList.forEach(function(e) {
                    -1 == t.indexOf(e.code) && (t.push(e.code), o.push(e.attributeValueFrontName));
                }), s.push({
                    groupId: e.code,
                    groupName: e.attributeFrontName,
                    propId: t.join("|"),
                    propName: o.join("|")
                });
            });
            var u = {
                skuId: i.code,
                omsCode: i.extentionCode,
                listPrice: i.listPrice,
                salePrice: i.salePrice,
                properties: s,
                stock: i.netqty < 0 ? 0 : i.netqty
            };
            if (t.skuSelected = u, s && s[0]) {
                var a = null;
                t.salesProps.forEach(function(e) {
                    e.groupId == s[0].groupId && e.values.forEach(function(e) {
                        e.propId == s[0].propId && e.imageList && (a = e.imageList);
                    });
                }), t.skuImages = a;
            }
        }
    }, t.prototype.getSkuData = function(e) {
        var t = this.model, o = t.spuCode, r = t.title, i = t.subTitle, s = t.brand, u = t.category, a = t.description, n = t.saleStatus, p = t.skuImages, c = t.attrList, l = t.labelList, d = [];
        (p || t.images).forEach(function(e) {
            d.push(e.src);
        });
        var f = [];
        return e.properties.forEach(function(e) {
            t.salesProps.filter(function(t) {
                return t.groupId == e.groupId;
            }).forEach(function(t) {
                var o = {};
                o.groupId = t.groupId, o.groupName = t.name, t.values.filter(function(t) {
                    return t.propId == e.propId;
                }).forEach(function(e) {
                    o.propId = e.propId, o.propName = e.name, o.propValue = e.value, o.propPic = e.pic;
                }), f.push(o);
            });
        }), {
            spuCode: o,
            title: r,
            subTitle: i,
            brand: s,
            category: u,
            description: a,
            saleStatus: n,
            attrList: c,
            labelList: l,
            images: d,
            salePrice: e.salePrice,
            listPrice: e.listPrice,
            stock: e.stock,
            skuId: e.skuId,
            omsCode: e.omsCode,
            salesProps: f
        };
    }, t.prototype.checkSkuImage = function() {
        var e = this.model, t = e.salesProps.filter(function(e) {
            return e.valueSelected && e.valueSelected.imageList && e.valueSelected.imageList.length > 0;
        });
        t.length > 0 ? e.skuImages = t[0].valueSelected.imageList : e.skuImages = null;
    }, t.prototype.getSelectedSku = function() {
        var e = this.model, t = [];
        e.salesProps.forEach(function(e) {
            e.valueSelected && t.push({
                propCode: e.propCode,
                propId: e.valueSelected.propId
            });
        }), t.length == e.salesProps.length && e.skuList.forEach(function(o) {
            var r = 0;
            o.properties.forEach(function(e) {
                t.forEach(function(t) {
                    t.propCode == e.propCode && t.propId == e.propId && r++;
                });
            }), r == o.properties.length && (e.skuSelected = o);
        });
    }, t;
}();

exports.default = t;
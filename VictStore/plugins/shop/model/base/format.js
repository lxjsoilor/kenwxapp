exports.__esModule = !0, exports.default = {
    formatShopInfo: function(e) {
        return e.map(function(e) {
            var o = e.address, t = e.city, n = e.province, a = e.locationName, i = e.locationImageUrl, r = e.latitude, d = e.longitude, s = e.openingHours, l = e.storeCode, u = e.locationIdentifier, c = e.tenantCode;
            o = o || "", t = t || "", n = n || "", r = r || "", d = d || "";
            var p = n + t + o, f = i.split(",") || [];
            return {
                fullAddress: p,
                shopImage: f[0] || "",
                shopMapImage: f[1] || "",
                checkoutMapImage: f[2] || "",
                openingHours: s,
                tenantCode: c,
                latitude: r,
                longitude: d,
                address: o,
                city: t,
                province: n,
                locationName: a,
                storeCode: l,
                locationIdentifier: u
            };
        });
    }
};
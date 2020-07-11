module.exports = {
    reg: {
        mobile: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
        smsCode: /^\d{6}$/,
        captcha: /^\d{4}/,
        password: /^([a-zA-Z0-9]|.){6,16}$/,
        EN_CN: /(^[\u4E00-\u9FA5\uF900-\uFA2D\u0020]*$)|(^[A-Za-z ]+$)/,
        nospace: /\s/g,
        tax: /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/,
        email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    },
    required: function(t) {
        return !!t && "" !== String(t).trim();
    },
    max: function(t, e) {
        return t.trim().length <= e;
    },
    min: function(t, e) {
        return t.trim().length >= e;
    },
    between: function(t, e) {
        e = e.split("-");
        var r = t.trim().length;
        return r >= e[0] && r <= e[1];
    },
    nospace: function(t) {
        return !(t.trim().indexOf(" ") > -1);
    },
    mobile: function(t) {
        return this.reg.mobile.test(t);
    },
    smsCode: function(t) {
        return this.reg.smsCode.test(t);
    },
    captcha: function(t) {
        return this.reg.captcha.test(t);
    },
    tax: function(t) {
        return this.reg.tax.test(t);
    },
    email: function(t) {
        return this.reg.email.test(t);
    },
    password: function(t) {
        return this.reg.password.test(t);
    },
    EN_CN: function(t) {
        return this.reg.EN_CN.test(t);
    }
};
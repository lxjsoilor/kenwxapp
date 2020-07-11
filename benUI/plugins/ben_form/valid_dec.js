module.exports = {
    ZH_CN: {
        required: "必填",
        mobile: "请输入正确的手机号码",
        max: function(e) {
            return "上限 " + e + " 位。";
        },
        min: function(e) {
            return "请输入至少 " + e + " 个字符。";
        },
        between: function(e) {
            return "大于 " + (e = e.split("-"))[0] + " 且小于 " + e[1];
        },
        nospace: "输入内容不可含有空格",
        smsCode: "请输入6位数字验证码",
        captcha: "您输入验证码有误",
        tax: "纳税人识别码格式有误",
        email: "邮箱格式错误",
        password: "密码必须为6~16个字符，仅支持英文字母、数字、标点符号（空格除外)",
        EN_CN: "请输入纯英文或者纯中文"
    },
    EN: {
        required: "please required",
        mobile: "mobile error",
        max: function(e) {
            return "more than " + e + " 。";
        },
        min: function(e) {
            return "less tan " + e + " 。";
        },
        between: function(e) {
            return "more than " + (e = e.split("-"))[0] + " and less than " + e[1];
        },
        nospace: "has space",
        smsCode: "smsCode’s length mast 6",
        captcha: "captcha code has error",
        tax: "taxCode is wrong",
        email: "mailbox format error",
        password: "Only English letter, or Number, or punctuation, except space character",
        EN_CN: "English Only or Chinese Only"
    }
};
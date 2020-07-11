module.exports = {
    store: {
        formIdList: []
    },
    saveFormId: function(t) {
        "the formId is a mock one" != t && this.store.formIdList.push({
            formId: t,
            time: new Date().getTime()
        });
    },
    getFormId: function() {
        var t = this.store.formIdList.filter(function(t) {
            return new Date().getTime() - t.time < 6048e5;
        }).sort(function(t, e) {
            return t.time < e.time;
        }), e = [];
        return t.forEach(function(t) {
            e.push(t.formId);
        }), this.store.formIdList = t, e;
    },
    clearFormId: function() {
        this.store.formIdList = [];
    },
    initFormId: function() {}
};
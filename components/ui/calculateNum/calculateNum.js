Component({
    properties: {
        num: {
            type: Number,
            value: 1,
            observer: function(t, a) {
                this.checkFlag();
            }
        },
        maxNum: {
            type: Number,
            value: 10,
            observer: function(t, a) {
                this.checkFlag();
            }
        },
        minNum: {
            type: Number,
            value: 1,
            observer: function(t, a) {
                this.checkFlag();
            }
        },
        extend: {
            type: Object,
            value: {}
        },
        position: {
            type: String,
            value: ""
        }
    },
    data: {
        minusFlag: !0,
        plusFlag: !0
    },
    methods: {
        checkFlag: function() {
            var t = this.data.num, a = this.data.maxNum, i = this.data.minNum;
            this.setData({
                minusFlag: t > i,
                plusFlag: t < a
            });
        },
        onMinus: function() {
            if (this.data.minusFlag) {
                var t = this.data.num - 1, a = this.data.maxNum, i = this.data.minNum;
                this.setData({
                    num: t,
                    minusFlag: t > i,
                    plusFlag: t < a
                }), this.triggerEvent("onChange", this.data);
            }
        },
        onPlus: function() {
            if (this.data.plusFlag) {
                var t = this.data.num + 1, a = this.data.maxNum, i = this.data.minNum;
                this.setData({
                    num: t,
                    minusFlag: t > i,
                    plusFlag: t < a
                }), this.triggerEvent("onChange", this.data);
            }
        }
    },
    ready: function() {
        this.checkFlag();
    }
});
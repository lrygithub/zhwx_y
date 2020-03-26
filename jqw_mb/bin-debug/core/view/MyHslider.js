var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MyHslider = (function (_super) {
    __extends(MyHslider, _super);
    function MyHslider() {
        return _super.call(this) || this;
    }
    MyHslider.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.bar.mask = this.masks;
        this.addEventListener(egret.Event.CHANGE, this.onChange, this);
        this.maximum = 9;
        this.minimum = 0;
        this.value = 0;
        this.masks.width = this.value / this.maximum * this.bar.width;
        this.ts.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
    };
    MyHslider.prototype.onChange = function () {
        this.masks.width = this.value / this.maximum * this.bar.width;
    };
    MyHslider.prototype.onTab = function (e) {
        var x = e.localX;
        var n = this.nearestValidValue(x / this.ts.width * 10, 1);
        this.value = n;
        this.dispatchEventWith(egret.Event.CHANGE);
    };
    MyHslider.prototype.setValues = function (v) {
        this.value = v;
        this.onChange();
    };
    return MyHslider;
}(eui.HSlider));
__reflect(MyHslider.prototype, "MyHslider");
//# sourceMappingURL=MyHslider.js.map
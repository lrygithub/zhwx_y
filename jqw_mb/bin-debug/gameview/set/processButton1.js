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
var processButton1 = (function (_super) {
    __extends(processButton1, _super);
    function processButton1() {
        var _this = _super.call(this) || this;
        _this.sf = false;
        _this.skinName = processButtonSkin1;
        return _this;
    }
    processButton1.prototype.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.mc();
    };
    processButton1.prototype.mc = function () {
        var _this = this;
        this.sf = !this.sf;
        var im1_ap = this.sf ? 1 : 0;
        var im2_ap = this.sf ? 0 : 1;
        egret.Tween.get(this.im1).to({ alpha: im1_ap }, 1000);
        egret.Tween.get(this.im2).to({ alpha: im2_ap }, 1000).call(function () {
            _this.mc();
        });
    };
    processButton1.prototype.onBegin = function () {
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ scaleX: 0.8, scaleY: 0.8 }, 200);
    };
    processButton1.prototype.onEnd = function () {
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 200);
    };
    return processButton1;
}(eui.Component));
__reflect(processButton1.prototype, "processButton1");
//# sourceMappingURL=processButton1.js.map
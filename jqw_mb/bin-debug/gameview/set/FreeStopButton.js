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
var FreeStopButton = (function (_super) {
    __extends(FreeStopButton, _super);
    function FreeStopButton() {
        var _this = _super.call(this) || this;
        _this._select = false;
        _this.skinName = freeStopButtonSkin;
        return _this;
    }
    FreeStopButton.prototype.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.setlected = false;
    };
    FreeStopButton.prototype.onBegin = function () {
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ scaleX: 0.8, scaleY: 0.8 }, 200);
    };
    FreeStopButton.prototype.onEnd = function () {
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 200);
    };
    Object.defineProperty(FreeStopButton.prototype, "setlected", {
        get: function () {
            return this._select;
        },
        set: function (b) {
            this._select = b;
            this.alpha = !this._select ? 0.5 : 1;
            this.enabled = this._select;
        },
        enumerable: true,
        configurable: true
    });
    return FreeStopButton;
}(eui.Component));
__reflect(FreeStopButton.prototype, "FreeStopButton");
//# sourceMappingURL=FreeStopButton.js.map
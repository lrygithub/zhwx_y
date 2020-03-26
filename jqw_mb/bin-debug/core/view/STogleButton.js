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
var STogleButton = (function (_super) {
    __extends(STogleButton, _super);
    function STogleButton() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
        return _this;
    }
    STogleButton.prototype.onAdd = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    STogleButton.prototype.onRemove = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    STogleButton.prototype.onClick = function () {
        SoundManager.getInstance().playEffect(SoundConst.CHECKSTART);
    };
    return STogleButton;
}(eui.ToggleButton));
__reflect(STogleButton.prototype, "STogleButton");
//# sourceMappingURL=STogleButton.js.map
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
var QukTipsUI = (function (_super) {
    __extends(QukTipsUI, _super);
    function QukTipsUI() {
        var _this = _super.call(this) || this;
        _this.skinName = QukTipSkin;
        return _this;
    }
    QukTipsUI.prototype.onAdd = function () {
        _super.prototype.onAdd.call(this);
        this.registerEvent(this.closeBtn, egret.TouchEvent.TOUCH_TAP, function (e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            core.UIManager.closeUI(core.UIConst.QukTipsUI);
        }, this);
        this.registerEvent(this.qukLabel, egret.TouchEvent.TOUCH_TAP, function (e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            SetConst.SPEED_PLAY = true;
            GameManager.getInstance().dispatchEventWith(SetEvent.SET_SPEED_CHANGED);
            core.UIManager.closeUI(core.UIConst.QukTipsUI);
        }, this);
    };
    QukTipsUI.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
    };
    return QukTipsUI;
}(core.BaseUI));
__reflect(QukTipsUI.prototype, "QukTipsUI");
//# sourceMappingURL=QukTipsUI.js.map
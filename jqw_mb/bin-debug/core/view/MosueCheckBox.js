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
var MosueCheckBox = (function (_super) {
    __extends(MosueCheckBox, _super);
    function MosueCheckBox() {
        var _this = _super.call(this) || this;
        mouse.setButtonMode(_this, true);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
        return _this;
    }
    MosueCheckBox.prototype.onAdd = function () {
        this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onRollOver, this);
        this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onRollOut, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRollOut, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRollOver, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onRollOut, this);
    };
    MosueCheckBox.prototype.onRemove = function () {
        this.onRollOut();
        this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onRollOver, this);
        this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onRollOut, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRollOut, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRollOver, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onRollOut, this);
    };
    MosueCheckBox.prototype.onRollOver = function () {
        if (this.enabled == false) {
            this.currentState = this.selected ? 'rollOverAndDisabled' : 'disabled';
        }
        if (this.selected) {
            this.currentState = 'rollOverAndSelected';
        }
        else {
            this.currentState = 'rollOver';
        }
        this.dispatchEventWith(egret.Event.CHANGE);
    };
    MosueCheckBox.prototype.onRollOut = function () {
        this.currentState = '';
        this.dispatchEventWith(egret.Event.CHANGE);
    };
    MosueCheckBox.prototype.onClick = function () {
        SoundManager.getInstance().playEffect(SoundConst.CHECKSTART);
    };
    return MosueCheckBox;
}(eui.CheckBox));
__reflect(MosueCheckBox.prototype, "MosueCheckBox");
//# sourceMappingURL=MosueCheckBox.js.map
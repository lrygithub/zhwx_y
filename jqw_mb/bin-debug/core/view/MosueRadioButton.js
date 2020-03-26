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
var MosueRadioButton = (function (_super) {
    __extends(MosueRadioButton, _super);
    function MosueRadioButton() {
        var _this = _super.call(this) || this;
        mouse.setButtonMode(_this, true);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
        return _this;
    }
    MosueRadioButton.prototype.onAdd = function () {
        this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onRollOver, this);
        this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onRollOut, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRollOver, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onRollOut, this);
    };
    MosueRadioButton.prototype.onRemove = function () {
        this.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollOver, this);
        this.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRollOver, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onRollOut, this);
    };
    MosueRadioButton.prototype.onRollOver = function (e) {
        if (this.enabled == false)
            return;
        if (e.type == egret.TouchEvent.TOUCH_TAP)
            this.onClick();
        if (this.selected) {
            this.currentState = 'rollOverAndSelected';
        }
        else {
            this.currentState = 'rollOver';
        }
        this.updataUI();
        this.dispatchEventWith(egret.Event.CHANGE);
    };
    MosueRadioButton.prototype.onRollOut = function () {
        this.currentState = '';
        this.updataUI();
        this.dispatchEventWith(egret.Event.CHANGE);
    };
    MosueRadioButton.prototype.onClick = function () {
        SoundManager.getInstance().playEffect(SoundConst.CHECKSTART);
    };
    MosueRadioButton.prototype.updataUI = function () {
        if (this.currentState == 'rollOver') {
            this.updataText(true);
        }
        else {
            this.updataText(false);
        }
    };
    MosueRadioButton.prototype.updataText = function (isliang) {
        // let test = this.colorFlilter.matrix;
        // test[4] += isliang ? this.l : 0;
        // test[9] += isliang ? this.l : 0;
        // test[14] += isliang ? this.l : 0;
        // this.colorFlilter.matrix = test;
        // (this.labelDisplay as eui.Label).filters = [this.colorFlilter];
        this.labelDisplay.textColor = isliang ? 0xffffff : 0x94989e;
    };
    return MosueRadioButton;
}(eui.RadioButton));
__reflect(MosueRadioButton.prototype, "MosueRadioButton");
//# sourceMappingURL=MosueRadioButton.js.map
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
var MouseButton2 = (function (_super) {
    __extends(MouseButton2, _super);
    function MouseButton2() {
        var _this = _super.call(this) || this;
        mouse.setButtonMode(_this, true);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
        return _this;
    }
    MouseButton2.prototype.onAdd = function () {
        //this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollOver, this);
        //this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
        this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onRollOver, this);
        this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onRollOut, this);
        egret.MainContext.instance.stage.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
        this.iconDisplay = new eui.Image();
        this.iconDisplay.visible = false;
        this.addChild(this.iconDisplay);
    };
    MouseButton2.prototype.onRemove = function () {
        this.onRollOut();
        //this.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollOver, this);
        //this.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
        this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onRollOver, this);
        this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onRollOut, this);
        egret.MainContext.instance.stage.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
    };
    MouseButton2.prototype.onRollOver = function () {
        if (this.enabled == false)
            return;
        this.currentState = 'rollOver';
        this.rollover.call(this.callobj, this);
        this.dispatchEventWith(egret.Event.CHANGE);
    };
    MouseButton2.prototype.onRollOut = function () {
        this.currentState = '';
        this.rollout.call(this.callobj, this);
        this.dispatchEventWith(egret.Event.CHANGE);
    };
    MouseButton2.prototype.setF = function (_rollover, _rollout, _callobj) {
        this.rollover = _rollover;
        this.rollout = _rollout;
        this.callobj = _callobj;
    };
    MouseButton2.prototype.setEnable = function (b) {
        var _this = this;
        this.enabled = b;
        this.iconDisplay.visible = !b;
        var index = this.name.charAt(2);
        if (!b) {
            egret.Tween.get(this, { loop: true }).wait(500).call(function () {
                _this.icon = 'line' + index + '_aicon_png';
            }, this).wait(500).call(function () {
                _this.icon = 'line' + index + '_icon_png';
            }, this).wait(500).call(function () {
                _this.icon = 'line' + index + '_aicon_png';
            }, this);
        }
        else {
            egret.Tween.removeTweens(this);
            this.icon = 'line' + index + '_icon_png';
        }
    };
    return MouseButton2;
}(eui.Button));
__reflect(MouseButton2.prototype, "MouseButton2");
//# sourceMappingURL=MouseButton2.js.map
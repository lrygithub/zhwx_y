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
var MouseButton3 = (function (_super) {
    __extends(MouseButton3, _super);
    function MouseButton3() {
        var _this = _super.call(this) || this;
        _this.l = 100;
        _this.initFiter();
        return _this;
    }
    MouseButton3.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.updataUI();
    };
    MouseButton3.prototype.onRollOver = function () {
        if (this.enabled == false)
            return;
        this.currentState = 'rollOver';
        this.updataUI();
    };
    MouseButton3.prototype.onRollOut = function () {
        this.currentState = '';
        this.updataUI();
    };
    MouseButton3.prototype.updataUI = function () {
        if (this.currentState == 'rollOver') {
            this.updataText(true);
        }
        else {
            this.updataText(false);
        }
    };
    MouseButton3.prototype.updataText = function (isliang) {
        this.labelDisplay.textColor = isliang ? 0xffffff : 0x94989e;
    };
    MouseButton3.prototype.initFiter = function () {
        //内亮度
        var colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        if (!this.colorFlilter) {
            this.colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        }
    };
    return MouseButton3;
}(MouseButton));
__reflect(MouseButton3.prototype, "MouseButton3");
//# sourceMappingURL=MouseButton3.js.map
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
var DesButton = (function (_super) {
    __extends(DesButton, _super);
    function DesButton() {
        var _this = _super.call(this) || this;
        _this.skinName = DesButtonSkin;
        return _this;
    }
    DesButton.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SoundManager.getInstance().playEffect(SoundConst.CHECKSTART);
        }, this);
    };
    Object.defineProperty(DesButton.prototype, "enable", {
        get: function () {
            return this.btn.enabled;
        },
        set: function (b) {
            this.btn.enabled = b;
            this.updataText(b);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DesButton.prototype, "text", {
        get: function () {
            return this.tLabel.text;
        },
        set: function (t) {
            this.tLabel.text = t;
        },
        enumerable: true,
        configurable: true
    });
    DesButton.prototype.updataText = function (isliang) {
        // let test = this.colorFlilter.matrix;
        // test[4] += isliang ? this.l : 0;
        // test[9] += isliang ? this.l : 0;
        // test[14] += isliang ? this.l : 0;
        // this.colorFlilter.matrix = test;
        // (this.labelDisplay as eui.Label).filters = [this.colorFlilter];
        this.tLabel.textColor = isliang ? 0x94989e : 0x666a70;
    };
    return DesButton;
}(eui.Component));
__reflect(DesButton.prototype, "DesButton");
//# sourceMappingURL=DesButton.js.map
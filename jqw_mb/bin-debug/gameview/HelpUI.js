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
var HelpUI = (function (_super) {
    __extends(HelpUI, _super);
    function HelpUI() {
        var _this = _super.call(this) || this;
        _this.skinName = helpSkin;
        _this.init();
        return _this;
    }
    HelpUI.prototype.init = function () {
        this.updataType();
    };
    HelpUI.prototype.onAdd = function () {
        _super.prototype.onAdd.call(this);
        //core.TimerManager.instance.addTick(1000, -1, this.onFrame, this);
        this.registerEvent(this.closeHelp, egret.TouchEvent.TOUCH_TAP, function () {
            core.UIManager.closeUI(core.UIConst.HelpUI);
        }, this);
    };
    HelpUI.prototype.updataHor = function () {
        this.updataType();
    };
    HelpUI.prototype.updataVer = function () {
        this.updataType();
    };
    HelpUI.prototype.updataType = function () {
        if (window.innerWidth >= window.innerHeight) {
            this.currentState = 'hor';
        }
        else {
            this.currentState = 'ver';
        }
    };
    return HelpUI;
}(core.BaseUI));
__reflect(HelpUI.prototype, "HelpUI");
//# sourceMappingURL=HelpUI.js.map
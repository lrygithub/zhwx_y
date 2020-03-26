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
var NetCloseUI = (function (_super) {
    __extends(NetCloseUI, _super);
    function NetCloseUI() {
        var _this = _super.call(this) || this;
        _this.skinName = netcloseSkin;
        return _this;
    }
    NetCloseUI.prototype.onAdd = function () {
        var _this = this;
        _super.prototype.onAdd.call(this);
        this.registerEvent(this.okRect, egret.TouchEvent.TOUCH_TAP, function () {
            _this.okcallfun && _this.okcallfun();
            core.UIManager.closeUI(core.UIConst.NetCloseUI);
        }, this);
    };
    NetCloseUI.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
    };
    NetCloseUI.prototype.shows = function (type, des, callfun) {
        if (des === void 0) { des = ''; }
        if (callfun === void 0) { callfun = null; }
        this.callfun = callfun;
    };
    return NetCloseUI;
}(core.BaseUI));
__reflect(NetCloseUI.prototype, "NetCloseUI");
//# sourceMappingURL=NetCloseUI.js.map
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
var NormalOkTips = (function (_super) {
    __extends(NormalOkTips, _super);
    function NormalOkTips() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        _this.skinName = NormalOkTipsSkin;
        return _this;
    }
    return NormalOkTips;
}(BaseTips));
__reflect(NormalOkTips.prototype, "NormalOkTips");
//# sourceMappingURL=NormalOkTips.js.map
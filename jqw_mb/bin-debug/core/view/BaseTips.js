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
var BaseTips = (function (_super) {
    __extends(BaseTips, _super);
    function BaseTips() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        return _this;
    }
    return BaseTips;
}(eui.Component));
__reflect(BaseTips.prototype, "BaseTips");
//# sourceMappingURL=BaseTips.js.map
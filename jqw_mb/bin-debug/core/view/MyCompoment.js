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
var MyCompoment = (function (_super) {
    __extends(MyCompoment, _super);
    function MyCompoment() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
        return _this;
    }
    MyCompoment.prototype.onAdd = function () {
    };
    MyCompoment.prototype.onRemove = function () {
    };
    return MyCompoment;
}(eui.Component));
__reflect(MyCompoment.prototype, "MyCompoment");
//# sourceMappingURL=MyCompoment.js.map
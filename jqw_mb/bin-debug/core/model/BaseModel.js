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
var core;
(function (core) {
    /**
     * 模块管理基类
     */
    var BaseModel = (function (_super) {
        __extends(BaseModel, _super);
        function BaseModel() {
            return _super.call(this) || this;
        }
        return BaseModel;
    }(egret.EventDispatcher));
    core.BaseModel = BaseModel;
    __reflect(BaseModel.prototype, "core.BaseModel");
})(core || (core = {}));
//# sourceMappingURL=BaseModel.js.map
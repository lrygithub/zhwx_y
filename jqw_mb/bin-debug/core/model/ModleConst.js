var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    var ModleConst = (function () {
        function ModleConst() {
        }
        /**
         * 常用信息模块
         */
        ModleConst.COMMON_MODLE = 'ComonModelManager';
        return ModleConst;
    }());
    core.ModleConst = ModleConst;
    __reflect(ModleConst.prototype, "core.ModleConst");
})(core || (core = {}));
//# sourceMappingURL=ModleConst.js.map
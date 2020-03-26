var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var MCUtils = (function () {
        function MCUtils() {
        }
        MCUtils.getMc = function (name, callback, action) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            if (action === void 0) { action = ""; }
            var texture = RES.getRes(name + "_png");
            if (texture) {
                var mc = createMc(action);
                if (callback) {
                    callback(mc);
                }
                return mc;
            }
            else {
                RES.getResAsync(name + "_png", function () {
                    RES.getResAsync(name + "_json", function () {
                        if (callback) {
                            callback(createMc(action));
                        }
                    }, _this);
                }, this);
                return null;
            }
            function createMc(action) {
                var texture = RES.getRes(name + "_png");
                var data = RES.getRes(name + "_json");
                //创建动画工厂
                var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
                //创建 MovieClip，将工厂生成的 MovieClipData 传入参数
                var mc = new egret.MovieClip(mcDataFactory.generateMovieClipData(action));
                mc['fac'] = mcDataFactory;
                mc.touchEnabled = false;
                return mc;
            }
        };
        MCUtils.changeAction = function (mc, action) {
            var fac = mc['fac'];
            mc.movieClipData = fac.generateMovieClipData(action);
        };
        return MCUtils;
    }());
    game.MCUtils = MCUtils;
    __reflect(MCUtils.prototype, "game.MCUtils");
})(game || (game = {}));
//# sourceMappingURL=MCUtils.js.map
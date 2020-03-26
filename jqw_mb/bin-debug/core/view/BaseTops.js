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
    var BaseTops = (function (_super) {
        __extends(BaseTops, _super);
        function BaseTops() {
            var _this = _super.call(this) || this;
            _this.rect = new eui.Rect();
            _this.rect.alpha = 0;
            _this.rect.width = GameConfig.WIDTH;
            _this.rect.height = GameConfig.HEIGHT;
            return _this;
        }
        BaseTops.prototype.show = function () {
            var layer = core.LayerManager.getInstance().getLayer(core.LayerManager.Layer_Top);
            layer.addChild(this.rect);
        };
        BaseTops.prototype.hide = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            if (this.rect.parent) {
                var layer = core.LayerManager.getInstance().getLayer(core.LayerManager.Layer_Top);
                layer.removeChild(this.rect);
            }
        };
        return BaseTops;
    }(eui.Component));
    core.BaseTops = BaseTops;
    __reflect(BaseTops.prototype, "core.BaseTops");
})(core || (core = {}));
//# sourceMappingURL=BaseTops.js.map
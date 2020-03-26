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
var TipsManager = (function (_super) {
    __extends(TipsManager, _super);
    function TipsManager() {
        var _this = _super.call(this) || this;
        _this.showY = 800;
        _this.isDebug = true;
        _this.tipsArr = [];
        core.FrameEventCenter.getInstance().addFrameEventListener(_this.onEnterFrame, _this);
        return _this;
    }
    TipsManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new TipsManager();
        }
        return this._instance;
    };
    TipsManager.prototype.showLog = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (this.isDebug) {
            console.log.apply(console, [message].concat(optionalParams));
        }
    };
    /**
     * 显示错误信息
     */
    TipsManager.prototype.showTips = function (str, type) {
        var _this = this;
        if (type === void 0) { type = 1; }
        var complete = function () {
            var tips;
            switch (type) {
                case 0:
                    tips = new NormalErrorTips();
                    //egret.Tween.get(tips).to({x:GameConfig.WIDTH/2-tips.width/2+120},50,egret.Ease.backIn);
                    break;
                case 1:
                    tips = new NormalOkTips();
                    //egret.Tween.get(tips).to({x:GameConfig.WIDTH/2-tips.width/2+120},50,egret.Ease.backIn);
                    break;
            }
            tips.textTips.text = str;
            _this.tipsArr.push(tips);
            tips.x = GameConfig.WIDTH / 2 - tips.width / 2 + 80;
            if (_this.tipsArr.length > 1) {
                var ltips = _this.tipsArr[_this.tipsArr.length - 2];
                if (ltips.y < _this.showY - ltips.height) {
                    tips.y = _this.showY;
                }
                else if (ltips.y < GameConfig.HEIGHT - ltips.height - tips.height) {
                    tips.y = ltips.y + ltips.height;
                }
                else {
                    tips.y = ltips.y + ltips.height;
                    for (var i = 0; i < _this.tipsArr.length; i++) {
                        _this.tipsArr[i].y -= tips.height;
                    }
                }
            }
            else if (_this.tipsArr.length == 1) {
                tips.y = _this.showY;
            }
            core.LayerManager.getInstance().addUI(tips, core.LayerManager.Layer_Tip);
        };
        complete();
    };
    TipsManager.prototype.onEnterFrame = function (t) {
        if (this.tipsArr.length > 0) {
            if (this.tipsArr[0].alpha <= 0) {
                this.tipsArr[0].parent.removeChild(this.tipsArr[0]);
                this.tipsArr.shift();
            }
        }
        for (var i = 0; i < this.tipsArr.length; i++) {
            this.tipsArr[i].y -= 4;
            this.tipsArr[i].alpha -= 0.004;
        }
    };
    return TipsManager;
}(egret.EventDispatcher));
__reflect(TipsManager.prototype, "TipsManager");
//# sourceMappingURL=TipsManager.js.map
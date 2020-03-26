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
var logshow = (function (_super) {
    __extends(logshow, _super);
    function logshow() {
        return _super.call(this) || this;
    }
    logshow.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.exitResin();
    };
    /**
     * 进入正常
     */
    logshow.prototype.exitResin = function () {
        var _this = this;
        egret.Tween.removeTweens(this['icon_1']);
        egret.Tween.removeTweens(this['icon_2']);
        egret.Tween.removeTweens(this['icon_3']);
        egret.Tween.removeTweens(this['icon_4']);
        egret.Tween.removeTweens(this['icon_5']);
        egret.Tween.removeTweens(this['icon_6']);
        this['icon_1'].alpha = 1;
        this['icon_1'].y = 25;
        this['icon_2'].alpha = 0;
        this['icon_2'].y = -40;
        this['icon_3'].alpha = 0;
        this['icon_3'].y = -90;
        this['icon_4'].alpha = 0;
        this['icon_4'].y = -40;
        this['icon_5'].alpha = 0;
        this['icon_5'].y = -90;
        this['icon_6'].alpha = 0;
        this['icon_6'].y = -40;
        var index = 0;
        var valueIndex = 1;
        egret.setInterval(function () {
            switch (valueIndex) {
                case 1:
                    valueIndex = 2;
                    egret.Tween.get(_this['icon_' + 6]).to({ alpha: 0, y: -40 }, 500).call(function () {
                        egret.Tween.get(_this['icon_' + 1]).to({ alpha: 1, y: 25 }, 500);
                    });
                    break;
                case 2:
                    valueIndex = 3;
                    egret.Tween.get(_this['icon_' + 1]).to({ alpha: 0, y: -90 }, 500).call(function () {
                        egret.Tween.get(_this['icon_' + 2]).to({ alpha: 1, y: 30 }, 500);
                    });
                    break;
                case 3:
                    valueIndex = 4;
                    egret.Tween.get(_this['icon_' + 2]).to({ y: -40, alpha: 0 }, 500).call(function () {
                        egret.Tween.get(_this['icon_' + 3]).to({ alpha: 1, y: 25 }, 500);
                    });
                    break;
                case 4:
                    valueIndex = 5;
                    egret.Tween.get(_this['icon_' + 3]).to({ alpha: 0, y: -90 }, 500).call(function () {
                        egret.Tween.get(_this['icon_' + 4]).to({ alpha: 1, y: 30 }, 500);
                    });
                    break;
                case 5:
                    valueIndex = 6;
                    egret.Tween.get(_this['icon_' + 4]).to({ alpha: 0, y: -40 }, 500).call(function () {
                        egret.Tween.get(_this['icon_' + 5]).to({ alpha: 1, y: 25 }, 500);
                    });
                    break;
                case 6:
                    valueIndex = 1;
                    egret.Tween.get(_this['icon_' + 5]).to({ alpha: 0, y: -90 }, 200).call(function () {
                        egret.Tween.get(_this['icon_' + 6]).to({ alpha: 1, y: 30 }, 200);
                    });
                    ;
                    break;
            }
        }, this, 17000);
    };
    return logshow;
}(eui.Component));
__reflect(logshow.prototype, "logshow");
//# sourceMappingURL=logshow.js.map
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
var TipItem = (function (_super) {
    __extends(TipItem, _super);
    function TipItem() {
        var _this = _super.call(this) || this;
        _this.skinName = TipItemSkin;
        return _this;
    }
    TipItem.prototype.setData = function (data, isAniamtion) {
        var _this = this;
        if (isAniamtion === void 0) { isAniamtion = false; }
        this._data = data;
        this.icons.source = 'show_icon_' + this._data.type + '_png';
        this.bgImg.source = 'show_bg_' + this._data.type + '_png';
        this.windesLabel.text = 'X' + this._data.count + ' 赢';
        this.winRewardLabel.text = '￥' + GameManager.numberToCommonStr1(this._data.reward);
        if (isAniamtion) {
            this.icons.scaleX = this.icons.scaleY = 0;
            this.bgGroup.x = -252;
            egret.Tween.get(this.icons).to({ scaleX: 1, scaleY: 1 }, 350, egret.Ease.bounceOut).call(function () {
                egret.Tween.get(_this.bgGroup).to({ x: 0 }, 200);
            }, this);
        }
        else {
            this.icons.scaleX = this.icons.scaleY = 1;
            this.bgGroup.x = 0;
        }
    };
    return TipItem;
}(eui.Component));
__reflect(TipItem.prototype, "TipItem");
//# sourceMappingURL=TipItem.js.map
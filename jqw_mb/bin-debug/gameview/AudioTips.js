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
var AudioTips = (function (_super) {
    __extends(AudioTips, _super);
    function AudioTips() {
        var _this = _super.call(this) || this;
        _this.skinName = AuduTipSkin;
        return _this;
    }
    AudioTips.prototype.onAdd = function () {
        var _this = this;
        _super.prototype.onAdd.call(this);
        this.registerEvent(this.okRect, egret.TouchEvent.TOUCH_TAP, function (e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            _this.okcallfun && _this.okcallfun();
            core.UIManager.closeUI(core.UIConst.AudioTips);
            SoundManager.getInstance().setBgOn(true);
            SoundManager.getInstance().setEffectOn(true);
            GameManager.getInstance().dispatchEventWith(SetEvent.SET_MUSIC_CHANGE);
        }, this);
        this.registerEvent(this.cancleRect, egret.TouchEvent.TOUCH_TAP, function (e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            _this.canclecallfun && _this.canclecallfun();
            core.UIManager.closeUI(core.UIConst.AudioTips);
            SoundManager.getInstance().setBgOn(false);
            SoundManager.getInstance().setEffectOn(false);
            GameManager.getInstance().dispatchEventWith(SetEvent.SET_MUSIC_CHANGE);
        }, this);
        this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, function (e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
        }, this);
        this.registerEvent(this.checkButton, egret.TouchEvent.TOUCH_TAP, function (e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            egret.localStorage.setItem('music', _this.checkButton.selected ? '1' : '0');
        }, this);
    };
    AudioTips.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
    };
    AudioTips.prototype.shows = function (type, des, callfun) {
        if (des === void 0) { des = ''; }
        if (callfun === void 0) { callfun = null; }
        this.desLabel.text = des;
        this.callfun = callfun;
    };
    AudioTips.prototype.updataVer = function () {
        // if (GameConfig.HEIGHT / GameConfig.WIDTH < 1.6) {
        // 	this.mainGroup.scaleX = 1.25;
        // 	this.mainGroup.scaleY = 1.25;
        // }
        // else {
        this.mainGroup.scaleX = 1;
        this.mainGroup.scaleY = 1;
        //}
    };
    AudioTips.prototype.updataHor = function () {
        // if (GameConfig.WIDTH / GameConfig.HEIGHT > 1.8) {
        // 	this.mainGroup.scaleX = 1.25;
        // 	this.mainGroup.scaleY = 1.25;
        // }
        // else {
        this.mainGroup.scaleX = 1;
        this.mainGroup.scaleY = 1;
        //}
    };
    return AudioTips;
}(core.BaseUI));
__reflect(AudioTips.prototype, "AudioTips");
//# sourceMappingURL=AudioTips.js.map
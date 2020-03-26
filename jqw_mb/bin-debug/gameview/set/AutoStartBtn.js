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
var AutoStartBtn = (function (_super) {
    __extends(AutoStartBtn, _super);
    function AutoStartBtn() {
        var _this = _super.call(this) || this;
        _this._isPlay = false;
        return _this;
    }
    AutoStartBtn.prototype.childrenCreated = function () {
    };
    Object.defineProperty(AutoStartBtn.prototype, "isPlay", {
        get: function () {
            return this._isPlay;
        },
        set: function (b) {
            this._isPlay = b;
            this.kstxt.source = this._isPlay ? 'tzzdyx_png' : 'kszdyx_png';
            this.zjbg.source = this.isPlay ? 'glow_red@2x_png' : 'glow_yellow@2x2_png';
            this.bg.source = this.isPlay ? 'stop_icon@2x_png' : 'autoplay_sanjiao@2x_png';
            // this.countLabel.visible=this.isPlay;
        },
        enumerable: true,
        configurable: true
    });
    return AutoStartBtn;
}(eui.Component));
__reflect(AutoStartBtn.prototype, "AutoStartBtn");
//# sourceMappingURL=AutoStartBtn.js.map
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
var MusicBtn = (function (_super) {
    __extends(MusicBtn, _super);
    function MusicBtn() {
        var _this = _super.call(this) || this;
        _this._valume = 1;
        return _this;
    }
    MusicBtn.prototype.onAdd = function () {
        _super.prototype.onAdd.call(this);
        this.valume = SoundManager.getInstance().getBgVolume();
        this.updataImg();
    };
    Object.defineProperty(MusicBtn.prototype, "valume", {
        get: function () {
            return this._valume;
        },
        set: function (v) {
            this._valume = v;
            this.updataImg();
        },
        enumerable: true,
        configurable: true
    });
    MusicBtn.prototype.onRollOver = function () {
        var _this = this;
        _super.prototype.onRollOver.call(this);
        egret.callLater(function () {
            _this.updataImg();
        }, this);
    };
    MusicBtn.prototype.onRollOut = function () {
        var _this = this;
        _super.prototype.onRollOut.call(this);
        egret.callLater(function () {
            _this.updataImg();
        }, this);
    };
    MusicBtn.prototype.updataImg = function () {
        if (this.selected) {
            if (this.valume == 0) {
                this.selected = false;
                this.currentState = '';
                this.volueImg.source = '';
                return;
            }
            var index = Math.ceil(this.valume / 0.334);
            this.volueImg.source = this.currentState == 'rollOverAndSelected' ? this.volueImg.source = 'open_liang' + index + '_png' : this.volueImg.source = 'open_an' + index + '_png';
        }
        else {
            if (this.valume > 0) {
                this.selected = true;
                this.currentState = '';
                var index = Math.ceil(this.valume / 0.334);
                this.volueImg.source = this.currentState == 'rollOverAndSelected' ? this.volueImg.source = 'open_liang' + index + '_png' : this.volueImg.source = 'open_an' + index + '_png';
                return;
            }
            this.volueImg.source = '';
        }
    };
    return MusicBtn;
}(MosueCheckBox));
__reflect(MusicBtn.prototype, "MusicBtn");
//# sourceMappingURL=MusicBtn.js.map
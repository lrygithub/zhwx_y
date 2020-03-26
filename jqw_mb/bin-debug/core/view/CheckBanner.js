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
var CheckBanner = (function (_super) {
    __extends(CheckBanner, _super);
    function CheckBanner() {
        var _this = _super.call(this) || this;
        _this.betArr = [];
        _this.btnArr = [];
        _this.leftIndex = 0;
        _this.curIndex = 0;
        return _this;
        //this.skinName = CheckBanerSkin;
    }
    CheckBanner.prototype.onAdd = function () {
        _super.prototype.onAdd.call(this);
        this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubIndex, this);
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddIndex, this);
    };
    CheckBanner.prototype.onRemoved = function () {
        _super.prototype.onRemove.call(this);
        this.leftBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubIndex, this);
        this.rightBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddIndex, this);
    };
    CheckBanner.prototype.initArr = function (arr, index) {
        this.betArr = arr;
        if (!this.bGroup) {
            this.bGroup = new eui.RadioButtonGroup();
            this.bGroup.addEventListener(egret.Event.CHANGE, this.onChange, this);
        }
        if (this.btnArr.length == 0) {
            for (var i = 0; i < 10; i++) {
                var btn = this['btn' + i];
                if (btn) {
                    this.btnArr.push(btn);
                    btn.group = this.bGroup;
                    btn.value = i;
                }
            }
        }
        this.setIndex(index);
    };
    CheckBanner.prototype.onChange = function () {
        var v = this.bGroup.selectedValue;
        this.curIndex = v;
        this.updata();
        this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
    };
    CheckBanner.prototype.setIndex = function (index) {
        this.curIndex = 1;
        this.leftIndex = index - 1;
        this.updata();
        this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
    };
    CheckBanner.prototype.getIndex = function () {
        return this.curIndex + this.leftIndex;
    };
    CheckBanner.prototype.onSubIndex = function () {
        if (this.curIndex > 0) {
            this.curIndex--;
        }
        else {
            if (this.leftIndex > 0) {
                this.leftIndex--;
            }
        }
        this.updata();
        this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
    };
    CheckBanner.prototype.onAddIndex = function () {
        if (this.curIndex < this.btnArr.length - 1) {
            this.curIndex++;
        }
        else {
            if (this.leftIndex < this.betArr.length - this.btnArr.length) {
                this.leftIndex++;
            }
        }
        this.updata();
        this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
    };
    CheckBanner.prototype.updata = function () {
        if (this.leftIndex == 0 && this.curIndex == 0) {
            this.leftBtn.enabled = false;
        }
        else {
            this.leftBtn.enabled = true;
        }
        if (this.leftIndex == this.betArr.length - this.btnArr.length) {
            this.rightBtn.enabled = false;
        }
        else {
            this.rightBtn.enabled = true;
        }
        this.btnArr[this.curIndex].selected = true;
        for (var i = 0; i < this.btnArr.length; i++) {
            this.btnArr[i].label = this.betArr[this.leftIndex + i].toFixed(2);
        }
    };
    CheckBanner.prototype.setTouchEnable = function (b) {
        this.leftBtn.enabled = this.rightBtn.enabled = b;
        for (var i = 0; i < this.btnArr.length; i++) {
            this.btnArr[i].enabled = b;
        }
    };
    CheckBanner.prototype.setEnable = function (b) {
        for (var i = 0; i < this.btnArr.length; i++) {
            this.btnArr[i].enabled = b;
        }
        this.leftBtn.enabled = b;
        this.rightBtn.enabled = b;
    };
    return CheckBanner;
}(MyCompoment));
__reflect(CheckBanner.prototype, "CheckBanner");
//# sourceMappingURL=CheckBanner.js.map
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
var TipBanner = (function (_super) {
    __extends(TipBanner, _super);
    function TipBanner() {
        var _this = _super.call(this) || this;
        _this.itemArr = [];
        _this.index = 0;
        _this.jiange = 22;
        return _this;
    }
    TipBanner.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.subBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        this.updataUI();
    };
    TipBanner.prototype.updataHor = function () {
        this.index = this.itemArr.length > 4 ? this.itemArr.length - 4 : 0;
        var qy = 3 * 98 + this.index * 98;
        for (var i = 0; i < this.itemArr.length; i++) {
            this.itemArr[i].y = qy - i * this.itemArr[i].height;
            this.itemArr[i].x = 0;
        }
        this.updataUI();
    };
    TipBanner.prototype.updataVer = function () {
        this.index = this.itemArr.length > 3 ? this.itemArr.length - 3 : 0;
        var qx = -this.index * (225 + 22);
        for (var i = 0; i < this.itemArr.length; i++) {
            this.itemArr[i].x = qx + i * (this.itemArr[i].width + 22);
            this.itemArr[i].y = 0;
        }
        this.updataUI();
    };
    TipBanner.prototype.showItem = function (data) {
        var lastItem = this.itemArr.length > 0 ? this.itemArr[this.itemArr.length - 1] : null;
        var item = new TipItem();
        item.setData(data);
        this.itemArr.push(item);
        this.KGroup.addChild(item);
        var ishor = window.innerWidth > window.innerHeight ? true : false;
        var showNum = ishor ? 4 : 3;
        item.y = ishor ? (showNum - this.itemArr.length) * item.height : 0;
        if (item.y < 0)
            item.y = 0;
        item.x = ishor ? -300 : 800;
        var tx;
        if (this.itemArr.length > showNum) {
            for (var i = 0; i < this.itemArr.length - 1; i++) {
                var items = this.itemArr[i];
                var tys = items.y + items.height;
                var txs = items.x - items.width - this.jiange;
                if (ishor) {
                    egret.Tween.get(items).to({ y: tys }, 200);
                }
                else {
                    egret.Tween.get(items).to({ x: txs }, 200);
                }
            }
            this.index++;
            this.subBtn.visible = true;
            this.subBtn.enabled = false;
            tx = ishor ? 0 : (showNum - 1) * item.width + this.jiange + this.jiange;
            egret.Tween.get(item).to({ x: tx }, 200);
        }
        else {
            tx = ishor ? 0 : (this.itemArr.length - 1) * (item.width + this.jiange);
            egret.Tween.get(item).to({ x: tx }, 200);
        }
    };
    TipBanner.prototype.clear = function () {
        this.itemArr.length = 0;
        this.index = 0;
        for (var i = 0; i < this.KGroup.numChildren; i++) {
            var item = this.KGroup.getChildAt(i);
            item.visible = false;
        }
        this.addBtn.visible = this.subBtn.visible = false;
    };
    TipBanner.prototype.updataUI = function (isa) {
        if (isa === void 0) { isa = false; }
        var s = this.currentState == 'hor' ? 4 : 3;
        this.addBtn.visible = this.subBtn.visible = this.itemArr.length > s;
        this.subBtn.enabled = this.index > 0 ? true : false;
        this.addBtn.enabled = this.index < this.itemArr.length - s ? true : false;
    };
    TipBanner.prototype.onTab = function (e) {
        var s = this.currentState == 'hor' ? 4 : 3;
        switch (e.currentTarget) {
            case this.subBtn:
                if (this.index > 0) {
                    this.index--;
                    this.sub();
                }
                this.subBtn.enabled = this.index > 0 ? true : false;
                this.addBtn.enabled = this.index < this.itemArr.length - s ? true : false;
                break;
            case this.addBtn:
                if (this.index < this.itemArr.length - s) {
                    this.index++;
                    this.add();
                }
                this.subBtn.enabled = this.index > 0 ? true : false;
                this.addBtn.enabled = this.index < this.itemArr.length - s ? true : false;
                break;
        }
    };
    TipBanner.prototype.sub = function () {
        for (var i = 0; i < this.itemArr.length; i++) {
            if (this.currentState == 'hor') {
                this.itemArr[i].y -= this.itemArr[i].height;
            }
            else {
                this.itemArr[i].x += this.itemArr[i].width + this.jiange;
            }
        }
    };
    TipBanner.prototype.add = function () {
        for (var i = 0; i < this.itemArr.length; i++) {
            if (this.currentState == 'hor') {
                this.itemArr[i].y += this.itemArr[i].height;
            }
            else {
                this.itemArr[i].x -= this.itemArr[i].width + this.jiange;
            }
        }
    };
    return TipBanner;
}(eui.Component));
__reflect(TipBanner.prototype, "TipBanner");
//# sourceMappingURL=TipBanner.js.map
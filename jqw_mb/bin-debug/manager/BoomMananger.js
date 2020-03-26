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
var BoomMananger = (function (_super) {
    __extends(BoomMananger, _super);
    function BoomMananger() {
        var _this = _super.call(this) || this;
        _this.mcPool = {};
        _this.curPool = {};
        return _this;
    }
    BoomMananger.getInstance = function () {
        if (!this._instance) {
            this._instance = new BoomMananger();
        }
        return this._instance;
    };
    BoomMananger.prototype.createMC = function (name) {
        var mc;
        if (this.mcPool[name] && this.mcPool[name].length > 0) {
            mc = this.mcPool[name].pop();
        }
        else {
            mc = game.MCUtils.getMc(name);
        }
        mc.isDie = false;
        if (!this.curPool[name]) {
            this.curPool[name] = [];
        }
        this.curPool[name].push(mc);
        return mc;
    };
    BoomMananger.prototype.onUpdata = function () {
        for (var key in this.curPool) {
            var arr = this.curPool[key];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].isDie) {
                    var s = arr.splice(i, 1);
                    if (!this.mcPool[key]) {
                        this.mcPool[key] = [];
                    }
                    this.mcPool[key].unShift(s);
                }
            }
        }
    };
    return BoomMananger;
}(egret.EventDispatcher));
__reflect(BoomMananger.prototype, "BoomMananger");
//# sourceMappingURL=BoomMananger.js.map
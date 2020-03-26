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
var GamePentCompoment = (function (_super) {
    __extends(GamePentCompoment, _super);
    function GamePentCompoment() {
        var _this = _super.call(this) || this;
        _this.skinName = GamePentSkin;
        return _this;
    }
    GamePentCompoment.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.clear();
        //let i: number = 6;
        // egret.setInterval(() => {
        // 	this.showLine(i, [{ x: 0, y: vo.GameData.lineObj['' + i][0] }, { x: 4, y: vo.GameData.lineObj['' + i][4] }]);
        // 	this.showKuang(i, [{ x: 1, y: vo.GameData.lineObj['' + i][1] }, { x: 2, y: vo.GameData.lineObj['' + i][2] }, { x: 3, y: vo.GameData.lineObj['' + i][3] }]);
        // 	i++;
        // 	if (i > 9) i = 1;
        // }, this, 1000);
        //this.drallall();
        GameManager.getInstance().addEventListener(SetEvent.SET_LINE_CHANGE, function () {
            _this.showLineArr(vo.GameData.line);
        }, this);
        this.clearReward();
    };
    GamePentCompoment.prototype.clear = function () {
        this.kuangGroup.visible = false;
        this.tipGroup.visible = false;
        this.lineGroup.visible = false;
        this.topGroup.visible = false;
    };
    GamePentCompoment.prototype.showTipLine = function (line) {
        this.tipGroup.visible = true;
        this['gr' + line].visible = true;
        this['gl' + line].visible = true;
    };
    GamePentCompoment.prototype.clearTip = function () {
        this.tipGroup.visible = false;
        for (var i = 1; i < 10; i++) {
            this['gr' + i].visible = false;
            this['gl' + i].visible = false;
        }
    };
    GamePentCompoment.prototype.drallall = function () {
        var colarr = [0x000000, 0x999999, 0xffddaa, 0x887799];
        this.gGroup.removeChildren();
        this.lineGroup.visible = true;
        this.gGroup.visible = true;
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 3; j++) {
                var rect = new eui.Rect();
                rect.fillColor = colarr[Math.floor(Math.random() * 4)];
                rect.x = i * 210 + 69;
                rect.y = j * 198;
                rect.width = 213;
                rect.height = 210;
                rect.ellipseWidth = 30;
                rect.ellipseHeight = 30;
                this.gGroup.addChild(rect);
            }
        }
    };
    GamePentCompoment.prototype.showLine = function (line, arr) {
        if (arr === void 0) { arr = null; }
        this.lineGroup.visible = true;
        this.gGroup.removeChildren();
        var img;
        if (arr == null)
            return;
        for (var i = 1; i < 10; i++) {
            img = this['line' + i];
            if (line == i) {
                img.visible = true;
                for (var i_1 = 0; i_1 < arr.length; i_1++) {
                    var rect = new eui.Rect();
                    rect.fillColor = 0x000000;
                    // rect.x = arr[i].X * 213 + 69;
                    // rect.y = arr[i].Y * 198;
                    // rect.width = 213;
                    // rect.height = 213;
                    var g = this.kuangGroup.getChildAt(arr[i_1].X);
                    var img_1 = g.getChildAt(arr[i_1].Y);
                    rect.x = img_1.x + g.x;
                    rect.y = img_1.y;
                    rect.width = img_1.width;
                    rect.height = img_1.height;
                    //rect.ellipseWidth = 30;
                    //rect.ellipseHeight = 30;
                    this.gGroup.addChild(rect);
                }
                img.mask = this.gGroup;
            }
            else {
                img.mask = null;
                img.visible = false;
            }
        }
    };
    GamePentCompoment.prototype.cleaAllLine = function () {
        for (var i = 1; i < 10; i++) {
            var img = this['line' + i];
            img.visible = false;
            img.mask = null;
        }
        this.lineGroup.visible = false;
        this.topGroup.visible = false;
    };
    GamePentCompoment.prototype.showLines = function (line) {
        this.lineGroup.visible = true;
        var img = this['line' + line];
        img.visible = true;
    };
    GamePentCompoment.prototype.showLineArr = function (line) {
        var _this = this;
        this.cleaAllLine();
        for (var i = 1; i <= line; i++) {
            this.showLines(i);
        }
        egret.Tween.removeTweens(this.lineGroup);
        this.lineGroup.alpha = 1;
        egret.Tween.get(this.lineGroup).wait(2000).to({ alpha: 0 }, 1000).call(function () {
            _this.lineGroup.visible = false;
            _this.lineGroup.alpha = 1;
        });
    };
    GamePentCompoment.prototype.clearReward = function () {
        this.topGroup.visible = false;
        var arr = [0, 4];
        for (var i = 0; i < arr.length; i++) {
            var s = arr[i];
            for (var j = 0; j < 3; j++) {
                var g = this['t' + j + '' + s + 'Group'];
                g.visible = false;
            }
        }
    };
    /**
     * 第几线
     * 位置
     * 数据
     */
    GamePentCompoment.prototype.showReward = function (line, p, n) {
        this.topGroup.visible = true;
        var g = this['t' + p.Y + '' + p.X + 'Group'];
        g.visible = true;
        var img = g.getChildAt(0);
        img.source = 'winbg_lin' + line + '@2x_png';
        var label = g.getChildAt(1);
        label.text = '￥' + GameManager.numberToCommonStr(n);
    };
    GamePentCompoment.prototype.showKuang = function (line, arr) {
        this.kuangGroup.visible = true;
        for (var i = 0; i < this.kuangGroup.numChildren; i++) {
            var g = this.kuangGroup.getChildAt(i);
            for (var j = 0; j < g.numChildren; j++) {
                var img = g.getChildAt(j);
                img.visible = false;
            }
        }
        for (var s = 0; s < arr.length; s++) {
            for (var i = 0; i < this.kuangGroup.numChildren; i++) {
                var g = this.kuangGroup.getChildAt(i);
                for (var j = 0; j < g.numChildren; j++) {
                    var img = g.getChildAt(j);
                    if (i == arr[s].X && j == arr[s].Y) {
                        img.visible = true;
                        img.source = 'box_' + line + '_png';
                    }
                }
            }
        }
    };
    GamePentCompoment.prototype.showkuang2 = function (arr) {
        this.kuangGroup.visible = true;
        for (var i = 0; i < this.kuangGroup.numChildren; i++) {
            var g = this.kuangGroup.getChildAt(i);
            for (var j = 0; j < g.numChildren; j++) {
                var img = g.getChildAt(j);
                img.visible = false;
            }
        }
        for (var s = 0; s < arr.length; s++) {
            for (var i = 0; i < this.kuangGroup.numChildren; i++) {
                var g = this.kuangGroup.getChildAt(i);
                for (var j = 0; j < g.numChildren; j++) {
                    var img = g.getChildAt(j);
                    if (i == arr[s].X && j == arr[s].Y) {
                        img.visible = true;
                        img.source = 'box_' + 1 + '_png';
                    }
                }
            }
        }
    };
    /**
     * 通过获奖坐标以及线数，获得不获奖的坐标
     */
    GamePentCompoment.prototype.getLineArrForKuang = function (line, arr) {
        var larr = [];
        var objArr = vo.GameData.lineObj[line + ''];
        for (var i = 0; i < objArr.length; i++) {
            var sy = objArr[i];
            var is = 0;
            for (var j = 0; j < arr.length; j++) {
                if (arr[j].X == i) {
                    break;
                }
                else {
                    is++;
                }
            }
            if (is == arr.length) {
                larr.push({ X: i, Y: sy });
            }
        }
        return larr;
    };
    GamePentCompoment.prototype.clearAll = function () {
        this.cleaAllLine();
        this.clearTip();
        this.gGroup.removeChildren();
        this.kuangGroup.visible = false;
    };
    return GamePentCompoment;
}(eui.Component));
__reflect(GamePentCompoment.prototype, "GamePentCompoment");
//# sourceMappingURL=GamePentCompoment.js.map
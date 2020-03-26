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
var GameScence = (function (_super) {
    __extends(GameScence, _super);
    function GameScence() {
        var _this = _super.call(this) || this;
        _this.isinit = false;
        _this.reelArr = [];
        _this.delayArr = [];
        _this.is_refresh = false;
        _this.winIcon = [];
        _this.showIconArray = [];
        _this.skinName = GameScenceSkin;
        return _this;
    }
    /**
     * 初始化
     */
    GameScence.prototype.init = function () {
        if (this.isinit)
            return;
        this.gGroup.visible = false;
        this.delayArr = [];
        this.delayArr.length = 0;
        for (var i = 0; i < 5; i++) {
            var reel = this['R' + i];
            this.delayArr.push(this['delay' + i]);
            reel.init(i);
        }
        for (var j = 1; j < 41; j++) {
            var rm = this['line_' + j];
            rm.visible = false;
        }
        this.isinit = true;
        GameScence.quanType = this['R' + 3];
        GameScence.Type1 = this['R' + 1];
        GameScence.Type2 = this['R' + 2];
        GameScence.freagR = this.freeGame;
        for (var k = 0; k < 5; k++) {
            for (var h = 0; h < 4; h++) {
                this["Stylebox" + k + h].visible = false;
            }
        }
    };
    /**
     * 滑动两侧滑条和加减按钮线条时调用此方法
     */
    GameScence.prototype.onChange_line = function (index) {
        this.is_refresh = true;
        for (var j = 1; j < 41; j++) {
            if (j <= index) {
                var rm = this['line_' + j];
                rm.visible = true;
            }
            else {
                var rm = this['line_' + j];
                rm.visible = false;
            }
        }
        this.refreshTime(index);
    };
    /**
     * 消除 免费牌子特效
     */
    GameScence.onEliminate = function () {
        for (var i = 0; i < 5; i++) {
            var reel = this['R' + i];
            reel.onEliminateIcon(i);
        }
    };
    GameScence.prototype.refreshTime = function (index) {
        var _this = this;
        egret.clearTimeout(this.isTimer);
        if (this.is_refresh) {
            this.is_refresh = false;
            this.isTimer = egret.setTimeout(function () {
                for (var j = 1; j < 41; j++) {
                    var rm = _this['line_' + j];
                    rm.visible = false;
                }
            }, this, 1500);
        }
    };
    /**
     * 开始游戏
     */
    GameScence.prototype.startReel = function () {
        this.clearLine();
        if (!GameConfig.speedPlay)
            SoundManager.getInstance().playMusic("reelspin_mp3").then(function (chanel) {
                GameScence.START_CHANEL = chanel;
            });
        var _loop_1 = function (i) {
            var reel = this_1['R' + i];
            this_1["delay" + i] = egret.setTimeout(function () {
                reel.start(i);
            }, this_1, 0);
        };
        var this_1 = this;
        for (var i = 0; i < 5; i++) {
            _loop_1(i);
        }
    };
    GameScence.prototype.removReel = function () {
        for (var i = 0; i < 5; i++) {
            var reel = this['R' + i];
            reel.removStart();
        }
    };
    /**
     * 停止游戏
     */
    GameScence.prototype.stopGame = function () {
        if (GameScence.START_CHANEL) {
            GameScence.START_CHANEL.stop();
            GameScence.START_CHANEL = null;
        }
        if (GameScence.Music_1) {
            GameScence.Music_1.stop();
            GameScence.Music_1 = null;
        }
        for (var j = 0; j < this.delayArr.length; j++) {
            egret.clearTimeout(this["delay" + j]);
            var reel = this['R' + j];
            egret.clearTimeout(this["delay" + j]);
            reel.stopIcon(j);
        }
        GameScence.Type1.onEliminateIcon(1);
        GameScence.Type2.onEliminateIcon(2);
        core.NotifyManager.getInstance().sendNotify(core.NotifyConst.LOGIC_ROUNDOVER);
    };
    /**
 * clear全部线束
 */
    GameScence.prototype.clearLine = function () {
        for (var i = 1; i <= 40; i++) {
            this['line_' + i].visible = false;
        }
        for (var w = 0; w < 5; w++) {
            var re = this['p' + w];
            re.visible = false;
        }
        this.gGroup.visible = false;
        for (var k = 0; k < 5; k++) {
            for (var h = 0; h < 4; h++) {
                this["Stylebox" + k + h].visible = false;
            }
        }
    };
    /**
     *显示一线获胜
     *显示完成回调
     */
    GameScence.prototype.showLineWin = function (data, callfun, callobj) {
        SoundManager.getInstance().playEffect("line_show_mp3");
        this.gGroup.visible = true;
        for (var k = 0; k < 5; k++) {
            var re = this['p' + k];
            re.visible = true;
        }
        var img = this['line_' + data.Data.Line];
        egret.Tween.removeTweens(img);
        img.visible = true;
        for (var i = 0; i < data.SymbolCount; i++) {
            var img2 = this['Stylebox' + data.Positions[i].X + data.Positions[i].Y];
            var re = this['p' + i];
            re.visible = false;
            img2.source = "box_" + data.Data.Line + "@2x_png";
            if (vo.GameData.resultData.Value.Main.ReelSymbols[data.Positions[i].X][data.Positions[i].Y] == "WW") {
                img2.visible = false;
            }
            else {
                img2.visible = true;
            }
        }
        img.mask = this.gGroup;
        var ui = core.UIManager.getUI(core.UIConst.MainScenceUI);
        egret.Tween.get(img).wait(900)
            .call(function () {
            if (callfun && callobj) {
                callfun.call(callobj);
            }
        }, this);
    };
    /**
    *显示一线获胜
     *显示完成回调
     */
    GameScence.prototype.showLineWin1 = function (data, callfun, callobj) {
        this.gGroup.visible = true;
        for (var k = 0; k < 5; k++) {
            var re = this['p' + k];
            re.visible = true;
        }
        var img = this['line_' + data.Data.Line];
        egret.Tween.removeTweens(img);
        img.visible = true;
        for (var i = 0; i < data.SymbolCount; i++) {
            var img2 = this['Stylebox' + data.Positions[i].X + data.Positions[i].Y];
            var re = this['p' + i];
            re.visible = false;
            img2.source = "box_" + data.Data.Line + "@2x_png";
            if (vo.GameData.resultData.Value.Main.ReelSymbols[data.Positions[i].X][data.Positions[i].Y] == "WW") {
                img2.visible = false;
            }
            else {
                img2.visible = true;
            }
        }
        img.mask = this.gGroup;
        var ui = core.UIManager.getUI(core.UIConst.MainScenceUI);
        // ui.lineID.text = "" + data.Data.Line;
        // ui.winMoney.text = "￥" + GameManager.numberToCommonStr(data.Win);
        egret.Tween.get(img).wait(900)
            .call(function () {
            if (callfun && callobj) {
                callfun.call(callobj);
            }
        }, this);
    };
    GameScence.prototype.showIcon = function (data, isfor) {
        if (isfor === void 0) { isfor = false; }
        this.winIcon = [];
        this.winIcon.length = 0;
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].SymbolCount; j++) {
                this.winIcon.push({ X: data[i].Positions[j].X, Y: data[i].Positions[j].Y });
            }
        }
        this.showIconArray = []; //中奖图标集合
        this.showIconArray.length = 0;
        for (var k = 0; k < this.deteleObject(this.winIcon).length; k++) {
            this.showIconArray.push({ X: this.deteleObject(this.winIcon)[k].X, Y: this.deteleObject(this.winIcon)[k].Y });
        }
        this.showIconMove(this.showIconArray, GameConfig.speedPlay, isfor);
    };
    /**
     * 展示中奖图标并播放动画
     */
    GameScence.prototype.showIconMove = function (iocnArry, type, isfor) {
        if (type) {
            if (!GameManager.getInstance().judgeelement)
                return;
        }
        for (var i = 0; i < iocnArry.length; i++) {
            var reel = this['R' + iocnArry[i].X];
            reel.showIcon(iocnArry[i].X, iocnArry[i].Y, this['RR' + iocnArry[i].X], isfor);
        }
    };
    /**
     * 隐藏中奖动画
     *  设置全正常
    */
    GameScence.prototype.setItem = function () {
        for (var i = 0; i < 5; i++) {
            var reel1 = this['RR' + i];
            reel1.hideAction();
            var reel = this['R' + i];
            reel.hideAction1();
        }
        GameScence.Type1.onEliminateIcon(1);
        GameScence.Type2.onEliminateIcon(2);
        GameScence.quanType.onEliminateIcon(3);
        for (var j = 0; j < this.showIconArray.length; j++) {
            var reel = this['R' + this.showIconArray[j].X];
            reel.AccordingIcon(this.showIconArray[j].X, this.showIconArray[j].Y);
        }
        for (var k = 1; k < 41; k++) {
            var img = this['line_' + k];
            egret.Tween.removeTweens(img);
            img.visible = false;
        }
        for (var l = 0; l < 5; l++) {
            for (var u = 0; u < 4; u++) {
                var img2 = this['Stylebox' + l + u];
                img2.visible = false;
            }
        }
    };
    /**
     * 数组中对象去重
     */
    GameScence.prototype.deteleObject = function (obj) {
        var uniques = [];
        uniques.length = 0;
        var stringify = {};
        for (var i = 0; i < obj.length; i++) {
            var keys = Object.keys(obj[i]);
            keys.sort(function (a, b) {
                return (Number(a) - Number(b));
            });
            var str = '';
            for (var j = 0; j < keys.length; j++) {
                str += JSON.stringify(keys[j]);
                str += JSON.stringify(obj[i][keys[j]]);
            }
            if (!stringify.hasOwnProperty(str)) {
                uniques.push(obj[i]);
                stringify[str] = true;
            }
        }
        uniques = uniques;
        return uniques;
    };
    return GameScence;
}(eui.Component));
__reflect(GameScence.prototype, "GameScence");
//# sourceMappingURL=GameScence.js.map
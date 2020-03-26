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
var FreeGameScence = (function (_super) {
    __extends(FreeGameScence, _super);
    function FreeGameScence() {
        var _this = _super.call(this) || this;
        _this.isinit = false;
        _this.reelArr = [];
        _this.delayArr = [];
        _this.is_refresh = false;
        _this.winIcon = [];
        _this.showIconArray = [];
        _this.skinName = FreeGameScenceSkin;
        _this.mc();
        _this.chushi();
        return _this;
    }
    FreeGameScence.prototype.mc = function () {
        if (!this.yellowMc) {
            this.yellowMc = game.MCUtils.getMc('Yellow');
            //	ui.yellowMc.x = ui.freeDongH.width / 2;
        }
    };
    FreeGameScence.prototype.chushi = function () {
        //this.jixu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        //	this.registerEvent(this.closebolt, egret.TouchEvent.TOUCH_TAP, this.onclick, this);
    };
    /**
     * 初始化
     */
    FreeGameScence.prototype.init = function (initone) {
        if (initone === void 0) { initone = false; }
        if (this.isinit)
            return;
        this.gGroup.visible = false;
        this.delayArr = [];
        this.delayArr.length = 0;
        for (var i = 0; i < 5; i++) {
            var reel = this['R' + i];
            //	this.reelArr.push(this['R' + i]);
            this.delayArr.push(this['delay' + i]);
            reel.init(i, initone);
        }
        for (var j = 1; j < 41; j++) {
            var rm = this['line_' + j];
            rm.visible = false;
        }
        this.isinit = true;
        FreeGameScence.quanType = this['R' + 3];
        FreeGameScence.Type1 = this['R' + 1];
        FreeGameScence.Type2 = this['R' + 2];
        FreeGameScence.freagR = this.freeGame;
        for (var k = 0; k < 5; k++) {
            for (var h = 0; h < 4; h++) {
                this["Stylebox" + k + h].visible = false;
            }
        }
    };
    FreeGameScence.prototype.initGree = function () {
        for (var i = 0; i < 5; i++) {
            var reel = this['R' + i];
            reel.initFreeGame(i);
        }
    };
    /**
     * 滑动两侧滑条和加减按钮线条时调用此方法
     */
    FreeGameScence.prototype.onChange_line = function (index) {
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
    FreeGameScence.onEliminate = function () {
        for (var i = 0; i < 5; i++) {
            var reel = this['R' + i];
            reel.onEliminateIcon(i);
        }
    };
    FreeGameScence.prototype.refreshTime = function (index) {
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
    FreeGameScence.prototype.startReel = function () {
        var delayTimer = GameConfig.speedPlay ? 0 : 0;
        for (var i = 0; i < 5; i++) {
            var reel = this['R' + i];
            reel.start(i);
        }
    };
    FreeGameScence.prototype.removReel = function () {
        for (var i = 0; i < 5; i++) {
            var reel = this['R' + i];
            reel.removStart();
        }
    };
    /**
     * 停止游戏
     */
    FreeGameScence.prototype.stopGame = function () {
        egret.clearTimeout(this.stopGamedely);
        for (var j = 0; j < 5; j++) {
            egret.clearTimeout(this["delay" + j]);
            var reel = this['R' + j];
            reel.stopIcon(j);
            egret.clearTimeout(this["delay" + j]);
        }
        if (GameScence.START_CHANEL) {
            GameScence.START_CHANEL.stop();
            GameScence.START_CHANEL = null;
        }
        if (GameScence.Music_1) {
            GameScence.Music_1.stop();
            GameScence.Music_1 = null;
        }
        FreeGameScence.Type1.onEliminateIcon(1);
        FreeGameScence.Type2.onEliminateIcon(2);
        // if (this.stopdey)
        // 	egret.clearTimeout(this.stopdey);
        // this.stopdey = egret.setTimeout(() => { core.NotifyManager.getInstance().sendNotify(core.NotifyConst.LOGIC_ROUNDOVER); }, this, 300);
        core.NotifyManager.getInstance().sendNotify(core.NotifyConst.LOGIC_ROUNDOVER);
    };
    /**
 * clear全部线束
 */
    FreeGameScence.prototype.clearLine = function () {
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
    FreeGameScence.prototype.showLineWin = function (data, callfun, callobj) {
        this.gGroup.visible = true;
        for (var k = 0; k < 5; k++) {
            var re = this['p' + k];
            re.visible = true;
        }
        var img = this['line_' + data.Data.Line];
        egret.Tween.removeTweens(img);
        img.visible = true;
        for (var i = 0; i < data.Positions.length; i++) {
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
        egret.Tween.get(img).wait(900)
            .call(function () {
            if (callfun && callobj) {
                callfun.call(callobj);
            }
        }, this);
    };
    FreeGameScence.prototype.showIcon = function (data) {
        this.winIcon = [];
        this.winIcon.length = 0;
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].Positions.length; j++) {
                this.winIcon.push({ X: data[i].Positions[j].X, Y: data[i].Positions[j].Y });
            }
        }
        this.showIconArray = []; //中奖图标集合
        this.showIconArray.length = 0;
        for (var k = 0; k < this.deteleObject(this.winIcon).length; k++) {
            this.showIconArray.push({ X: this.deteleObject(this.winIcon)[k].X, Y: this.deteleObject(this.winIcon)[k].Y });
        }
        this.showIconMove(this.showIconArray, GameConfig.speedPlay);
    };
    /**
     * 展示中奖图标并播放动画
     */
    FreeGameScence.prototype.showIconMove = function (iocnArry, type) {
        if (type)
            if (!GameManager.getInstance().judgeelement)
                return;
        for (var i = 0; i < iocnArry.length; i++) {
            var reel = this['R' + iocnArry[i].X];
            reel.showIcon(iocnArry[i].X, iocnArry[i].Y, this['RR' + iocnArry[i].X]);
        }
    };
    /**
     * 隐藏中奖动画
     *  设置全正常
    */
    FreeGameScence.prototype.setItem = function () {
        for (var i = 0; i < 5; i++) {
            var reel = this['RR' + i];
            reel.hideAction();
            var reel1 = this['R' + i];
            reel1.hideAction1();
        }
        FreeGameScence.Type1.onEliminateIcon(1);
        FreeGameScence.Type2.onEliminateIcon(2);
        FreeGameScence.quanType.onEliminateIcon(3);
        //FreeGameScence.quanType.clerarquan();
        if (FreeGameScence.quanType.quanMC && FreeGameScence.quanType.quanMC.parent) {
            FreeGameScence.quanType.quanMC.parent.removeChild(FreeGameScence.quanType.quanMC);
            FreeGameScence.quanType.quanMC.stop();
        }
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
    FreeGameScence.prototype.deteleObject = function (obj) {
        var uniques = [];
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
    FreeGameScence.prototype.onShowAnimation = function () {
        var _this = this;
        this.visible = true;
        SetConst.SET_FreeGame_interface = true;
        this.cutAnimation.visible = true;
        var ui = core.UIManager.getUI(core.UIConst.MainScenceUI);
        ui.logsohwT.FreeGameNum.text = "8";
        ui.caijin.visible = false;
        this.cutAnimation.addChild(this.yellowMc);
        this.yellowMc.gotoAndPlay("a0", -1);
        this.cutAnimation.setChildIndex(this.yellowMc, 1);
        this.yellowMc.x = this.width / 2;
        this.yellowMc.y = 270 + 50 + 30;
        this.freeDeley = egret.setInterval(function () {
            _this.yop.visible = !_this.yop.visible;
            _this.yop1.visible = !_this.yop1.visible;
            _this.yop2.visible = !_this.yop2.visible;
        }, this, 300);
        this.freeDeley1 = egret.setTimeout(function () {
            console.log("动画界面展示完毕，准备旋转免费游戏");
            egret.clearInterval(_this.freeDeley);
            _this.yop.visible = false;
            _this.yop1.visible = false;
            _this.yop2.visible = false;
            SoundManager.getInstance().playBg("RR_FG_ambient_mp3");
            _this.cutAnimation.visible = false;
            _this.record.visible = true;
            ui.logsohwT.G1.visible = false;
            ui.logsohwT.G2.visible = true;
            _this.cutAnimation.removeChild(_this.yellowMc);
            _this.yellowMc.stop();
            GameManager.getInstance().dispatchEventWith(SetEvent.SET_AamOver);
            egret.clearTimeout(_this.freeDeley1);
        }, this, 6000);
    };
    FreeGameScence.prototype.clearOnShow = function () {
        egret.clearInterval(this.freeDeley);
        egret.clearTimeout(this.freeDeley1);
        var ui = core.UIManager.getUI(core.UIConst.MainScenceUI);
        this.yop.visible = false;
        this.yop1.visible = false;
        this.yop2.visible = false;
        SoundManager.getInstance().playBg("RR_FG_ambient_mp3");
        this.cutAnimation.visible = false;
        this.record.visible = true;
        ui.logsohwT.G1.visible = false;
        ui.logsohwT.G2.visible = true;
        this.cutAnimation.removeChild(this.yellowMc);
        this.yellowMc.stop();
        GameManager.getInstance().dispatchEventWith(SetEvent.SET_AamOver);
    };
    FreeGameScence.prototype.onShowFreeGameSettlement = function (data) {
        var _this = this;
        console.log("免费游戏结束，出现结算界面");
        SetConst.SET_FreeGame_settlement = true;
        this.freeSettlement.visible = true;
        this.jixu.visible = false;
        var ui = core.UIManager.getUI(core.UIConst.MainScenceUI);
        ui.setUI.upONE_TWO();
        ui.logsohwT.G1.visible = true;
        ui.logsohwT.G2.visible = false;
        this.record.visible = false;
        //this.freeGameWin.text = "";
        this._freereward = 0;
        //SoundManager.getInstance().setBgOn(false);
        SoundManager.getInstance().playEffect("RR_FG_climax_mp3", 1);
        SoundManager.getInstance().playMusic("win_increase_mp3", 5).then(function (chanel) {
            MainScenceUI.musc6 = chanel;
        });
        //	SoundManager.getInstance().playEffect("win_increase_mp3");
        egret.Tween.get(this).to({ freereward: data }, 2000).call(function () {
            if (MainScenceUI.musc6) {
                MainScenceUI.musc6.stop();
                MainScenceUI.musc6 = null;
            }
            //	SoundManager.getInstance().setBgOn(true);
            SoundManager.getInstance().playBg("game_bg_mp3");
            _this.jixu.visible = true;
            SoundManager.getInstance().playEffect("win_increase_end_mp3");
        }, this);
    };
    Object.defineProperty(FreeGameScence.prototype, "freereward", {
        get: function () {
            return this._freereward;
        },
        set: function (v) {
            this._freereward = v;
            this.freeGameWin.text = '￥' + GameManager.numberToCommonStr(this._freereward);
        },
        enumerable: true,
        configurable: true
    });
    FreeGameScence.prototype.onTab = function () {
        console.log("关闭免费游戏结算界面");
        //	this.cutAnimation.visible = false;
        this.record.visible = false;
        this.freeSettlement.visible = false;
        this.visible = false;
        SetConst.SET_FreeGame_interface = false;
        SetConst.SET_FreeGame_settlement = false;
        var ui = core.UIManager.getUI(core.UIConst.MainScenceUI);
        ui.caijin.visible = true;
        SetConst.AUTO = false;
        vo.GameData.autoPlayCount = 0;
        SetConst.ONE_TWO = false;
        SetConst.Whetherornot_Open = false;
        SetConst.SET_Button_VIS = false;
        ui.logsohwT.G1.visible = true;
        ui.logsohwT.G2.visible = false;
        ui.setUI.upButtonVisible(1);
        ui.setUI.upONE_TWO();
        ui.setUI.updataBtnState();
        ui.setUI.updataEnable(1);
        if (MainScenceUI.musc5) {
            MainScenceUI.musc5.stop();
            MainScenceUI.musc5 = null;
        }
        SoundManager.getInstance().playBg("game_bg_mp3");
        ui.showFreeMeney(GameManager.getInstance().recordFreeGameMoney + 40 * 3 * Number(vo.GameData.betScoreArr[vo.GameData.betIndex]));
        GameManager.getInstance().recordFreeGameMoney = 0;
    };
    return FreeGameScence;
}(eui.Component));
__reflect(FreeGameScence.prototype, "FreeGameScence");
//# sourceMappingURL=FreeGameScence.js.map
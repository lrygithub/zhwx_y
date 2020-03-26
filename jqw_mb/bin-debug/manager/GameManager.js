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
var GameManager = (function (_super) {
    __extends(GameManager, _super);
    function GameManager() {
        var _this = _super.call(this) || this;
        /**
         * 游戏状态
         */
        _this.gameState = 0;
        _this.gamePlayType = "slot";
        _this.whether_wutonglei = false;
        _this.recordFreeGameMoney = 0;
        /**
        * 免费游戏次数
        */
        _this.freeNumber = 0;
        _this.t = 0;
        _this.judgeelement = false;
        _this.Whether_to_initialize = false;
        _this.WhetherData = false;
        return _this;
    }
    GameManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new GameManager();
        }
        return this._instance;
    };
    GameManager.prototype.init = function () {
        var _this = this;
        GameController.getInstance().clearRedis();
        GameConfig.gameModle = GameType.GameModule.falseModle;
        core.NotifyManager.getInstance().registerNotify(core.NotifyConst.NET_INIT, this.onNetgGmeInit, this);
        core.NotifyManager.getInstance().registerNotify(core.NotifyConst.NET_PLAY, this.onNetGamePlay, this);
        core.NotifyManager.getInstance().registerNotify(core.NotifyConst.LOGIC_ROUNDOVER, this.onLogicGameOver, this);
        core.NotifyManager.getInstance().registerNotify(core.NotifyConst.NET_TOUCHTOKEN, this.onNetTouchToken, this);
        core.NotifyManager.getInstance().registerNotify(core.NotifyConst.LOGIC_DATACHANGE, this.onLogicDataChange, this);
        this.addEventListener(SetEvent.SET_START, this.onSet, this);
        this.addEventListener(SetEvent.SET_STOP, this.onSet, this);
        this.addEventListener(SetEvent.SET_freeSTART, this.onSet, this);
        //	this.addEventListener(SetEvent.SET_PAI_OVER_CHANGE, this.onSet, this);
        core.LoadManger.getInstance().loadGroup(core.UIConst.NomalLoadingUI, 'main', function () {
            _this.initData();
            sockets.SocketMananger.getInstance().connectServer(function () {
                Commond.sendInitGame();
            }, _this);
        }, this);
        //初始化监听
        //初始化监听
        window.addEventListener("message", function (receiveMessage) {
            console.log('r--->' + receiveMessage.data);
            core.UIManager.openUI(core.UIConst.NetCloseUI, core.LayerManager.Layer_Tip);
            var ui = core.UIManager.getUI(core.UIConst.NetCloseUI);
            ui.shows(0, '连接断开，正在重新连接.', function () {
                window.location.href = window.location.href;
            });
        });
    };
    /**
     * 初始化数据
     */
    GameManager.prototype.initData = function () {
        vo.GameData.slotInfo = new vo.SlotInfo();
        vo.GameData.slotInfo.readData(null);
        vo.GameData.slotInfo.readPlayAction(null);
    };
    /**
     * 初始化游戏
     */
    GameManager.prototype.onNetgGmeInit = function (data) {
        NetUI.getInstance().hideNetting();
        var d = data;
        this.initAlysInitialData(d);
        core.UIManager.openUI(core.UIConst.MainScenceUI);
        var ui = core.UIManager.getUI(core.UIConst.MainScenceUI);
        ui.updataUI();
    };
    /**
     * 解析初始化数据
     * @param data 数据
     */
    GameManager.prototype.initAlysInitialData = function (data) {
        this.Whether_to_initialize = true;
        vo.GameData.initData = JSON.parse(JSON.stringify(data));
        vo.GameData.balance = parseFloat(data.Value.TokenInfo.Balance + '');
        vo.GameData.reelArr.length = 0;
        vo.GameData.slotInfo.resultArr = data.Value.Geninit.Main.ReelSymbols;
        vo.GameData.initData = data;
        this.initdata_1 = vo.GameData.initData.Value.Symbolstripes.Main.Stripes;
        console.log(this.initdata_1);
        //	vo.GameData.payData = data.Value.Paytables.Main.PayData;
        this.dispatchEventWith(SetEvent.SET_BALANCE_CHANGE);
        if (data.Value.Parameter.TypeTo == "freeslot") {
            //	this.BreakLineReconnection = true;
            console.log("处于断线连接中");
            this.gamePlayType = "freeslot";
            SetConst.Break_Line_Reconnection = true;
            this.freeNumber = data.Value.Parameter.Remaining;
            this.recordFreeGameMoney = data.Value.Parameter.Remaining;
        }
        else {
            //	this.BreakLineReconnection = false;
            console.log("没有断线重连");
            this.gamePlayType = "slot";
            SetConst.Break_Line_Reconnection = false;
        }
    };
    //开始游戏
    GameManager.prototype.onNetGamePlay = function (data) {
        this.initAlaysPlayData(data);
        var ui = core.UIManager.getUI(core.UIConst.MainScenceUI);
        var d = vo.GameData.balance - vo.GameData.betScoreArr[vo.GameData.betIndex] * vo.GameData.line;
        this.Whether_to_initialize = false;
        // ui.balanceLabel.text = '￥' + GameManager.numberToCommonStr(d);
        //ui.gameScence.startReel();
    };
    GameManager.prototype.initAlaysPlayData = function (data) {
        var _this = this;
        vo.GameData.resultData = JSON.parse(JSON.stringify(data));
        var ui = core.UIManager.getUI(core.UIConst.MainScenceUI);
        egret.setTimeout(function () {
            _this.WhetherData = true;
            ui.setUI.stoptButton._select = true;
            ui.setUI.FreestopButton._select = true;
            ui.setUI.updataBtnState();
            ui.setUI.updataFreeBtnState();
            ui.setUI.FreestopButton.setlected = true;
            SetConst.isCanStopGame = true;
        }, this, 250);
        if (vo.GameData.resultData.Value.Parameter.TypeTo == "freeslot") {
            //this.BreakLineReconnection = true;
            this.gamePlayType = "freeslot";
        }
        else {
            //this.BreakLineReconnection = false;
            this.gamePlayType = "slot";
        }
        if (vo.GameData.resultData.Value.Main.TotalWin > 0) {
            for (var ut = 0; ut < vo.GameData.resultData.Value.Main.WinResults.length; ut++) {
                if (vo.GameData.resultData.Value.Main.WinResults[ut].Symbol == "C1") {
                    this.judgeelement = true;
                    this.freeNumber += 8;
                    return;
                }
                else {
                    this.judgeelement = false;
                }
            }
            for (var u = 0; u < vo.GameData.resultData.Value.Main.WinResults.length; u++) {
                if (vo.GameData.resultData.Value.Main.WinResults[u].SymbolCount == 5) {
                    this.whether_wutonglei = true;
                    return;
                }
                else {
                    this.whether_wutonglei = false;
                }
            }
        }
        else {
            this.judgeelement = false;
            this.whether_wutonglei = false;
        }
    };
    //10S改变  money
    GameManager.prototype.onNetTouchToken = function (data) {
        // vo.GameData.matchInfo.money = data.Value.Balance - vo.GameData.matchInfo.allScore / vo.GameData.matchInfo.bili;
        // core.NotifyManager.getInstance().sendNotify(core.NotifyConst.LOGIC_BALANCE);
    };
    GameManager.prototype.onLogicDataChange = function (data) {
    };
    /**
     * 游戏正式结束通知
     */
    GameManager.prototype.onLogicGameOver = function (data) {
        var _this = this;
        var ui = core.UIManager.getUI(core.UIConst.MainScenceUI);
        if (GameManager.ordinary_of_free) {
            console.log('普通游戏结束');
            this.gameState = GameType.GameState.STOP;
            SetConst.isCanStopGame = false;
            vo.GameData.initData.Value.TokenInfo.Balance = vo.GameData.resultData.Value.Balance;
            vo.GameData.balance = vo.GameData.initData.Value.TokenInfo.Balance;
            this.dispatchEventWith(SetEvent.SET_BALANCE_CHANGE);
            var resultData = vo.GameData.resultData;
            var winarr_1 = resultData.Value.Main.WinResults;
            if (vo.GameData.resultData.Value.Main.WinResults.length > 0) {
                console.log("中奖啦");
                GameManager.getInstance().dispatchEventWith(SetEvent.SET_Reward_CHANGE);
                egret.setTimeout(function () {
                    if (_this.judgeelement) {
                        ui.showSingleReward(Number(vo.GameData.resultData.Value.TotalWinDollar), true);
                        ui.gameScence.showIcon(vo.GameData.resultData.Value.Main.WinResults, true);
                    }
                    else {
                        if (!_this.whether_wutonglei) {
                            console.log("没出现五同类");
                            ui.showAllWin(winarr_1, function () {
                            }, _this);
                            ui.gameScence.showIcon(vo.GameData.resultData.Value.Main.WinResults);
                            ui.showRewardStart(vo.GameData.resultData.Value.Main.TotalWinDollar);
                        }
                        else {
                            console.log("出现五同类");
                            _this.wutongleiShow();
                        }
                    }
                }, this, 200);
            }
            else {
                console.log("没有中奖");
                this.doNext();
            }
        }
        else {
            console.log("免费游戏结束");
            this.gameState = GameType.GameState.STOP;
            SetConst.isCanStopGame = false;
            var resultData = vo.GameData.resultData;
            var winarr = resultData.Value.Main.WinResults;
            this.recordFreeGameMoney += (vo.GameData.resultData.Value.Main.TotalWin / 10000);
            ui.freegameScence.freeMoney.text = "￥" + GameManager.numberToCommonStr(this.recordFreeGameMoney);
            ui.setUI.updataFreeBtnState();
            if (vo.GameData.resultData.Value.Main.WinResults.length > 0) {
                console.log("中奖啦");
                GameManager.getInstance().dispatchEventWith(SetEvent.freeSET_Reward_CHANGE);
                if (this.judgeelement) {
                }
                else {
                    if (!this.whether_wutonglei) {
                        console.log("没出现五同类");
                        ui.showAllWin1(winarr, function () {
                        }, this);
                        ui.freegameScence.showIcon(vo.GameData.resultData.Value.Main.WinResults);
                        ui.showFreeRewardStart(vo.GameData.resultData.Value.Main.TotalWinDollar);
                    }
                    else {
                        console.log("出现五同类");
                        this.wutongleiShow1();
                    }
                }
            }
            else {
                console.log("没有中奖");
                egret.setTimeout(function () {
                    _this.onFreeGameDoNext();
                }, this, 500);
            }
        }
    };
    /**
     * 出现五同类 播放五同类动画以及音效
     */
    GameManager.prototype.wutongleiShow = function () {
        var _this = this;
        var ui = core.UIManager.getUI(core.UIConst.MainScenceUI);
        if (GameManager.oppp) {
            GameManager.oppp.stop();
            GameManager.oppp = null;
        }
        SoundManager.getInstance().playMusic("wu_tonglei_mp3", 1).then(function (chanel) {
            GameManager.oppp = chanel;
        });
        ui.mcGroup.visible = true;
        ui.mcGroup.addChild(ui.wutonglei);
        ui.wutonglei.gotoAndPlay("a0", 1);
        ui.wutonglei.x = ui.mcGroup.width / 2;
        ui.wutonglei.y = ui.mcGroup.height / 2;
        ui.wutonglei.addEventListener(egret.MovieClipEvent.COMPLETE, function () {
            _this.whether_wutonglei = false;
            ui.mcGroup.visible = false;
            if (ui.wutonglei && ui.wutonglei.parent) {
                ui.wutonglei.parent.removeChild(ui.wutonglei);
                ui.wutonglei.stop();
            }
        }, this);
        this.wutongleideley = egret.setTimeout(function () {
            if (GameManager.oppp) {
                GameManager.oppp.stop();
                GameManager.oppp = null;
            }
            ui.showAllWin(vo.GameData.resultData.Value.Main.WinResults, function () {
            }, _this);
            ui.gameScence.showIcon(vo.GameData.resultData.Value.Main.WinResults);
            ui.showRewardStart(vo.GameData.resultData.Value.Main.TotalWinDollar);
            egret.clearTimeout(_this.wutongleideley);
            _this.wutongleideley = null;
        }, this, 2000);
    };
    GameManager.prototype.wutongleiShow1 = function () {
        var _this = this;
        var ui = core.UIManager.getUI(core.UIConst.MainScenceUI);
        if (GameManager.oppp) {
            GameManager.oppp.stop();
            GameManager.oppp = null;
        }
        SoundManager.getInstance().playMusic("wu_tonglei_mp3", 1).then(function (chanel) {
            GameManager.oppp = chanel;
        });
        ui.mcGroup.visible = true;
        ui.mcGroup.addChild(ui.wutonglei);
        ui.wutonglei.gotoAndPlay("a0", 1);
        ui.wutonglei.x = ui.mcGroup.width / 2;
        ui.wutonglei.y = ui.mcGroup.height / 2;
        ui.wutonglei.addEventListener(egret.MovieClipEvent.COMPLETE, function () {
            _this.whether_wutonglei = false;
            ui.mcGroup.visible = false;
            if (ui.wutonglei && ui.wutonglei.parent) {
                ui.wutonglei.parent.removeChild(ui.wutonglei);
                ui.wutonglei.stop();
            }
        }, this);
        this.wutongleideley = egret.setTimeout(function () {
            if (GameManager.oppp) {
                GameManager.oppp.stop();
                GameManager.oppp = null;
            }
            egret.clearTimeout(_this.wutongleideley);
            _this.wutongleideley = null;
            ui.showAllWin1(vo.GameData.resultData.Value.Main.WinResults, function () {
            }, _this);
            ui.freegameScence.showIcon(vo.GameData.resultData.Value.Main.WinResults);
            ui.showFreeRewardStart(vo.GameData.resultData.Value.Main.TotalWinDollar);
        }, this, 2000);
    };
    GameManager.prototype.stopchannel = function () {
        if (this.rewardChannel) {
            this.rewardChannel.stop();
        }
        if (this.startChannel) {
            this.startChannel.stop();
        }
    };
    GameManager.prototype.doNext = function () {
        if (this.gameState == GameType.GameState.PLAYING)
            return;
        var ui = core.UIManager.getUI(core.UIConst.MainScenceUI);
        var cAuto = SetConst.AUTO;
        SetConst.AUTO = SetConst.AUTO_COUNT > 0 ? true : false;
        SetConst.STAR_BTN_SHOW = false;
        ui.setUI.updataEnable(1);
        ui.setUI.updataBtnState();
        if (SetConst.AUTO) {
            ui.im1_im2_rewardLabel1_onchange(true, false);
            GameManager.getInstance().dispatchEventWith(SetEvent.SET_START);
        }
        else {
            if (cAuto) {
                GameManager.getInstance().dispatchEventWith(SetEvent.SET_STOP, false, 1);
            }
            else {
                GameManager.getInstance().dispatchEventWith(SetEvent.SET_STOP);
            }
        }
    };
    /**
    * 免费游戏结束后的后续操作
    */
    GameManager.prototype.onFreeGameDoNext = function () {
        console.log("免费游戏结束，判断免费游戏次数");
        if (this.gameState == GameType.GameState.PLAYING)
            return;
        var ui = core.UIManager.getUI(core.UIConst.MainScenceUI);
        SetConst.freeSTAR_BTN_SHOW = false;
        ui.setUI.updataFreeBtnState();
        if (this.freeNumber > 0) {
            console.log("免费游戏次数还有" + this.freeNumber + "次" + "   继续开启免费游戏");
            GameManager.getInstance().dispatchEventWith(SetEvent.SET_freeSTART);
        }
        else {
            console.log("免费游戏结算界面打开");
            ui.freegameScence.setItem();
            ui.freegameScence.freeMoney.text = "";
            //GameManager.getInstance().dispatchEventWith(SetEvent.SET_FREE_Over);
            ui.freegameScence.onShowFreeGameSettlement(this.recordFreeGameMoney + 40 * 3 * Number(vo.GameData.betScoreArr[vo.GameData.betIndex]));
            //ui.showFreeGameMoney(this.recordFreeGameMoney + 40 * 3 * Number(vo.GameData.betScoreArr[vo.GameData.betIndex]));
            //ui.starFreeGametBtn.enabled = true;
        }
    };
    GameManager.prototype.doNext1 = function () {
        if (this.gameState == GameType.GameState.PLAYING)
            return;
        var ui = core.UIManager.getUI(core.UIConst.MainScenceUI);
        SetConst.STAR_BTN_SHOW = false;
        ui.setUI.updataEnable(1);
        ui.setUI.upButtonVisible(0);
        ui.setUI.updataBtnState();
    };
    GameManager.prototype.onSet = function (e) {
        var ui = core.UIManager.getUI(core.UIConst.MainScenceUI);
        switch (e.type) {
            case SetEvent.SET_START:
                ui.is_NoRrw = 0;
                if (this.getMoneyIsFull()) {
                    if (!SetConst.AUTO && !SetConst.SPEED_PLAY) {
                        if (egret.getTimer() - this.t < 2000 && !SetConst.QUIKTIP_SHOW) {
                            //	core.UIManager.openUI(core.UIConst.QukTipsUI, core.LayerManager.Layer_Top);
                            //	SetConst.QUIKTIP_SHOW = true;
                            return;
                        }
                        this.t = egret.getTimer();
                    }
                    GameManager.ordinary_of_free = true;
                    this.gameState = GameType.GameState.PLAYING;
                    ui.hideWin();
                    ui.rewardIndex = -1;
                    this.stopchannel();
                    this.WhetherData = false;
                    ui.im1_im2_rewardLabel1_onchange(false, false);
                    ui.gameScence.setItem();
                    ui.gameScence.startReel();
                    Commond.sendPlay(this.gamePlayType);
                    vo.GameData.balance -= vo.GameData.betScoreArr[vo.GameData.betIndex] * vo.GameData.line;
                    this.dispatchEventWith(SetEvent.SET_BALANCE_CHANGE);
                    if (SetConst.AUTO) {
                        SetConst.AUTO_COUNT -= 1;
                        ui.setUI.autoButton.isPlay = true;
                        //	ui.setUI.autoButton.countLabel.text = SetConst.AUTO_COUNT + '';
                        SetConst.AUTO_SHOW = false;
                        ui.setUI.autoSetCompoment.goUpdata();
                        // ui.setUI.tipLabel.alpha = 1;
                        // if (e.data != 1) {
                        // 	ui.setUI.tipLabel.text = '剩余' + SetConst.AUTO_COUNT + '剩余次数';
                        // 	ui.setUI.tipLabel.scaleX = ui.setUI.tipLabel.scaleY = 0.7;
                        // }
                    }
                    else {
                        // if (e.data != 1) {
                        // 	ui.setUI.tipLabel.text = '触摸转轴来提前停止';
                        // 	ui.setUI.tipLabel.scaleX = ui.setUI.tipLabel.scaleY = 0.7;
                        // 	ui.setUI.tipLabel.alpha = 1;
                        // }
                    }
                    SetConst.BETSET_SHOW = false;
                    ui.setUI.betSetCompoment.goUpdata();
                    ui.setUI.updataEnable(0);
                    //	ui.setUI.tipLabel.visible = true;
                    //	ui.setUI.rewardGroup.visible = false;
                    ui.setUI.stoptButton._select = false;
                    this.dispatchEventWith(SetEvent.SET_AUTO_CHANGED);
                }
                else {
                    ui.setUI.autoButton.isPlay = false;
                    SetConst.AUTO = false;
                    SetConst.AUTO_COUNT = 0;
                    this.noMoney();
                    this.dispatchEventWith(SetEvent.SET_AUTO_CHANGED);
                }
                break;
            case SetEvent.SET_freeSTART:
                console.log("开始免费游戏");
                this.freeNumber--;
                ui.rewardIndex = -1;
                ui.logsohwT.FreeGameNum.text = this.freeNumber + "";
                GameManager.ordinary_of_free = false;
                this.gameState = GameType.GameState.PLAYING;
                ui.im1_im2_rewardLabel1_onchange(false, false);
                this.WhetherData = false;
                ui.freegameScence.setItem();
                ui.freegameScence.startReel();
                Commond.sendPlay(this.gamePlayType);
                ui.setUI.updataEnable(0);
                ui.setUI.FreestopButton._select = false;
                ui.setUI.FreestopButton.setlected = false;
                ui.setUI.updataFreeBtnState();
                break;
            case SetEvent.SET_STOP:
                if (e.data != 1) {
                    // if (ui.setUI.tipLabel.text != '自动游戏已停止') {
                    // 	ui.setUI.tipLabel.text = '滑动转轴或按旋转';
                    // 	ui.setUI.tipLabel.alpha = 1;
                    // 	ui.setUI.tipLabel.scaleX = ui.setUI.tipLabel.scaleY = 1;
                    // }
                }
                ui.setUI.autoButton.isPlay = false;
                this.dispatchEventWith(SetEvent.SET_AUTO_CHANGED);
                break;
        }
        ui.updataUI();
    };
    /**
     * 没钱
     */
    GameManager.prototype.noMoney = function () {
        core.UIManager.openUI(core.UIConst.StipsUI, core.LayerManager.Layer_Top);
        var ui = core.UIManager.getUI(core.UIConst.StipsUI);
        var mui = core.UIManager.getUI(core.UIConst.MainScenceUI);
        ui.shows(0, '余额不足，是否要存款?', function () {
        });
    };
    /**
     * 设置托管状态
     */
    GameManager.prototype.setAutoPlay = function (auto) {
        SetConst.AUTO = auto;
    };
    /**
     * 数字转格式化字符，小数
     */
    GameManager.numberToCommonStr = function (n) {
        var als = n + '';
        var arr = als.split('.');
        var s = arr[0];
        var sc = '';
        var cindex = 0;
        for (var i = s.length - 1; i >= 0; i--) {
            sc = s.substr(i, 1) + sc;
            cindex++;
            if (cindex == 3 && i > 0) {
                sc = ',' + sc;
                cindex = 0;
            }
        }
        if (arr.length > 1) {
            if (arr[1].length == 1) {
                sc += '.' + arr[1] + '0';
            }
            else {
                sc = sc + '.' + arr[1].substr(0, 2);
            }
        }
        else {
            sc = sc + '.00';
        }
        return sc;
    };
    /**
     * 数字转格式化字符 整数
     */
    GameManager.numberToCommonStr1 = function (n) {
        var als = n + '';
        var arr = als.split('.');
        var s = arr[0];
        var sc = '';
        var cindex = 0;
        for (var i = s.length - 1; i >= 0; i--) {
            sc = s.substr(i, 1) + sc;
            cindex++;
            if (cindex == 3 && i > 0) {
                sc = ',' + sc;
                cindex = 0;
            }
        }
        if (arr.length > 1) {
            if (arr[1].length == 1) {
                sc += '.' + arr[1] + '0';
            }
            else {
                sc = sc + '.' + arr[1].substr(0, 2);
            }
        }
        return sc;
    };
    /**
     * 判断钱是否足够
     */
    GameManager.prototype.getMoneyIsFull = function () {
        if (vo.GameData.balance >= vo.GameData.betScoreArr[vo.GameData.betIndex]) {
            return true;
        }
        return false;
    };
    /**
     * 判断有无5同类
     */
    GameManager.prototype.getFiveArr = function (winarr) {
        var reslutArr = [];
        for (var i = 0; i < winarr.length; i++) {
            var data = winarr[i];
            if (data.Positions.length == 5) {
                reslutArr.push(data);
            }
        }
        return reslutArr;
    };
    /**
    * 普通游戏还是免费游戏
    *
    *  true为普通游戏
    *
    *  false为免费游戏
    */
    GameManager.ordinary_of_free = true;
    return GameManager;
}(egret.EventDispatcher));
__reflect(GameManager.prototype, "GameManager");
//# sourceMappingURL=GameManager.js.map
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
var SetUI = (function (_super) {
    __extends(SetUI, _super);
    function SetUI() {
        var _this = _super.call(this) || this;
        _this.isautoShow = false;
        _this.skinName = SetUISkin;
        return _this;
    }
    SetUI.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.sound.selected = 1 == SoundManager.getInstance().getBgVolume() ? false : true;
        this.sound1.selected = 1 == SoundManager.getInstance().getBgVolume() ? true : false;
        this.setBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        this.setRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        this.betBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        this.betSetCompoment.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        this.autoSetCompoment.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        this.qukcheckBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        this.sound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        this.sound1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        this.Info.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        this.history.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        this.checkstand.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        this.startButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        this.FreestartButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        this.autoButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        this.processBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        this.processBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
        GameManager.getInstance().addEventListener(SetEvent.SET_AUTO_CHANGED, this.onDataChanged, this);
        GameManager.getInstance().addEventListener(SetEvent.SET_SPEED_CHANGED, this.onDataChanged, this);
        GameManager.getInstance().addEventListener(SetEvent.SET_BET_CHANGE, this.onDataChanged, this);
        GameManager.getInstance().addEventListener(SetEvent.SET_LINE_CHANGE, this.onDataChanged, this);
        GameManager.getInstance().addEventListener(SetEvent.SET_BALANCE_CHANGE, this.onDataChanged, this);
        GameManager.getInstance().addEventListener(SetEvent.SET_MUSIC_CHANGE, this.onDataChanged, this);
        GameManager.getInstance().addEventListener(SetEvent.SET_PAI_OVER_CHANGE, this.onDataChanged, this);
        GameManager.getInstance().addEventListener(SetEvent.SET_Reward_CHANGE, this.onDataChanged, this);
        GameManager.getInstance().addEventListener(SetEvent.SET_AamOver, this.onDataChanged, this);
        GameManager.getInstance().addEventListener(SetEvent.freeSET_Reward_CHANGE, this.onDataChanged, this);
        this.autoSetCompoment.addEventListener(SetEvent.SET_STATE_CHANGE, this.onStateChange, this);
        this.betSetCompoment.addEventListener(SetEvent.SET_STATE_CHANGE, this.onStateChange, this);
        this.onModleChange();
        this.updataControllGroup();
        GameManager.getInstance().addEventListener(SetEvent.SET_MODLE, this.onModleChange, this);
        GameManager.getInstance().addEventListener(SetEvent.SET_MODLE, this.onModleChange, this);
        core.MyUIUtils.addLongTouch(this.startButton, function () {
            SoundManager.getInstance().playEffect("tap_mp3");
            SetConst.LONG_TOUCH = true;
            SetConst.AUTO_SHOW = true;
            _this.startButton.visible = false;
            _this.autoButton.visible = true;
            _this.autoButton.isPlay = false;
            _this.autoSetCompoment.goUpdata();
            SetConst.BETSET_SHOW = false;
            _this.betSetCompoment.goUpdata();
            _this.updataBtnState();
            _this.betBtn.enabled = _this.qukcheckBtn.enabled = !SetConst.AUTO_SHOW;
            GameManager.getInstance().dispatchEventWith(SetEvent.SET_HIDE_REWARD);
        }, function () {
            egret.callLater(function () {
                SetConst.LONG_TOUCH = false;
            }, _this);
        });
        egret.MainContext.instance.stage.addEventListener(eui.UIEvent.RESIZE, function () {
            egret.setTimeout(function () {
                _this.updataSame();
            }, _this, 300);
        }, this);
    };
    SetUI.prototype.updataHor = function () {
        this.updataSame();
    };
    SetUI.prototype.updataVer = function () {
        this.updataSame();
    };
    SetUI.prototype.updataSame = function () {
        egret.Tween.removeTweens(this.bottomGroup);
        this.bottomChange();
        this.upONE_TWO();
        //	this.rewardGroup.visible = SetConst.REWARD_SMALLSHOW;
        this.bottomGroup.y = GameConfig.HEIGHT - this.bottomGroup.height;
        //	this.rightGroup.x = SetConst.RIGHT_SHOW ? 0 : 200;
        //this.maskRect.visible = SetConst.TOP_SHOW || SetConst.RIGHT_SHOW;
        //	this.scrolls.viewport.scrollH = 0;
        this.betSetCompoment.updata();
        this.autoSetCompoment.updata();
        this.updataControllGroup();
        this.updataBtnState();
        this.updataFreeBtnState();
        this.totalBet.text = '￥' + GameManager.numberToCommonStr(vo.GameData.betScoreArr[vo.GameData.betIndex] * 45);
        this.balanceLabel.text = '￥' + GameManager.numberToCommonStr(vo.GameData.balance);
        this.betBtn.selected = SetConst.BETSET_SHOW;
        if (this.currentState == 'ver') {
            this.betBtn.visible = this.qukGroup.visible = SetConst.AUTO ? false : true;
        }
        else {
            this.betBtn.visible = this.qukGroup.visible = false;
        }
        this.updataVi();
    };
    //public btnBg: eui.Image;
    SetUI.prototype.onTab = function (e) {
        var ui = core.UIManager.getUI(core.UIConst.MainScenceUI);
        switch (e.currentTarget) {
            case this.Info:
                e.stopPropagation();
                e.stopImmediatePropagation();
                SetConst.SET_INFO = true;
                this.set.visible = false;
                SetConst.SET_SHOW = false;
                this.visible = false;
                ui.informationGroup.visible = true;
                break;
            case this.sound:
                e.stopPropagation();
                e.stopImmediatePropagation();
                if (this.sound.selected) {
                    SoundManager.getInstance().setBgVolume(0);
                    SoundManager.getInstance().setEffectVolume(0);
                }
                else {
                    SoundManager.getInstance().setBgVolume(1);
                    SoundManager.getInstance().setEffectVolume(1);
                }
                this.sound1.selected = !this.sound.selected;
                break;
            case this.sound1:
                e.stopPropagation();
                e.stopImmediatePropagation();
                if (this.sound1.selected) {
                    SoundManager.getInstance().setBgVolume(1);
                    SoundManager.getInstance().setEffectVolume(1);
                }
                else {
                    SoundManager.getInstance().setBgVolume(0);
                    SoundManager.getInstance().setEffectVolume(0);
                }
                this.sound.selected = !this.sound1.selected;
                break;
            case this.setBtn:
                e.stopPropagation();
                e.stopImmediatePropagation();
                SoundManager.getInstance().playEffect("tap_mp3");
                this.set.visible = true;
                SetConst.SET_SHOW = true;
                break;
            case this.setRect:
                e.stopPropagation();
                e.stopImmediatePropagation();
                this.set.visible = false;
                SetConst.SET_SHOW = false;
                break;
            case this.betBtn:
                e.stopPropagation();
                e.stopImmediatePropagation();
                SoundManager.getInstance().playEffect("tap_mp3");
                SetConst.BETSET_SHOW = !SetConst.BETSET_SHOW;
                SetConst.AUTO_SHOW = false;
                this.betSetCompoment.goUpdata();
                this.autoSetCompoment.goUpdata();
                this.betBtn.selected = SetConst.BETSET_SHOW;
                GameManager.getInstance().dispatchEventWith(SetEvent.SET_HIDE_REWARD);
                //this.betBtn.enabled = this.qukcheckBtn.enabled = !SetConst.BETSET_SHOW;
                this.autoButton.visible = false;
                this.startButton.visible = true;
                break;
            case this.stage:
                if (SetConst.AUTO_SHOW) {
                    SoundManager.getInstance().playEffect("tap_mp3");
                }
                SetConst.BETSET_SHOW = false;
                SetConst.AUTO_SHOW = false;
                this.betSetCompoment.goUpdata();
                this.autoSetCompoment.goUpdata();
                this.betBtn.selected = SetConst.BETSET_SHOW;
                this.updataBtnState();
                if (GameManager.getInstance().gameState == GameType.GameState.STOP) {
                    this.betBtn.enabled = this.qukcheckBtn.enabled = !SetConst.BETSET_SHOW;
                }
                break;
            case this.startButton:
                e.stopPropagation();
                e.stopImmediatePropagation();
                if (!this.startButton.type) {
                    this.betBtn.selected = false;
                    SoundManager.getInstance().playEffect("spin_btn_mp3");
                    if (SetConst.LONG_TOUCH)
                        return;
                    GameManager.getInstance().dispatchEventWith(SetEvent.SET_START);
                }
                else {
                    ui.clearRaward();
                }
                break;
            case this.FreestartButton:
                if (SetConst.freeSTAR_BTN_SHOW) {
                    ui.clearRaward();
                }
                else {
                    SoundManager.getInstance().playEffect("spin_btn_mp3");
                    GameManager.getInstance().dispatchEventWith(SetEvent.SET_freeSTART);
                }
                break;
            case this.autoButton:
                e.stopPropagation();
                e.stopImmediatePropagation();
                if (this.autoButton.isPlay) {
                    SetConst.AUTO_COUNT = 0;
                    SetConst.AUTO = false;
                    SetConst.handStop = true;
                    this.autoButton.visible = false;
                    this.betBtn.visible = true;
                    this.qukGroup.visible = true;
                    if (this.isautoShow != SetConst.AUTO) {
                        this.isautoShow = SetConst.AUTO;
                        this.bottomAutoGoUpdata();
                    }
                    if (GameManager.getInstance().gameState == GameType.GameState.STOP) {
                        this.updataBtnState();
                        this.autoButton.isPlay = false;
                    }
                }
                else {
                    SetConst.handStop = false;
                    SetConst.AUTO_COUNT = SetConst.AUTO_COUNT_ARR[this.autoSetCompoment.mySlider.value];
                    SetConst.AUTO = true;
                    GameManager.getInstance().dispatchEventWith(SetEvent.SET_START, false, 1);
                }
                break;
            case this.autoSetCompoment:
                e.stopPropagation();
                e.stopImmediatePropagation();
                break;
            case this.betSetCompoment:
                e.stopPropagation();
                e.stopImmediatePropagation();
                break;
            case this.processBtn:
                e.stopPropagation();
                e.stopImmediatePropagation();
                ui.freegameScence.onShowAnimation();
                this.processBtn.visible = false;
                this.processBtn1.visible = true;
                ui.gameScence.setItem();
                ui.gameScence.freeGame.visible = false;
                ui.gameScence.freeGame.alpha = 0;
                break;
            case this.processBtn1:
                e.stopPropagation();
                e.stopImmediatePropagation();
                ui.freegameScence.clearOnShow();
                break;
            case this.checkstand:
                console.log("收银台");
                e.stopPropagation();
                e.stopImmediatePropagation();
                window.open(window['dataUrl'].crashPath);
                this.set.visible = false;
                SetConst.SET_SHOW = false;
                break;
            case this.homeBtn:
                window.open(window['dataUrl'].homePath);
                this.set.visible = false;
                SetConst.SET_SHOW = false;
                break;
            case this.history:
                window.open(window['dataUrl'].historyPath);
                this.set.visible = false;
                SetConst.SET_SHOW = false;
                break;
            case this.qukcheckBtn:
                e.stopPropagation();
                e.stopImmediatePropagation();
                if (this.qukcheckBtn.selected) {
                    SoundManager.getInstance().playEffect("kuaisu_on_mp3");
                }
                else {
                    SoundManager.getInstance().playEffect("kuaisu_off_mp3");
                }
                SetConst.SPEED_PLAY = this.qukcheckBtn.selected;
                GameManager.getInstance().dispatchEventWith(SetEvent.SET_SPEED_CHANGED);
                break;
        }
    };
    SetUI.prototype.popBet = function () {
        SetConst.BETSET_SHOW = true;
        SetConst.AUTO_SHOW = false;
        this.betSetCompoment.goUpdata();
        this.autoSetCompoment.goUpdata();
        this.betBtn.selected = SetConst.BETSET_SHOW;
    };
    SetUI.prototype.onModleChange = function () {
        this.updataControllGroup();
    };
    SetUI.prototype.onStateChange = function (e) {
        switch (e.currentTarget) {
            case this.autoSetCompoment:
                SetConst.BETSET_SHOW = false;
                this.betSetCompoment.goUpdata();
                this.betBtn.selected = SetConst.BETSET_SHOW;
                this.updataBtnState();
                break;
            case this.betSetCompoment:
                // SetConst.AUTO_SHOW = false;
                // this.autoSetCompoment.goUpdata();
                // this.updataBtnState();
                break;
        }
    };
    SetUI.prototype.updataBtnState = function () {
        this.controllGroup.visible = !SetConst.Whetherornot_Open;
        this.controllGroup1.visible = SetConst.Whetherornot_Open;
        if (SetConst.AUTO || SetConst.AUTO_SHOW) {
            this.startButton.visible = false;
            this.autoButton.visible = true;
            this.autoButton.scaleX = 1;
            this.autoButton.scaleY = 1;
            this.stoptButton.visible = false;
        }
        else {
            this.startButton.visible = true;
            this.startButton.scaleX = 1;
            this.startButton.scaleY = 1;
            this.autoButton.visible = false;
            this.stoptButton.visible = false;
        }
        if (GameManager.getInstance().gameState == GameType.GameState.PLAYING && SetConst.AUTO == false) {
            this.startButton.visible = false;
            this.stoptButton.visible = true;
            if (this.stoptButton._select) {
                this.stoptButton.setlected = true;
            }
            else {
                this.stoptButton.setlected = false;
            }
        }
        this.startButton.setlected = SetConst.SPEED_PLAY;
        this.startButton.type = SetConst.STAR_BTN_SHOW;
        // if (GameManager.getInstance().gameState == GameType.GameState.PLAYING) {
        // 	this.stoptButton.visible = true;
        // 	if (this.stoptButton._select) {
        // 		this.stoptButton.setlected = true;
        // 	} else {
        // 		this.stoptButton.setlected = false;
        // 	}
        // }
    };
    SetUI.prototype.updataFreeBtnState = function () {
        this.FreestartButton.visible = true;
        this.FreestartButton.scaleX = 1;
        this.FreestartButton.scaleY = 1;
        this.FreestopButton.visible = false;
        if (GameManager.getInstance().gameState == GameType.GameState.PLAYING) {
            this.FreestartButton.visible = false;
            this.FreestopButton.visible = true;
            if (this.stoptButton._select) {
                this.stoptButton.setlected = true;
            }
            else {
                this.stoptButton.setlected = false;
            }
        }
    };
    SetUI.prototype.updataControllGroup = function () {
        if (window.innerWidth >= window.innerHeight) {
            this.currentState = 'hor';
            this.controllGroup.x = SetConst.MODLE == 0 ? GameConfig.WIDTH - this.controllGroup.width - 20 : -30;
            this.controllGroup.y = SetConst.MODLE == 0 ? GameConfig.HEIGHT / 2 - this.controllGroup.height / 2 - 5 : GameConfig.HEIGHT / 2 - this.controllGroup.height / 2 - 5;
            this.controllGroup1.x = SetConst.MODLE == 0 ? GameConfig.WIDTH - this.controllGroup1.width - 20 : -30;
            this.controllGroup1.y = SetConst.MODLE == 0 ? GameConfig.HEIGHT / 2 - this.controllGroup1.height / 2 - 5 : GameConfig.HEIGHT / 2 - this.controllGroup1.height / 2 - 5;
            this.jianglilan.y = SetConst.MODLE == 0 ? GameConfig.HEIGHT - this.jianglilan.height : 0;
        }
        else {
            this.currentState = 'ver';
            this.controllGroup.x = SetConst.MODLE == 0 ? GameConfig.WIDTH - this.controllGroup.width + 30 : -30;
            this.controllGroup.y = SetConst.MODLE == 0 ? GameConfig.HEIGHT / 2 - this.controllGroup.height / 2 : GameConfig.HEIGHT / 2 - this.controllGroup.height / 2;
            this.controllGroup1.x = SetConst.MODLE == 0 ? GameConfig.WIDTH - this.controllGroup1.width + 30 : -30;
            this.controllGroup1.y = SetConst.MODLE == 0 ? GameConfig.HEIGHT / 2 - this.controllGroup1.height / 2 : GameConfig.HEIGHT / 2 - this.controllGroup1.height / 2;
            this.jianglilan.y = SetConst.MODLE == 0 ? this.mcGroup.height * 0.843 : 0;
        }
        this.set.visible = SetConst.SET_SHOW;
    };
    SetUI.prototype.onDataChanged = function (e) {
        var ui = core.UIManager.getUI(core.UIConst.MainScenceUI);
        switch (e.type) {
            case SetEvent.SET_AamOver:
                console.log("把one隐藏，把two显示");
                this.processBtn.visible = true;
                this.processBtn1.visible = false;
                SetConst.ONE_TWO = true;
                this.upONE_TWO();
                GameManager.getInstance().dispatchEventWith(SetEvent.SET_freeSTART);
                break;
            case SetEvent.SET_Reward_CHANGE:
                SetConst.STAR_BTN_SHOW = true;
                this.updataBtnState();
                break;
            case SetEvent.freeSET_Reward_CHANGE:
                SetConst.freeSTAR_BTN_SHOW = true;
                break;
            case SetEvent.SET_AUTO_CHANGED:
                this.updataBtnState();
                if (this.isautoShow != SetConst.AUTO) {
                    this.isautoShow = SetConst.AUTO;
                    this.bottomAutoGoUpdata();
                }
                break;
            case SetEvent.SET_SPEED_CHANGED:
                //		egret.Tween.removeTweens(this.tipLabel);
                this.updataBtnState();
                this.qukcheckBtn.selected = SetConst.SPEED_PLAY;
                this.playLight();
                //	this.tipLabel.visible = true;
                SetConst.REWARD_SMALLSHOW = false;
                SetConst.REWARD_SHOW = false;
                ui.hideWin();
                //	this.rewardGroup.visible = SetConst.REWARD_SMALLSHOW;
                break;
            case SetEvent.SET_BET_CHANGE:
                //	this.betLabel.text = '￥' + GameManager.numberToCommonStr(vo.GameData.betScoreArr[vo.GameData.betIndex]);
                this.totalBet.text = '￥' + GameManager.numberToCommonStr(vo.GameData.betScoreArr[vo.GameData.betIndex] * 45);
                break;
            case SetEvent.SET_LINE_CHANGE:
                this.betLabel.text = '￥' + GameManager.numberToCommonStr(vo.GameData.betScoreArr[vo.GameData.betIndex]);
                this.totalBet.text = '￥' + GameManager.numberToCommonStr(vo.GameData.betScoreArr[vo.GameData.betIndex] * vo.GameData.line);
                break;
            case SetEvent.SET_BALANCE_CHANGE:
                this.balanceLabel.text = '￥' + GameManager.numberToCommonStr(vo.GameData.balance);
                break;
            case SetEvent.SET_MUSIC_CHANGE:
                //	this.musicCheck.selected = SoundManager.getInstance().effectOn;
                break;
            case SetEvent.SET_PAI_OVER_CHANGE:
                console.log("把出3牌子这一轮的奖励播放完了，出现后面事件，出现点击以开始按钮并且开始闪动点击以开始按钮");
                SetConst.Whetherornot_Open = true;
                ui.gameScence.freeGame.visible = true;
                SetConst.SET_FreeGame_settlement = false;
                ui.gameScence.freeGame.alpha = 0;
                this.processBtn.visible = true;
                this.processBtn1.visible = false;
                SetConst.ONE_TWO = false;
                this.upONE_TWO();
                this.updataBtnState();
                egret.Tween.get(ui.gameScence.freeGame).to({ alpha: 1 }, 400);
                ui.freegameScence.initGree();
                GameManager.getInstance().doNext1();
                SoundManager.getInstance().playBg("ggfg_bg_mp3");
                this.controllGroup.visible = false;
                this.controllGroup1.visible = true;
                this.one.visible = true;
                this.two.visible = false;
                this.processBtn.visible = true;
                this.processBtn1.visible = false;
                break;
        }
    };
    /**
     * 播放光效
     */
    SetUI.prototype.playLight = function () {
        var _this = this;
        this.lightBG.alpha = 0;
        this.lightBG.visible = true;
        this.lightBG.blendMode = egret.BlendMode.ADD;
        egret.Tween.removeTweens(this.lightBG);
        egret.Tween.get(this.lightBG).to({ alpha: 0.1 }, 100).to({ alpha: 0 }, 100).call(function () { _this.lightBG.visible = false; });
    };
    SetUI.prototype.upONE_TWO = function () {
        if (!SetConst.SET_FreeGame_settlement) {
            this.one.visible = !SetConst.ONE_TWO;
            this.two.visible = SetConst.ONE_TWO;
        }
        else {
            this.one.visible = this.two.visible = false;
        }
    };
    SetUI.prototype.updataEnable = function (s) {
        this.betBtn.enabled = s == 0 ? false : true;
        //	this.moreBtn.enabled = s == 0 ? false : true;
        this.setBtn.enabled = s == 0 ? false : true;
        this.qukcheckBtn.enabled = s == 0 ? false : true;
        this.betSetCompoment.arrButton.enabled = s == 0 ? false : true;
        this.autoSetCompoment.arrButton.enabled = s == 0 ? false : true;
    };
    SetUI.prototype.upButtonVisible = function (s) {
        SetConst.SET_Button_VIS = s == 0 ? true : false;
        this.updataVi();
    };
    SetUI.prototype.updataVi = function () {
        this.qukcheckBtn.visible = !SetConst.SET_Button_VIS;
        this.betSetCompoment.visible = !SetConst.SET_Button_VIS;
        this.qukGroup.visible = !SetConst.SET_Button_VIS;
        if (this.currentState == 'ver') {
            this.betBtn.visible = this.qukGroup.visible = !SetConst.SET_Button_VIS;
        }
        else {
            this.betBtn.visible = this.qukGroup.visible = false;
        }
    };
    // /**
    //  * 更新时间
    //  */
    // public onFrame(e: egret.Event): void {
    // 	var crtTime = new Date();
    // 	this.timeLabel.text = dateFtt("yyyy-MM-dd hh:mm:ss", crtTime) + ' ' + GameConfig.CasinoGame.PlayerId;
    // }
    /**
     * 更新自动状态
     */
    SetUI.prototype.bottomAutoGoUpdata = function () {
        var _this = this;
        if (this.currentState == 'ver') {
            this.betBtn.visible = this.qukGroup.visible = SetConst.AUTO ? false : true;
        }
        else {
            this.betBtn.visible = this.qukGroup.visible = false;
        }
        egret.Tween.get(this.bottomGroup).to({ y: GameConfig.HEIGHT }, 300).call(function () {
            _this.bottomChange();
        }, this).to({ y: GameConfig.HEIGHT - this.bottomGroup.height }, 300).call(function () {
        }, this);
    };
    SetUI.prototype.bottomChange = function () {
        //this.bottomBg.source = SetConst.AUTO ? 'bottom_1_png' : 'bottom_2_png';
        // this.bottomBg.alpha = SetConst.AUTO ? 0.75 : 1;
        // for (let i: number = 0; i < 5; i++) {
        // 	(this['t' + i] as eui.Label).textColor = SetConst.AUTO ? 0x0292C0 : 0xFCCB44;
        // }
    };
    return SetUI;
}(eui.Component));
__reflect(SetUI.prototype, "SetUI");
//# sourceMappingURL=SetUI.js.map
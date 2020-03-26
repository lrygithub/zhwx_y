class FreeGameScence extends eui.Component {
	public isinit: boolean = false;
	public reelArr: Array<FreeReel> = [];
	public delayArr: Array<any> = [];
	public delay0: any;
	public delay1: any;
	public delay2: any;
	public delay3: any;
	public delay4: any;
	public freeGame: eui.Rect;
	public static quanType: FreeReel;
	public gGroup: eui.Group;

	public yop: eui.Image;
	public yop1: eui.Image;
	public yop2: eui.Image;
	public cutAnimation: eui.Group;
	public record: eui.Group;
	public freeSettlement: eui.Group;
	public freeMoney: eui.BitmapLabel;
	public jixu: MouseButton;
	public freeGameWin: eui.BitmapLabel;

	public Stylebox21: eui.Image;
	public Stylebox22: eui.Image;
	public Stylebox23: eui.Image;
	public Stylebox20: eui.Image;

	public Stylebox11: eui.Image;
	public Stylebox12: eui.Image;
	public Stylebox13: eui.Image;
	public Stylebox10: eui.Image;

	public Stylebox01: eui.Image;
	public Stylebox02: eui.Image;
	public Stylebox03: eui.Image;
	public Stylebox00: eui.Image;

	public Stylebox31: eui.Image;
	public Stylebox32: eui.Image;
	public Stylebox33: eui.Image;
	public Stylebox30: eui.Image;

	public Stylebox41: eui.Image;
	public Stylebox42: eui.Image;
	public Stylebox43: eui.Image;
	public Stylebox40: eui.Image;

	public static Type1: FreeReel;
	public static Type2: FreeReel;
	public static Type3: FreeReel;
	public static freagR: any;
	public yellowMc: egret.MovieClip;
	public constructor() {
		super();
		this.skinName = FreeGameScenceSkin;
		this.mc();
		this.chushi();
	}
	public mc() {
		if (!this.yellowMc) {
			this.yellowMc = game.MCUtils.getMc('Yellow');
			//	ui.yellowMc.x = ui.freeDongH.width / 2;
		}
	}
	public chushi() {
		//this.jixu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
		//	this.registerEvent(this.closebolt, egret.TouchEvent.TOUCH_TAP, this.onclick, this);
	}
	/**
	 * 初始化
	 */
	public init(initone = false): void {
		if (this.isinit) return;
		this.gGroup.visible = false;
		this.delayArr = [];
		this.delayArr.length = 0;
		for (let i = 0; i < 5; i++) {
			let reel: FreeReel = this['R' + i];
			//	this.reelArr.push(this['R' + i]);
			this.delayArr.push(this['delay' + i]);
			reel.init(i, initone);
		}
		for (let j = 1; j < 41; j++) {
			let rm: eui.Image = (this['line_' + j] as eui.Image);
			rm.visible = false;
		}
		this.isinit = true;
		FreeGameScence.quanType = this['R' + 3];
		FreeGameScence.Type1 = this['R' + 1];
		FreeGameScence.Type2 = this['R' + 2];
		FreeGameScence.freagR = this.freeGame;
		for (let k = 0; k < 5; k++) {
			for (let h = 0; h < 4; h++) {
				this["Stylebox" + k + h].visible = false;
			}
		}
	}
	public initGree() {
		for (let i = 0; i < 5; i++) {
			let reel: FreeReel = this['R' + i];
			reel.initFreeGame(i);
		}
	}
	public is_refresh = false;
	public isTimer: any;
	/**
	 * 滑动两侧滑条和加减按钮线条时调用此方法
	 */
	public onChange_line(index): void {
		this.is_refresh = true;
		for (let j = 1; j < 41; j++) {
			if (j <= index) {
				let rm: eui.Image = (this['line_' + j] as eui.Image);
				rm.visible = true;
			} else {
				let rm: eui.Image = (this['line_' + j] as eui.Image);
				rm.visible = false;
			}
		}
		this.refreshTime(index);
	}

	/**
	 * 消除 免费牌子特效
	 */
	public static onEliminate() {
		for (let i = 0; i < 5; i++) {
			let reel: FreeReel = this['R' + i];
			reel.onEliminateIcon(i);
		}
	}
	public refreshTime(index) {
		egret.clearTimeout(this.isTimer);
		if (this.is_refresh) {
			this.is_refresh = false;
			this.isTimer = egret.setTimeout(() => {
				for (let j = 1; j < 41; j++) {
					let rm: eui.Image = (this['line_' + j] as eui.Image);
					rm.visible = false;
				}
			}, this, 1500)
		}
	}

	/**
	 * 开始游戏
	 */
	public startReel(): void {
		let delayTimer = GameConfig.speedPlay ? 0 : 0;
		for (let i = 0; i < 5; i++) {
			let reel: FreeReel = this['R' + i];
			reel.start(i);
		}
	}
	public removReel(): void {
		for (let i = 0; i < 5; i++) {
			let reel: FreeReel = this['R' + i];
			reel.removStart();
		}
	}
	public stopGamedely;

	public stopdey;
	/**
	 * 停止游戏
	 */
	public stopGame() {
		egret.clearTimeout(this.stopGamedely);
		for (let j = 0; j < 5; j++) {
			egret.clearTimeout(this["delay" + j]);
			let reel: FreeReel = this['R' + j];
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
	}

	/**
 * clear全部线束
 */
	public clearLine(): void {
		for (let i: number = 1; i <= 40; i++) {
			(this['line_' + i] as eui.Image).visible = false;
		}
		for (var w = 0; w < 5; w++) {
			let re: eui.Rect = (this['p' + w] as eui.Rect);
			re.visible = false;
		}
		this.gGroup.visible = false;
		for (var k = 0; k < 5; k++) {
			for (var h = 0; h < 4; h++) {
				this["Stylebox" + k + h].visible = false;
			}
		}

	}
	/**
	 *显示一线获胜
	 *显示完成回调
	 */
	public showLineWin(data: any, callfun: any, callobj: any): void {
		this.gGroup.visible = true;
		for (var k = 0; k < 5; k++) {
			let re: eui.Rect = (this['p' + k] as eui.Rect);
			re.visible = true;
		}
		let img: eui.Image = (this['line_' + data.Data.Line] as eui.Image);
		egret.Tween.removeTweens(img);
		img.visible = true;

		for (let i = 0; i < data.Positions.length; i++) {
			let img2 = this['Stylebox' + data.Positions[i].X + data.Positions[i].Y];
			let re: eui.Rect = (this['p' + i] as eui.Rect);
			re.visible = false;
			img2.source = "box_" + data.Data.Line + "@2x_png";
			if (vo.GameData.resultData.Value.Main.ReelSymbols[data.Positions[i].X][data.Positions[i].Y] == "WW") {
				img2.visible = false;
			} else {
				img2.visible = true;
			}
		}
		img.mask = this.gGroup;
		egret.Tween.get(img).wait(900)
			.call(() => {
				if (callfun && callobj) {
					callfun.call(callobj);
				}
			}, this);
	}
	private winIcon: Array<any> = [];
	private showIconArray: Array<any> = [];
	public showIcon(data) {
		this.winIcon = [];
		this.winIcon.length = 0;
		for (var i = 0; i < data.length; i++) {
			for (var j = 0; j < data[i].Positions.length; j++) {
				this.winIcon.push({ X: data[i].Positions[j].X, Y: data[i].Positions[j].Y });
			}
		}
		this.showIconArray = [];//中奖图标集合
		this.showIconArray.length = 0;
		for (var k = 0; k < this.deteleObject(this.winIcon).length; k++) {
			this.showIconArray.push({ X: this.deteleObject(this.winIcon)[k].X, Y: this.deteleObject(this.winIcon)[k].Y })
		}
		this.showIconMove(this.showIconArray, GameConfig.speedPlay);
	}
	/**
	 * 展示中奖图标并播放动画
	 */
	public showIconMove(iocnArry: Array<any>, type: boolean) {
		if (type)
			if (!GameManager.getInstance().judgeelement) return;
		for (var i = 0; i < iocnArry.length; i++) {
			let reel: FreeReel = this['R' + iocnArry[i].X];
			reel.showIcon(iocnArry[i].X, iocnArry[i].Y, this['RR' + iocnArry[i].X])
		}
	}
	/**
	 * 隐藏中奖动画
	 *  设置全正常
 	*/
	public setItem(): void {
		for (let i: number = 0; i < 5; i++) {
			let reel: FreeReel = this['RR' + i];
			reel.hideAction();
			let reel1: FreeReel = this['R' + i];
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
			let reel: FreeReel = this['R' + this.showIconArray[j].X];
			reel.AccordingIcon(this.showIconArray[j].X, this.showIconArray[j].Y);
		}
		for (var k = 1; k < 41; k++) {
			let img: eui.Image = (this['line_' + k] as eui.Image);
			egret.Tween.removeTweens(img);
			img.visible = false;
		}
		for (var l = 0; l < 5; l++) {
			for (var u = 0; u < 4; u++) {
				let img2: eui.Image = (this['Stylebox' + l + u] as eui.Image);
				img2.visible = false;
			}
		}
	}

	/**
	 * 数组中对象去重
	 */
	public deteleObject(obj) {
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
	}
	public freeDeley;
	public freeDeley1;
	public onShowAnimation() {
		this.visible = true;
		SetConst.SET_FreeGame_interface = true;
		this.cutAnimation.visible = true;
		let ui: MainScenceUI = core.UIManager.getUI(core.UIConst.MainScenceUI);
		ui.logsohwT.FreeGameNum.text = "8";
		ui.caijin.visible = false;
		this.cutAnimation.addChild(this.yellowMc);
		this.yellowMc.gotoAndPlay("a0", -1);
		this.cutAnimation.setChildIndex(this.yellowMc, 1);
		this.yellowMc.x = this.width / 2;
		this.yellowMc.y = 270 + 50 + 30;
		this.freeDeley = egret.setInterval(() => {
			this.yop.visible = !this.yop.visible;
			this.yop1.visible = !this.yop1.visible;
			this.yop2.visible = !this.yop2.visible;
		}, this, 300);
		this.freeDeley1 = egret.setTimeout(() => {
			console.log("动画界面展示完毕，准备旋转免费游戏")
			egret.clearInterval(this.freeDeley);
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
			egret.clearTimeout(this.freeDeley1);
		}, this, 6000);
	}

	public clearOnShow() {
		egret.clearInterval(this.freeDeley);
		egret.clearTimeout(this.freeDeley1);
		let ui: MainScenceUI = core.UIManager.getUI(core.UIConst.MainScenceUI);
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

	}

	public onShowFreeGameSettlement(data) {
		console.log("免费游戏结束，出现结算界面");
		SetConst.SET_FreeGame_settlement = true;

		this.freeSettlement.visible = true;
		this.jixu.visible = false;
		let ui: MainScenceUI = core.UIManager.getUI(core.UIConst.MainScenceUI);
		ui.setUI.upONE_TWO();
		ui.logsohwT.G1.visible = true;
		ui.logsohwT.G2.visible = false;
		this.record.visible = false;
		//this.freeGameWin.text = "";
		this._freereward = 0;
		//SoundManager.getInstance().setBgOn(false);
		SoundManager.getInstance().playEffect("RR_FG_climax_mp3", 1);
		SoundManager.getInstance().playMusic("win_increase_mp3", 5).then((chanel) => {
			MainScenceUI.musc6 = chanel;
		});
		//	SoundManager.getInstance().playEffect("win_increase_mp3");
		egret.Tween.get(this).to({ freereward: data }, 2000).call(() => {
			if (MainScenceUI.musc6) {
				MainScenceUI.musc6.stop();
				MainScenceUI.musc6 = null;
			}
			//	SoundManager.getInstance().setBgOn(true);
			SoundManager.getInstance().playBg("game_bg_mp3");
			this.jixu.visible = true;
			SoundManager.getInstance().playEffect("win_increase_end_mp3");
		}, this);

	}
	private _freereward: number;
	public set freereward(v: number) {
		this._freereward = v;
		this.freeGameWin.text = '￥' + GameManager.numberToCommonStr(this._freereward);
	}
	public get freereward(): number {
		return this._freereward;
	}
	public onTab() {
		console.log("关闭免费游戏结算界面");
	//	this.cutAnimation.visible = false;
		this.record.visible = false;
		this.freeSettlement.visible = false;
		this.visible = false;
		SetConst.SET_FreeGame_interface = false;
		SetConst.SET_FreeGame_settlement = false;
		let ui: MainScenceUI = core.UIManager.getUI(core.UIConst.MainScenceUI);
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
	}
}
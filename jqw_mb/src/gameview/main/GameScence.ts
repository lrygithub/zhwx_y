class GameScence extends eui.Component {
	public isinit: boolean = false;
	public reelArr: Array<Reel> = [];
	public delayArr: Array<any> = [];
	public delay0: any;
	public delay1: any;
	public delay2: any;
	public delay3: any;
	public delay4: any;
	public freeGame: eui.Rect;
	public static quanType: Reel;
	public gGroup: eui.Group;

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

	public static Type1: Reel;
	public static Type2: Reel;
	public static Type3: Reel;
	public static freagR: any;

	public static START_CHANEL: egret.SoundChannel;

	public static Music_1: egret.SoundChannel;
	public static Music_2: egret.SoundChannel;
	public static Music_3: egret.SoundChannel;

	public constructor() {
		super();
		this.skinName = GameScenceSkin;
	}
	/**
	 * 初始化
	 */
	public init(): void {
		if (this.isinit) return;
		this.gGroup.visible = false;
		this.delayArr = [];
		this.delayArr.length = 0;
		for (let i = 0; i < 5; i++) {
			let reel: Reel = this['R' + i];
			this.delayArr.push(this['delay' + i]);
			reel.init(i);
		}
		for (let j = 1; j < 41; j++) {
			let rm: eui.Image = (this['line_' + j] as eui.Image);
			rm.visible = false;

		}
		this.isinit = true;
		GameScence.quanType = this['R' + 3];

		GameScence.Type1 = this['R' + 1];
		GameScence.Type2 = this['R' + 2];
		GameScence.freagR = this.freeGame;

		for (let k = 0; k < 5; k++) {
			for (let h = 0; h < 4; h++) {
				this["Stylebox" + k + h].visible = false;
			}
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
			let reel: Reel = this['R' + i];
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
		this.clearLine();
		if (!GameConfig.speedPlay)
			SoundManager.getInstance().playMusic("reelspin_mp3").then((chanel) => {
				GameScence.START_CHANEL = chanel;
			});
		for (let i = 0; i < 5; i++) {
			let reel: Reel = this['R' + i];
			this["delay" + i] = egret.setTimeout(() => {
				reel.start(i);
			}, this, 0);
		}
	}
	public removReel(): void {
		for (let i = 0; i < 5; i++) {
			let reel: Reel = this['R' + i];
			reel.removStart();
		}
	}
	/**
	 * 停止游戏
	 */
	public stopGame() {
		if (GameScence.START_CHANEL) {
			GameScence.START_CHANEL.stop();
			GameScence.START_CHANEL = null;
		}
		if (GameScence.Music_1) {
			GameScence.Music_1.stop();
			GameScence.Music_1 = null;
		}
		for (let j = 0; j < this.delayArr.length; j++) {
			egret.clearTimeout(this["delay" + j]);
			let reel: Reel = this['R' + j];
			egret.clearTimeout(this["delay" + j]);
			reel.stopIcon(j);
		}
		GameScence.Type1.onEliminateIcon(1);
		GameScence.Type2.onEliminateIcon(2);
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
		SoundManager.getInstance().playEffect("line_show_mp3");
		this.gGroup.visible = true;
		for (var k = 0; k < 5; k++) {
			let re: eui.Rect = (this['p' + k] as eui.Rect);
			re.visible = true;
		}
		let img: eui.Image = (this['line_' + data.Data.Line] as eui.Image);
		egret.Tween.removeTweens(img);
		img.visible = true;
		for (let i = 0; i < data.SymbolCount; i++) {
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
		let ui: MainScenceUI = core.UIManager.getUI(core.UIConst.MainScenceUI);
		egret.Tween.get(img).wait(900)
			.call(() => {
				if (callfun && callobj) {
					callfun.call(callobj);
				}
			}, this);
	}
	/**
 	*显示一线获胜
	 *显示完成回调
	 */
	public showLineWin1(data: any, callfun: any, callobj: any): void {
		this.gGroup.visible = true;
		for (var k = 0; k < 5; k++) {
			let re: eui.Rect = (this['p' + k] as eui.Rect);
			re.visible = true;
		}
		let img: eui.Image = (this['line_' + data.Data.Line] as eui.Image);
		egret.Tween.removeTweens(img);
		img.visible = true;
		for (let i = 0; i < data.SymbolCount; i++) {
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
		let ui: MainScenceUI = core.UIManager.getUI(core.UIConst.MainScenceUI);
		// ui.lineID.text = "" + data.Data.Line;
		// ui.winMoney.text = "￥" + GameManager.numberToCommonStr(data.Win);

		egret.Tween.get(img).wait(900)
			.call(() => {
				if (callfun && callobj) {
					callfun.call(callobj);
				}
			}, this);
	}
	private winIcon: Array<any> = [];
	private showIconArray: Array<any> = [];
	public showIcon(data, isfor = false) {
		this.winIcon = [];
		this.winIcon.length = 0;
		for (var i = 0; i < data.length; i++) {
			for (var j = 0; j < data[i].SymbolCount; j++) {
				this.winIcon.push({ X: data[i].Positions[j].X, Y: data[i].Positions[j].Y });
			}
		}
		this.showIconArray = [];//中奖图标集合
		this.showIconArray.length = 0;
		for (var k = 0; k < this.deteleObject(this.winIcon).length; k++) {
			this.showIconArray.push({ X: this.deteleObject(this.winIcon)[k].X, Y: this.deteleObject(this.winIcon)[k].Y })
		}
		this.showIconMove(this.showIconArray, GameConfig.speedPlay, isfor);
	}
	/**
	 * 展示中奖图标并播放动画
	 */
	public showIconMove(iocnArry: Array<any>, type: boolean, isfor: boolean) {
		if (type) {
			if (!GameManager.getInstance().judgeelement) return;
		}
		for (var i = 0; i < iocnArry.length; i++) {
			let reel: Reel = this['R' + iocnArry[i].X];
			reel.showIcon(iocnArry[i].X, iocnArry[i].Y, this['RR' + iocnArry[i].X], isfor)
		}
	}
	/**
	 * 隐藏中奖动画
	 *  设置全正常
 	*/
	public setItem(): void {
		for (let i: number = 0; i < 5; i++) {
			let reel1: Reel = this['RR' + i];
			reel1.hideAction();
			let reel: Reel = this['R' + i];
			reel.hideAction1();
		}
		GameScence.Type1.onEliminateIcon(1);
		GameScence.Type2.onEliminateIcon(2);
		GameScence.quanType.onEliminateIcon(3);
		for (var j = 0; j < this.showIconArray.length; j++) {
			let reel: Reel = this['R' + this.showIconArray[j].X];
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
	}
}
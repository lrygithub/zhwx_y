
class MainScenceUI extends core.BaseUI {
	public bg: eui.Image;
	public gameScence: GameScence;
	public freegameScence: FreeGameScence;
	public setUI: SetUI;
	public rewardIndex: number = -1;
	//public tipGroup: eui.Group;
	public tipLabel: eui.Label;
	public mcGroup: eui.Group;
	public rewardMc;
	public wutonglei: egret.MovieClip;
	public luse: egret.MovieClip;
	public xiaoluse: egret.MovieClip;
	public dj: egret.MovieClip;
	public mk_bg: eui.Image;
	public mk: eui.Rect;
	public percentage: eui.Label;
	public pg_btn: MouseButton;
	public TheLogin: eui.Group;
	public mainGroup: eui.Group;
	public static musc1: egret.SoundChannel;
	public static musc2: egret.SoundChannel;
	public static musc3: egret.SoundChannel;
	public static musc4: egret.SoundChannel;
	public static musc5: egret.SoundChannel;
	public static musc6: egret.SoundChannel;
	/**
	 * 数值跳动
	 */
	public F1: eui.BitmapLabel;
	public F2: eui.BitmapLabel;
	public F3: eui.BitmapLabel;
	public F4: eui.BitmapLabel;

	public xuanzhuan: eui.Image;

	public caijin: eui.Group;

	public informationGroup: eui.Group;
	public logsohwT: logshow;
	public one0: eui.Image;
	public one1: eui.Image;
	public one2: eui.Image;
	public one3: eui.Image;
	public one3_1: eui.Image;
	public p1: eui.Group;
	public p2: eui.Group;
	public p3: eui.Group;
	public p4: eui.Group;

	public xuan0: eui.Image;
	public xuan1: eui.Image;
	public xuan2: eui.Image;
	public xuan3: eui.Image;

	public closeInfo: eui.Button;
	public zhuo: eui.Button;
	public you: eui.Button;
	public zhongjian_deley;
	public zhongjian_deley1;
	public infoIndex = 0;
	public constructor() {
		super();
		this.skinName = MainScenceUISkin;
		this.init();
	}
	public leng = 0;
	public one;
	public init() {
		this.mk_bg.mask = this.mk;
		this.mk.width = 0;
		this.one = egret.setInterval(() => {
			this.gb();
		}, this, 20);
	}
	public gb() {
		this.leng += 2;
		this.mk.width = this.leng;
		this.percentage.visible = true;
		this.percentage.text = "" + Number(Math.floor(this.leng / 257 * 100)) + "%";
		if (this.leng >= 257) {
			this.pg_btn.visible = true;
			this.sfpg_btn = true;
			egret.clearInterval(this.one);
		}
	}
	public mc() {
		if (!this.wutonglei) {
			this.wutonglei = game.MCUtils.getMc('WuTongLei');
		}
		if (!this.luse) {
			this.luse = game.MCUtils.getMc('luguan');
		}
		if (!this.xiaoluse) {
			this.xiaoluse = game.MCUtils.getMc('xiaoluguang');
		}
		if (!this.dj) {
			this.dj = game.MCUtils.getMc('dj');
		}
	}

	public onAdd(): void {
		super.onAdd();
		this.gameScence.init();
		this.freegameScence.init();
		SoundManager.getInstance().playBg("loading_mp3");
		this.updataUI();
		this.registerEvent(this.gameScence, egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
		this.registerEvent(this, egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
		this.registerEvent(this.freegameScence.jixu, egret.TouchEvent.TOUCH_TAP, this.FreeOntap, this);
		//	this.jixu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);

		this.one3_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
		this.closeInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
		this.zhuo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
		this.you.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
		egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
		this.im1_im2_rewardLabel1_onchange(true, false);
		this.bg_xuanzhuan();
		this.setUI.totalBet.text = '￥' + GameManager.numberToCommonStr(vo.GameData.betScoreArr[vo.GameData.betIndex] * 45);
		this.setUI.balanceLabel.text = '￥' + GameManager.numberToCommonStr(vo.GameData.balance);
		this.pg_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclike, this);
		this.alpha = 1;
		this.pg_btn.visible = false;
		this.onchangeNumber();
		this.onchangeNumber1();
		this.onchangeNumber2();
		this.onchangeNumber3();
		this.mc();
		this.updataSame();
	}
	public sfpg_btn = false;
	public Click_pg_btn = false;
	public onclike() {
		//	SetConst.Break_Line_Reconnection = true;

		this.TheLogin.visible = false;
		this.Click_pg_btn = true;
		this.setUI.visible = true;
		this.mainGroup.visible = true;
		if (!SetConst.Break_Line_Reconnection) {
			SoundManager.getInstance().playBg("game_bg_mp3");
			this.caijin.visible = true;
			this.gameScence.visible = true;
			this.freegameScence.visible = false;
		} else {
			SoundManager.getInstance().playBg("RR_FG_ambient_mp3");
			this.caijin.visible = false;
			//this.gameScence.visible = false;
			this.freegameScence.visible = true;
			this.logsohwT.G1.visible = false;
			this.logsohwT.G2.visible = true;
			this.setUI.processBtn.visible = true;
			this.setUI.processBtn1.visible = false;
			this.freegameScence.cutAnimation.visible = false;
			this.freegameScence.record.visible = true;
			SetConst.Whetherornot_Open = true;
			SetConst.ONE_TWO = true;
			SetConst.SET_FreeGame_interface = true;
			this.logsohwT.FreeGameNum.text = GameManager.getInstance().freeNumber + "";
			this.freegameScence.freeMoney.text = "￥" + GameManager.numberToCommonStr(GameManager.getInstance().recordFreeGameMoney);
			this.setUI.upButtonVisible(0);
			this.setUI.updataBtnState();
			this.setUI.upONE_TWO();
			GameManager.getInstance().dispatchEventWith(SetEvent.SET_freeSTART);
		}
	}
	public FreeOntap() {
		this.freegameScence.cutAnimation.visible = false;
		this.freegameScence.record.visible = false;
		this.freegameScence.freeSettlement.visible = false;
		this.freegameScence.visible = false;
		SetConst.SET_FreeGame_interface = false;
		SetConst.SET_FreeGame_settlement = false;
		this.caijin.visible = true;
		SetConst.AUTO = false;
		vo.GameData.autoPlayCount = 0;
		SetConst.ONE_TWO = false;
		SetConst.Whetherornot_Open = false;
		SetConst.SET_Button_VIS = false;
		this.logsohwT.G1.visible = true;
		this.logsohwT.G2.visible = false;
		this.setUI.upButtonVisible(1);
		this.setUI.upONE_TWO();
		this.setUI.updataBtnState();
		this.setUI.updataEnable(1);
		if (MainScenceUI.musc5) {
			MainScenceUI.musc5.stop();
			MainScenceUI.musc5 = null;
		}
		SoundManager.getInstance().playBg("game_bg_mp3");
		GameManager.ordinary_of_free = true;
		this.showFreeMeney(GameManager.getInstance().recordFreeGameMoney + 40 * 3 * Number(vo.GameData.betScoreArr[vo.GameData.betIndex]));
		GameManager.getInstance().recordFreeGameMoney = 0;
	}
	public isBegin: boolean = false;
	public tx: number = 0;
	public ty: number = 0;
	public onBegin(e: egret.TouchEvent): void {
		this.tx = e.stageX;
		this.ty = e.stageY;
		if (GameManager.getInstance().gameState == GameType.GameState.STOP && e.currentTarget == this.gameScence && this.isBegin == false) {
			this.isBegin = true;
		}
	}
	public bg_xuanzhuan() {
		egret.Tween.get(this.xuanzhuan, { loop: true }).to({ rotation: -360 }, 20000).call(() => {
			this.xuanzhuan.rotation = 0;
		});
	}

	public isOnShowHelp(index) {
		egret.Tween.removeTweens(this.p1);
		egret.Tween.removeTweens(this.p2);
		egret.Tween.removeTweens(this.p3);
		egret.Tween.removeTweens(this.p4);
		switch (index) {
			case 0:
				this.zhuo.enabled = false;
				this.you.enabled = true;
				egret.Tween.get(this.p1).to({ horizontalCenter: 0 }, 200);
				egret.Tween.get(this.p2).to({ horizontalCenter: 1157 }, 200);
				egret.Tween.get(this.p3).to({ horizontalCenter: 2314 }, 200);
				egret.Tween.get(this.p4).to({ horizontalCenter: 3471 }, 200);
				//	this.p1.horizontalCenter
				// this.one0.visible = true;
				// this.one1.visible = false;
				// this.one2.visible = false;
				// this.one3.visible = false;
				// this.one3_1.visible = false;
				this.xuan0.source = "on@2x_png";
				this.xuan1.source = "off@2x_png";
				this.xuan2.source = "off@2x_png";
				this.xuan3.source = "off@2x_png";
				break;
			case 1:
				this.zhuo.enabled = true;
				this.you.enabled = true;
				// this.one0.visible = false;
				// this.one1.visible = true;
				// this.one2.visible = false;
				// this.one3.visible = false;
				// this.one3_1.visible = false;
				egret.Tween.get(this.p1).to({ horizontalCenter: -1157 }, 200);
				egret.Tween.get(this.p2).to({ horizontalCenter: 0 }, 200);
				egret.Tween.get(this.p3).to({ horizontalCenter: 1157 }, 200);
				egret.Tween.get(this.p4).to({ horizontalCenter: 2314 }, 200);
				this.xuan0.source = "off@2x_png";
				this.xuan1.source = "on@2x_png";
				this.xuan2.source = "off@2x_png";
				this.xuan3.source = "off@2x_png";
				break;
			case 2:
				this.you.enabled = true;
				this.zhuo.enabled = true;
				// this.one0.visible = false;
				// this.one1.visible = false;
				// this.one2.visible = true;
				// this.one3.visible = false;
				// this.one3_1.visible = false;
				egret.Tween.get(this.p1).to({ horizontalCenter: -2314 }, 200);
				egret.Tween.get(this.p2).to({ horizontalCenter: -1157 }, 200);
				egret.Tween.get(this.p3).to({ horizontalCenter: 0 }, 200);
				egret.Tween.get(this.p4).to({ horizontalCenter: 1157 }, 200);
				this.xuan0.source = "off@2x_png";
				this.xuan1.source = "off@2x_png";
				this.xuan2.source = "on@2x_png";
				this.xuan3.source = "off@2x_png";
				break;
			case 3:
				this.you.enabled = false;
				this.zhuo.enabled = true;
				// this.one0.visible = false;
				// this.one1.visible = false;
				// this.one2.visible = false;
				// this.one3.visible = true;
				// this.one3_1.visible = true;
				egret.Tween.get(this.p1).to({ horizontalCenter: -3471 }, 200);
				egret.Tween.get(this.p2).to({ horizontalCenter: -2314 }, 200);
				egret.Tween.get(this.p3).to({ horizontalCenter: -1157 }, 200);
				egret.Tween.get(this.p4).to({ horizontalCenter: 0 }, 200);
				this.xuan0.source = "off@2x_png";
				this.xuan1.source = "off@2x_png";
				this.xuan2.source = "off@2x_png";
				this.xuan3.source = "on@2x_png";
				break;
		}
	}
	public isOnShowHelp1(index) {
		egret.Tween.removeTweens(this.p1);
		egret.Tween.removeTweens(this.p2);
		egret.Tween.removeTweens(this.p3);
		egret.Tween.removeTweens(this.p4);
		switch (index) {
			case 0:
				this.zhuo.enabled = false;
				this.you.enabled = true;
				this.p1.horizontalCenter = 0;
				this.p2.horizontalCenter = 1157;
				this.p3.horizontalCenter = 2314;
				this.p4.horizontalCenter = 3471;
				this.xuan0.source = "on@2x_png";
				this.xuan1.source = "off@2x_png";
				this.xuan2.source = "off@2x_png";
				this.xuan3.source = "off@2x_png";
				break;
			case 1:
				this.zhuo.enabled = true;
				this.you.enabled = true;
				this.p1.horizontalCenter = -1157;
				this.p2.horizontalCenter = 0;
				this.p3.horizontalCenter = 1157;
				this.p4.horizontalCenter = 2314;
				this.xuan0.source = "off@2x_png";
				this.xuan1.source = "on@2x_png";
				this.xuan2.source = "off@2x_png";
				this.xuan3.source = "off@2x_png";
				break;
			case 2:
				this.you.enabled = true;
				this.zhuo.enabled = true;
				this.p1.horizontalCenter = -2314;
				this.p2.horizontalCenter = -1157;
				this.p3.horizontalCenter = 0;
				this.p4.horizontalCenter = 1157;
				this.xuan0.source = "off@2x_png";
				this.xuan1.source = "off@2x_png";
				this.xuan2.source = "on@2x_png";
				this.xuan3.source = "off@2x_png";
				break;
			case 3:
				this.you.enabled = false;
				this.zhuo.enabled = true;
				this.p1.horizontalCenter = -3470;
				this.p2.horizontalCenter = -2314;
				this.p3.horizontalCenter = -1157;
				this.p4.horizontalCenter = 0;
				this.xuan0.source = "off@2x_png";
				this.xuan1.source = "off@2x_png";
				this.xuan2.source = "off@2x_png";
				this.xuan3.source = "on@2x_png";
				break;
		}
	}
	public onHelp(e: egret.TouchEvent) {
		switch (e.currentTarget) {
			case this.one3_1:
				core.UIManager.openUI(core.UIConst.HelpUI, core.LayerManager.Layer_Top);
				break;
			case this.closeInfo:
				SetConst.SET_INFO = false;
				this.informationGroup.visible = false;
				this.setUI.visible = true;
				break;
			case this.zhuo:
				this.infoIndex--;
				if (this.infoIndex < 0)
					this.infoIndex = 0;
				this.isOnShowHelp(this.infoIndex)
				break;
			case this.you:
				this.infoIndex++;
				if (this.infoIndex > 3)
					this.infoIndex = 3;
				this.isOnShowHelp(this.infoIndex)
				break;
		}
	}


	public isShowWin: boolean = true;
	/**
	 * 显示正常获胜
	 */
	public showAllWin(winArr: Array<any>, callfun: any = null, callobj: any = null): void {
		this.isShowWin = true;
		let iscall: boolean = false;
		let index: number = 0;
		let showLineCall: any = () => {
			this.gameScence.clearLine();
			if (!this.isShowWin) return;
			if (winArr.length == 1) {
				this.gameScence.showLineWin1(winArr[index], () => {
					index++;
					if (index >= winArr.length) {
						index = 0;
						if (!iscall && callfun && callobj) {
							iscall = true;
							callfun.call(callobj);
						}
					}
					showLineCall();
				}, this);
			}
			if (winArr.length > 1) {
				this.gameScence.showLineWin(winArr[index], () => {
					index++;
					if (index >= winArr.length) {
						index = 0;
						if (!iscall && callfun && callobj) {
							iscall = true;
							callfun.call(callobj);
						}
					}
					showLineCall();
				}, this);
			}
		}
		showLineCall();
	}
	public showAllWin1(winArr: Array<any>, callfun: any = null, callobj: any = null): void {
		this.isShowWin = true;
		let iscall: boolean = false;
		let index: number = 0;
		let showLineCall: any = () => {
			this.freegameScence.clearLine();
			if (!this.isShowWin) return;
			this.freegameScence.showLineWin(winArr[index], () => {
				index++;
				if (index >= winArr.length) {
					index = 0;
					if (!iscall && callfun && callobj) {
						iscall = true;
						callfun.call(callobj);
					}
				}
				showLineCall();
			}, this);
		}
		showLineCall();
	}
	/**
  * 显示提示奖励
  */
	public TotalWin = 0;
	public times = 0;
	public showRewardStart(data: number): void {
		this.im1_im2_rewardLabel1_onchange(true, true);
		this.times = 0;
		this.TotalWin = data;
		this.reward = 0;
		let b = this.TotalWin / (45 * Number(vo.GameData.betScoreArr[vo.GameData.betIndex]));
		if (b >= 20) {
			this.times = 4;
		} else if (b >= 10) {
			this.times = 3;
		}
		else if (b >= 1) {
			this.times = 2;
		} else {
			this.times = 1;
		}
		if (!GameConfig.speedPlay) {
			this.showSingleReward(this.TotalWin);
		} else {
			this.showSingleReward1(this.TotalWin);
		}
	}
	public showFreeRewardStart(data: number) {
		this.im1_im2_rewardLabel1_onchange(true, true)
		this.times = 0;
		this.TotalWin = data;
		this.reward = 0;
		let b = this.TotalWin / (45 * Number(vo.GameData.betScoreArr[vo.GameData.betIndex]));
		if (b >= 20) {
			this.times = 4;
		} else if (b >= 10) {
			this.times = 3;
		}
		else if (b >= 1) {
			this.times = 2;
		} else {
			this.times = 1;
		}
		if (!GameConfig.speedPlay) {
			this.showFreeSingleReward(this.TotalWin);
		} else {
			this.showSingleReward1(this.TotalWin);
		}
	}
	public is_NoRrw = 0;
	/**
	* 显示奖金以及奖金块的移动
	*/
	public showSingleReward(N: number, if_free = false): void {
		this.im1_im2_rewardLabel1_onchange(true, true);
		this.reward = 0;
		this.mcGroup.visible = true;
		console.log(this.times)
		if (!if_free) {
			this.is_NoRrw = 0;
			switch (this.times) {
				case 1:
					this.rewardIndex = 1;
					SoundManager.getInstance().playMusic("reward_one_mp3", 1).then((chanel) => {
						MainScenceUI.musc1 = chanel;
					});
					egret.Tween.get(this).to({ reward: N }, 500).wait(300).call(() => {
						this.showRewardOver();
					}, this);
					break;
				case 2:
					SoundManager.getInstance().playMusic("reward_two_mp3", 1).then((chanel) => {
						MainScenceUI.musc2 = chanel;
					});
					this.rewardIndex = 2;
					this.setUI.mcGroup.visible = true;
					this.setUI.mcGroup.addChild(this.xiaoluse);
					this.xiaoluse.x = this.setUI.mcGroup.width / 2
					this.xiaoluse.y = (this.setUI.mcGroup.height) * 8 / 9;
					this.xiaoluse.gotoAndPlay("a0", -1);
					this.xiaoluse.scaleX = 1.6;
					this.xiaoluse.scaleY = 1.8;
					egret.Tween.get(this).to({ reward: N }, 2000).wait(400).call(() => {
						this.showRewardOver();
					}, this);
					break;
				case 3:
					SoundManager.getInstance().playMusic("reward_three_mp3", 1).then((chanel) => {
						MainScenceUI.musc3 = chanel;
					});
					this.rewardIndex = 2;
					this.setUI.mcGroup.visible = true;
					this.setUI.mcGroup.addChild(this.xiaoluse);
					this.xiaoluse.x = this.setUI.mcGroup.width / 2
					this.xiaoluse.y = (this.setUI.mcGroup.height) * 8 / 9;
					this.xiaoluse.gotoAndPlay("a0", -1);
					this.xiaoluse.scaleX = 1.6;
					this.xiaoluse.scaleY = 1.8;
					this.zhongjian_deley = egret.setTimeout(() => {
						this.rewardIndex = 3;
						let ish: boolean = window.innerWidth > window.innerHeight;
						let jianglilany = ish ? this.setUI.mcGroup.height * 0.4 : this.setUI.mcGroup.height * 0.45;
						let xiaolusey = ish ? this.setUI.mcGroup.height * 4.5 / 9 : this.setUI.mcGroup.height * 4.3 / 9;
						egret.Tween.get(this.setUI.jianglilan).to({ y: jianglilany }, 1000).call(() => {
							//this.setUI.im.source = "dwb_amount_bg@2x_png";
							this.setUI.im.visible = false;
							this.setUI.im0.visible = true;
						});
						egret.Tween.get(this.xiaoluse).to({ y: xiaolusey }, 1000);
					}, this, 2000)
					egret.Tween.get(this).to({ reward: N }, 3500).wait(300).call(() => {
						this.showRewardOver();
					}, this);
					break;
				case 4:
					SoundManager.getInstance().playMusic("reward_four_mp3", 1).then((chanel) => {
						MainScenceUI.musc4 = chanel;
					});
					this.rewardIndex = 2;
					this.setUI.mcGroup.visible = true;
					this.setUI.mcGroup.addChild(this.xiaoluse);
					this.xiaoluse.x = this.setUI.mcGroup.width / 2
					this.xiaoluse.y = (this.setUI.mcGroup.height) * 8 / 9;
					this.xiaoluse.gotoAndPlay("a0", -1);
					this.xiaoluse.scaleX = 1.6;
					this.xiaoluse.scaleY = 1.8;
					this.zhongjian_deley = egret.setTimeout(() => {
						this.rewardIndex = 3;
						let ish: boolean = window.innerWidth > window.innerHeight;
						let jianglilany = ish ? this.setUI.mcGroup.height * 0.4 : this.setUI.mcGroup.height * 0.45
						let xiaolusey = ish ? this.setUI.mcGroup.height * 4.5 / 9 : this.setUI.mcGroup.height * 4.3 / 9
						egret.Tween.get(this.setUI.jianglilan).to({ y: jianglilany }, 1000).call(() => {
							this.setUI.im.visible = false;
							this.setUI.im0.visible = true;
						});
						egret.Tween.get(this.xiaoluse).to({ y: xiaolusey }, 1000);
						this.zhongjian_deley1 = egret.setTimeout(() => {
							let ish: boolean = window.innerWidth > window.innerHeight;
							this.rewardIndex = 4;
							this.xiaoluse.scaleX = ish ? 2.2 : 1.6;
							this.xiaoluse.scaleY = ish ? 4 : 3;
							this.setUI.mcGroup.addChild(this.dj);
							this.dj.x = this.setUI.mcGroup.width / 2
							this.dj.gotoAndPlay("a0", -1);
							this.dj.scaleX = ish ? 0.7 : 0.5;
							this.dj.scaleY = ish ? 0.7 : 0.5;
							this.dj.y = ish ? (this.setUI.mcGroup.height) * 3 / 9 : (this.setUI.mcGroup.height) * 3.5 / 9;
						}, this, 2000)
					}, this, 2000)
					egret.Tween.get(this).to({ reward: N }, 7000).wait(500).call(() => {
						this.showRewardOver();
					}, this);
					break;
			}
		} else {
			this.is_NoRrw = 1;
			this.times = 0;
			let b = N / (45 * Number(vo.GameData.betScoreArr[vo.GameData.betIndex]));
			if (b >= 20) {
				this.times = 4;

			} else if (b >= 10) {
				this.times = 3;
			}
			else if (b >= 1) {
				this.times = 2;
			} else {
				this.times = 1;
			}
			switch (this.times) {
				case 1:
					this.rewardIndex = 1;
					SoundManager.getInstance().playMusic("reward_one_mp3", 1).then((chanel) => {
						MainScenceUI.musc1 = chanel;
					});
					egret.Tween.get(this).to({ reward: N }, 500).wait(300).call(() => {
						this.showRewardOver(1);
					}, this);
					break;
				case 2:
					this.rewardIndex = 2;
					SoundManager.getInstance().playMusic("reward_two_mp3", 1).then((chanel) => {
						MainScenceUI.musc2 = chanel;
					});
					this.setUI.mcGroup.visible = true;
					this.setUI.mcGroup.addChild(this.xiaoluse);
					this.xiaoluse.x = this.setUI.mcGroup.width / 2
					this.xiaoluse.y = (this.setUI.mcGroup.height) * 8 / 9;
					this.xiaoluse.gotoAndPlay("a0", -1);
					this.xiaoluse.scaleX = 1.6;
					this.xiaoluse.scaleY = 1.8;
					egret.Tween.get(this).to({ reward: N }, 2000).wait(400).call(() => {
						this.showRewardOver(1);
					}, this);
					break;
				case 3:
					this.rewardIndex = 2;
					SoundManager.getInstance().playMusic("reward_three_mp3", 1).then((chanel) => {
						MainScenceUI.musc3 = chanel;
					});
					this.setUI.mcGroup.visible = true;
					this.setUI.mcGroup.addChild(this.xiaoluse);
					this.xiaoluse.x = this.setUI.mcGroup.width / 2
					this.xiaoluse.y = (this.setUI.mcGroup.height) * 8 / 9;
					this.xiaoluse.gotoAndPlay("a0", -1);
					this.xiaoluse.scaleX = 1.6;
					this.xiaoluse.scaleY = 1.8;
					this.zhongjian_deley = egret.setTimeout(() => {
						this.rewardIndex = 3;
						let ish: boolean = window.innerWidth > window.innerHeight;
						let jianglilany = ish ? this.setUI.mcGroup.height * 0.4 : this.setUI.mcGroup.height * 0.45
						let xiaolusey = ish ? this.setUI.mcGroup.height * 4.5 / 9 : this.setUI.mcGroup.height * 4.3 / 9
						egret.Tween.get(this.setUI.jianglilan).to({ y: jianglilany }, 1000).call(() => {
							this.setUI.im.visible = false;
							this.setUI.im0.visible = true;
						});
						egret.Tween.get(this.xiaoluse).to({ y: xiaolusey }, 1000);
					}, this, 2000)
					egret.Tween.get(this).to({ reward: N }, 3500).wait(300).call(() => {
						this.showRewardOver(1);
					}, this);
					break;
				case 4:
					this.rewardIndex = 2;
					SoundManager.getInstance().playMusic("reward_four_mp3", 1).then((chanel) => {
						MainScenceUI.musc4 = chanel;
					});
					this.setUI.mcGroup.visible = true;
					this.setUI.mcGroup.addChild(this.xiaoluse);
					this.xiaoluse.x = this.setUI.mcGroup.width / 2
					this.xiaoluse.y = (this.setUI.mcGroup.height) * 8 / 9;
					this.xiaoluse.gotoAndPlay("a0", -1);
					this.xiaoluse.scaleX = 1.6;
					this.xiaoluse.scaleY = 1.8;
					this.zhongjian_deley = egret.setTimeout(() => {
						this.rewardIndex = 3;
						let ish: boolean = window.innerWidth > window.innerHeight;
						let jianglilany = ish ? this.setUI.mcGroup.height * 0.4 : this.setUI.mcGroup.height * 0.45
						let xiaolusey = ish ? this.setUI.mcGroup.height * 4.5 / 9 : this.setUI.mcGroup.height * 4.3 / 9
						egret.Tween.get(this.setUI.jianglilan).to({ y: jianglilany }, 1000).call(() => {
							this.setUI.im.visible = false;
							this.setUI.im0.visible = true;
						});
						egret.Tween.get(this.xiaoluse).to({ y: xiaolusey }, 1000);
						this.zhongjian_deley1 = egret.setTimeout(() => {
							this.rewardIndex = 4;
							let ish: boolean = window.innerWidth > window.innerHeight;
							this.xiaoluse.scaleX = ish ? 2.2 : 1.6;
							this.xiaoluse.scaleY = ish ? 4 : 3;
							this.setUI.mcGroup.addChild(this.dj);
							this.dj.x = this.setUI.mcGroup.width / 2
							this.dj.gotoAndPlay("a0", -1);
							this.dj.scaleX = ish ? 0.7 : 0.5;
							this.dj.scaleY = ish ? 0.7 : 0.5;
							this.dj.y = ish ? (this.setUI.mcGroup.height) * 3 / 9 : (this.setUI.mcGroup.height) * 3.5 / 9;
						}, this, 2000)
					}, this, 2000)
					egret.Tween.get(this).to({ reward: N }, 7000).wait(500).call(() => {
						this.showRewardOver(1);
					}, this);
					break;
			}
		}
	}
	public showFreeMeney(N: number): void {
		this.im1_im2_rewardLabel1_onchange(true, true);
		this.reward = 0;
		this.mcGroup.visible = true;
		this.times = 0;
		let b = N / (45 * Number(vo.GameData.betScoreArr[vo.GameData.betIndex]));
		if (b >= 20) {
			this.times = 4;

		} else if (b >= 10) {
			this.times = 3;
		}
		else if (b >= 1) {
			this.times = 2;
		} else {
			this.times = 1;
		}
		console.log(this.times);
		this.is_NoRrw = 2;
		switch (this.times) {
			case 1:
				this.rewardIndex = 1;
				SoundManager.getInstance().playMusic("reward_one_mp3", 1).then((chanel) => {
					MainScenceUI.musc1 = chanel;
				});
				egret.Tween.get(this).to({ reward: N }, 500).wait(300).call(() => {
					this.showRewardOver();
				}, this);
				break;
			case 2:
				SoundManager.getInstance().playMusic("reward_two_mp3", 1).then((chanel) => {
					MainScenceUI.musc2 = chanel;
				});
				this.rewardIndex = 2;
				this.setUI.mcGroup.visible = true;
				this.setUI.mcGroup.addChild(this.xiaoluse);
				this.xiaoluse.x = this.setUI.mcGroup.width / 2
				this.xiaoluse.y = (this.setUI.mcGroup.height) * 8 / 9;
				this.xiaoluse.gotoAndPlay("a0", -1);
				this.xiaoluse.scaleX = 1.6;
				this.xiaoluse.scaleY = 1.8;
				egret.Tween.get(this).to({ reward: N }, 2000).wait(400).call(() => {
					this.showRewardOver();
				}, this);
				break;
			case 3:
				SoundManager.getInstance().playMusic("reward_three_mp3", 1).then((chanel) => {
					MainScenceUI.musc3 = chanel;
				});
				this.rewardIndex = 2;
				this.setUI.mcGroup.visible = true;
				this.setUI.mcGroup.addChild(this.xiaoluse);
				this.xiaoluse.x = this.setUI.mcGroup.width / 2
				this.xiaoluse.y = (this.setUI.mcGroup.height) * 8 / 9;
				this.xiaoluse.gotoAndPlay("a0", -1);
				this.xiaoluse.scaleX = 1.6;
				this.xiaoluse.scaleY = 1.8;
				this.zhongjian_deley = egret.setTimeout(() => {
					this.rewardIndex = 3;
					let ish: boolean = window.innerWidth > window.innerHeight;
					let jianglilany = ish ? this.setUI.mcGroup.height * 0.4 : this.setUI.mcGroup.height * 0.45;
					let xiaolusey = ish ? this.setUI.mcGroup.height * 4.5 / 9 : this.setUI.mcGroup.height * 4.3 / 9;
					egret.Tween.get(this.setUI.jianglilan).to({ y: jianglilany }, 1000).call(() => {
						this.setUI.im.visible = false;
						this.setUI.im0.visible = true;
					});
					egret.Tween.get(this.xiaoluse).to({ y: xiaolusey }, 1000);
				}, this, 2000)
				egret.Tween.get(this).to({ reward: N }, 3500).wait(300).call(() => {
					this.showRewardOver();
				}, this);
				break;
			case 4:
				SoundManager.getInstance().playMusic("reward_four_mp3", 1).then((chanel) => {
					MainScenceUI.musc4 = chanel;
				});
				this.rewardIndex = 2;
				this.setUI.mcGroup.visible = true;
				this.setUI.mcGroup.addChild(this.xiaoluse);
				this.xiaoluse.x = this.setUI.mcGroup.width / 2
				this.xiaoluse.y = (this.setUI.mcGroup.height) * 8 / 9;
				this.xiaoluse.gotoAndPlay("a0", -1);
				this.xiaoluse.scaleX = 1.6;
				this.xiaoluse.scaleY = 1.8;
				this.zhongjian_deley = egret.setTimeout(() => {
					this.rewardIndex = 3;
					let ish: boolean = window.innerWidth > window.innerHeight;
					let jianglilany = ish ? this.setUI.mcGroup.height * 0.4 : this.setUI.mcGroup.height * 0.45
					let xiaolusey = ish ? this.setUI.mcGroup.height * 4.5 / 9 : this.setUI.mcGroup.height * 4.3 / 9
					egret.Tween.get(this.setUI.jianglilan).to({ y: jianglilany }, 1000).call(() => {
						this.setUI.im.visible = false;
						this.setUI.im0.visible = true;
					});
					egret.Tween.get(this.xiaoluse).to({ y: xiaolusey }, 1000);
					this.zhongjian_deley1 = egret.setTimeout(() => {
						let ish: boolean = window.innerWidth > window.innerHeight;
						this.rewardIndex = 4;
						this.xiaoluse.scaleX = ish ? 2.2 : 1.6;
						this.xiaoluse.scaleY = ish ? 4 : 3;
						this.setUI.mcGroup.addChild(this.dj);
						this.dj.x = this.setUI.mcGroup.width / 2
						this.dj.gotoAndPlay("a0", -1);
						this.dj.scaleX = ish ? 0.7 : 0.5;
						this.dj.scaleY = ish ? 0.7 : 0.5;
						this.dj.y = ish ? (this.setUI.mcGroup.height) * 3 / 9 : (this.setUI.mcGroup.height) * 3.5 / 9;
					}, this, 2000)
				}, this, 2000)
				egret.Tween.get(this).to({ reward: N }, 7000).wait(500).call(() => {
					this.showRewardOver();
				}, this);
				break;
		}
	}
	public showFreeSingleReward(N: number): void {
		this.im1_im2_rewardLabel1_onchange(true, true);
		this.reward = 0;
		this.mcGroup.visible = true;
		console.log(this.times)
		this.is_NoRrw = 0;
		switch (this.times) {
			case 1:
				this.rewardIndex = 1;
				SoundManager.getInstance().playMusic("reward_one_mp3", 1).then((chanel) => {
					MainScenceUI.musc1 = chanel;
				});
				SoundManager.getInstance().playMusic("win_increase_mp3", -1).then((chanel) => {
					MainScenceUI.musc6 = chanel;
				});
				egret.Tween.get(this).to({ reward: N }, 500).wait(300).call(() => {
					SoundManager.getInstance().playEffect("win_increase_end_mp3");
					this.showRewardOver();
				}, this);
				break;
			case 2:
				SoundManager.getInstance().playMusic("reward_two_mp3", 1).then((chanel) => {
					MainScenceUI.musc2 = chanel;
				});
				SoundManager.getInstance().playMusic("win_increase_mp3", -1).then((chanel) => {
					MainScenceUI.musc6 = chanel;
				});
				this.rewardIndex = 2;
				this.setUI.mcGroup.visible = true;
				this.setUI.mcGroup.addChild(this.xiaoluse);
				this.xiaoluse.x = this.setUI.mcGroup.width / 2
				this.xiaoluse.y = (this.setUI.mcGroup.height) * 8 / 9;
				this.xiaoluse.gotoAndPlay("a0", -1);
				this.xiaoluse.scaleX = 1.6;
				this.xiaoluse.scaleY = 1.8;
				egret.Tween.get(this).to({ reward: N }, 2000).wait(400).call(() => {
					SoundManager.getInstance().playEffect("win_increase_end_mp3");
					this.showRewardOver();
				}, this);
				break;
			case 3:
				SoundManager.getInstance().playMusic("reward_three_mp3", 1).then((chanel) => {
					MainScenceUI.musc3 = chanel;
				});
				SoundManager.getInstance().playMusic("win_increase_mp3", -1).then((chanel) => {
					MainScenceUI.musc6 = chanel;
				});
				this.rewardIndex = 2;
				this.setUI.mcGroup.visible = true;
				this.setUI.mcGroup.addChild(this.xiaoluse);
				this.xiaoluse.x = this.setUI.mcGroup.width / 2
				this.xiaoluse.y = (this.setUI.mcGroup.height) * 8 / 9;
				this.xiaoluse.gotoAndPlay("a0", -1);
				this.xiaoluse.scaleX = 1.6;
				this.xiaoluse.scaleY = 1.8;
				this.zhongjian_deley = egret.setTimeout(() => {
					this.rewardIndex = 3;
					let ish: boolean = window.innerWidth > window.innerHeight;
					let jianglilany = ish ? this.setUI.mcGroup.height * 0.4 : this.setUI.mcGroup.height * 0.45;
					let xiaolusey = ish ? this.setUI.mcGroup.height * 4.5 / 9 : this.setUI.mcGroup.height * 4.3 / 9;
					egret.Tween.get(this.setUI.jianglilan).to({ y: jianglilany }, 1000).call(() => {
						this.setUI.im.visible = false;
						this.setUI.im0.visible = true;
					});
					egret.Tween.get(this.xiaoluse).to({ y: xiaolusey }, 1000);
				}, this, 2000)
				egret.Tween.get(this).to({ reward: N }, 3500).wait(300).call(() => {
					SoundManager.getInstance().playEffect("win_increase_end_mp3");
					this.showRewardOver();
				}, this);
				break;
			case 4:
				SoundManager.getInstance().playMusic("reward_four_mp3", 1).then((chanel) => {
					MainScenceUI.musc4 = chanel;
				});
				SoundManager.getInstance().playMusic("win_increase_mp3", -1).then((chanel) => {
					MainScenceUI.musc6 = chanel;
				});
				this.rewardIndex = 2;
				this.setUI.mcGroup.visible = true;
				this.setUI.mcGroup.addChild(this.xiaoluse);
				this.xiaoluse.x = this.setUI.mcGroup.width / 2
				this.xiaoluse.y = (this.setUI.mcGroup.height) * 8 / 9;
				this.xiaoluse.gotoAndPlay("a0", -1);
				this.xiaoluse.scaleX = 1.6;
				this.xiaoluse.scaleY = 1.8;
				this.zhongjian_deley = egret.setTimeout(() => {
					this.rewardIndex = 3;
					let ish: boolean = window.innerWidth > window.innerHeight;
					let jianglilany = ish ? this.setUI.mcGroup.height * 0.4 : this.setUI.mcGroup.height * 0.45
					let xiaolusey = ish ? this.setUI.mcGroup.height * 4.5 / 9 : this.setUI.mcGroup.height * 4.3 / 9
					egret.Tween.get(this.setUI.jianglilan).to({ y: jianglilany }, 1000).call(() => {
						this.setUI.im.visible = false;
						this.setUI.im0.visible = true;
					});
					egret.Tween.get(this.xiaoluse).to({ y: xiaolusey }, 1000);
					this.zhongjian_deley1 = egret.setTimeout(() => {
						let ish: boolean = window.innerWidth > window.innerHeight;
						this.rewardIndex = 4;
						this.xiaoluse.scaleX = ish ? 2.2 : 1.6;
						this.xiaoluse.scaleY = ish ? 4 : 3;
						this.setUI.mcGroup.addChild(this.dj);
						this.dj.x = this.setUI.mcGroup.width / 2
						this.dj.gotoAndPlay("a0", -1);
						this.dj.scaleX = ish ? 0.7 : 0.5;
						this.dj.scaleY = ish ? 0.7 : 0.5;
						this.dj.y = ish ? (this.setUI.mcGroup.height) * 3 / 9 : (this.setUI.mcGroup.height) * 3.5 / 9;
					}, this, 2000)
				}, this, 2000)
				egret.Tween.get(this).to({ reward: N }, 7000).wait(500).call(() => {
					SoundManager.getInstance().playEffect("win_increase_end_mp3");
					this.showRewardOver();
				}, this);
				break;

		}
	}

	public showSingleReward1(N: number, if_free = false): void {
		SoundManager.getInstance().playMusic("reward_one_mp3", 1).then((chanel) => {
			MainScenceUI.musc1 = chanel;
		});
		egret.Tween.get(this).to({ reward: N }, 500).wait(300).call(() => {
			this.showRewardOver();
		}, this);
	}

	public im1_im2_rewardLabel1_onchange(one: boolean, two: boolean) {
		if (two) {
			this.setUI.im1.visible = false;
			this.setUI.im2.visible = false;
			this.setUI.rewardLabel1.visible = true;
		} else {
			this.setUI.rewardLabel1.visible = false;
			if (one) {
				this.setUI.im1.visible = true;
				this.setUI.im2.visible = false;
			} else {
				this.setUI.im1.visible = false;
				this.setUI.im2.visible = true;
			}
		}
	}

	/**
	 * 显示奖励完成
  	*/
	public showRewardOver(classification: Number = 0): void {
		this.rewardIndex = 0;
		if (GameManager.oppp) {
			GameManager.oppp.stop();
			GameManager.oppp = null;
		}
		if (MainScenceUI.musc1) {
			MainScenceUI.musc1.stop();
			MainScenceUI.musc1 = null;
		}
		if (MainScenceUI.musc2) {
			MainScenceUI.musc2.stop();
			MainScenceUI.musc2 = null;
		}
		if (MainScenceUI.musc3) {
			MainScenceUI.musc3.stop();
			MainScenceUI.musc3 = null;
		}
		if (MainScenceUI.musc4) {
			MainScenceUI.musc4.stop();
			MainScenceUI.musc4 = null;
		}
		if (MainScenceUI.musc5) {
			MainScenceUI.musc5.stop();
			MainScenceUI.musc5 = null;
		}
		if (MainScenceUI.musc6) {
			MainScenceUI.musc6.stop();
			MainScenceUI.musc6 = null;
		}
		if (this.xiaoluse && this.xiaoluse.parent) {
			this.xiaoluse.parent.removeChild(this.xiaoluse);
			this.xiaoluse.stop();
		}
		if (this.dj && this.dj.parent) {
			this.dj.parent.removeChild(this.dj);
			this.dj.stop();
		}
		egret.Tween.removeTweens(this.freegameScence);
		egret.clearTimeout(GameManager.getInstance().wutongleideley);
		egret.clearTimeout(this.zhongjian_deley);
		egret.clearTimeout(this.zhongjian_deley1);
		egret.Tween.removeTweens(this.xiaoluse);
		egret.Tween.removeTweens(this.reward);
		egret.Tween.removeTweens(this.setUI.jianglilan);
		let ish: boolean = window.innerWidth > window.innerHeight;
		let jianglilany = ish ? this.setUI.mcGroup.height * 0.8 : this.setUI.mcGroup.height * 0.843;
		egret.Tween.get(this.setUI.jianglilan).to({ y: jianglilany }, 500).call(() => {
			this.setUI.im.visible = true;
			this.setUI.im0.visible = false;
		});

		switch (classification) {
			case 0:
				if (GameManager.ordinary_of_free) {
					GameManager.getInstance().doNext();
				} else {
					GameManager.getInstance().onFreeGameDoNext();
				}
				break;
			case 1:
				GameManager.getInstance().dispatchEventWith(SetEvent.SET_PAI_OVER_CHANGE);
				break;
			case 2:

				break;
		}

	}
	public onEnd(e: egret.TouchEvent): void {
		this.curtime = egret.getTimer();
		// if (e.currentTarget == this.setUI.autoButton) {
		// 	if (GameManager.getInstance().gameState == GameType.GameState.PLAYING) {
		// 		e.stopPropagation();
		// 		e.stopImmediatePropagation();
		// 	}
		// 	return;
		// }
		if (this.isBegin) {
			this.isBegin = false;
			if (SetConst.AUTO_SHOW || SetConst.BETSET_SHOW) return;
			if (GameManager.getInstance().gameState == GameType.GameState.PLAYING) {
				return;
			}
			// if (e.stageY - this.ty > 20) {
			// 	//	Reel.REEL_MODE = GameType.RellMode.DOWN;
			// 	GameManager.getInstance().dispatchEventWith(SetEvent.SET_START);
			// } else if (e.stageY - this.ty < -20) {
			// 	//	Reel.REEL_MODE = GameType.RellMode.UP;
			// 	GameManager.getInstance().dispatchEventWith(SetEvent.SET_START);
			// }
			// else {
			// }
		}
		else {
			this.isBegin = false;
			if (GameManager.getInstance().gameState == GameType.GameState.PLAYING && SetConst.isCanStopGame == true) {
				SetConst.isCanStopGame = false;
				console.log('aaaaaaa');
				//	let winarr: Array<any> = vo.GameData.resultData.Value.SpinResult.Main.WinResults;
				if (GameManager.ordinary_of_free) {
					this.gameScence.stopGame();
				} else {
					this.freegameScence.stopGame();
				}


			}
		}
	}

	public onchangeNumber() {
		this.f1number = 1780;
		egret.setInterval(() => {
			let nuk = Math.random() * 2 - 1;
			egret.Tween.get(this).to({ f1number: this.f1number + nuk }, 10000);
		}, this, 10000)
	}
	public onchangeNumber1() {
		this.f2number = 255;
		egret.setInterval(() => {
			let nuk = Math.random() * 2 - 1;
			egret.Tween.get(this).to({ f2number: this.f2number + nuk }, 4000);
		}, this, 4000)
	}
	public onchangeNumber2() {
		this.f3number = 3444;
		egret.setInterval(() => {
			let nuk = Math.random() * 2 - 1;
			egret.Tween.get(this).to({ f3number: this.f3number + nuk }, 7000);
		}, this, 7000)
	} public onchangeNumber3() {
		this.f4number = 100;
		egret.setInterval(() => {
			let nuk = Math.random() * 2 - 1;
			egret.Tween.get(this).to({ f4number: this.f4number + nuk }, 1000);
		}, this, 1000)
	}

	private F1_number: number;
	public set f1number(v: number) {
		this.F1_number = v;
		this.F1.text = "￥" + GameManager.numberToCommonStr(this.F1_number);
	}

	public get f1number(): number {
		return this.F1_number;
	}

	private F2_number: number;
	public set f2number(v: number) {
		this.F2_number = v;
		this.F2.text = '￥' + GameManager.numberToCommonStr(this.F2_number);

	}
	public get f2number(): number {
		return this.F2_number;
	}
	private F3_number: number;
	public set f3number(v: number) {
		this.F3_number = v;
		this.F3.text = '￥' + GameManager.numberToCommonStr(this.F3_number);

	}
	public get f3number(): number {
		return this.F3_number;
	}
	private F4_number: number;
	public set f4number(v: number) {
		this.F4_number = v;
		this.F4.text = '￥' + GameManager.numberToCommonStr(this.F4_number);
	}

	public get f4number(): number {
		return this.F4_number;
	}



	public curtime: number = 0;

	public canStop(): void {
		for (let i: number = 0; i < this.gameScence.reelArr.length; i++) {
			let reel: Reel = this.gameScence.reelArr[i];
			// reel.curTime = egret.getTimer();
			// reel.curReelData = vo.GameData.resultData.Value.SpinResult.Main.ReelSymbols[i];
		}
	}

	public updataHor(): void {
		this.updataSame();
	}
	public updataVer(): void {
		this.updataSame();
	}

	public updataSame(): void {
		console.log(this.rewardIndex)
		if (this.sfpg_btn) {
			this.pg_btn.visible = true;
		} else {
			this.pg_btn.visible = false;
		}
		if (this.Click_pg_btn) {
			this.TheLogin.visible = false;
			//	this.setUI.visible = true;
			this.mainGroup.visible = true;
			this.Click_pg_btn = true;
			this.setUI.visible = !SetConst.SET_INFO;
		} else {
		}
		this.informationGroup.visible = SetConst.SET_INFO;

		this.isOnShowHelp1(this.infoIndex);
		let ish: boolean = window.innerWidth > window.innerHeight;
		switch (this.rewardIndex) {
			case -1:
				this.im1_im2_rewardLabel1_onchange(true, false);
				this.setUI.jianglilan.y = ish ? this.setUI.mcGroup.height * 0.8 : this.setUI.mcGroup.height * 0.843;
				this.setUI.im.visible = true;
				this.setUI.im0.visible = false;
				break;
			case 0:
				this.im1_im2_rewardLabel1_onchange(true, true);
				this.setUI.jianglilan.y = ish ? this.setUI.mcGroup.height * 0.8 : this.setUI.mcGroup.height * 0.843;
				this.setUI.im.visible = true;
				this.setUI.im0.visible = false;
				break;
			case 1:
				this.im1_im2_rewardLabel1_onchange(true, true);
				this.setUI.jianglilan.y = ish ? this.setUI.mcGroup.height * 0.8 : this.setUI.mcGroup.height * 0.843;
				this.setUI.im.visible = true;
				this.setUI.im0.visible = false;
				break;
			case 2:
				this.im1_im2_rewardLabel1_onchange(true, true);
				this.setUI.jianglilan.y = ish ? this.setUI.mcGroup.height * 0.8 : this.setUI.mcGroup.height * 0.843;
				this.setUI.mcGroup.visible = true;
				this.xiaoluse.x = this.setUI.mcGroup.width / 2
				this.xiaoluse.y = (this.setUI.mcGroup.height) * 8 / 9;
				this.xiaoluse.scaleX = 1.6;
				this.xiaoluse.scaleY = 1.8;
				this.setUI.im.visible = false;
				this.setUI.im0.visible = true;
				break;
			case 3:
				this.im1_im2_rewardLabel1_onchange(true, true);
				this.xiaoluse.scaleX = 1.6;
				this.xiaoluse.scaleY = 1.8;
				let jianglilany = ish ? this.setUI.mcGroup.height * 0.4 : this.setUI.mcGroup.height * 0.45;
				let xiaolusey = ish ? this.setUI.mcGroup.height * 4.5 / 9 : this.setUI.mcGroup.height * 4.3 / 9;
				this.setUI.jianglilan.y = jianglilany;
				this.setUI.im.visible = false;
				this.setUI.im0.visible = true;
				this.xiaoluse.y = xiaolusey;
				this.xiaoluse.x = this.setUI.mcGroup.width / 2;
				break;
			case 4:
				this.im1_im2_rewardLabel1_onchange(true, true);
				let jianglilany1 = ish ? this.setUI.mcGroup.height * 0.4 : this.setUI.mcGroup.height * 0.45;
				this.setUI.jianglilan.y = jianglilany1;
				this.setUI.im.visible = false;
				this.setUI.im0.visible = true;
				this.xiaoluse.y = xiaolusey;
				this.xiaoluse.x = this.setUI.mcGroup.width / 2;
				this.xiaoluse.scaleX = ish ? 2.2 : 1.6;
				this.xiaoluse.scaleY = ish ? 4 : 3;
				this.dj.x = this.setUI.mcGroup.width / 2
				this.dj.scaleX = ish ? 0.7 : 0.5;
				this.dj.scaleY = ish ? 0.7 : 0.5;
				this.dj.y = ish ? (this.setUI.mcGroup.height) * 3 / 9 : (this.setUI.mcGroup.height) * 3.5 / 9;
				break;
		}
		this.freegameScence.visible = SetConst.SET_FreeGame_interface;
	}

	public onRemove(): void {
		super.onRemove();
	}

	public updataUI(): void {

	}

	public onTab(e: egret.TouchEvent): void {
		this.updataUI();
	}

	private showReward: number = 0;
	public winIndex: number = 0;
	public clert: number;
	public tt: number;
	public tt2: number;
	public hideWin(): void {
		egret.clearInterval(this.clert);
		egret.clearTimeout(this.tt);
		egret.clearTimeout(this.tt2);
		this.hideFiveAnimation();
		this.winIndex = 0;
		this.hideReward();

	}


	public clearRaward(): void {
		console.log("")
		this.rewardIndex = 0;
		SoundManager.getInstance().playEffect("win_increase_end_mp3");
		if (GameManager.oppp) {
			GameManager.oppp.stop();
			GameManager.oppp = null;
		}
		if (MainScenceUI.musc1) {
			MainScenceUI.musc1.stop();
			MainScenceUI.musc1 = null;
		}
		if (MainScenceUI.musc2) {
			MainScenceUI.musc2.stop();
			MainScenceUI.musc2 = null;
		}
		if (MainScenceUI.musc3) {
			MainScenceUI.musc3.stop();
			MainScenceUI.musc3 = null;
		}
		if (MainScenceUI.musc4) {
			MainScenceUI.musc4.stop();
			MainScenceUI.musc4 = null;
		}
		if (MainScenceUI.musc5) {
			MainScenceUI.musc5.stop();
			MainScenceUI.musc5 = null;
		}
		if (MainScenceUI.musc6) {
			MainScenceUI.musc6.stop();
			MainScenceUI.musc6 = null;
		}
		if (this.xiaoluse && this.xiaoluse.parent) {
			this.xiaoluse.parent.removeChild(this.xiaoluse);
			this.xiaoluse.stop();
		}
		if (this.dj && this.dj.parent) {
			this.dj.parent.removeChild(this.dj);
			this.dj.stop();
		}
		if (this.wutonglei && this.wutonglei.parent) {
			this.wutonglei.parent.removeChild(this.wutonglei);
			this.wutonglei.stop();
		}
		egret.clearTimeout(GameManager.getInstance().wutongleideley);
		GameManager.getInstance().wutongleideley = null;
		egret.clearTimeout(this.zhongjian_deley);
		egret.clearTimeout(this.zhongjian_deley1);
		egret.Tween.removeTweens(this.xiaoluse);
		egret.Tween.removeTweens(this);
		egret.Tween.removeTweens(this.setUI.rewardLabel1);
		egret.Tween.removeTweens(this.setUI.jianglilan);
		let ish: boolean = window.innerWidth > window.innerHeight;
		let jianglilany = ish ? this.setUI.mcGroup.height * 0.8 : this.setUI.mcGroup.height * 0.843;
		egret.Tween.get(this.setUI.jianglilan).to({ y: jianglilany }, 500).call(() => {
			this.setUI.im.visible = true;
			this.setUI.im0.visible = false;
		});

		switch (this.is_NoRrw) {
			case 0:
				if (GameManager.ordinary_of_free) {
					GameManager.getInstance().doNext();
				} else {
					GameManager.getInstance().onFreeGameDoNext();
				}
				break;
			case 1:
				GameManager.getInstance().dispatchEventWith(SetEvent.SET_PAI_OVER_CHANGE);
				break;
			case 2:
				console.log("免费游戏里面积累的奖金展示完毕");
				break;
		}
	}
	public hideReward(): void {
		SetConst.REWARD_SHOW = false;
		SetConst.REWARD_SMALLSHOW = false;
		this.showReward = 0;
	}

	public setReward(v: number, isA: boolean = true): void {
		egret.Tween.removeTweens(this);
		if (isA && this.reward < v) {
			egret.Tween.get(this).to({ reward: v }, 2000).call(() => {
			});
		}
		else {
			this.reward = v;
		}
	}
	private _rewardNum: number = 0;
	private set reward(v: number) {
		this._rewardNum = v;
		let s: string = GameManager.numberToCommonStr(this._rewardNum);
		this.setUI.rewardLabel1.visible = true;
		this.setUI.rewardLabel1.text = '￥' + s;
	}
	private get reward(): number {
		return this._rewardNum
	}
	SetUI

	/**
	 * 显示5同类动画
	 */
	public showFiveAimation(data, callfun: any = null): void {
		// SoundManager.getInstance().playEffect(SoundConst.FIVE_SOUND);
		// this.tipGroup.visible = true;
		// this.tipLabel.text = '5个一样的';
		// this.tipLabel.size = 80;
		// this.tipGroup.scaleX = 0.5;
		// this.tipGroup.scaleY = 0.5;
		// if (data.Data) {
		// 	//this.gameScence.pent.showKuang(data.Data.Line, data.Positions);
		// }
		// else {
		// 	//	this.gameScence.pent.showkuang2(data.Positions);
		// }

		// egret.Tween.removeTweens(this.tipGroup);
		// egret.Tween.get(this.tipGroup)
		// 	.to({ scaleX: 1.35, scaleY: 1.35 }, 800).to({ scaleX: 0.5, scaleY: 0.5 }, 800)
		// 	.to({ scaleX: 1.35, scaleY: 1.35 }, 800).to({ scaleX: 0.5, scaleY: 0.5 }, 800)
		// 	.to({ scaleX: 1.35, scaleY: 1.35 }, 800).call(() => {
		// 		this.hideFiveAnimation();
		// 		callfun && callfun();
		// 	}, this);
	}

	/**
	 * 隐藏5同类动画
	 * 
	 */
	public hideFiveAnimation(): void {
		// egret.Tween.removeTweens(this.tipGroup);
		// this.tipGroup.visible = false;
		//this.gameScence.pent.clearAll();
	}

	/**
	 * 显示大奖
	 */
	public showBigReward(callfun: any = null): void {
		// this.tipGroup.visible = true;
		// this.tipLabel.text = '大奖';
		// this.tipLabel.size = 150;
		// this.tipGroup.scaleX = 1;
		// this.tipGroup.scaleY = 1;
		// this.tipGroup.verticalCenter = -150;
		// egret.Tween.removeTweens(this.tipGroup);
		// egret.Tween.get(this.tipGroup)
		// 	.to({ scaleX: 1.3, scaleY: 1.3 }, 550).to({ scaleX: 1, scaleY: 1 }, 550)
		// 	.to({ scaleX: 1.3, scaleY: 1.3 }, 550).to({ scaleX: 1, scaleY: 1 }, 550)
		// 	.to({ scaleX: 1.3, scaleY: 1.3 }, 550).to({ scaleX: 1, scaleY: 1 }, 550)
		// 	.to({ scaleX: 1.3, scaleY: 1.3 }, 550).to({ scaleX: 1, scaleY: 1 }, 550)
		// 	.to({ scaleX: 1.3, scaleY: 1.3 }, 550).to({ scaleX: 1, scaleY: 1 }, 550)
		// 	.to({ scaleX: 1.3, scaleY: 1.3 }, 550).to({ scaleX: 1, scaleY: 1 }, 550).call(() => {
		// 		this.hideBigReward();
		// 		callfun && callfun();
		// 	}, this);

		// if (!this.rewardMc) {
		// 	this.rewardMc = game.MCUtils.getMc('reward');
		// 	this.mcGroup.addChild(this.rewardMc);
		// 	this.rewardMc.x = this.mcGroup.width / 2;
		// 	this.rewardMc.y = this.mcGroup.height / 2 + 30;
		// }
		// this.mcGroup.visible = true;
		// this.rewardMc.gotoAndPlay('a0', -1);
	}

	/**
	 * 隐藏大奖
	 */
	public hideBigReward(): void {
		// egret.Tween.removeTweens(this.tipGroup);
		// this.tipGroup.visible = false;
		// this.rewardMc.stop();
		this.mcGroup.visible = false;
	}

}
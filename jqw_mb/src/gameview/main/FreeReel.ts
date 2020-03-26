class FreeReel extends eui.Component {
	public G1: eui.Group;
	public G2: eui.Group;

	public quanMC: egret.MovieClip;
	public MC_Array: Array<egret.MovieClip>;
	public JQW_Array: Array<egret.MovieClip>;
	public pz_Array: Array<egret.MovieClip>;

	/**
 	* 滚动速度
 	*/
	public reelSpeed: number = 80;
	/**
	 * 正常滚动时间
	 */
	public static TIME: number = 600;
	/**
	 * 快速滚动时间
	 */
	public static SPEEDTIME: number = 200;

	/**
	 * 停止间隔时间
	 */
	public static STOPTIME: number = 100;
	/**
	 * 快速停止间隔时间
	 */
	public static SPEEDSTOPTIME: number = 20;
	/**
		 * 展示数量
		 */
	public ShowNum: number = 4;
	public constructor() {
		super();
		this.skinName = FreeReelSkin;
		this.oninit();
	}
	public oninit(): void {
		this.MC_Array = [];
		this.MC_Array.length = 0;
		this.JQW_Array = [];
		this.JQW_Array.length = 0;
		this.pz_Array = [];
		this.pz_Array.length = 0;
		if (!this.quanMC) {
			this.quanMC = game.MCUtils.getMc('quan');
		}
		for (var i = 0; i < 4; i++) {
			this.MC_Array.push(game.MCUtils.getMc('iocnType'));
		}
		for (var j = 0; j < 4; j++) {
			this.JQW_Array.push(game.MCUtils.getMc('jqw'));
		}

		for (var k = 0; k < 4; k++) {
			this.pz_Array.push(game.MCUtils.getMc('freeIcon'));
		}
	}


	public init(index, initone) {
		for (let i = 0; i < 2; i++) {
			for (let j = 0; j < 4; j++) {
				let item: FreeItem = new FreeItem();
				item.width = this.G1.width;
				item.height = this.G1.height / this.ShowNum;
				this.G1.addChild(item);
				item.y = item.height * j - this.G1.height * (i);
				if (!initone) {
					item.isShowIcon(index, j);
				} else {
					item.isShowIcon(index, j, vo.GameData.resultData.Value.Main.ReelSymbols);
				}

			}
		}
	}
	public static if_onefree = false;
	public static if_twofree = false;
	public timer2: any;
	public start(index) {
		this.NukER = 0;
		FreeReel.if_onefree = false;
		FreeReel.if_twofree = false;
		if (GameConfig.speedPlay) {
			this.displacement = 54;
			for (let j = 0; j < this.G1.numChildren; j++) {
				let reelItem: any = this.G1.getChildAt(j);
				reelItem.OnshowIcon(index, j % 4, GameManager.getInstance().initdata_1, false);
			}
			this.iocnTurn1(index);
		} else {
			this.displacement = 40.5;
			for (let j = 4; j < this.G1.numChildren; j++) {
				let reelItem: any = this.G1.getChildAt(j);
				reelItem.OnshowIcon(index, j % 4, GameManager.getInstance().initdata_1, true);
			}
			this.iocnTurn(index);

		}
	}
	public timer10: any;
	public timer11: any;
	public timer12: any;
	public timer13: any;
	public timer14: any;
	public timerdely: any;
	public displacement: any = 41;

	/**
	 * 接收到数据之后，判断是否有在2.3轴出现C1图标
	 */
	public judge() {
		for (var k = 1; k < 3; k++) {
			for (var g = 0; g < 4; g++) {
				if (vo.GameData.resultData.Value.Main.ReelSymbols[k][g] == "C1") {
					if (k == 1) {
						FreeReel.if_onefree = true;
					}
					if (k == 2) {
						FreeReel.if_twofree = true;
					}
				}
			}
		}
		if (FreeReel.if_onefree && FreeReel.if_twofree) {
			return true;
		} else {
			return false;
		}
	}
	public NukER = 0;
	/**
	 *icon普通转动
	 */
	public iocnTurn(index) {
		let yy = 0;
		let tt = 0;
		this["timer1" + index] = egret.setInterval(() => {
			yy += 1;
			for (let i = 0; i < this.G1.numChildren; i++) {
				let reelItem: any = this.G1.getChildAt(i);
				reelItem.y += this.displacement;
				if (reelItem.y > (this.G1.height + reelItem.height)) {
					this.NukER += 1;
					if (this.NukER > 47) {
						this.NukER = 0;
					}
					reelItem.y = -this.G1.height + reelItem.height;
					reelItem.OnshowIcon(index, this.NukER, GameManager.getInstance().initdata_1, true);
				}
			}
			if (yy > 100 && GameManager.getInstance().WhetherData) {
				if (this.judge()) {//为true表示是有两个C1
					if (index < 3) {
						tt += 1;
						if (tt >= 72 + index * 10) {
							egret.clearInterval(this["timer1" + index]);
							for (let j = 0; j < this.G1.numChildren; j++) {
								let reelItem: any = this.G1.getChildAt(j);
								reelItem.y = (j % 4) * reelItem.height - Math.floor(j / 4) * this.G1.height;
								reelItem.isShowIcon(index, j % 4, vo.GameData.resultData.Value.Main.ReelSymbols);
								egret.Tween.get(reelItem).to({ y: reelItem.y + 40 }, 200, egret.Ease.backOut).call(() => {
									egret.Tween.get(reelItem).to({ y: reelItem.y - 40 }, 100).call(() => {
									})
								})
							}
							if (index == 1) {//判断有没有免费符号
								let Whetherfree = false;
								for (var i = 0; i < vo.GameData.resultData.Value.Main.ReelSymbols[index].length; i++) {
									if ((vo.GameData.resultData.Value.Main.ReelSymbols[index][i]) == "C1") {
										Whetherfree = true;
										let reelItem: any = this.G1.getChildAt(i);
										reelItem.isPlayFree(true);
									}
								}
								if (Whetherfree) {
									SoundManager.getInstance().playEffect("paizi_1_mp3");
									//	console.log("2轴  出现免费牌子 播放免费牌子出现音效，播放免费牌子第一个特效")
								}
							}
							if (index == 2) {//判断有没有免费符号
								let Whetherfree = false;
								FreeGameScence.quanType.G2.addChild(FreeGameScence.quanType.quanMC);
								FreeGameScence.quanType.quanMC.gotoAndPlay("a0", -1);
								FreeGameScence.quanType.quanMC.x = -60;
								FreeGameScence.quanType.quanMC.y = -90;
								FreeGameScence.quanType.quanMC.scaleX = 1.05;
								FreeGameScence.quanType.quanMC.scaleY = 1.1;

								for (var i = 0; i < vo.GameData.resultData.Value.Main.ReelSymbols[index].length; i++) {
									if ((vo.GameData.resultData.Value.Main.ReelSymbols[index][i]) == "C1") {
										Whetherfree = true;
										let reelItem: any = this.G1.getChildAt(i);
										reelItem.isPlayFree(true);
									}
								}
								if (Whetherfree) {
									SoundManager.getInstance().playEffect("paizi_2_mp3");
									//	SoundManager.getInstance().playEffect("quan_mp3");
									SoundManager.getInstance().playMusic("quan_mp3").then((chanel) => {
										GameScence.Music_1 = chanel;
									});
									//	console.log("3轴  出现免费牌子 播放免费牌子出现音效，播放免费牌子第一个特效")
								}
							}
						}
					} else if (index >= 3) {
						tt += 1;
						if (tt == 20 + index * 10) {
							for (let j1 = 0; j1 < this.G1.numChildren; j1++) {
								let reelItem: any = this.G1.getChildAt(j1);
								//	reelItem.y = (j % 4) * reelItem.height - Math.floor(j / 4) * this.G1.height;
								reelItem.isShowIcon(index, j1 % 4, vo.GameData.resultData.Value.Main.ReelSymbols);
							}
						}
						if (tt >= 50 + index * 16) {
							egret.clearInterval(this["timer1" + index]);
							for (let j = 0; j < this.G1.numChildren; j++) {
								let reelItem: any = this.G1.getChildAt(j);
								reelItem.y = (j % 4) * reelItem.height - Math.floor(j / 4) * this.G1.height;
								reelItem.isShowIcon(index, j % 4, vo.GameData.resultData.Value.Main.ReelSymbols);
								egret.Tween.get(reelItem).to({ y: reelItem.y + 40 }, 200, egret.Ease.backOut).call(() => {
									egret.Tween.get(reelItem).to({ y: reelItem.y - 40 }, 100).call(() => {
									})
								})
							}
							if (index == 3) {//判断有没有免费符号
								if (this.quanMC && this.quanMC.parent) {
									this.quanMC.parent.removeChild(this.quanMC);
									this.quanMC.stop();
								}
								let Whetherfree = false;
								for (var i = 0; i < vo.GameData.resultData.Value.Main.ReelSymbols[index].length; i++) {
									if ((vo.GameData.resultData.Value.Main.ReelSymbols[index][i]) == "C1") {
										Whetherfree = true;
										let reelItem: any = this.G1.getChildAt(i);
										reelItem.isPlayFree(true);
									}
								}
								if (Whetherfree) {
									//		console.log("4轴  出现免费牌子 播放免费牌子出现音效，播放免费牌子第一个特效")
									SoundManager.getInstance().playEffect("paizi3_mp3");
								} else {
									FreeGameScence.Type1.onEliminateIcon(1);
									FreeGameScence.Type2.onEliminateIcon(2);
								}
							}
							if (index == 4) {//游戏结束
								this.timerdely = egret.setTimeout(() => {
									//		console.log("index=" + 4 + " -------------游戏结束");
									if (GameScence.START_CHANEL) {
										GameScence.START_CHANEL.stop();
										GameScence.START_CHANEL = null;
									}
									if (GameScence.Music_1) {
										GameScence.Music_1.stop();
										GameScence.Music_1 = null;
									}
									core.NotifyManager.getInstance().sendNotify(core.NotifyConst.LOGIC_ROUNDOVER);
								}, this, 300)
							}
						}
					}
				} else {
					tt += 1;
					if (tt >= 48 + index * 32) {
						egret.clearInterval(this["timer1" + index]);
						for (let j = 0; j < this.G1.numChildren; j++) {
							let reelItem: any = this.G1.getChildAt(j);
							reelItem.y = (j % 4) * reelItem.height - Math.floor(j / 4) * this.G1.height;
							reelItem.isShowIcon(index, j % 4, vo.GameData.resultData.Value.Main.ReelSymbols);
							egret.Tween.get(reelItem).to({ y: reelItem.y + 40 }, 200, egret.Ease.backOut).call(() => {
								egret.Tween.get(reelItem).to({ y: reelItem.y - 40 }, 100).call(() => {
								})
							})
						}
						if (index == 1) {//判断有没有免费符号
							let Whetherfree = false;
							for (var i = 0; i < vo.GameData.resultData.Value.Main.ReelSymbols[index].length; i++) {
								if (vo.GameData.resultData.Value.Main.ReelSymbols[index][i] == "C1") {
									Whetherfree = true;
									let reelItem: any = this.G1.getChildAt(i);
									reelItem.isPlayFree(false);
								}
							}
							if (Whetherfree) {
								SoundManager.getInstance().playEffect("paizi_1_mp3");
								//		console.log("2轴  出现免费牌子 播放免费牌子出现音效，播放免费牌子第一个特效")

							}

						}
						if (index == 2) {//判断有没有免费符号
							let Whetherfree = false;
							for (var i = 0; i < vo.GameData.resultData.Value.Main.ReelSymbols[index].length; i++) {
								if (vo.GameData.resultData.Value.Main.ReelSymbols[index][i] == "C1") {
									Whetherfree = true;
									let reelItem: any = this.G1.getChildAt(i);
									reelItem.isPlayFree(false);
								}
							}
							if (Whetherfree) {
								//		console.log("3轴  出现免费牌子 播放免费牌子出现音效，播放免费牌子第一个特效")
							}
						}
						if (index == 3) {//判断有没有免费符号
							let Whetherfree = false;
							for (var i = 0; i < vo.GameData.resultData.Value.Main.ReelSymbols[index].length; i++) {
								if ((vo.GameData.resultData.Value.Main.ReelSymbols[index][i]) == "C1") {
									Whetherfree = true;
									let reelItem: any = this.G1.getChildAt(i);
									reelItem.isPlayFree(false);
								}
							}
							if (Whetherfree) {
								SoundManager.getInstance().playEffect("paizi_1_mp3");
								//	console.log("4轴  出现免费牌子 播放免费牌子出现音效，播放免费牌子第一个特效")
							}
						}
						if (index == 4) {//游戏结束
							this.timerdely = egret.setTimeout(() => {
								//		console.log("index=" + 4 + " -------------游戏结束")
								core.NotifyManager.getInstance().sendNotify(core.NotifyConst.LOGIC_ROUNDOVER);
							}, this, 300)
						}
					}
				}

			}

		}, this, 15)
	}
	public clerarquan() {
		if (this.quanMC && this.quanMC.parent) {
			this.quanMC.parent.removeChild(this.quanMC);
			this.quanMC.stop();
		}
	}
	public onEliminateIcon(index) {
		if (vo.GameData.resultData != undefined)
			for (var j = 0; j < vo.GameData.resultData.Value.Main.ReelSymbols[index].length; j++) {
				if ((vo.GameData.resultData.Value.Main.ReelSymbols[index][j]) == "C1") {
					let reelItem: any = this.G1.getChildAt(j);
					reelItem.isNoshow();
				}
			}
	}

	public timerr0: any;
	public timerr1: any;
	public timerr2: any;
	public timerr3: any;
	public timerr4: any;

	/**
 	 *icon快速转动
	 */
	public iocnTurn1(index) {
		let yy = 0;
		let tt = 0;
		this["timerr" + index] = egret.setInterval(() => {
			yy += 1;
			for (let i = 0; i < this.G1.numChildren; i++) {
				let reelItem: any = this.G1.getChildAt(i);
				reelItem.y += this.displacement;
				if (reelItem.y > (this.G1.height + reelItem.height)) {
					this.NukER += 1;
					if (this.NukER > 47)
						this.NukER = 0;
					reelItem.y = -this.G1.height + reelItem.height;
					reelItem.OnshowIcon(index, this.NukER, GameManager.getInstance().initdata_1, false);
				}
			}
			if (yy > 0 && GameManager.getInstance().WhetherData) {
				tt += this.displacement;
				if (tt >= 328 * (index + 2)) {
					SoundManager.getInstance().playEffect("reelstop_mp3");
					egret.clearInterval(this["timerr" + index]);
					for (let j = 0; j < this.G1.numChildren; j++) {
						let reelItem: any = this.G1.getChildAt(j);
						reelItem.y = (j % 4) * reelItem.height - Math.floor(j / 4) * this.G1.height;
						reelItem.isShowIcon(index, j % 4, vo.GameData.resultData.Value.Main.ReelSymbols);
						egret.Tween.get(reelItem).to({ y: reelItem.y + 40 }, 200, egret.Ease.backOut).call(() => {
							egret.Tween.get(reelItem).to({ y: reelItem.y - 40 }, 100).call(() => {
							})
						})
					}
					if (index == 1) {//判断有没有免费符号

					}
					// if (index == 2) {

					// }
					if (index == 3) {//判断有没有免费符号

					}
					if (index == 4) {//游戏结束
						this.timerdely = egret.setTimeout(() => {
							//	console.log("index=" + 4 + " -------------游戏结束")
							core.NotifyManager.getInstance().sendNotify(core.NotifyConst.LOGIC_ROUNDOVER);
						}, this, 300)
					}
				}
			}
		}, this, 15)
	}
	public removStart() {
		this.G1.removeChildren();
	}
	public stopIcon(index) {
		//	this.displacement = 0;
		egret.clearInterval(this.timerdely);
		egret.clearInterval(this["timerr" + index]);
		egret.clearInterval(this["timer1" + index]);
		egret.clearTimeout(this.timer2);
		for (let i = 0; i < this.G1.numChildren; i++) {
			let reelItem: any = this.G1.getChildAt(i);
			egret.Tween.removeTweens(reelItem);
			egret.Tween.removeTweens(reelItem);
			reelItem.y = (i % 4) * reelItem.height - Math.floor(i / 4) * this.G1.height;
			reelItem.isShowIcon(index, i % 4, vo.GameData.resultData.Value.Main.ReelSymbols);
			if (!GameConfig.speedPlay)
				egret.Tween.get(reelItem).to({ y: reelItem.y + 40 }, 100, egret.Ease.backOut).call(() => {
					egret.Tween.get(reelItem).to({ y: reelItem.y - 40 }, 100).call(() => {
					})
				})
		}

		if (this.quanMC && this.quanMC.parent) {
			this.quanMC.parent.removeChild(this.quanMC);
			this.quanMC.stop();
		}
	}

	public initFreeGame(index) {
		for (let i = 0; i < this.G1.numChildren; i++) {
			let reelItem: any = this.G1.getChildAt(i);
			reelItem.y = (i % 4) * reelItem.height - Math.floor(i / 4) * this.G1.height;
			reelItem.isShowIcon(index, i % 4, vo.GameData.resultData.Value.Main.ReelSymbols);
		}
	}


	/**
	 * 展示图标动画
	 */
	public showIcon(index_x, index_y, type) {
		let reelItem: any = this.G1.getChildAt(index_y);
		reelItem.visible = false;
		//	console.log(vo.GameData.resultData.Value.Main.ReelSymbols[index_x][index_y])
		switch (vo.GameData.resultData.Value.Main.ReelSymbols[index_x][index_y]) {
			case "AA":
				type.G1.addChild(type.MC_Array[index_y]);
				type.MC_Array[index_y].x = reelItem.x - 20;
				type.MC_Array[index_y].y = reelItem.y - 40 + 2;
				type.MC_Array[index_y].scaleY = 0.95;
				type.MC_Array[index_y].gotoAndPlay("a1", -1);
				break;
			case "KK":
				type.G1.addChild(type.MC_Array[index_y]);
				type.MC_Array[index_y].x = reelItem.x - 20;
				type.MC_Array[index_y].y = reelItem.y - 40;
				type.MC_Array[index_y].gotoAndPlay("a2", -1);
				break;
			case "QQ":
				type.G1.addChild(type.MC_Array[index_y]);
				type.MC_Array[index_y].x = reelItem.x - 20;
				type.MC_Array[index_y].y = reelItem.y - 40;
				type.MC_Array[index_y].gotoAndPlay("a3", -1);
				break;
			case "JJ":
				type.G1.addChild(type.MC_Array[index_y]);
				type.MC_Array[index_y].x = reelItem.x - 20;
				type.MC_Array[index_y].y = reelItem.y - 40;
				type.MC_Array[index_y].gotoAndPlay("a4", -1);
				break;
			case "TN":
				type.G1.addChild(type.MC_Array[index_y]);
				type.MC_Array[index_y].x = reelItem.x - 20;
				type.MC_Array[index_y].y = reelItem.y - 40;
				type.MC_Array[index_y].gotoAndPlay("a5", -1);
				break;
			case "NI":
				type.G1.addChild(type.MC_Array[index_y]);
				type.MC_Array[index_y].x = reelItem.x - 20;
				type.MC_Array[index_y].y = reelItem.y - 40;
				type.MC_Array[index_y].gotoAndPlay("a6", -1);
				break;
			case "M4":
				type.G1.addChild(type.MC_Array[index_y]);
				type.MC_Array[index_y].x = reelItem.x - 20 - 5;
				type.MC_Array[index_y].y = reelItem.y - 40;
				type.MC_Array[index_y].gotoAndPlay("a7", -1);
				break;
			case "M3":
				type.G1.addChild(type.MC_Array[index_y]);
				type.MC_Array[index_y].x = reelItem.x - 20;
				type.MC_Array[index_y].y = reelItem.y - 40;
				type.MC_Array[index_y].gotoAndPlay("a8", -1);
				break;
			case "M2":
				type.G1.addChild(type.MC_Array[index_y]);
				type.MC_Array[index_y].x = reelItem.x - 20 - 5;
				type.MC_Array[index_y].y = reelItem.y - 40;
				type.MC_Array[index_y].gotoAndPlay("a9", -1);
				break;
			case "M1":
				type.G1.addChild(type.MC_Array[index_y]);
				type.MC_Array[index_y].x = reelItem.x - 20 - 13;
				type.MC_Array[index_y].y = reelItem.y - 40;
				type.MC_Array[index_y].gotoAndPlay("a10", -1);
				break;
			case "C1":
				//	console.log("**************11************")
				type.G1.addChild(type.pz_Array[index_y]);
				type.pz_Array[index_y].x = reelItem.x + reelItem.width / 2;
				type.pz_Array[index_y].y = reelItem.y + reelItem.height / 2 + 7;
				type.pz_Array[index_y].gotoAndPlay("a0", -1);
				break;
			case "WW":
				type.G1.addChild(type.JQW_Array[index_y]);
				type.JQW_Array[index_y].x = reelItem.x + 118;
				type.JQW_Array[index_y].y = reelItem.y + 82;
				type.JQW_Array[index_y].scaleY = 0.98;
				type.JQW_Array[index_y].gotoAndPlay("a0", 1);
				type.JQW_Array[index_y].addEventListener(egret.MovieClipEvent.COMPLETE, () => {
					type.JQW_Array[index_y].gotoAndPlay("a1", -1);
				}, type)
				break;
		}
		//	this.G1.removeChildAt(y);
	}
	/**
	 * 隐藏掉图标动画
	 */
	public hideAction(): void {
		for (var i = 0; i < 4; i++) {
			if (this.MC_Array[i] && this.MC_Array[i].parent) {
				this.MC_Array[i].parent.removeChild(this.MC_Array[i]);
				this.MC_Array[i].stop();
			}
			if (this.JQW_Array[i] && this.JQW_Array[i].parent) {
				this.JQW_Array[i].parent.removeChild(this.JQW_Array[i]);
				this.JQW_Array[i].stop();
			}
			if (this.pz_Array[i] && this.pz_Array[i].parent) {
				this.pz_Array[i].parent.removeChild(this.pz_Array[i]);
				this.pz_Array[i].stop();
			}
		}


	}
	public hideAction1(): void {
		if (this.quanMC && this.quanMC.parent) {
			this.quanMC.parent.removeChild(this.quanMC);
			this.quanMC.stop();
		}

		for (var i = 0; i < 4; i++) {
			let reelItem: any = this.G1.getChildAt(i);
			reelItem.isNoshow();
		}
	}

	/**
	 * 显示图标
	 */
	public AccordingIcon(index_x, index_y) {
		let reelItem: any = this.G1.getChildAt(index_y);
		reelItem.visible = true;
	}
}

class FreeItem extends eui.Component {
	public icon: eui.Image;
	public FreeIconMC: egret.MovieClip;
	public FreeIconMC1: egret.MovieClip;
	public constructor() {
		super();
		this.skinName = FreeItemSkin;
		this.init();
	}
	public childrenCreated(): void {
		super.childrenCreated();
	}
	public init(): void {
		if (!this.FreeIconMC) {
			this.FreeIconMC = game.MCUtils.getMc('freeIcon');
		}
		if (!this.FreeIconMC1) {
			this.FreeIconMC1 = game.MCUtils.getMc('freeIcon1');
		}
	}
	public isShowIcon(index1, index2, data = vo.GameData.initData.Value.Geninit.Main.ReelSymbols, isSohw: boolean = true) {
		this.icon.visible = true;
		if (data[index1][index2] == "WW") {
			this.icon.scaleX = 1.08;
			this.icon.scaleY = 1.08;
			this.icon.horizontalCenter = -5.5;
		} else if (data[index1][index2] == "C1") {
			this.icon.scaleX = 1;
			this.icon.scaleY = 1;
			this.icon.horizontalCenter = -3;
		}
		else {
			this.icon.horizontalCenter = -4;
			this.icon.scaleX = this.icon.scaleY = 0.95;
		}
		this.icon.source = isSohw == true ? "icon_0" + data[index1][index2] + "_png" : "icon_0" + data[index1][index2] + "_M_png";
	}
	public isPlayFree(type) {
		this.addChild(this.FreeIconMC);
		this.FreeIconMC.x = this.icon.width / 2;
		this.FreeIconMC.y = this.icon.height / 2;
		this.FreeIconMC.gotoAndPlay("a0", 1);
		this.FreeIconMC.addEventListener(egret.MovieClipEvent.COMPLETE, () => {
			if (!type) {
				if (this.FreeIconMC && this.FreeIconMC.parent) {
					this.FreeIconMC.parent.removeChild(this.FreeIconMC);
					this.FreeIconMC.stop();
				}
			} else {
				if (this.FreeIconMC && this.FreeIconMC.parent) {
					this.FreeIconMC.parent.removeChild(this.FreeIconMC);
					this.FreeIconMC.stop();
				}
				this.addChild(this.FreeIconMC1);
				this.FreeIconMC1.x = this.icon.width / 2;
				this.FreeIconMC1.y = this.icon.height / 2;
				this.FreeIconMC1.gotoAndPlay("a0", -1);
			}
		}, this)
	}
	public OnshowIcon(index1, index2, data, isSohw: boolean = true) {
		this.icon.visible = true;
		if (index2 > 47)
			index2 = 0;
		if (data[index1].Symbols[index2] == "WW") {
			this.icon.scaleX = 1.08;
			this.icon.scaleY = 1.08;
			this.icon.horizontalCenter = -5.5;
		} else if (data[index1].Symbols[index2] == "C1") {
			this.icon.scaleX = 1;
			this.icon.scaleY = 1;
			this.icon.horizontalCenter = -3;
		}
		else {
			this.icon.horizontalCenter = -5;
			this.icon.scaleX = this.icon.scaleY = 0.95;
		}

		this.icon.source = isSohw == true ? "icon_0" + data[index1].Symbols[index2] + "_png" : "icon_0" + data[index1].Symbols[index2] + "_M_png";
	}
	public isNoshow() {
		if (this.FreeIconMC && this.FreeIconMC.parent) {
			this.FreeIconMC.parent.removeChild(this.FreeIconMC);
			this.FreeIconMC.stop();
		}
		if (this.FreeIconMC1 && this.FreeIconMC1.parent) {
			this.FreeIconMC1.parent.removeChild(this.FreeIconMC1);
			this.FreeIconMC1.stop();
		}
	}
}
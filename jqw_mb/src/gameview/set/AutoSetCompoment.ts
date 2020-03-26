class AutoSetCompoment extends eui.Component {
	public arrButton: eui.ToggleButton;
	public countLabel: eui.Label;
	public mySlider: MyHslider;
	public constructor() {
		super();
	}

	public childrenCreated(): void {
		super.childrenCreated();
		this.arrButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
		this.arrButton.selected = SetConst.AUTO_SHOW;
		this.updataState();
		GameManager.getInstance().addEventListener(SetEvent.SET_MODLE, this.onModleChange, this);
		this.mySlider.addEventListener(egret.Event.CHANGE, this.onSliderChange, this);
		core.LayerManager.getInstance().addEventListener(SetEvent.SET_OR_CHANGE, () => {
			this.updataState();
		}, this);
		this.mySlider.maximum = 10;
		this.mySlider.setValues(10);
		this.mySlider.value = 10;
		this.onSliderChange();
		this.visible = false;
	}

	public onSliderChange(): void {
		if (this.mySlider.value <= 9 && this.mySlider.value >= 0) {
			this.countLabel.text = SetConst.AUTO_COUNT_ARR[this.mySlider.value] + '次旋转';
		} else {
			this.countLabel.text = "直到特色游戏";
		}

	}

	public updataState(): void {
		if (window.innerWidth >= window.innerHeight) {
			this.currentState = 'hor';
			this.visible = true;
		}
		else {
			this.currentState = 'ver';
			this.visible = SetConst.AUTO_SHOW;
		}
		this.onSliderChange();
	}

	public onTab(e: egret.TouchEvent): void {
		e.stopImmediatePropagation();
		e.stopPropagation();
		SoundManager.getInstance().playEffect("tap_mp3");
		switch (e.currentTarget) {
			case this.arrButton:
				if (this.arrButton.selected) {
					SetConst.AUTO_SHOW = true;
				}
				else {
					SetConst.AUTO_SHOW = false;
				}
				this.goUpdata();
				this.dispatchEventWith(SetEvent.SET_STATE_CHANGE);
				break;
		}
	}

	private getXY(): any {
		let x: number;
		let y: number;
		if (SetConst.MODLE == 0) {
			if (SetConst.AUTO_SHOW) {
				x = this.currentState.indexOf('hor') != -1 ? GameConfig.WIDTH - this.width : GameConfig.WIDTH / 2 - this.width / 2;
				y = this.currentState.indexOf('hor') != -1 ? GameConfig.HEIGHT / 2 - this.height / 2 : GameConfig.HEIGHT / 2 - this.height / 2 - 120;
			}
			else {
				x = this.currentState.indexOf('hor') != -1 ? GameConfig.WIDTH : GameConfig.WIDTH / 2 - this.width / 2;
				y = this.currentState.indexOf('hor') != -1 ? GameConfig.HEIGHT / 2 - this.height / 2 : GameConfig.HEIGHT / 2 - this.height / 2 - 120;
			}
		}
		return { x: x, y: y };
	}

	public updata(): void {
		egret.Tween.removeTweens(this);
		this.arrButton.selected = SetConst.AUTO_SHOW;
		let t: any = this.getXY();
		this.x = t.x;
		this.y = t.y;
	}

	public goUpdata(): void {
		egret.Tween.removeTweens(this);
		this.arrButton.selected = SetConst.AUTO_SHOW;
		let t: any = this.getXY();
		if (this.currentState == "hor") {//横屏
			this.visible = true;
			egret.Tween.get(this).to({ x: t.x, y: t.y }, 200).call(() => {
			});
		} else {//竖屏
			this.visible = SetConst.AUTO_SHOW;
			this.x = t.x;
			this.y = t.y;
		}


	}

	public onModleChange(): void {
		console.log("ppppppppppppppppppppppppppppppp")
		this.updataState();
		this.updata();
	}
}
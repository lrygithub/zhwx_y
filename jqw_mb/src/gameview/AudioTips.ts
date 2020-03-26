class AudioTips extends core.BaseUI {
	public desLabel: eui.Label;
	public mainGroup: eui.Group;
	public checkButton: CheckButton;
	public callfun: any;
	public okcallfun: any;
	public canclecallfun: any;

	public okRect: eui.Rect;
	public cancleRect: eui.Rect;

	public constructor() {
		super();
		this.skinName = AuduTipSkin;
	}

	public onAdd(): void {
		super.onAdd();
		this.registerEvent(this.okRect, egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
			e.stopPropagation();
			e.stopImmediatePropagation();
			this.okcallfun && this.okcallfun();
			core.UIManager.closeUI(core.UIConst.AudioTips);
			SoundManager.getInstance().setBgOn(true);
			SoundManager.getInstance().setEffectOn(true);
			GameManager.getInstance().dispatchEventWith(SetEvent.SET_MUSIC_CHANGE);
		}, this);

		this.registerEvent(this.cancleRect, egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
			e.stopPropagation();
			e.stopImmediatePropagation();
			
			this.canclecallfun && this.canclecallfun();
			core.UIManager.closeUI(core.UIConst.AudioTips);
			SoundManager.getInstance().setBgOn(false);
			SoundManager.getInstance().setEffectOn(false);
			GameManager.getInstance().dispatchEventWith(SetEvent.SET_MUSIC_CHANGE);
		}, this);

		this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
			e.stopPropagation();
			e.stopImmediatePropagation();
		}, this);

		this.registerEvent(this.checkButton, egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
			e.stopPropagation();
			e.stopImmediatePropagation();
			egret.localStorage.setItem('music', this.checkButton.selected ? '1' : '0');
		}, this);
	}

	public onRemove(): void {
		super.onRemove();
	}

	public shows(type: any, des: string = '', callfun: any = null): void {
		this.desLabel.text = des;
		this.callfun = callfun;
	}

	public updataVer(): void {
		// if (GameConfig.HEIGHT / GameConfig.WIDTH < 1.6) {
		// 	this.mainGroup.scaleX = 1.25;
		// 	this.mainGroup.scaleY = 1.25;
		// }
		// else {
			this.mainGroup.scaleX = 1;
			this.mainGroup.scaleY = 1;
		//}
	}

	public updataHor(): void {
		// if (GameConfig.WIDTH / GameConfig.HEIGHT > 1.8) {
		// 	this.mainGroup.scaleX = 1.25;
		// 	this.mainGroup.scaleY = 1.25;
		// }
		// else {
			this.mainGroup.scaleX = 1;
			this.mainGroup.scaleY = 1;
		//}

	}
}
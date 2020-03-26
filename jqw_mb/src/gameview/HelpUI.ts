class HelpUI extends core.BaseUI {
	public closeHelp: eui.Image;
	public constructor() {
		super();
		this.skinName = helpSkin;
		this.init();
	}
	public init() {
		this.updataType();
	}
	public onAdd(): void {
		super.onAdd();
		//core.TimerManager.instance.addTick(1000, -1, this.onFrame, this);
		this.registerEvent(this.closeHelp, egret.TouchEvent.TOUCH_TAP, () => {
			core.UIManager.closeUI(core.UIConst.HelpUI);
		}, this);
	}
	public updataHor(): void {
		this.updataType();
	}

	public updataVer(): void {
		this.updataType();
	}
	public updataType() {
		if (window.innerWidth >= window.innerHeight) {
			this.currentState = 'hor';
		}
		else {
			this.currentState = 'ver';
		}
	}
}
class NetCloseUI extends core.BaseUI {
	public callfun: any;
	public okcallfun: any;
	public okRect: eui.Button;
	public constructor() {
		super();
		this.skinName = netcloseSkin;
	}

	public onAdd(): void {
		super.onAdd();
		this.registerEvent(this.okRect, egret.TouchEvent.TOUCH_TAP, () => {
			this.okcallfun && this.okcallfun();
			core.UIManager.closeUI(core.UIConst.NetCloseUI);
		}, this);
	}

	public onRemove(): void {
		super.onRemove();
	}

	public shows(type: any, des: string = '', callfun: any = null): void {
		this.callfun = callfun;
	}
}
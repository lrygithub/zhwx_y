class StipsUI extends core.BaseUI {
	public desLabel: eui.Label;
	public callfun: any;
	public okcallfun: any;
	public canclecallfun: any;

	public okRect:eui.Rect;
    public cancleRect:eui.Rect;


	public constructor() {
		super();
		this.skinName = StipSkin;
	}

	public onAdd(): void {
		super.onAdd();
		this.registerEvent(this.okRect, egret.TouchEvent.TOUCH_TAP, (e:egret.TouchEvent) => {
			e.stopPropagation();
			e.stopImmediatePropagation();
			this.okcallfun && this.okcallfun();
			core.UIManager.closeUI(core.UIConst.StipsUI);
		}, this);

		this.registerEvent(this.cancleRect, egret.TouchEvent.TOUCH_TAP, (e:egret.TouchEvent) => {
			e.stopPropagation();
			e.stopImmediatePropagation();
			this.canclecallfun && this.canclecallfun();
			core.UIManager.closeUI(core.UIConst.StipsUI);
		}, this);

		this.registerEvent(this, egret.TouchEvent.TOUCH_TAP, (e:egret.TouchEvent) => {
			e.stopPropagation();
			e.stopImmediatePropagation();
		}, this);



	}

	public onRemove(): void {
		super.onRemove();
	}

	public shows(type: any, des: string = '', callfun: any = null): void {	
		this.desLabel.text = des;
		this.callfun = callfun;
	}
}
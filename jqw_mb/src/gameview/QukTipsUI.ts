class QukTipsUI extends core.BaseUI {
	public closeBtn: eui.Button;
	public qukLabel: eui.Label;
	public constructor() {
		super();
		this.skinName=QukTipSkin;
	}
	public onAdd(): void {
		super.onAdd();
		this.registerEvent(this.closeBtn, egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
			e.stopPropagation();
			e.stopImmediatePropagation();
			core.UIManager.closeUI(core.UIConst.QukTipsUI);
		}, this);

		this.registerEvent(this.qukLabel, egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
			e.stopPropagation();
			e.stopImmediatePropagation();
			SetConst.SPEED_PLAY=true;
			GameManager.getInstance().dispatchEventWith(SetEvent.SET_SPEED_CHANGED);
			core.UIManager.closeUI(core.UIConst.QukTipsUI);
		}, this);
	}

	public onRemove(): void {
		super.onRemove();
	}

}
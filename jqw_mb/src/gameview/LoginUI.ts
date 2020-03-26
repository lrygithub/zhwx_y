class LoginUI extends core.BaseUI {
	public label: eui.Label;
	public constructor() {
		super();
		this.skinName = LoginSkin;
	}

	public onAdd(): void {
		super.onAdd();
		this.registerEvent(this,egret.TouchEvent.TOUCH_TAP,this.onGo,this);
	}

	public onGo():void
	{
		core.UIManager.openUI(core.UIConst.MainScenceUI);
	}


}
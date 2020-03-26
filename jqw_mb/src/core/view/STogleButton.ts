class STogleButton extends eui.ToggleButton {
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
	}

	onAdd():void
	{
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}


	onRemove():void
	{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}

	public onClick():void
	{
		 SoundManager.getInstance().playEffect(SoundConst.CHECKSTART);
	}
}
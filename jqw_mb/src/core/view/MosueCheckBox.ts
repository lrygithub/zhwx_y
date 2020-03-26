class MosueCheckBox extends eui.CheckBox {
	public data: any;
	public constructor() {
		super();
		mouse.setButtonMode(this,true);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);

	}

	public onAdd(): void {
		this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onRollOver, this);
		this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onRollOut, this);
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRollOut, this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRollOver, this);
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onRollOut, this);
	}
	public onRemove(): void {
		this.onRollOut();
		this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onRollOver, this);
		this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onRollOut, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onRollOut, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRollOver, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onRollOut, this);
	}

	public onRollOver(): void {
		if (this.enabled == false)
		{
             this.currentState=this.selected?'rollOverAndDisabled':'disabled';             
		} 
		if (this.selected) {
			this.currentState = 'rollOverAndSelected';
		}
		else {	
			this.currentState = 'rollOver';
		}
		this.dispatchEventWith(egret.Event.CHANGE);

	}

	public onRollOut(): void {
		this.currentState = '';
		this.dispatchEventWith(egret.Event.CHANGE);

	}

	public onClick():void
	{
		 SoundManager.getInstance().playEffect(SoundConst.CHECKSTART);
	}
}
class MosueRadioButton extends eui.RadioButton {
	public data: any;
	public constructor() {
		super();
		mouse.setButtonMode(this, true);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
	}
	public onAdd(): void {
		this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onRollOver, this);
		this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onRollOut, this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRollOver, this);
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onRollOut, this);
	}

	public onRemove(): void {
		this.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollOver, this);
		this.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRollOver, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onRollOut, this);
	}
	public onRollOver(e): void {
		if (this.enabled == false) return;
		if (e.type == egret.TouchEvent.TOUCH_TAP) this.onClick();
		if (this.selected) {
			this.currentState = 'rollOverAndSelected';
		}
		else {
			this.currentState = 'rollOver';
		}
		this.updataUI();
		this.dispatchEventWith(egret.Event.CHANGE);
	}

	public onRollOut(): void {
		this.currentState = '';
		this.updataUI();
		this.dispatchEventWith(egret.Event.CHANGE);
	}
	public onClick(): void {
		SoundManager.getInstance().playEffect(SoundConst.CHECKSTART);
	}

	public updataUI(): void {
		if (this.currentState == 'rollOver') {
			this.updataText(true);
		}
		else {
			this.updataText(false);
		}
	}

	public updataText(isliang: boolean): void {
		// let test = this.colorFlilter.matrix;
		// test[4] += isliang ? this.l : 0;
		// test[9] += isliang ? this.l : 0;
		// test[14] += isliang ? this.l : 0;
		// this.colorFlilter.matrix = test;
		// (this.labelDisplay as eui.Label).filters = [this.colorFlilter];
		(this.labelDisplay as eui.Label).textColor = isliang ? 0xffffff : 0x94989e;
	}
}
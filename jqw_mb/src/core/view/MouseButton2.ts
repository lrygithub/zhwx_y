class MouseButton2 extends eui.Button {
	public data: any;
	public value: number;
	public constructor() {
		super();
		mouse.setButtonMode(this, true);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
	}

	public onAdd(): void {
		//this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollOver, this);
		//this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
		this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onRollOver, this);
		this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onRollOut, this);
		egret.MainContext.instance.stage.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
		this.iconDisplay = new eui.Image();
		this.iconDisplay.visible = false;
		this.addChild(this.iconDisplay);
	}

	public onRemove(): void {
		this.onRollOut();
		//this.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollOver, this);
		//this.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
		this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onRollOver, this);
		this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onRollOut, this);
		egret.MainContext.instance.stage.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
	}

	public t: number;

	public onRollOver(): void {
		if (this.enabled == false) return;
		this.currentState = 'rollOver';
		this.rollover.call(this.callobj, this);
		this.dispatchEventWith(egret.Event.CHANGE);
	}

	public onRollOut(): void {
		this.currentState = '';
		this.rollout.call(this.callobj, this);
		this.dispatchEventWith(egret.Event.CHANGE);
	}

	public rollover: any;
	public rollout: any;
	public callobj: any;
	public setF(_rollover: any, _rollout: any, _callobj: any): void {
		this.rollover = _rollover;
		this.rollout = _rollout;
		this.callobj = _callobj;
	}

	public setEnable(b: boolean): void {
		this.enabled = b;
		this.iconDisplay.visible = !b;
		let index: any = this.name.charAt(2);
		if (!b) {
			egret.Tween.get(this, { loop: true }).wait(500).call(() => {
				this.icon = 'line' + index + '_aicon_png';
			}, this).wait(500).call(() => {
				this.icon = 'line' + index + '_icon_png';
			}, this).wait(500).call(() => {
				this.icon = 'line' + index + '_aicon_png';
			}, this);
		}
		else {
			egret.Tween.removeTweens(this);
			this.icon = 'line' + index + '_icon_png';
		}
	}





}
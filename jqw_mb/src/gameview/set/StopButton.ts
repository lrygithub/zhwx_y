
class StopButton extends eui.Component {
	public _select: boolean = false;
	public constructor() {
		super();
		this.skinName = StopButtonSkin;
	}

	public childrenCreated(): void {
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
		this.setlected = false;
	}

	public onBegin(): void {
		egret.Tween.removeTweens(this);
		egret.Tween.get(this).to({ scaleX: 0.8, scaleY: 0.8 }, 200);
	}

	public onEnd(): void {
		egret.Tween.removeTweens(this);
		egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 200);
	}

	public set setlected(b: boolean) {
		this._select = b;
		this.alpha = !this._select ? 0.5 : 1;
		this.enabled = this._select;
	}
	public get setlected(): boolean {
		return this._select;
	}




}
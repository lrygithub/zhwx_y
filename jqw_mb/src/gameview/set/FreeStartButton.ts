class FreeStartButton extends eui.Component {
	public constructor() {
		super();
		this.skinName = freeStarButtonSkin;
	}
	public childrenCreated(): void {
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
	}

	public onBegin(): void {
		egret.Tween.removeTweens(this);
		egret.Tween.get(this).to({ scaleX: 0.8, scaleY: 0.8 }, 200);
	}

	public onEnd(): void {
		egret.Tween.removeTweens(this);
		egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 200);
	}
}
class processButton1 extends eui.Component {
	public im1: eui.Image;
	public im2: eui.Image;
	public constructor() {
		super();
		this.skinName = processButtonSkin1
	}
	public childrenCreated(): void {
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
		this.mc();
	}
	public sf = false;
	public mc() {
		this.sf = !this.sf;
		let im1_ap = this.sf ? 1 : 0;
		let im2_ap = this.sf ? 0 : 1;
		egret.Tween.get(this.im1).to({ alpha: im1_ap }, 1000);
		egret.Tween.get(this.im2).to({ alpha: im2_ap }, 1000).call(() => {
			this.mc();
		});
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
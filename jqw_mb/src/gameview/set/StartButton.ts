class StartButton extends eui.Component {
	private _select: boolean = false;
	private _type: boolean = false;
	public bg: eui.Image;
	public theTitle: eui.Image;
	public xuanImg: eui.Image;

	public constructor() {
		super();
		this.skinName = StartButtonSkin;
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
	public set type(b: boolean) {
		this._type = b;
		this.theTitle.visible = !this._type;
	}

	public get type(): boolean {
		return this._type;
	}


	public set setlected(b: boolean) {
		this._select = b;
		this.bg.source = this._select == false ? 'glow_yellow@2x2_png' : 'glow_yellow@2xiii_png';
		this.xuanImg.source = this._select == false ? 'spin_icon_normal@2x_png' : 'spin_icon_normal@2xiii_png';
	}

	public get setlected(): boolean {
		return this._select;
	}




}
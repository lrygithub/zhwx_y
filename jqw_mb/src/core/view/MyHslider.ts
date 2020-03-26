class MyHslider extends eui.HSlider {
	public track: eui.Image;
	public thumb: eui.Image;
	public bar: eui.Image;
	public masks: eui.Rect;
	public ts: eui.Image;
	public constructor() {
		super();
	}

	public childrenCreated(): void {
		super.childrenCreated();
		this.bar.mask = this.masks;
		this.addEventListener(egret.Event.CHANGE, this.onChange, this);
		this.maximum = 9;
		this.minimum = 0;
		this.value = 0;
		this.masks.width = this.value / this.maximum * this.bar.width;
		this.ts.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTab, this);
	}
	public onChange(): void {
		this.masks.width = this.value / this.maximum * this.bar.width;
	}

	public onTab(e: egret.TouchEvent): void {
		let x: number = e.localX;
		let n: number = this.nearestValidValue(x / this.ts.width * 10, 1);
		this.value = n;
		this.dispatchEventWith(egret.Event.CHANGE);
	}

	public setValues(v: number): void {
		this.value = v;
		this.onChange();
	}

}
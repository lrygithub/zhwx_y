class DesButton extends eui.Component {

	public constructor() {
		super();
		this.skinName=DesButtonSkin;
	}

	public btn: MosueCheckBox;
	public tLabel: eui.Label;

	public childrenCreated():void
	{
		super.childrenCreated();
		this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			SoundManager.getInstance().playEffect(SoundConst.CHECKSTART);
		},this);
	}

	public set enable(b:boolean)
	{
       this.btn.enabled=b;
	   this.updataText(b);

	}

	public get enable():boolean
	{
		return this.btn.enabled;
	}

	public set text(t:string)
	{
        this.tLabel.text=t;
	}

	public get text():string
	{
		return this.tLabel.text;
	}

	public updataText(isliang: boolean): void {
		// let test = this.colorFlilter.matrix;
		// test[4] += isliang ? this.l : 0;
		// test[9] += isliang ? this.l : 0;
		// test[14] += isliang ? this.l : 0;
		// this.colorFlilter.matrix = test;
		// (this.labelDisplay as eui.Label).filters = [this.colorFlilter];
		this.tLabel.textColor = isliang ? 0x94989e : 0x666a70;
	}

}
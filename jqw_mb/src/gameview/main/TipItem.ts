class TipItem extends eui.Component {
	public bgGroup: eui.Group;
	public bgImg: eui.Image;
	public windesLabel: eui.Label;
	public winRewardLabel: eui.Label;
	public icons: eui.Image;
	private _data: any;

	public constructor() {
		super();
		this.skinName = TipItemSkin;
	}

	public setData(data: any, isAniamtion: boolean = false): void {
		this._data = data;
		this.icons.source = 'show_icon_' + this._data.type + '_png';
		this.bgImg.source = 'show_bg_' + this._data.type + '_png';
		this.windesLabel.text='X'+this._data.count+' 赢';
		this.winRewardLabel.text='￥'+GameManager.numberToCommonStr1(this._data.reward);
		if (isAniamtion) {
			this.icons.scaleX=this.icons.scaleY=0;
			this.bgGroup.x=-252;
           egret.Tween.get(this.icons).to({scaleX:1,scaleY:1},350,egret.Ease.bounceOut).call(()=>{
			   egret.Tween.get(this.bgGroup).to({x:0},200);
		   },this);
		}
		else {
           this.icons.scaleX=this.icons.scaleY=1;
		   this.bgGroup.x=0;
		}
	}

}
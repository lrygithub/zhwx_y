class AutoStartBtn extends eui.Component {
	public kstxt: eui.Image;
	public zjbg: eui.Image;
	public bg: eui.Image;
	public constructor() {
		super();
	}

	public childrenCreated(): void {

	}

	private _isPlay: boolean = false;

	public set isPlay(b: boolean) {
		this._isPlay = b;
		this.kstxt.source = this._isPlay ? 'tzzdyx_png' : 'kszdyx_png';
		this.zjbg.source = this.isPlay ? 'glow_red@2x_png' : 'glow_yellow@2x2_png';
		this.bg.source = this.isPlay ? 'stop_icon@2x_png' : 'autoplay_sanjiao@2x_png';
		// this.countLabel.visible=this.isPlay;

	}

	public get isPlay(): boolean {
		return this._isPlay;
	}


}
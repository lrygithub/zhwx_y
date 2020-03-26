class NetUI extends core.BaseUI {

	public constructor() {
		super();
		this.skinName = NetSkin;
	}

	public netingIcon: eui.Image;


	private static _instance: NetUI;

	public static getInstance(): NetUI {
		if (!this._instance) {
			this._instance = new NetUI();
		}
		return this._instance;
	}
	public childrenCreated(): void {
	}
    /**
	 * 显示正在连接界面 
	 */
	public showNetting(): void {
		let layer: eui.UILayer = core.LayerManager.getInstance().getLayer(core.LayerManager.Layer_Tip);
		layer.addChild(this);
		this.netingIcon.rotation = 0;
		egret.Tween.get(this.netingIcon).to({ rotation: 2160 }, 6000).call(() => { this.netingIcon.rotation = 0; }).call(() => {
			NetUI.getInstance().hideNetting();
			core.UIManager.openUI(core.UIConst.NetCloseUI, core.LayerManager.Layer_Tip);
			let ui: NetCloseUI = core.UIManager.getUI(core.UIConst.NetCloseUI);
			ui.shows(0, '连接断开，正在重新连接.', () => {
				window.location.href = window.location.href;
			});
		}, this);
	}

	public showNomalNet():void
	{
		egret.Tween.get(this.netingIcon).to({ rotation: 21600 }, 60000);
	}

	/**
	* hide正在连接界面
	*/
	public hideNetting(): void {
		egret.Tween.removeTweens(this.netingIcon);
		if (this.parent) this.parent.removeChild(this);
	}


}
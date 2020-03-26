class TipsManager extends egret.EventDispatcher {
	private static _instance: TipsManager;
	public showY: number = 800;
	public constructor() {
		super();
		core.FrameEventCenter.getInstance().addFrameEventListener(this.onEnterFrame, this);
	}

	public static getInstance(): TipsManager {
		if (!this._instance) {
			this._instance = new TipsManager();
		}
		return this._instance;
	}

	public isDebug: boolean = true;

	public showLog(message?: any, ...optionalParams: any[]): void {
		if (this.isDebug) {
			console.log(message, ...optionalParams);
		}
	}

	/**
	 * 显示错误信息
	 */
	public showTips(str: any, type: number = 1): void {
		var complete: any = () => {
			let tips: BaseTips;
			switch (type) {
				case 0:
					tips = new NormalErrorTips();
					//egret.Tween.get(tips).to({x:GameConfig.WIDTH/2-tips.width/2+120},50,egret.Ease.backIn);
					break;
				case 1:
					tips = new NormalOkTips();
					//egret.Tween.get(tips).to({x:GameConfig.WIDTH/2-tips.width/2+120},50,egret.Ease.backIn);
					break;
			}
			tips.textTips.text = str;
			this.tipsArr.push(tips);
			tips.x = GameConfig.WIDTH / 2 - tips.width / 2+80 ;
			if (this.tipsArr.length > 1) {
				var ltips: BaseTips = this.tipsArr[this.tipsArr.length - 2];
				if (ltips.y < this.showY - ltips.height) {
					tips.y = this.showY;
				}
				else if (ltips.y < GameConfig.HEIGHT - ltips.height - tips.height) {
					tips.y = ltips.y + ltips.height;
				}
				else {
					tips.y = ltips.y + ltips.height;
					for (var i: number = 0; i < this.tipsArr.length; i++) {
						this.tipsArr[i].y -= tips.height;
					}

				}
			}
			else if (this.tipsArr.length == 1) {
				tips.y = this.showY;
			}
			core.LayerManager.getInstance().addUI(tips, core.LayerManager.Layer_Tip);
		};
		complete();
	}

	public tipsArr: Array<BaseTips> = [];
	public onEnterFrame(t: number): void {
		if (this.tipsArr.length > 0) {
			if (this.tipsArr[0].alpha <= 0) {
				this.tipsArr[0].parent.removeChild(this.tipsArr[0]);
				this.tipsArr.shift();
			}
		}
		for (var i: number = 0; i < this.tipsArr.length; i++) {
			this.tipsArr[i].y -= 4;
			this.tipsArr[i].alpha -= 0.004;
		}
	}
}
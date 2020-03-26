module core {
	export class UIManager {
		public constructor() 
		{
		}

		/**存放打开过的UI */
		public static pool:any = {};

		/**打开一个UI */
		public static openUI(name:string, layer:number = LayerManager.Layer_UI,showType:number=0)
		{
			if(layer == LayerManager.Layer_UI) this.checkLastUI();
            
			/**根据ui名获取UI */
			let ui;
			if(this.pool[name])
			{
				ui = <BaseUI>this.pool[name];
			    UIManager.showUI(ui,layer,showType);
			}
			else
			{
				let cls = egret.getDefinitionByName(name);
				ui = new cls();
				ui.layer = layer;
				this.pool[name] = ui;
			    UIManager.showUI(ui,layer,showType);
				LayerManager.getInstance().addUI(ui, layer);
			}
		}
		//如果要在UI层打开新UI，关闭之前的UI层的UI
		private static checkLastUI()
		{
			for(let key in this.pool)
			{
				let poolUI:BaseUI = this.pool[key];
				if(poolUI.layer == LayerManager.Layer_UI && poolUI.isShow)
				{
					poolUI.close();
				}
			}
		}
		/**判断某个UI是否打开 */
		public static isUIOpen(name): boolean
		{
			if(this.pool[name])
			{
				return (<BaseUI>this.pool[name]).isShow;
			}
			return false;
		}

		/**
		 * 得到ui实例
		 */
		public static getUI(name):any
		{
			if(this.pool[name])
			{
				return UIManager.pool[name];
			}
			return null;
		}
		/**关闭指定的UI */
		public static closeUI(name)
		{
			if(this.pool[name])
			{
				(<BaseUI>this.pool[name]).close();
			}
		}

		private static showUI(ui:core.BaseUI, layer:number,showType:number=0):void
		{
			//ui.scaleX=0;
			//ui.scaleY=0;
            LayerManager.getInstance().addUI(ui, layer);
			ui.validateNow();
			ui.anchorOffsetX=ui.width/2;
			ui.anchorOffsetY=ui.height/2;
			let midlex:number=GameConfig.WIDTH/2;
			let midley:number=GameConfig.HEIGHT/2;
            ui.x=midlex;
			ui.y=midley;
				switch(showType)
				{
					case 0:
					ui.scaleX=1;
					ui.scaleY=1;
					break;
					case 1:
					egret.Tween.get(ui).to({scaleX:1,scaleY:1},500)
					break;
					case 2:
					break;
				}

			ui.x=0;
			ui.y=0;
		}

	}
}